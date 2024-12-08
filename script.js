





// script.js

const fileInput = document.getElementById("imageInput");
const outputTextArea = document.getElementById("extractedText");
const convertButton = document.getElementById("convertButton");
const clearButton = document.getElementById("clearButton");
const copyButton = document.getElementById("copyButton");

// Load saved text from localStorage when the page loads
window.onload = () => {
  outputTextArea.value = localStorage.getItem("extractedText") || "";
};

// Save text to localStorage whenever it changes
outputTextArea.addEventListener("input", () => {
  localStorage.setItem("extractedText", outputTextArea.value);
});

// Convert image to text using Tesseract.js
convertButton.addEventListener("click", () => {
  // Check if an image is selected
  if (!fileInput.files[0]) {
    outputTextArea.value = "Please select an image to convert.";
    return;
  }

  const imageFile = fileInput.files[0];

  // Display a loading message
  outputTextArea.value = "Processing...";

  // Use Tesseract.js for OCR
  Tesseract.recognize(
    imageFile,  // The image file
    'eng',      // The language code
    {
      logger: info => console.log(info) // Log progress
    }
  )
  .then(({ data: { text } }) => {
    outputTextArea.value = text.trim(); // Display the extracted text
    localStorage.setItem("extractedText", text.trim()); // Save to localStorage
})
  .catch(error => {
    console.error(error);
    outputTextArea.value = "Error: Unable to process the image.";
  });
});

// Clear button functionality
clearButton.addEventListener("click", () => {
  outputTextArea.value = "";
  localStorage.removeItem("extractedText");
});

// Copy button functionality
copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(outputTextArea.value).then(() => {
    alert("Text copied to clipboard!");
  }).catch(err => {
      console.error("Error copying text: ", err);
  });
});

            