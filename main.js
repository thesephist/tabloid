/* the clickbait headline programming language */

const prog = `
DISCOVER HOW TO factorial WITH n
WE SAID
    WHAT IF n IS ACTUALLY 0
    WE SAID
        SHOCKING DEVELOPMENT 1
    LIES! WE SAID
        SHOCKING DEVELOPMENT MULTIPLY n, factorial OF (n)
    END OF STORY
END OF STORY

EXPERTS CLAIM result TO BE factorial OF (10)
YOU WON'T WANT TO MISS 'RESULT IS'
YOU WON'T WANT TO MISS result

PLEASE LIKE AND SUBSCRIBE
`

/* tokenizer */

/**
 * Reads in char or word chunks
 */
class Reader {
    constructor(str, base = '') {
        this.base = base;
        this.i = 0;
        this.str = str;
    }
    peek() {
        return this.str[this.i];
    }
    next() {
        return this.str[this.i++];
    }
    hasNext() {
        return this.str[this.i] !== undefined;
    }
    backstep() {
        this.i--;
    }
    readUntil(pred) {
        let result = this.base.slice();
        while (this.hasNext() && !pred(this.peek())) {
            result += this.next();
        }
        return result;
    }
    dropWhitespace() {
        this.readUntil(c => !!c.trim());
    }
    expect(tok) {
        const next = this.next();
        if (next !== tok) {
            throw new Error(`Parsing error: expected ${tok}, got ${next}`);
        }
    }
}

/** 
 * Split into words for easier tokenization
 * with keywords.
 */
class Wordifier {
    constructor(str) {
        this.reader = new Reader(prog);
        this.tokens = [];
    }
    wordify() {
        if (this.tokens.length) return this.tokens;

        while (this.reader.hasNext()) {
            const next = this.reader.next();
            switch (next) {
                case '(': {
                    this.tokens.push('(');
                    break;
                }
                case ')': {
                    this.tokens.push(')');
                    break;
                }
                case ',': {
                    this.tokens.push(',');
                    break;
                }
                case '"':
                case "'": {
                    this.wordifyString(next);
                    break;
                }
                default: {
                    // read until WS
                    this.reader.backstep();
                    this.tokens.push(this.reader.readUntil(c => {
                        return !c.trim() || ['(', ')', ','].includes(c)
                    }));
                }
            }
            this.reader.dropWhitespace();
        }
        return this.tokens.slice(1);
    }
    wordifyString(endChar) {
        let acc = '';
        acc += this.reader.readUntil(c => c == endChar);
        while (acc.endsWith('\\') || !this.reader.hasNext()) {
            acc += this.reader.readUntil(c => c != endChar);
        }
        this.reader.next(); // throw away closing char
        this.tokens.push('"' + acc);
    }
}

const T = {
    LParen: Symbol('LParen'),
    RParen: Symbol('RParen'),
    Comma: Symbol('Comma'),
    DiscoverHowTo: Symbol('DiscoverHowTo'),
    With: Symbol('With'),
    Of: Symbol('Of'),
    WeSaid: Symbol('WeSaid'),
    WhatIf: Symbol('WhatIf'),
    LiesBang: Symbol('LiesBang'),
    EndOfStory: Symbol('EndOfStory'),
    ExpertsClaim: Symbol('ExpertsClaim'),
    ToBe: Symbol('ToBe'),
    YouWontWantToMiss: Symbol('YouWontWantToMiss'),
    IsActually: Symbol('IsActually'),
    And: Symbol('And'),
    or: Symbol('or'),
    Add: Symbol('Add'),
    Subtract: Symbol('Subtract'),
    Multiply: Symbol('Multiply'),
    Divide: Symbol('Divide'),
    Modulo: Symbol('Modulo'),
    Beats: Symbol('Beats'), // >
    SmallerThan: Symbol('SmallerThan'), // <
    ShockingDevelopment: Symbol('ShockingDevelopment'),
    PleaseLikeAndSubscribe: Symbol('PleaseLikeAndSubscribe'),
    StayTuned: Symbol('StayTuned'),
    Unexpectedly: Symbol('Unexpectedly'),
    TotallyRight: Symbol('TotallyRight'),
    CompletelyWrong: Symbol('CompletelyWrong'),
}

