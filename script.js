window.onload = function () {
  // Clear all form fields
  document.getElementById("input1").value = "";
  document.getElementById("input2").value = "";
  document.getElementById("input3").value = "";
  document.getElementById("password").value = "";
  document.getElementById("validationMessage").textContent = "";

  // Form submission
  document
    .getElementById("passwordForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      generatePassword();
    });

  // ── Website custom dropdown ──────────────────────────────────────
  const websiteInput = document.getElementById("input1");
  const dropdown = document.getElementById("site-dropdown");
  const sites = [
    "amazon.com",
    "facebook.com",
    "github.com",
    "instagram.com",
    "linkedin.com",
    "reddit.com",
    "spotify.com",
    "x.com"
  ];

  function renderDropdown(filter) {
    const matches = sites.filter((s) => s.includes(filter.toLowerCase()));
    if (matches.length === 0 || filter === "") {
      dropdown.style.display = "none";
      return;
    }
    dropdown.innerHTML = matches
      .map((s) => `<div class="dropdown-item">${s}</div>`)
      .join("");
    dropdown.style.display = "block";

    dropdown.querySelectorAll(".dropdown-item").forEach((item) => {
      item.addEventListener("mousedown", function (e) {
        e.preventDefault();
        websiteInput.value = this.textContent;
        dropdown.style.display = "none";
        document.getElementById("validationMessage").textContent = "";
      });
    });
  }

  websiteInput.addEventListener("input", function () {
    this.value = this.value.toLowerCase();
    var input = this.value.trim();
    var urlPattern = /^[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    document.getElementById("validationMessage").textContent = urlPattern.test(
      input
    )
      ? ""
      : "Enter a valid website like google.com";
    renderDropdown(input);
  });

  websiteInput.addEventListener("focus", function () {
    if (this.value.trim() === "") renderDropdown(" "); // show all on focus if empty
  });

  websiteInput.addEventListener("blur", function () {
    setTimeout(() => {
      dropdown.style.display = "none";
    }, 150);
  });

  // ── Secret key show/hide toggle ──────────────────────────────────
  document
    .getElementById("toggleSecret")
    .addEventListener("click", function () {
      const input = document.getElementById("input3");
      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      this.textContent = isPassword ? "visibility_off" : "visibility";
    });

  // ── Secret key strength meter ────────────────────────────────────
  document.getElementById("input3").addEventListener("input", function () {
    updateStrength(this.value);
  });
};

function updateStrength(value) {
  const bar = document.getElementById("strengthBar");
  const label = document.getElementById("strengthLabel");

  let score = 0;
  if (value.length >= 8) score++;
  if (value.length >= 14) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;

  const levels = [
    { label: "", color: "transparent", width: "0%" },
    { label: "Weak", color: "#e53e3e", width: "25%" },
    { label: "Fair", color: "#dd6b20", width: "50%" },
    { label: "Good", color: "#d69e2e", width: "75%" },
    { label: "Strong", color: "#38a169", width: "90%" },
    { label: "Fort Knox", color: "#00c853", width: "100%" }
  ];

  const level = levels[score];
  bar.style.width = level.width;
  bar.style.backgroundColor = level.color;
  label.textContent = value.length > 0 ? level.label : "";
  label.style.color = level.color;
}

