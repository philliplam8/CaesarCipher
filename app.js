/* ----------------------------- */
/*          CONSTANTS            */
/* ----------------------------- */
const switchButton = document.getElementById("switch-button");

const copyInputButton = document.querySelector(".input-text .header-row .copy-section");
const copyOutputButton = document.querySelector(".output-text .header-row .copy-section");
const tooltips = document.getElementsByClassName("tooltiptext");
const clearButton = document.getElementsByClassName("clear-text-icon")[0];

const PLAIN_TEXT = "Plain Text";
const CIPHER_TEXT = "Cipher Text";
const ENCRYPTION_PLACEHOLDER_TEXT = "Encryption";
const DECRYPTION_PLACEHOLDER_TEXT = "Decryption"
const inputTextField = document.getElementById("inputtext");
const outputTextField = document.getElementById("ouputtext");

var cipherKey = document.getElementById("cipher-key");
const decrementCipher = document.getElementById("decrement-cipher");
const incrementCipher = document.getElementById("increment-cipher");

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

/* ----------------------------- */
// Switch between Encryption/Decryption
/* ----------------------------- */

function switchHeaders() {
    var inputTitle = document.getElementById("input-title").innerHTML;
    var outputTitle = document.getElementById("output-title").innerHTML;

    switch (inputTitle) {

        // Swtich from Encryption -> Decryption
        case (PLAIN_TEXT):
            document.getElementById("input-title").innerHTML = CIPHER_TEXT;
            document.getElementById("output-title").innerHTML = PLAIN_TEXT;
            outputTextField.placeholder = DECRYPTION_PLACEHOLDER_TEXT;
            break;

        // Swtich from Decryption -> Encryption
        case (CIPHER_TEXT):
            document.getElementById("input-title").innerHTML = PLAIN_TEXT;
            document.getElementById("output-title").innerHTML = CIPHER_TEXT;
            outputTextField.placeholder = ENCRYPTION_PLACEHOLDER_TEXT;
            break;
    }
}

switchButton.addEventListener("click", switchHeaders);

/* ----------------------------- */
/*       CLIPBOARD SECTION       */
/* ----------------------------- */
// Copy input text to clipboard
copyInputButton.addEventListener("click", function () {
    navigator.clipboard.writeText(inputTextField.value);
    tooltips[0].innerText = "Copied!";
    tooltips[0].style.left = "-13px"; // compensate tooltip arrow position from text change above
});

copyInputButton.addEventListener("mouseout", function () {
    tooltips[0].innerText = "Copy";
    tooltips[0].style.left = "-4px"; // compensate tooltip arrow position from text change above
})

// Copy output text to clipboard
copyOutputButton.addEventListener("click", function () {
    navigator.clipboard.writeText(outputTextField.value);
    tooltips[1].innerText = "Copied!";
    tooltips[1].style.left = "-13px"; // compensate tooltip arrow position from text change above
});

copyOutputButton.addEventListener("mouseout", function () {
    tooltips[1].innerText = "Copy";
    tooltips[1].style.left = "-4px"; // compensate tooltip arrow position from text change above
})

/* ----------------------------- */
//        Display X button
/* ----------------------------- */
function hideClearButton() {
    clearButton.style.visibility = "hidden";
}

function showClearButton() {
    clearButton.style.visibility = "visible";
}

clearButton.addEventListener("click", function () {
    hideClearButton();
    inputTextField.value = "";
    update();
})

/* ----------------------------- */
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
    let shift = numText - n;

    if (shift >= 0) {
        return (numText - n) % 26;
    }
    else { // less than 0
        return (numText - n) % 26 + 26;
    }

}

/* ----------------------------- */
// Wrapper Function
/* ----------------------------- */
function encyption(shiftDirection, plainText, shift) {

    let cipherText = "";

    if (shiftDirection == "default") {
        // return as is
        return plainText;
    }

    for (let i = 0; i < plainText.length; i++) {

        // Check if character is an alphabetical character
        if (isAlphabetical(plainText[i])) {

            // Convert alphabetical letter to uppercase
            let plainTextUpperCase = plainText[i].toUpperCase();

            // Convert letter to number
            let numText = encryptionDict[plainTextUpperCase];

            // Shift number
            let shiftedNum = "";

            if (shiftDirection == "right") {
                shiftedNum = shiftRight(numText, shift);
            }
            else {
                shiftedNum = shiftLeft(numText, Math.abs(shift));
            }

            // Convert number to letter
            var newChar = decryptionDict[shiftedNum];
        }

        // Character is not alphabetical character, proceed as is
        else {
            var newChar = plainText[i];
        }

        cipherText = cipherText + newChar;
    }

    return cipherText;
}

/* ----------------------------- */
// Update Cipher Text Output
/* ----------------------------- */
function update() {

    let latestCipherKey = parseInt(document.getElementById("cipher-key").value);
    let cipherDirection = "";

    if (latestCipherKey == 0) {
        cipherDirection = "default";
    }
    else if (latestCipherKey > 0) {
        cipherDirection = "right";
    }
    else {
        cipherDirection = "left";
    }

    let plainText = inputTextField.value;
    let newValue = encyption(cipherDirection, plainText, latestCipherKey);
    outputTextField.value = newValue;

    // Show/hide X button
    if (plainText == "") {
        hideClearButton();
    } else {
        showClearButton();
    }
}

inputTextField.addEventListener("input", update);

/* ----------------------------- */
// Auto-grow Textarea
/* ----------------------------- */
inputTextField.addEventListener("input", function () {
    inputTextField.style.height = "auto";
    outputTextField.style.height = "auto";
    inputTextField.style.height = (inputTextField.scrollHeight) + "px"
    outputTextField.style.height = (outputTextField.scrollHeight) + "px";
})

/* ----------------------------- */
// Update Cipher Key
/* ----------------------------- */
function increaseCipher() {
    let intValue = parseInt(cipherKey.value);
    intValue += 1;
    cipherKey.value = "" + intValue;
    update();
}

function decreaseCipher() {
    let intValue = parseInt(cipherKey.value);
    intValue -= 1;
    cipherKey.value = "" + intValue;
    update();
}

cipherKey.addEventListener("input", update);
decrementCipher.addEventListener("click", decreaseCipher);
incrementCipher.addEventListener("click", increaseCipher);