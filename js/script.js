'use strict';
const userInput = document.getElementById("user_input");
const progressFilled = document.getElementById("progress_filled");
const progressPercent = document.getElementById("progress_percent");
var password_length;
var length_ok;
var letters_ok;
var numeric_ok;
var special_chars_ok;
var words_ok;
var not_leaked;

//is executed with onclick to the submit button 
function submitPassword() {
    let password = userInput.value;
    if ((password.length == 0) || (password.length > 32)) {
        return;
    }
    paneControllerModule.toggleProgressbar(true);
    setDefaultValues();
    password_length = password.length;
    length_ok = passwordChecker.checkLength(password);
    letters_ok = passwordChecker.checkLetters(password);
    numeric_ok = passwordChecker.checkNumeric(password);
    special_chars_ok = passwordChecker.checkSpecialChars(password);
    leakedApiControllerModule.checkPasswordLeaked(Sha1.hash(password), setNotLeaked);
    dictApiControllerModule.checkInDict(password, setWordsOK);
}

function checkComplete() {
    paneControllerModule.toggleProgressbar(false);
    paneControllerModule.showResultPane(password_length, length_ok, letters_ok, numeric_ok, special_chars_ok, words_ok, not_leaked);
}

function setDefaultValues() {
    words_ok = null;
    not_leaked = null;
    userInput.value = "";
}

function setWordsOK(word_found_result) {
    words_ok = !word_found_result;
    if (not_leaked != null) {
        checkComplete();
    }
}

function setNotLeaked(not_leaked_result) {
    not_leaked = not_leaked_result;
    if (words_ok != null) {
        checkComplete();
    }
}