const PROG_FACTORIAL = `YOU WON'T WANT TO MISS 'Hello, World!'

DISCOVER HOW TO factorial WITH n
RUMOR HAS IT
    WHAT IF n IS ACTUALLY 0
        SHOCKING DEVELOPMENT 1
    LIES!
        SHOCKING DEVELOPMENT
            n TIMES factorial OF n MINUS 1
END OF STORY

EXPERTS CLAIM result TO BE factorial OF 10
YOU WON'T WANT TO MISS 'Result is'
YOU WON'T WANT TO MISS result

PLEASE LIKE AND SUBSCRIBE`;

const PROG_FIBONACCI = `DISCOVER HOW TO fibonacci WITH a, b, n
RUMOR HAS IT
    WHAT IF n SMALLER THAN 1
        SHOCKING DEVELOPMENT b
    LIES! RUMOR HAS IT
        YOU WON'T WANT TO MISS b
        SHOCKING DEVELOPMENT
            fibonacci OF b, a PLUS b, n MINUS 1
    END OF STORY
END OF STORY

EXPERTS CLAIM limit TO BE 10
YOU WON'T WANT TO MISS 'First 10 Fibonacci numbers'
EXPERTS CLAIM nothing TO BE fibonacci OF 0, 1, limit

PLEASE LIKE AND SUBSCRIBE`;

const PROG_DEFAULT = PROG_FIBONACCI;

const HEADLINES = [
    `You Won't Believe What This Programming Language Can Do!`,
    `The Best Programming Language You Haven't Heard Of (It Will Surprise You!)`,
    `Shocking New Programming Language Bewilders Programmers at Google and Facebook!`,
    `Programmer Who Made Everything Now Predicts the Next Big Language!`,
    `The Secret Programming Language Every 10x Programmer Recommends!`,
    `Programmers at Microsoft Hate This One Trick to Get Good at that Code Thing!`,
    `How To Lose Brain Fat With This Programming Language!`,
    `Your Friends Will Be Jealous About This New Programming Language!`,
    `You Can Earn Millions With This Programming Language!`,
    `The Cure For Cancer Could Be Found With The Programming Language!`
];

function randomHeadline() {
    return HEADLINES[~~(Math.random() * HEADLINES.length)];
}

const {
    Component,
} = window.Torus;

class Editor extends Component {
    init() {
        this.prog = PROG_DEFAULT;
        // script appends to it
        this.output = '';
        this.errors = '';

        this.handleRun = () => this.eval();
        this.handleInput = evt => {
            this.prog = evt.target.value;
            this.render();
        }
        this.handleKeydown = evt => {
            if (evt.key === 'Tab') {
                evt.preventDefault();
                const idx = evt.target.selectionStart;
                if (idx !== null) {
                    const front = this.prog.substr(0, idx);
                    const back = this.prog.substr(idx);
                    this.prog = front + '    ' + back;
                    this.render();
                    evt.target.setSelectionRange(idx + 4, idx + 4);
                }
            }
        }
        this.setFactorial = () => {
            this.prog = PROG_FACTORIAL;
            this.output = this.errors = '';
            this.render();
        }
        this.setFibonacci= () => {
            this.prog = PROG_FIBONACCI;
            this.output = this.errors = '';
            this.render();
        }
    }
    eval() {
        this.output = '';
        this.errors = '';
        try {
            const tokens = tokenize(this.prog);
            const nodes = new Parser(tokens).parse();
            const env = new Environment({
                print: s => {
                    this.output += s.toString().toUpperCase() + '!\n';
                    this.render();
                },
                input: s => {
                    return prompt(s);
                },
            });
            env.run(nodes);
        } catch (e) {
            this.errors = e.toString();
        }
        this.render();
    }
    compose() {
        return jdom`<div class="editor fixed block">
            <div class="controls">
                <button class="block"
                    onclick=${this.setFibonacci}>Fibonacci <span class="desktop">sample</span></button>
                <button class="block"
                    onclick=${this.setFactorial}>Factorial <span class="desktop">sample</span></button>
                <button class="accent block"
                    onclick=${this.handleRun}>Run<span class="desktop"> this</span>!</button>
            </div>
            <div class="code">
                <div class="filler">
                    ${this.prog.split('\n')
                        .map(line => jdom`<p>${line.trim() ? line : '-'}</p>`)}
                </div>
                <textarea class="editor-input" cols="30" rows="10"
                    value=${this.prog}
                    oninput=${this.handleInput}
                    onkeydown=${this.handleKeydown}>
                </textarea>
            </div>
            <div class="output">
                ${this.output ? this.output
                    .split('\n')
                    .map(line => jdom`<code class="output-line">${line}</code>`)
                    : jdom`<code class="no-output">No output.</code>`}
            </div>
            ${this.errors ? jdom`<div class="errors">
                ${this.errors.split('\n').map(line => jdom`<code>${line}</code>`)}
            </div>` : null}
        </div>`;
    }
}

