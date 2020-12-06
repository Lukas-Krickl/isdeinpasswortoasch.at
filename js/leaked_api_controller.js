'use strict';
const leakedApiControllerModule = (function () {
    const apiUrl = "https://api.pwnedpasswords.com/range/"

    function checkPasswordLeaked(sha1_password, result_callback) {
        let hash_prefix = sha1_password.substring(0, 5);
        let hash_suffix = sha1_password.substring(5);
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                
                result_callback(findPasswordInHashList(hash_suffix, xhr.responseText));
            } else if (this.readyState == 4 && this.status >= 400) {
                paneControllerModule.showErrorMsg(this.status);
            }
        };

        xhr.open("GET", apiUrl + hash_prefix, true);
        xhr.send();
    }

    function findPasswordInHashList(hash_suffix, hash_list) {
        regex = RegExp(".*"+hash_suffix+".*", 'i');
        return !regex.test(hash_list);
    }

    return {
        checkPasswordLeaked: checkPasswordLeaked
    }
})();