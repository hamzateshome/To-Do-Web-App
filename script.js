// ===== DOM References =====
const textInput = document.getElementById("text-input");
const wordCountEl = document.getElementById("word-count");
const charCountEl = document.getElementById("char-count");
const fontSelect = document.getElementById("font-select");
const toastEl = document.getElementById("toast");

// ===== Live Word & Character Count =====
function updateCounts() {
  const text = textInput.value;
  const trimmed = text.trim();
  wordCountEl.textContent = trimmed ? trimmed.split(/\s+/).length : 0;
  charCountEl.textContent = text.length;
}

// Update counts on every keystroke
textInput.addEventListener("input", updateCounts);

// ===== Font Changer =====
fontSelect.addEventListener("change", function () {
  textInput.style.fontFamily = this.value;
});

// ===== Text Transformations =====
function transformText(action) {
  switch (action) {
    case "uppercase":
      textInput.value = textInput.value.toUpperCase();
      break;
    case "lowercase":
      textInput.value = textInput.value.toLowerCase();
      break;
    case "trim":
      // Collapse multiple spaces/tabs to one, limit consecutive newlines
      textInput.value = textInput.value
        .replace(/[ \t]+/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
      break;
  }
  updateCounts();
}

// ===== Copy to Clipboard =====
async function copyText() {
  if (!textInput.value) return;
  try {
    await navigator.clipboard.writeText(textInput.value);
    showToast("Copied to clipboard!");
  } catch {
    showToast("Failed to copy.");
  }
}

// ===== Clear Text =====
function clearText() {
  textInput.value = "";
  updateCounts();
}

// ===== Toast Notification =====
function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");
  setTimeout(() => toastEl.classList.remove("show"), 2000);
}

// Initialize counts on load
updateCounts();