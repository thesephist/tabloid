/* Tabloid: the clickbait headline programming language */

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
        this.reader = new Reader(str);
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
    Or: Symbol('Or'),
    Add: Symbol('Add'),
    Subtract: Symbol('Subtract'),
    Multiply: Symbol('Multiply'),
    Divide: Symbol('Divide'),
    Modulo: Symbol('Modulo'),
    Beats: Symbol('Beats'), // >
    SmallerThan: Symbol('SmallerThan'), // <
    ShockingDevelopment: Symbol('ShockingDevelopment'),
    PleaseLikeAndSubscribe: Symbol('PleaseLikeAndSubscribe'),

    // not implemented yet
    StayTuned: Symbol('StayTuned'),
    Unexpectedly: Symbol('Unexpectedly'),
    TotallyRight: Symbol('TotallyRight'),
    CompletelyWrong: Symbol('CompletelyWrong'),
}

const BINARY_OPS = [
    T.IsActually,
    T.And,
    T.Or,
    T.Add,
    T.Subtract,
    T.Multiply,
    T.Divide,
    T.Modulo,
    T.Beats,
    T.SmallerThan,
];

function tokenize(prog) {
    const reader = new Reader(new Wordifier(prog).wordify(), []);
    const tokens = [];

    while (reader.hasNext()) {
        const next = reader.next();
        switch (next) {
            case 'DISCOVER': {
                reader.expect('HOW');
                reader.expect('TO');
                tokens.push(T.DiscoverHowTo);
                break;
            }
            case 'WITH': {
                tokens.push(T.With);
                break;
            }
            case 'OF': {
                tokens.push(T.Of);
                break;
            }
            case 'WE': {
                reader.expect('SAID');
                tokens.push(T.WeSaid);
                break;
            }
            case 'WHAT': {
                reader.expect('IF');
                tokens.push(T.WhatIf);
                break;
            }
            case 'LIES!': {
                tokens.push(T.LiesBang);
                break;
            }
            case 'END': {
                reader.expect('OF');
                reader.expect('STORY');
                tokens.push(T.EndOfStory);
                break;
            }
            case 'EXPERTS': {
                reader.expect('CLAIM');
                tokens.push(T.ExpertsClaim);
                break;
            }
            case 'TO': {
                reader.expect('BE');
                tokens.push(T.ToBe);
                break;
            }
            case 'YOU': {
                reader.expect('WON\'T');
                reader.expect('WANT');
                reader.expect('TO');
                reader.expect('MISS');
                tokens.push(T.YouWontWantToMiss);
                break;
            }
            case 'IS': {
                reader.expect('ACTUALLY');
                tokens.push(T.IsActually);
                break;
            }
            case 'AND': {
                tokens.push(T.And);
                break;
            }
            case 'OR': {
                tokens.push(T.Or);
                break;
            }
            case 'ADD': {
                tokens.push(T.Add);
                break;
            }
            case 'SUBTRACT': {
                tokens.push(T.Subtract);
                break;
            }
            case 'MULTIPLY': {
                tokens.push(T.Multiply);
                break;
            }
            case 'DIVIDE': {
                tokens.push(T.Divide);
                break;
            }
            case 'MODULO': {
                tokens.push(T.Modulo);
                break;
            }
            case 'BEATS': {
                tokens.push(T.Beats);
                break;
            }
            case 'SMALLER': {
                reader.expect('THAN');
                tokens.push(T.SmallerThan);
                break;
            }
            case 'SHOCKING': {
                reader.expect('DEVELOPMENT');
                tokens.push(T.ShockingDevelopment);
                break;
            }
            case 'PLEASE': {
                reader.expect('LIKE');
                reader.expect('AND');
                reader.expect('SUBSCRIBE');
                tokens.push(T.PleaseLikeAndSubscribe);
                break;
            }
            case 'STAY': {
                reader.expect('TUNED');
                tokens.push(T.StayTuned);
                break;
            }
            case 'UNEXPECTEDLY': {
                tokens.push(T.Unexpectedly);
                break;
            }
            case 'TOTALLY': {
                reader.expect('RIGHT');
                tokens.push(T.TotallyRight);
                break;
            }
            case 'COMPLETELY': {
                reader.expect('WRONG');
                tokens.push(T.CompletelyWrong);
                break;
            }
            case '(': {
                tokens.push(T.LParen);
                break;
            }
            case ')': {
                tokens.push(T.RParen);
                break;
            }
            case ',': {
                tokens.push(T.Comma);
                break;
            }
            default: {
                if (!isNaN(parseFloat(next))) {
                    // number literal
                    tokens.push(parseFloat(next));
                } else {
                    // string or varname
                    tokens.push(next);
                }
            }
        }
    }
    return tokens;
}

