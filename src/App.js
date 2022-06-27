import "./App.scss";

function App() {
    return (
        <div className="App">
            <div className="calculator">
                <div className="keypad">
                    {btns.map((btn) => (
                        <button
                            id={btn.id}
                            value={btn.val}
                            style={{ gridArea: btn.id }}
                        >
                            {btn.val}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;

function KeyPAd() {
    return <div>{}</div>;
}

function Key() {
    return (
        <div>
            <button>{}</button>
        </div>
    );
}

const btns = [
    { id: "zero", val: "0" },
    { id: "one", val: "1" },
    { id: "two", val: "2" },
    { id: "three", val: "3" },
    { id: "four", val: "4" },
    { id: "five", val: "5" },
    { id: "six", val: "6" },
    { id: "seven", val: "7" },
    { id: "eight", val: "8" },
    { id: "nine", val: "9" },
    { id: "add", val: "+" },
    { id: "subtract", val: "-" },
    { id: "multiply", val: "X" },
    { id: "divide", val: "/" },
    { id: "equals", val: "=" },
    { id: "decimal", val: "." },
    { id: "clear", val: "AC" },
];
