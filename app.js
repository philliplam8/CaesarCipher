const copyInputButton = document.querySelector(".input-text .header-row .copy");
const copyOutputButton = document.querySelector(".output-text .header-row .copy");
const tooltips = document.getElementsByClassName("tooltiptext");
const plainTextField = document.getElementById("plaintext");
const cipherTextField = document.getElementById("ciphertext");


/* Cipher Dictionaries
Keeping O(1) complexity at the cost of slightly more memory */
var encryptionDict = {
    "A": 0,
    "B": 1,
    "C": 2,
    "D": 3,
    "E": 4,
    "F": 5,
    "G": 6,
    "H": 7,
    "I": 8,
    "J": 9,
    "K": 10,
    "L": 11,
    "M": 12,
    "N": 13,
    "O": 14,
    "P": 15,
    "Q": 16,
    "R": 17,
    "S": 18,
    "T": 19,
    "U": 20,
    "V": 21,
    "W": 22,
    "X": 23,
    "Y": 24,
    "Z": 25
}

var decryptionDict = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
    4: "E",
    5: "F",
    6: "G",
    7: "H",
    8: "I",
    9: "J",
    10: "K",
    11: "L",
    12: "M",
    13: "N",
    14: "O",
    15: "P",
    16: "Q",
    17: "R",
    18: "S",
    19: "T",
    20: "U",
    21: "V",
    22: "W",
    23: "X",
    24: "Y",
    25: "Z"
}

// Function to Determine if Character is Alphabetical
// if the lower case and uppercase are equal, it is not a letter
function isAlphabetical(achar) {
    return achar.toLowerCase() != achar.toUpperCase();
}

// Function for converting 
function shiftRight(numText, n) {
    return (numText + n) % 26;
}

function shiftLeft(numText, n) {
    return (numText - n) % 26;
}

// Wrapper Function
function encyption(shiftDirection, plainText, shift) {

    let cipherText = "";

    if (shiftDirection == "right") {
        for (let i = 0; i < plainText.length; i++) {

            // Check if character is an alphabetical character
            if (isAlphabetical(plainText[i])) {

                // Convert alphabetical letter to uppercase
                let plainTextUpperCase = plainText[i].toUpperCase();
                // console.log("plainText ", plainTextUpperCase);

                // Convert letter to number
                let numText = encryptionDict[plainTextUpperCase];
                // console.log("plainText to number ", numText);

                // Shift number
                let shiftedNum = shiftRight(numText, shift)
                // console.log("shifted number ", shiftedNum);

                // Convert number to letter
                var newChar = decryptionDict[shiftedNum];
                // console.log("newchar ", newChar);
            }

            // Character is not alphabetical character, proceed as is
            else {
                var newChar = plainText[i];
            }

            cipherText = cipherText + newChar;
        }
    }
    return cipherText;
}

// Update Cipher Text Output
function update() {
    let plainText = plainTextField.value;
    let newValue = encyption("right", plainText, 1)
    cipherTextField.value = newValue;
}

plainTextField.addEventListener("input", update);

// Copy input text to clipboard
copyInputButton.addEventListener("click", function () {
    navigator.clipboard.writeText(plainTextField.value);
    tooltips[0].innerText = "Copied!";
    tooltips[0].style.left = "-13px"; // compensate tooltip arrow position from text change above
});

copyInputButton.addEventListener("mouseout", function() {
    tooltips[0].innerText = "Copy";
    tooltips[0].style.left = "-4px"; // compensate tooltip arrow position from text change above
})

// Copy output text to clipboard
copyOutputButton.addEventListener("click", function () {
    navigator.clipboard.writeText(cipherTextField.value);
    tooltips[1].innerText = "Copied!";
    tooltips[1].style.left = "-13px"; // compensate tooltip arrow position from text change above
});

copyOutputButton.addEventListener("mouseout", function() {
    tooltips[1].innerText = "Copy";
    tooltips[1].style.left = "-4px"; // compensate tooltip arrow position from text change above
})