/* parser */

const N = {
    NumberLiteral: Symbol('NumberLiteral'),
    StringLiteral: Symbol('StringLiteral'),
    FnDecl: Symbol('FnDecl'),
    FnCall: Symbol('FnCall'),
    Ident: Symbol('Ident'),
    Assignment: Symbol('Assignment'),
    BinaryOp: Symbol('BinaryOp'),
    IfExpr: Symbol('IfExpr'),
    ExprGroup: Symbol('ExprGroup'),
    ReturnExpr: Symbol('ReturnExpr'),
    ProgEndExpr: Symbol('ProgEndExpr'),
    PrintExpr: Symbol('PrintExpr'),
}

class Parser {
    constructor(tokens) {
        this.tokens = new Reader(tokens, []);
    }
    /**
     * Atom
     *  Ident
     *  NumberLiteral
     *  StringLiteral
     *  FnCall
     *  FnDecl
     *  ExprGroup
     *
     * Expression:
     *  (begins with atom)
     *      BinaryOp
     *      Atom
     *  (begins with keyword)
     *      IfExpr
     *      Assignment
     *      ReturnExpr
     *      ProgEndExpr
     *      PrintExpr
     *
     */
    parse() {
        const nodes = [];
        while (this.tokens.hasNext()) {
            nodes.push(this.expr());
        }
        return nodes;
    }
    expectIdentString() {
        const ident = this.tokens.next();
        if (typeof ident === 'string' && !ident.startsWith('"')) {
            return ident;
        }
        throw new Error(`Parsing error: expected identifier, got ${ident.toString()}`);
    }
    atom() {
        const next = this.tokens.next();
        if (typeof next === 'number') {
            return {
                type: N.NumberLiteral,
                val: next,
            }
        } else if (typeof next === 'string') {
            if (next.startsWith('"')) {
                return {
                    type: N.StringLiteral,
                    val: next.substr(1),
                }
            }
            const ident = {
                type: N.Ident,
                val: next,
            }
            if (this.tokens.peek() === T.Of) {
                return this.fnCall(ident);
            }
            return ident;
        } else if (next === T.DiscoverHowTo) {
            // fn literal
            const fnName = this.tokens.next();
            if (this.tokens.peek(T.With)) {
                this.tokens.next(); // with
                // with args
                const args = [this.expectIdentString()];
                while (this.tokens.peek() === T.Comma) {
                    this.tokens.next(); // comma
                    args.push(this.expectIdentString());
                }
                return {
                    type: N.FnDecl,
                    name: fnName,
                    args: args,
                    body: this.expr(),
                }
            } else {
                return {
                    type: N.FnDecl,
                    name: fnName,
                    args: [],
                    body: this.expr(),
                }
            }
        } else if (next === T.WeSaid) {
            // block
            const exprs = [];
            while (this.tokens.hasNext() && this.tokens.peek() !== T.EndOfStory) {
                exprs.push(this.expr());
            }
            this.tokens.expect(T.EndOfStory);
            return {
                type: N.ExprGroup,
                exprs: exprs,
            };
        }

        throw new Error(`Parsing error: expected ident, literal, or block, got ${
            next.toString()
        } before ${this.tokens.peek().toString()}`);
    }
    expr() {
        const next = this.tokens.next();
        if (next === T.WhatIf) {
            // if expr
            const cond = this.expr();
            const ifBody = this.expr();

            let elseBody = null;
            if (this.tokens.peek() == T.LiesBang) {
                this.tokens.next(); // LiesBang
                elseBody = this.expr();
            }
            return {
                type: N.IfExpr,
                cond: cond,
                ifBody: ifBody,
                elseBody: elseBody,
            }
        } else if (next === T.ExpertsClaim) {
            // assignment
            const name = this.expectIdentString();
            this.tokens.expect(T.ToBe);
            const val = this.expr();
            return {
                type: N.Assignment,
                name,
                val,
            }
        } else if (next === T.ShockingDevelopment) {
            // return
            return {
                type: N.ReturnExpr,
                val: this.expr(),
            }
        } else if (next === T.PleaseLikeAndSubscribe) {
            // prog end
            return {
                type: N.ProgEndExpr,
            }
        } else if (next == T.YouWontWantToMiss) {
            // print expr
            return {
                type: N.PrintExpr,
                val: this.expr(),
            }
        }

        this.tokens.backstep();
        const atom = this.atom();
        if (BINARY_OPS.includes(this.tokens.peek())) {
            // infix binary ops
            // TODO: support operator precedence
            const left = atom;
            const op = this.tokens.next();
            const right = this.atom();
            return {
                type: N.BinaryOp,
                op,
                left,
                right,
            }
        }

        return atom;
    }
    fnCall(fnNode) {
        this.tokens.expect(T.Of);
        // TODO: support multiple arguments
        const args = [this.expr()];
        return {
            type: N.FnCall,
            fn: fnNode,
            args: args,
        }
    }
}

