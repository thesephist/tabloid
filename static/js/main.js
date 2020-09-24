const PROG_DEFAULT = `DISCOVER HOW TO factorial WITH n
WE SAID
    WHAT IF n IS ACTUALLY 0
    WE SAID
        SHOCKING DEVELOPMENT 1
    END OF STORY
    LIES! WE SAID
        SHOCKING DEVELOPMENT n MULTIPLY factorial OF n SUBTRACT 1
    END OF STORY
END OF STORY

EXPERTS CLAIM result TO BE factorial OF 10
YOU WON'T WANT TO MISS 'RESULT IS'
YOU WON'T WANT TO MISS result

PLEASE LIKE AND SUBSCRIBE`;

const HEADLINES = [
    `You Won't Believe What This Programming Language Can Do!`,
    `The Best Programming Language You Haven't Heard Of (It Will Surprise You!)`,
    `Shocking New Programming Language Bewilders Programmers at Google and Facebook!`,
    `Programmer Who Made Everything Now Predicts the Next Big Language!`,
    `The Secret Programming Language Every 10x Programmer Recommends!`,
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
        this.handleReset = () => {
            this.prog = PROG_DEFAULT;
            this.render();
        }
        this.handleInput = evt => {
            this.prog = evt.target.value;
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
                    this.output += s.toString() + '\n';
                    this.render();
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
                ${this.prog === PROG_DEFAULT ? null : 
                    jdom`<button class="block"
                        onclick=${this.handleReset}>Reset</button>`}
                <button class="accent block"
                    onclick=${this.handleRun}>Run!</button>
            </div>
            <div class="code">
                <div class="filler">
                    ${this.prog.split('\n')
                        .map(line => jdom`<p>${line.trim() ? line : '-'}</p>`)}
                </div>
                <textarea class="editor-input" cols="30" rows="10"
                    value=${this.prog}
                    oninput=${this.handleInput}>
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
                    <a href="https://dotink.co/posts/tabloid/"
                        target="_blank" noopener noreferer>Blog post</a>
                </nav>
                <p class="subtitle">
                    <strong class="lang fixed inline block">Tabloid:</strong> The Clickbait Headline Programming Language
                </p>
            </header>
            ${this.editor.node}
            <h2>What?</h2>
            <h2>But why?</h2>
            <h2>Does it actually work?</h2>
            <footer>
                <p>
                    Tabloid is a project by
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
