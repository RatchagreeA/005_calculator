import "./App.scss";
import { useState, useEffect } from "react";

function App() {
    const [formular, setFormular] = useState("");
    const [curVal, setCurVal] = useState("0");
    const [prevVal, setPrevVal] = useState("");
    const [evalStatus, setEvalStatus] = useState(false);

    const maxDigitWarning = () => {
        let tmpVal = curVal;
        setCurVal("Digit Limit Met");
        setTimeout(() => setCurVal(tmpVal), 1000);
    };
    const clear = () => {
        setFormular("");
        setCurVal("");
        setEvalStatus(false);
    };
    const evaluated = () => {
        const result = eval(formular).toString();
        setCurVal(result);
        setFormular(formular + "=" + result);
        setEvalStatus(true);
        setPrevVal(result);
    };

    const handleNumbers = (e) => {
        const val = e.target.value;

        if (!curVal.includes("Limit")) {
            if (val === "AC") {
                clear();
            } else if (evalStatus) {
                if (isOperator.test(val)) {
                    setFormular(prevVal + val);
                    setCurVal(val);
                } else {
                    setFormular(val);
                    setCurVal(val);
                }
                setEvalStatus(false);
            } else if (val === "=") {
                evaluated();
            } else {
                if (curVal.length > 21 || formular.length > 21) {
                    maxDigitWarning();
                } else if (isOperator.test(val)) {
                    if (endsWithOperator.test(formular)) {
                        setFormular(formular.slice(0, -1) + val);
                        setCurVal(val);
                    } else {
                        setFormular(formular + val);
                        setCurVal(val);
                    }
                } else {
                    if (isOperator.test(curVal) || curVal === "0") {
                        setCurVal(val);
                    } else {
                        setCurVal(curVal + val);
                    }
                    if (val === "0" && curVal === "0") {
                        setFormular(formular);
                    } else {
                        setFormular(formular + val);
                    }
                }
            }
        }
    };
    return (
        <div className="App">
            <div className="calculator">
                <FormularScreen formular={formular.replace(/x/g, "⋅")} />
                <Display curVal={curVal} />
                <KeyPad handleNumbers={handleNumbers} />
            </div>
        </div>
    );
}

export default App;

function FormularScreen({ formular }) {
    return <div className="formularScreen">{formular}</div>;
}
function Display({ curVal }) {
    return (
        <div id="display" className="displayScreen">
            {curVal}
        </div>
    );
}
function KeyPad({ handleNumbers }) {
    return (
        <div className="keypad">
            {btns.map((btn) => (
                <button
                    id={btn.id}
                    className={btn.class}
                    value={btn.val}
                    style={{ gridArea: btn.id }}
                    onClick={handleNumbers}
                >
                    {btn.val}
                </button>
            ))}
        </div>
    );
}
const isOperator = /[x/+-]/;
const endsWithOperator = /[x+-/]$/;
const endsWithNegativeSign = /\d[x/+-]{1}-$/;

const btns = [
    { id: "zero", val: "0", class: "num" },
    { id: "one", val: "1", class: "num" },
    { id: "two", val: "2", class: "num" },
    { id: "three", val: "3", class: "num" },
    { id: "four", val: "4", class: "num" },
    { id: "five", val: "5", class: "num" },
    { id: "six", val: "6", class: "num" },
    { id: "seven", val: "7", class: "num" },
    { id: "eight", val: "8", class: "num" },
    { id: "nine", val: "9", class: "num" },
    { id: "add", val: "+", class: "oper" },
    { id: "subtract", val: "-", class: "oper" },
    { id: "multiply", val: "x", class: "oper" },
    { id: "divide", val: "/", class: "oper" },
    { id: "equals", val: "=", class: "equal" },
    { id: "decimal", val: ".", class: "num" },
    { id: "clear", val: "AC", class: "clear" },
];
