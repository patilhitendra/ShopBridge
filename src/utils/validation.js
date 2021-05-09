export function isEmptyOrNull(state, error, propName, errorMessage) {
        if ( state === undefined || state === '' || state == null) {
            //Set Error Object from localized resource file
            error[propName] = errorMessage;
            return true;
        }
        return false;
    }