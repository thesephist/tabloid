const prog = `
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

PLEASE LIKE AND SUBSCRIBE
`;

const Runtime = {
    print(s) {
        console.log(s.toString());
    }
}

// main
try {
    const tokens = tokenize(prog);
    const nodes = new Parser(tokens).parse();
    const env = new Environment(Runtime);
    env.run(nodes);
} catch (e) {
    console.error(e);
}

const {
    Component,
} = window.Torus;

class Editor extends Component {
    init() {
        this.val = '';
    }
    compose() {

    }
}

class App extends Component {
    compose() {
        return jdom`<main>
            <h1>Tabloid</h1>
            <p class="subtitle">The Clickbait Headline Programming Language</p>
        </main>`;
    }
}

const app = new App();
document.body.appendChild(app.node);