class App extends Component {
    init() {
        this.editor = new Editor();
    }
    compose() {
        return jdom`<main>
            <header>
                <h1>${randomHeadline()}</h1>
                <nav>
                    <a href="https://github.com/thesephist/tabloid"
                        target="_blank" noopener noreferer>GitHub</a>
                    <a href="#" onclick=${evt => {
                        evt.preventDefault();
                        this.render();
                    }}>NEW headline!</a>
                    <a href="https://github.com/thesephist/tabloid/blob/master/README.md#language-overview"
                        target="_blank" noopener noreferer>Tutorial</a>
                </nav>
                <p class="subtitle">
                    <strong class="lang fixed inline block">Tabloid:</strong> The Clickbait Headline Programming Language
                </p>
            </header>
            ${this.editor.node}
            <h2>What?</h2>
            <p>
                <strong>Tabloid</strong> is a turing-complete programming
                language for writing programs in the style of clickbait news
                headlines.
            </p>
            <p>
                Here are <strike>a few things</strike>${' '}<strong>the Top Five
                Most Popular Quirks and Features</strong> of the Tabloid
                programming language <strong>(Number Four Will Shock You!)</strong>
            </p>
            <ul>
                <li>
                    Print output with the keywords <code class="inline
                    fixed block">YOU WON'T WANT TO MISS</code> followed by an
                    expression. Everything printed by Tabloid is
                    <strong>automatically capitalized, and an exclamation point is
                    added.</strong> Why would you want anything else?
                </li>
                <li>
                    Declare a function by writing <code class="inline fixed
                    block">DISCOVER HOW TO ... WITH</code>. Truly, a more
                    gripping way to declare a function can't possibly exist!
                    Similarly, assign to a variable with <code class="inline fixed
                    block">EXPERTS CLAIM ... TO BE</code>. On the Internet,
                    anyone can be an expert, and Tabloid gives YOU the power to
                    wield that responsibility and declare anything you'd like!
                </li>
                <li>
                    There are <strong>no built-in constructs for looping</strong>. The news
                    cycle is moving too fast! Nobody has time for yesterday's
                    loops or last week's break statements. If you must loop,
                    use recursion.
                </li>
                <li>
                    To return from a function, simply write <code class="inline
                    fixed block">SHOCKING DEVELOPMENT</code>! You're going
                    to—gasp!—<strong>return</strong>? How shocking!
                </li>
                <li>
                    Every program must end with <code
                    class="inline fixed block">PLEASE LIKE AND
                    SUBSCRIBE</code>, because you have to grow your audience! <strong>Hashtag hustle</strong>.
                </li>
            </ul>
            <h2>But why?</h2>
            <p>
                Didn't want to do homework for my
                <a href="https://cs186berkeley.net/" target="_blank">database
                systems class</a>, and needed something to do to procrastinate.
                Will I finish the homework? Did I get enough sleep?
            </p>
            <p>Stay tuned to find out!</p>
            <h2>Does it actually work?</h2>
            <p>
                Yes. Tabloid is a <strong>fully functioning, Turing complete
                programming language with an interpreter</strong> written in
                JavaScript.  Tabloid currently only supports numbers, strings,
                and booleans, but with these elements, you can write any
                program you'd want to write. You can edit and run the program
                above, or <a href="https://github.com/thesephist/tabloid">see
                how it works for yourself</a>.
            </p>
            <p>
                Besides this online interpreter, Tabloid now also has a mostly
                compatible <a href="https://github.com/otherjoel/tabloid"
                target="_blank">implementation in Racket</a> and a small <a
                href="https://github.com/MarcelloTheArcane/tabloid-samples"
                target="_blank">library of helper functions</a> ... for some
                reason.
            </p>
            <p>
                Before making Tabloid, I also created a more <strike>useful and
                well-designed</strike>${' '}<strong>boring and unpopular</strong>
                programming language, called <a href="https://dotink.co/"
                target="_blank">Ink</a>.
            </p>
            <h2>How much is there?</h2>
            <p>Here's the full list of standard keywords that Tabloid currently uses:</p>
            <ul>
                <li>
                    <code class="inline fixed block">DISCOVER HOW TO...WITH</code>
                    declare a function
                </li>
                <li>
                    <code class="inline fixed block">RUMOR HAS IT</code>
                    begin a block scope
                </li>
                <li>
                    <code class="inline fixed block">A OF B, C</code>
                    call function A with arguments B, C
                </li>
                <li>
                    <code class="inline fixed block">WHAT IF...LIES!</code>
                    an if-else expression
                </li>
                <li>
                    <code class="inline fixed block">END OF STORY</code>
                    end a block scope
                </li>
                <li>
                    <code class="inline fixed block">EXPERTS CLAIM...TO BE</code>
                    declare or assign to a variable
                </li>
                <li>
                    <code class="inline fixed block">YOU WON'T WANT TO MISS</code>
                    print output
                </li>
                <li>
                    <code class="inline fixed block">LATEST NEWS ON</code>
                    take user input
                </li>
                <li>
                    <code class="inline fixed block">TOTALLY RIGHT</code>
                    true
                </li>
                <li>
                    <code class="inline fixed block">COMPLETELY WRONG</code>
                    false
                </li>
                <li>
                    <code class="inline fixed block">AND</code>,
                    <code class="inline fixed block">OR</code>
                    and/or boolean operators
                </li>
                <li>
                    <code class="inline fixed block">PLUS</code>,
                    <code class="inline fixed block">MINUS</code>,
                    <code class="inline fixed block">TIMES</code>,
                    <code class="inline fixed block">DIVIDED BY</code>,
                    <code class="inline fixed block">MODULO</code>
                    the obvious arithmetic operations
                </li>
                <li>
                    <code class="inline fixed block">IS ACTUALLY</code>
                    is equal to
                </li>
                <li>
                    <code class="inline fixed block">BEATS</code>,
                    <code class="inline fixed block">SMALLER THAN</code>
                    greater than / less than
                </li>
                <li>
                    <code class="inline fixed block">SHOCKING DEVELOPMENT</code>
                    return from a function
                </li>
                <li>
                    <code class="inline fixed block">PLEASE LIKE AND SUBSCRIBE</code>
                    end of program
                </li>
            </ul>
            <footer>
                <p>
                    Tabloid is an overnight hack by
                    <a href="https://thesephist.com/">@thesephist</a>,
                    website built with
                    <a href="https://github.com/thesephist/torus">Torus</a>
                    and
                    <a href="https://thesephist.github.io/blocks.css/">blocks.css</a>.
                </p>
            </footer>
        </main>`;
    }
}

const app = new App();
document.body.appendChild(app.node);
