export enum RollerItemMode {
    SHORT = "short",
    LONG = "long",
}

export enum RollerItemCharSet {
    NUMBER = "number",
    ALPHABET = "alphabet",
}

export const RollerCharSet = {
    [RollerItemCharSet.NUMBER]: [...Array(10).keys()].map(String).concat([","]),
    [RollerItemCharSet.ALPHABET]: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "-"],
};