async function generatePassword() {
  const btn = document.querySelector("#passwordForm button[type='submit']");
  var input1 = document.getElementById("input1").value;
  var input2 = document.getElementById("input2").value;
  var input3 = document.getElementById("input3").value;
  var passwordLength = parseInt(
    document.getElementById("passwordLength").value,
    10
  );

  // Guard: make sure libraries are loaded
  if (typeof jsSHA === "undefined") {
    alert("SHA3 library not loaded yet. Please wait a moment and try again.");
    return;
  }
  if (!window.scrypt || typeof window.scrypt.scrypt !== "function") {
    alert("Scrypt library not loaded yet. Please wait a moment and try again.");
    return;
  }

  // Loading state
  btn.disabled = true;
  btn.textContent = "Generating…";

  try {
    // Step 1: SHA3-512 hash of combined input
    var combinedInput = input1 + input2 + input3;
    var shaObj = new jsSHA("SHA3-512", "TEXT");
    shaObj.update(combinedInput);
    var sha3HashBytes = shaObj.getHash("UINT8ARRAY");

    // Step 2: scrypt
    var saltBytes = new TextEncoder().encode(
      input1 + input2 + ":" + passwordLength
    );
    var scryptKey = await window.scrypt.scrypt(
      sha3HashBytes,
      saltBytes,
      16384,
      8,
      1,
      32
    );

    // Step 3: Generate password
    var password = generatePasswordFromHash(scryptKey, passwordLength);
    var passwordField = document.getElementById("password");
    passwordField.value = password;

    // Glow animation
    passwordField.classList.remove("glow");
    void passwordField.offsetWidth;
    passwordField.classList.add("glow");

    // Clipboard
    var pTag = document.getElementById("copied");
    try {
      await navigator.clipboard.writeText(password);
      pTag.style.display = "block";
      setTimeout(() => {
        pTag.style.display = "none";
      }, 5000);
    } catch (clipErr) {
      console.warn("Clipboard unavailable:", clipErr);
      pTag.style.display = "none";
    }

    // Clear fields after 30 seconds
    setTimeout(function () {
      document.getElementById("input1").value = "";
      document.getElementById("input2").value = "";
      document.getElementById("input3").value = "";
      passwordField.value = "";
      passwordField.classList.remove("glow");
      document.getElementById("validationMessage").textContent = "";
      document.getElementById("strengthBar").style.width = "0%";
      document.getElementById("strengthLabel").textContent = "";
    }, 30000);
  } catch (error) {
    console.error("Error in password generation:", error);
    alert("Failed to generate password: " + error.message);
  } finally {
    // Restore button
    btn.disabled = false;
    btn.innerHTML = "<strong>Generate Password</strong>";
  }
}

function generatePasswordFromHash(keyBytes, length) {
  var charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[];:<>,.?/";
  var password = "";
  var startIndex = 0;
  var char = charset.charAt(keyBytes[startIndex] % charset.length);

  while (!/[a-zA-Z]/.test(char)) {
    startIndex++;
    char = charset.charAt(keyBytes[startIndex] % charset.length);
  }

  password += char;
  for (var i = 1; i < length; i++) {
    password += charset.charAt(
      keyBytes[(startIndex + i) % keyBytes.length] % charset.length
    );
  }
  return password;
}

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

const randomInteger = (min, max) =>
  Math.floor(min + Math.random() * (max + 1 - min));

(function scrambleText(node) {
  let charsObj = TEXT.split("").map((char) => ({
    char,
    delay: char === " " ? 0 : randomInteger(1, MAX_DELAY)
  }));

  node.classList.add("scrambling");

  let timerId = setInterval(() => {
    node.textContent = charsObj
      .map((obj) => {
        if (obj.delay === 0) return obj.char;
        obj.delay--;
        return PRIMER[randomInteger(0, PRIMER.length - 1)];
      })
      .join("");
  }, 50);

  setTimeout(() => {
    clearInterval(timerId);
    node.textContent = TEXT;
    node.classList.remove("scrambling");
  }, MAX_DELAY * 1000);
})(document.getElementById("scrambleText"));

const items = document.querySelectorAll(".accordion button");

function toggleAccordion() {
  const itemToggle = this.getAttribute("aria-expanded");
  for (let i = 0; i < items.length; i++) {
    items[i].setAttribute("aria-expanded", "false");
    items[i].nextElementSibling.style.maxHeight = null;
  }
  if (itemToggle === "false") {
    this.setAttribute("aria-expanded", "true");
    this.nextElementSibling.style.maxHeight =
      this.nextElementSibling.scrollHeight + "px";
  }
}

items.forEach((item) => item.addEventListener("click", toggleAccordion));