class Tokenizer {
    constructor(prog) {
        this.reader = new Reader(new Wordifier(prog).wordify(), []);
        this.tokens = [];
    }
    tokenize() {
        if (this.tokens.length) return this.tokens;

        while (this.reader.hasNext()) {
            const next = this.reader.next();
            switch (next) {
                case 'DISCOVER': {
                    this.reader.expect('HOW');
                    this.reader.expect('TO');
                    this.tokens.push(T.DiscoverHowTo);
                    break;
                }
                case 'WITH': {
                    this.tokens.push(T.With);
                    break;
                }
                case 'OF': {
                    this.tokens.push(T.Of);
                    break;
                }
                case 'WE': {
                    this.reader.expect('SAID');
                    this.tokens.push(T.WeSaid);
                    break;
                }
                case 'WHAT': {
                    this.reader.expect('IF');
                    this.tokens.push(T.WhatIf);
                    break;
                }
                case 'LIES!': {
                    this.tokens.push(T.LiesBang);
                    break;
                }
                case 'END': {
                    this.reader.expect('OF');
                    this.reader.expect('STORY');
                    this.tokens.push(T.EndOfStory);
                    break;
                }
                case 'EXPERTS': {
                    this.reader.expect('CLAIM');
                    this.tokens.push(T.ExpertsClaim);
                    break;
                }
                case 'TO': {
                    this.reader.expect('BE');
                    this.tokens.push(T.ToBe);
                    break;
                }
                case 'YOU': {
                    this.reader.expect('WON\'T');
                    this.reader.expect('WANT');
                    this.reader.expect('TO');
                    this.reader.expect('MISS');
                    this.tokens.push(T.YouWontWantToMiss);
                    break;
                }
                case 'IS': {
                    this.reader.expect('ACTUALLY');
                    this.tokens.push(T.IsActually);
                    break;
                }
                case 'AND': {
                    this.tokens.push(T.And);
                    break;
                }
                case 'OR': {
                    this.tokens.push(T.Or);
                    break;
                }
                case 'ADD': {
                    this.tokens.push(T.Add);
                    break;
                }
                case 'SUBTRACT': {
                    this.tokens.push(T.Subtract);
                    break;
                }
                case 'MULTIPLY': {
                    this.tokens.push(T.Multiply);
                    break;
                }
                case 'DIVIDE': {
                    this.tokens.push(T.Divide);
                    break;
                }
                case 'MODULO': {
                    this.tokens.push(T.Modulo);
                    break;
                }
                case 'BEATS': {
                    this.tokens.push(T.Beats);
                    break;
                }
                case 'SMALLER': {
                    this.reader.expect('THAN');
                    this.tokens.push(T.SmallerThan);
                    break;
                }
                case 'SHOCKING': {
                    this.reader.expect('DEVELOPMENT');
                    this.tokens.push(T.ShockingDevelopment);
                    break;
                }
                case 'PLEASE': {
                    this.reader.expect('LIKE');
                    this.reader.expect('AND');
                    this.reader.expect('SUBSCRIBE');
                    this.tokens.push(T.PleaseLikeAndSubscribe);
                    break;
                }
                case 'STAY': {
                    this.reader.expect('TUNED');
                    this.tokens.push(T.StayTuned);
                    break;
                }
                case 'UNEXPECTEDLY': {
                    this.tokens.push(T.Unexpectedly);
                    break;
                }
                case 'TOTALLY': {
                    this.reader.expect('RIGHT');
                    this.tokens.push(T.TotallyRight);
                    break;
                }
                case 'COMPLETELY': {
                    this.reader.expect('WRONG');
                    this.tokens.push(T.CompletelyWrong);
                    break;
                }
                case '(': {
                    this.tokens.push(T.LParen);
                    break;
                }
                case ')': {
                    this.tokens.push(T.RParen);
                    break;
                }
                case ',': {
                    this.tokens.push(T.Comma);
                    break;
                }
                default: {
                    if (!isNaN(parseFloat(next))) {
                        // number literal
                        this.tokens.push(parseFloat(next));
                    } else {
                        // string or varname
                        this.tokens.push(next);
                    }
                }
            }
        }
        return this.tokens;
    }
}

function tokenize(prog) {
    const reader = new Reader(prog);
}

/* parser */

const N = {
    NumberLiteral: Symbol('NumberLiteral'),
    StringLiteral: Symbol('StringLiteral'),
    FnLiteral: Symbol('FnLiteral'),
    FnCall: Symbol('FnCall'),
    Ident: Symbol('Ident'),
    BinaryOp: Symbol('BinaryOp'),
    IfExpr: Symbol('IfExpr'),
    ExprList: Symbol('ExprList'),
    // etc
}

/* executor (tree walk) */

class Environment {
    constructor(nodes) {

    }
}

const tokens = new Tokenizer(prog).tokenize();
console.log(tokens);

const reader = new Reader("test of this");
