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
        this.reader = new Reader(str.trim());
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
        return this.tokens;
    }
    wordifyString(endChar) {
        let acc = '';
        acc += this.reader.readUntil(c => c == endChar);
        while (acc.endsWith('\\') || !this.reader.hasNext()) {
            acc = acc.substr(0, acc.length - 1);
            this.reader.next(); // endChar
            acc += endChar + this.reader.readUntil(c => c == endChar);
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
    RumorHasIt: Symbol('RumorHasIt'),
    WhatIf: Symbol('WhatIf'),
    LiesBang: Symbol('LiesBang'),
    EndOfStory: Symbol('EndOfStory'),
    ExpertsClaim: Symbol('ExpertsClaim'),
    ToBe: Symbol('ToBe'),
    YouWontWantToMiss: Symbol('YouWontWantToMiss'),
    LatestNewsOn: Symbol('LatestNewsOn'),
    TotallyRight: Symbol('TotallyRight'),
    CompletelyWrong: Symbol('CompletelyWrong'),
    IsActually: Symbol('IsActually'),
    And: Symbol('And'),
    Or: Symbol('Or'),
    Plus: Symbol('Plus'),
    Minus: Symbol('Minus'),
    Times: Symbol('Times'),
    DividedBy: Symbol('DividedBy'),
    Modulo: Symbol('Modulo'),
    Beats: Symbol('Beats'), // >
    SmallerThan: Symbol('SmallerThan'), // <
    ShockingDevelopment: Symbol('ShockingDevelopment'),
    PleaseLikeAndSubscribe: Symbol('PleaseLikeAndSubscribe'),
}

const BINARY_OPS = [
    T.IsActually,
    T.And,
    T.Or,
    T.Plus,
    T.Minus,
    T.Times,
    T.DividedBy,
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
            case 'RUMOR': {
                reader.expect('HAS');
                reader.expect('IT');
                tokens.push(T.RumorHasIt);
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
            case 'LATEST': {
                reader.expect('NEWS');
                reader.expect('ON');
                tokens.push(T.LatestNewsOn);
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
            case 'PLUS': {
                tokens.push(T.Plus);
                break;
            }
            case 'MINUS': {
                tokens.push(T.Minus);
                break;
            }
            case 'TIMES': {
                tokens.push(T.Times);
                break;
            }
            case 'DIVIDED': {
                reader.expect('BY');
                tokens.push(T.DividedBy);
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
    BoolLiteral: Symbol('BoolLiteral'),
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
    InputExpr: Symbol('InputExpr'),
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
     *  BoolLiteral
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
     *      InputExpr
     *
     */
    parse() {
        const nodes = [];
        while (this.tokens.hasNext()) {
            nodes.push(this.expr());
        }

        if (nodes[nodes.length - 1].type !== N.ProgEndExpr) {
            throw new Error('Parsing error: A Tabloid program MUST end with PLEASE LIKE AND SUBSCRIBE');
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
        } else if (next === T.TotallyRight) {
            return {
                type: N.BoolLiteral,
                val: true,
            }
        } else if (next === T.CompletelyWrong) {
            return {
                type: N.BoolLiteral,
                val: false,
            }
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
        } else if (next === T.RumorHasIt) {
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
        } else if (next === T.LParen) {
            // block, but guarded by parens, for binary exprs
            const exprs = [];
            while (this.tokens.hasNext() && this.tokens.peek() !== T.RParen) {
                exprs.push(this.expr());
            }
            this.tokens.expect(T.RParen);
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
        } else if (next === T.YouWontWantToMiss) {
            // print expr
            return {
                type: N.PrintExpr,
                val: this.expr(),
            }
        } else if (next === T.LatestNewsOn) {
            // input expr
            return {
                type: N.InputExpr,
                val: this.expr(),
            }
        }

        this.tokens.backstep();
        const atom = this.atom();
        if (BINARY_OPS.includes(this.tokens.peek())) {
            // infix binary ops
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
        const args = [this.expr()];
        while (this.tokens.peek() === T.Comma) {
            this.tokens.next(); // comma
            args.push(this.expr());
        }
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
         *  - input(s)
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
            case N.NumberLiteral:
            case N.StringLiteral:
            case N.BoolLiteral:
                return node.val;
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
                    case T.IsActually:
                        return left === right;
                    case T.And:
                        return left && right;
                    case T.Or:
                        return left || right;
                    case T.Plus:
                        return left + right;
                    case T.Minus:
                        return left - right;
                    case T.Times:
                        return left * right;
                    case T.DividedBy:
                        return left / right;
                    case T.Modulo:
                        return left % right;
                    case T.Beats:
                        return left > right;
                    case T.SmallerThan:
                        return left < right;
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
                if (!node.exprs.length) {
                    throw new Error('Runtime error: Empty expression group with no expressions');
                }

                let rv;
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
                let val = this.eval(node.val);
                // shim for boolean to-string's
                if (val === true) {
                    val = 'TOTALLY RIGHT';
                } else if (val === false) {
                    val = 'COMPLETELY WRONG';
                }
                this.runtime.print(val);
                return val;
            }
            case N.InputExpr: {
                let val = this.eval(node.val);
                // shim for boolean to-string's
                if (val === true) {
                    val = 'TOTALLY RIGHT';
                } else if (val === false) {
                    val = 'COMPLETELY WRONG';
                }
                return this.runtime.input(val);
            }
            default:
                console.log(JSON.stringify(node, null, 2));
                throw new Error(`Runtime error: Unknown AST Node of type ${
                    node.type.toString()
                }:\n${JSON.stringify(node, null, 2)}`);
        }
    }
}

