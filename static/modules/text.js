
export const characters = {
    lowerCase: [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z'
    ],
    upperCase: [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
    ]
};
export const nonalphaPropers = [
    ' ',
    '-',
    '_',
    '.',
    '\'',
    '`'
];
export const numbers = {
    lowerCase: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '0'
    ],
    upperCase: [
        '!',
        '@',
        '#',
        '$',
        '%',
        '^',
        '&',
        '*',
        '(',
        ')'
    ]
};
export function isValidForProperName(character) {
    return characters.lowerCase.includes(character) || 
    characters.upperCase.includes(character) ||
    numbers.lowerCase.includes(character) ||
    nonalphaPropers.includes(character);
}