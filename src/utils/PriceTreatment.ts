export function getAsciiLettersAndSymbols(inputString:string) {
    return inputString.replace(/[^0-9,]/g, '');
}

