const PROG_DEFAULT = `
DISCOVER HOW TO factorial WITH n
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
    }
    eval() {
        this.output = '';
        try {
            const tokens = tokenize(this.prog);
            const nodes = new Parser(tokens).parse();
            const env = new Environment({
                print: s => {
                    this.output += s.toString();
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
                <button class="accent block"
                    onclick=${this.handleRun}>Run!</button>
            </div>
            <div class="code">
                <textarea cols="30" rows="10"
                    value=${this.prog}
                    oninput=${this.handleInput}>
                </textarea>
            </div>
            <div class="result">
                <div class="output">
                    ${this.output.split('\n').map(line => jdom`<code>${line}</code>`)}
                </div>
                <div class="errors">
                    ${this.errors.split('\n').map(line => jdom`<code>${line}</code>`)}
                </div>
            </div>
        </div>`;
    }
}

class App extends Component {
    init() {
        this.editor = new Editor();
    }
    compose() {
        return jdom`<main>
            <h1>Tabloid</h1>
            <p class="subtitle">The Clickbait Headline Programming Language</p>
            ${this.editor.node}
        </main>`;
    }
}

const app = new App();
document.body.appendChild(app.node);
