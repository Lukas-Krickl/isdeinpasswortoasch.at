'use strict';
const paneControllerModule = (function () {
    const panes = {
        termsOfUsePane: document.getElementById("terms_of_use_pane"),
        warning: document.getElementById("warning"),
        improvementPane: document.getElementById("improvement_pane"),
        seiteSicherPane: document.getElementById("seite_sicher_pane"),
        what_we_test_pane: document.getElementById("what_we_test_pane"),
        impressumPane: document.getElementById("impressum_pane")
    };
    
    const resultPane = document.getElementById("result_pane");
    const resultIcon = document.getElementById("result_icon");
    const resultText = document.getElementById("result_text");
    const lengthIcon = document.getElementById("length_status_icon");
    const lettersIcon = document.getElementById("letters_status_icon");
    const numericIcon = document.getElementById("numeric_status_icon");
    const specialCharsIcon = document.getElementById("special_chars_status_icon");
    const leakedIcon = document.getElementById("leaked_status_icon");
    const leakedText = document.getElementById("leaked_status_text");
    const wordsIcon = document.getElementById("words_status_icon");
    const wordsText = document.getElementById("words_status_text");
    const errorPane = document.getElementById("error_pane");
    const errorMsg = document.getElementById("error_msg");

    function showPane(pane) {
        pane.classList.remove("hidden");
        pane.classList.add("entry-animation");
    }

    function hidePane(pane) {
        pane.classList.remove("entry-animation");
        pane.classList.add("exit-animation");
        setTimeout(function () {
            pane.classList.add("hidden");
            pane.classList.remove("exit-animation");
        }, 400);
    }

    //chech if terms of use accepted and hide pane if so
    const sessionStore = window.sessionStorage;
    if (sessionStore.getItem("termsOfUseAccepted") !== "accepted") {
        showPane(panes.termsOfUsePane);
    }

    //when terms of use are accepted save state until browser is closed
    function acceptTermsOfUse() {
        sessionStore.setItem("termsOfUseAccepted", "accepted");
        hidePane(panes.termsOfUsePane);
    }
    

    //eventlisteners

    document.getElementById("repeat_check_btn").addEventListener("click", function () {
        hidePane(resultPane);
    });

    document.getElementById("error_close").addEventListener("click", function () {
        hidePane(errorPane);
    })

    function showErrorMsg(message) {
        errorMsg.innerHTML = message
        showPane(errorPane);
    }

    //pass percent as it should display on the screen eg. 45
    function updateProgressBar(percent) {
        progressFilled.style.width = percent + "%";
        progressFilled.style.filter = "hue-rotate(" + percent * 4 + "deg) opacity(.6) brightness(120%)"

        if (percent >= 99) {
            progressFilled.style.borderRadius = "8px";
        }

        progressPercent.innerHTML = percent + "%";

        if (percent >= 60 && !progressPercent.classList.contains("invert")) {
            progressPercent.classList.add("invert");
        }
    }

    function toggleProgressbar(enable) {
        if (enable === true) {
            userInput.classList.add("hidden");
            progressFilled.classList.remove("hidden");
            progressPercent.classList.remove("hidden");
        } else {
            userInput.classList.remove("hidden");
            progressFilled.classList.add("hidden");
            progressPercent.classList.add("hidden");
            progressFilled.style.borderRadius = "8px 0 0 8px";
            progressFilled.style.width = "0%";
            progressFilled.style.filter = "hue-rotate(0deg) opacity(.6) brightness(120%)"

            progressPercent.innerHTML = "0%";
            progressPercent.classList.remove("invert");
        }
    }


    function showResultPane(length, length_ok, letters_ok, numeric_ok, special_chars_ok, words_ok, not_leaked) {
        setResultIcon(length_ok, lengthIcon);
        setResultIcon(letters_ok, lettersIcon);
        setResultIcon(numeric_ok, numericIcon);
        setResultIcon(special_chars_ok, specialCharsIcon);
        setResultIcon(words_ok, wordsIcon);
        setWordsText(words_ok);
        setResultIcon(not_leaked, leakedIcon);
        setNotLeakedText(not_leaked);

        if ((length_ok && letters_ok && numeric_ok && special_chars_ok && not_leaked)
            || (length >= 20 && letters_ok && numeric_ok && not_leaked)
        ) {
            resultIcon.src = "icons/strong-password.svg"
            resultText.innerHTML = "Sicheres Passwort!"
        } else {
            resultIcon.src = "icons/weak-password.svg"
            resultText.innerHTML = "Schwaches Passwort!"
        }

        showPane(resultPane);
    }

    function setResultIcon(result, resultIcon) {
        if (result) {
            resultIcon.src = "icons/check_ok.svg";
        } else {
            resultIcon.src = "icons/check_not_ok.svg";
        }
    }

    function setWordsText(words_ok) {
        if (words_ok) {
            wordsText.innerHTML = "Enthält keine Wörter eines Wörterbuches"
        } else {
            wordsText.innerHTML = "Enthält Wörter eines Wörterbuches!"
        }
    }

    function setNotLeakedText(not_leaked) {
        if (not_leaked) {
            leakedText.innerHTML = "Passwort wurde noch nicht geleaked"
        } else {
            leakedText.innerHTML = "Passwort wurde bereits geleaked!"
        }
    }
    
    return {
        showResultPane: showResultPane,
        showErrorMsg: showErrorMsg,
        updateProgressBar: updateProgressBar,
        toggleProgressbar: toggleProgressbar,
        showPane:showPane,
        hidePane:hidePane,
        panes: panes,
        acceptTermsOfUse: acceptTermsOfUse
    }
})();