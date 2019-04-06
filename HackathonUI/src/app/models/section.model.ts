
export interface SaveSection {
    questions: Question[];
    sectionTitle: String;
    sectionContents: String;
}

export interface Question {
    text: String;
    opt1: String;
    opt2: String;
    opt3: String;
    opt4: String;
    ans: String;
}


export interface SaveDocument {
    documentTitle: String;
    documentDescription: String;
    userId: Number;
    sectionData: SaveSection[];
}
