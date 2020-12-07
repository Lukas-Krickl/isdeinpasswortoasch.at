const dictApiControllerModule = (function () {
    const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/";
    
    var words; //words to query to api
    var wordSearchComplete; //api returns (en and de)
    var wordFound; //boolean at least one found 
    var callbackFunction; //called with bool result when search complete
    var foundWords; 

    function checkInDict(password, callback) {
        words = extractWords(password);
        wordSearchComplete = 0;
        wordFound = false;
        foundWords = {};
        callbackFunction = callback;

        let requestTimeoutTimer = 10000 + (words.length * 2000);
        setTimeout(function () {
            if (wordSearchComplete < words.length*2){
                callbackFunction(wordFound);
            }
        }, requestTimeoutTimer);

        for (let i = 0; i < words.length; i++) {
            let timeout = 2000*(i);
            setTimeout(function () {
                requestWordCheck('en', words[i]);
            }, timeout);
            
            setTimeout(function () {
                requestWordCheck('de', words[i]);
            }, timeout+1000); 
        }
        if (words.length == 0) {
            callbackFunction(wordFound);
        }
    }

    function extractWords(password) {
        const wordRecognitionRegex = /[a-z]{4,}/gi;

        let possible_words = password.match(wordRecognitionRegex); //split into all contiguous letters
        if (!possible_words) {
            console.log("no words found");
            return [];
        }
        
        const wordCapitalSplittingRegex = /[A-Z][a-z][a-z][a-z]+/g;
        let capitalSplittingWords = password.match(wordCapitalSplittingRegex);
        if (capitalSplittingWords != null) {
            possible_words = possible_words.concat(capitalSplittingWords);
        }
        let words_growing_array = possible_words.slice(); //array where data is inserted (not extending the currently traversing array)
        //split possible words into words with increasing letter count
        for (word of possible_words) {
            //only test a minimum of 4 characters and also only remove max 3 characters
            // to keep number of checks down 
            for (let i = 4; (i < word.length - 1) && (words_growing_array.length < 10); i++) {
                let regexWithIncreasingLettercount = RegExp("[a-z]{"+i+"}",'gi');
                words_growing_array = words_growing_array.concat(word.match(regexWithIncreasingLettercount));
            }
        }

        return words_growing_array;
    }


    //calls callback with true/false if word was found in dict
    function requestWordCheck(lang_prefix, word) {
        let xhr = new XMLHttpRequest();
        let fullURL = apiUrl + lang_prefix + "/" + word; 

        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                foundWords[word] = fullURL;
                setDictSearchResult(true);
            
            } else if (this.readyState == 4 && this.status == 404) {
                setDictSearchResult(false);
            } else if (this.readyState == 4 && this.status >= 400 && this.status != 404) {
                setDictSearchResult(false);
                console.error(xhr.responseText);
            }
        };

        xhr.open("GET", fullURL, true);
        xhr.send();
    }

    function setDictSearchResult(found) {
        if (found && !wordFound) {
            wordFound = true;
        }
        wordSearchComplete++;
        let progress = Math.trunc((wordSearchComplete / (words.length * 2)) * 100);
        paneControllerModule.updateProgressBar(progress);
        if(progress == 100){
            printFoundWordsToConsole();
            callbackFunction(wordFound);
        }
    }

    function printFoundWordsToConsole() {
        setTimeout(function () {
            console.clear();
            console.log("words searched: " + words);
            console.log("Found Words:");
            for (word in foundWords) {
                console.log(word + ": " + foundWords[word]);
            }
        }, 1000);
        
    }


    return {
        checkInDict: checkInDict
    };
})();