/* executor (tree walk) */

/**
 * Abused (slightly) to easily return values upstack
 */
class ReturnError {
    constructor(value) {
        this.value = value;
    }
    unwrap() {
        return this.value;
    }
}

class Environment {
    constructor(runtime) {
        /**
         * Runtime contains the following functions:
         *  - print(s)
         */
        this.runtime = runtime;
        this.scopes = [{}]; // begin with global scope
    }
    run(nodes) {
        let rv;
        for (const node of nodes) {
            rv = this.eval(node);
        }
        return rv;
    }
    eval(node) {
        const scope = this.scopes[this.scopes.length - 1];

        switch (node.type) {
            case N.NumberLiteral: {
                return node.val;
            }
            case N.StringLiteral: {
                return node.val;
            }
            case N.FnDecl: {
                scope[node.name] = node;
                return node;
            }
            case N.FnCall: {
                const fn = this.eval(node.fn);
                const args = node.args.map(arg => this.eval(arg));

                const calleeScope = {};
                fn.args.forEach((argName, i) => {
                    calleeScope[argName] = args[i];
                });

                this.scopes.push(calleeScope);
                let rv;
                try {
                    this.eval(fn.body);
                } catch (maybeReturnErr) {
                    if (maybeReturnErr instanceof ReturnError) {
                        rv = maybeReturnErr.unwrap();
                    } else {
                        // re-throw
                        throw maybeReturnErr;
                    }
                }
                this.scopes.pop();

                return rv;
            }
            case N.Ident: {
                let i = this.scopes.length - 1;
                while (i >= 0) {
                    if (node.val in this.scopes[i]) {
                        return this.scopes[i][node.val];
                    }
                    i --;
                }
                throw new Error(`Runtime error: Undefined variable "${node.val}"`);
            }
            case N.Assignment: {
                scope[node.name] = this.eval(node.val);
                return scope[node.name];
            }
            case N.BinaryOp: {
                const left = this.eval(node.left);
                const right = this.eval(node.right);
                switch (node.op) {
                    // TODO: other ops
                    case T.IsActually:
                        return left === right;
                    case T.Add:
                        return left + right;
                    case T.Subtract:
                        return left - right;
                    case T.Multiply:
                        return left * right;
                    default:
                        throw new Error(`Runtime error: Unknown binary op ${node.op.toString()}`);
                }
            }
            case N.IfExpr: {
                if (this.eval(node.cond)) {
                    return this.eval(node.ifBody);
                }
                if (node.elseBody != null) {
                    return this.eval(node.elseBody);
                }
            }
            case N.ExprGroup: {
                let rv = false; // TODO: make null value? make this illegal?
                for (const expr of node.exprs) {
                    rv = this.eval(expr);
                }
                return rv;
            }
            case N.ReturnExpr: {
                const rv = this.eval(node.val);
                throw new ReturnError(rv);
            }
            case N.ProgEndExpr: {
                // do nothing
                break;
            }
            case N.PrintExpr: {
                const val = this.eval(node.val);
                this.runtime.print(val);
                return val;
            }
            default:
                console.log(JSON.stringify(node, null, 2));
                throw new Error(`Runtime error: Unknown AST Node of type ${
                    node.type.toString()
                }:\n${JSON.stringify(node, null, 2)}`);
        }
    }
}

