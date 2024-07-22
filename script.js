window.onload = function () {
  // Clear all form fields
  document.getElementById("input1").value = "";
  document.getElementById("input2").value = "";
  document.getElementById("input3").value = "";
  document.getElementById("passwordLength").value = "";
  document.getElementById("password").value = "";
  document.getElementById("validationMessage").textContent = "";
};

function generatePassword() {
  var input1 = document.getElementById("input1").value;
  var input2 = document.getElementById("input2").value;
  var input3 = document.getElementById("input3").value;
  var passwordLength = parseInt(
    document.getElementById("passwordLength").value,
    10
  );

  // Combine inputs
  var combinedInput = input1 + input2 + input3;

  // Generate SHA-256 hash of combined input
  sha256(combinedInput)
    .then(function (hash) {
      // Ensure the password meets length requirement
      var password = generatePasswordFromHash(hash, passwordLength);

      // Update UI
      document.getElementById("password").value = password;
      navigator.clipboard.writeText(password);

      setTimeout(function () {
        document.getElementById("input1").value = "";
        document.getElementById("input2").value = "";
        document.getElementById("input3").value = "";
        document.getElementById("passwordLength").value = "";
        document.getElementById("password").value = "";
        document.getElementById("validationMessage").textContent = "";
      }, 30000); // 60000 milliseconds = 1 minute
    })
    .catch(function (error) {
      console.error("Error in hashing:", error);
      alert("Failed to generate password. Please try again.");
    });
}

// Function to generate SHA-256 hash
function sha256(input) {
  var encoder = new TextEncoder();
  var data = encoder.encode(input);
  return crypto.subtle.digest("SHA-256", data).then(function (hashBuffer) {
    var hashArray = Array.from(new Uint8Array(hashBuffer));
    var hashHex = hashArray
      .map((b) => ("00" + b.toString(16)).slice(-2))
      .join("");
    return hashHex;
  });
}

// Function to generate password from hash
function generatePasswordFromHash(hash, length) {
  var password = "";
  var charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[];:<>,.?/";

  var startCharIndex = 0; // Index to start from in the hash
  var charIndex = parseInt(hash.substr(startCharIndex * 2, 2), 16);
  var char = charset.charAt(charIndex % charset.length);

  // Ensure the first character is a letter
  while (!/[a-zA-Z]/.test(char)) {
    startCharIndex++;
    charIndex = parseInt(hash.substr(startCharIndex * 2, 2), 16);
    char = charset.charAt(charIndex % charset.length);
  }

  password += char; // Add the valid starting character

  // Generate the rest of the password
  for (var i = 1; i < length; i++) {
    charIndex = parseInt(hash.substr((startCharIndex + i) * 2, 2), 16);
    password += charset.charAt(charIndex % charset.length);
  }

  return password;
}

function convertFirstAlphabetToUpper(password) {
  var lowercase = "abcdefghijklmnopqrstuvwxyz";
  var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Convert password string to array of characters
  var passwordArray = password.split("");

  // Find the first alphabetical character and convert to uppercase
  for (var i = 0; i < passwordArray.length; i++) {
    var char = passwordArray[i];
    if (lowercase.includes(char) || uppercase.includes(char)) {
      passwordArray[i] = char.toUpperCase();
      break;
    }
  }

  // Join array back into string and return
  return passwordArray.join("");
}

// Event listener for form submission
document
  .getElementById("passwordForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    generatePassword();
    var pTag = document.getElementById("copied"); // Replace 'myParagraph' with the ID of your <p> tag
    pTag.style.display = "block";

    // Set timeout to hide the <p> tag after 5 seconds
    setTimeout(function () {
      pTag.style.display = "none";
    }, 5000);
  });

// Function to validate the input as the user types
document.getElementById("input1").addEventListener("input", function () {
  var input = this.value.trim();

  // Check if the input is a valid website URL without http:// or https://
  var urlPattern = /^[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
  if (urlPattern.test(input)) {
    document.getElementById("validationMessage").textContent = ""; // Clear error message
  } else {
    document.getElementById("validationMessage").textContent =
      "Enter a valid website like google.com";
  }
});

console.log("Nah, Nothing to look at here");

const TEXT = "Guardigen";
const MAX_DELAY = 20;

const PRIMER = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "=",
  "+",
  "[",
  "]",
  "{",
  "}",
  "|",
  ";",
  ":",
  "'",
  '"',
  ",",
  "<",
  ".",
  ">",
  "/",
  "?",
  "~",
  "`"
];

const randomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

(function scrambleText(node) {
  let charsObj = [];

  TEXT.split("").forEach((char) => {
    const delay = char === " " ? 0 : randomInteger(1, MAX_DELAY);
    charsObj.push({ char, delay });
  });

  let timerId = setInterval(() => {
    let scramblChars = [];
    charsObj.forEach((obj) => {
      if (obj.delay === 0) scramblChars.push(obj.char);
      if (obj.delay > 0) {
        scramblChars.push(PRIMER[randomInteger(0, MAX_DELAY - 1)]);
        obj.delay--;
      }
    });
    node.textContent = scramblChars.join("");
  }, 50);

  setTimeout(() => {
    clearInterval(timerId);
  }, MAX_DELAY * 1000);
})(document.getElementById("scrambleText"));

const items = document.querySelectorAll(".accordion button");

function toggleAccordion() {
  const itemToggle = this.getAttribute("aria-expanded");

  for (i = 0; i < items.length; i++) {
    items[i].setAttribute("aria-expanded", "false");
    items[i].nextElementSibling.style.maxHeight = null;
  }

  if (itemToggle == "false") {
    this.setAttribute("aria-expanded", "true");
    this.nextElementSibling.style.maxHeight =
      this.nextElementSibling.scrollHeight + "px";
  } else {
    this.nextElementSibling.style.maxHeight = null;
  }
}

items.forEach((item) => item.addEventListener("click", toggleAccordion));
