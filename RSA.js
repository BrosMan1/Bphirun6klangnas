let n, e, d;

    function generateKeys() {
      let p = parseInt(document.getElementById("p").value);
      let q = parseInt(document.getElementById("q").value);

      if (!validatePrime(p, "P") || !validatePrime(q, "Q")) {
        return;
      }

      n = p * q;
      let l = (p - 1) * (q - 1);
      e = findEncryptionKey(l);
      d = findDecryptionKey(l, e);

      document.getElementById("n").value = n;
      document.getElementById("e").value = e;
      document.getElementById("d").value = d;
    }

    function findEncryptionKey(l) {
      for (let i = 2; i < l; i++) {
        if (isCoPrime(i, l)) {
          return i;
        }
      }
      return null;
    }

    function findDecryptionKey(l, e) {
      for (let d = l + 1; d < l + 100000; d++) {
        if ((d * e) % l === 1) {
          return d;
        }
      }
      return null;
    }

    function validatePrime(prime, nameOfPrime) {
      if (!isPrime(prime)) {
        alert(`Enter only prime numbers for ${nameOfPrime}.`);
        return false;
      }
      return true;
    }

    function encryptMessage() {
      let message = document.getElementById("message").value;
      let m = Array.from(Array(message.length).keys()).map((i) => message.charCodeAt(i));
      let c = m.map((i) => modularExponentiation(i, e, n));
      document.getElementById("encrypted-message").innerHTML = c.join(", ");
      document.getElementById("encrypted-message-textbox").value = c.join(", ");
    }

    function decryptMessage() {
      let c = stringToNumberArray(document.getElementById("encrypted-message-textbox").value);
      let m = c.map((i) => modularExponentiation(i, d, n));
      let message = "";
      m.map((x) => (message += String.fromCharCode(x)));
      document.getElementById("decrypted-message").innerHTML = message;
    }

    function modularExponentiation(base, exponent, modulus) {
      if (modulus === 1) {
        return 0;
      }
      let result = 1;
      base = base % modulus;
      while (exponent > 0) {
        if (exponent % 2 === 1) {
          result = (result * base) % modulus;
        }
        exponent = Math.floor(exponent / 2);
        base = (base * base) % modulus;
      }
      return result;
    }

    function stringToNumberArray(str) {
      return str.split(",").map((i) => parseInt(i));
    }

    function isPrime(num) {
      let sqrtNum = Math.sqrt(num);
      for (let i = 2; i <= sqrtNum; i++) {
        if (num % i === 0) {
          return false;
        }
      }
      return num !== 1;
    }

    function isCoPrime(a, b) {
      let aFac = findFactors(a);
      let bFac = findFactors(b);
      let result = aFac.every((x) => bFac.indexOf(x) < 0);
      return result;
    }

    function findFactors(num) {
      let half = Math.floor(num / 2);
      let result = [];
      let i, j;
      num % 2 === 0 ? (i = 2, j = 1) : (i = 3, j = 2);
      for (i; i <= half; i += j) {
        num % i === 0 ? result.push(i) : false;
      }
      result.push(num);
      return result;
    }
