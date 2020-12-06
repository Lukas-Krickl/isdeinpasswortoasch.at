const passwordChecker = (function () {
    function checkLength(input) {
        return input.length >= 8;
    }

    function checkLetters(input) {
        regex = RegExp(".*(([a-z].*[A-Z])|([A-Z].*[a-z]))+.*");
        return regex.test(input);
    }

    function checkNumeric(input) {
        regex = RegExp(".*[0-9]+.*");
        return regex.test(input);
    }

    function checkSpecialChars(input) {
        regex = RegExp(".*\\W+.*");
        return regex.test(input);
    }

    return {
        checkLength: checkLength,
        checkLetters: checkLetters,
        checkNumeric: checkNumeric,
        checkSpecialChars: checkSpecialChars
    }
})();