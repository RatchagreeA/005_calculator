import "./App.scss";
import { useState } from "react";

function App() {
    const [formula, setFormula] = useState("");
    const [curVal, setCurVal] = useState("0");
    const [prevVal, setPrevVal] = useState("");
    const [evalStatus, setEvalStatus] = useState(false);

    const maxDigitWarning = () => {
        let tmpVal = curVal;
        setCurVal("Digit Limit Met");
        setTimeout(() => setCurVal(tmpVal), 1000);
        setPrevVal(curVal);
    };
    const clear = () => {
        setFormula("");
        setCurVal("0");
        setPrevVal("0");
        setEvalStatus(false);
    };
    const evaluated = () => {
        let tmpFormula = formula.replace("--", "+0+0+0+0+0+0+");
        while (endsWithOperator.test(tmpFormula)) {
            tmpFormula = tmpFormula.slice(0, -1);
        }
        const result =
            Math.round(1000000000000 * eval(tmpFormula)) / 1000000000000;
        tmpFormula = formula.replace("+0+0+0+0+0+0+", "--");
        const textResult = result.toString();
        setCurVal(textResult);
        setFormula(tmpFormula + "=" + textResult);
        setEvalStatus(true);
        setPrevVal(textResult);
    };

    const handleOperators = (val) => {
        setCurVal(val);
        if (evalStatus) {
            setFormula(prevVal + val);
            setEvalStatus(false);
        } else if (!endsWithOperator.test(formula)) {
            setFormula(formula + val);
            setPrevVal(formula);
        } else if (!endsWithNegativeSign.test(formula)) {
            if (endsWithNegativeSign.test(formula + val)) {
                setFormula(formula + val);
            } else {
                setFormula(prevVal + val);
            }
        } else if (val !== "-") {
            setFormula(prevVal + val);
        }
    };
    const handleNumbers = (val) => {
        if (evalStatus) {
            if (val === "0") {
                setFormula("");
            } else {
                setFormula(val);
            }
            setCurVal(val);
            setEvalStatus(false);
        } else {
            if (curVal.length > 21) {
                maxDigitWarning();
            } else {
                if (isOperator.test(curVal) || curVal === "0") {
                    setCurVal(val);
                } else {
                    setCurVal(curVal + val);
                }
                if (val === "0" && curVal === "0") {
                    if (formula === "") {
                        setFormula("0");
                    } else {
                        setFormula(formula);
                    }
                } else {
                    if (/([^.0-9]0|^0)$/.test(formula)) {
                        setFormula(formula.slice(0, -1) + val);
                    } else {
                        setFormula(formula + val);
                    }
                }
            }
        }
    };
    const handleDecimal = (val) => {
        if (evalStatus) {
            setFormula("0" + val);
            setCurVal("0" + val);
            setEvalStatus(false);
        } else {
            if (curVal.length > 21) {
                maxDigitWarning();
            } else {
                if (curVal.includes(".")) {
                    setCurVal(curVal);
                    setFormula(formula);
                } else {
                    setCurVal(curVal + val);
                    if (formula === "" || endsWithOperator.test(formula)) {
                        setFormula(formula + "0" + val);
                    } else {
                        setFormula(formula + val);
                    }
                }
            }
        }
    };

    const handleOnClick = (e) => {
        if (!curVal.includes("Limit")) {
            const val = e.target.value;
            if (isOperator.test(val)) {
                handleOperators(val);
            } else if (isNumbers.test(val)) {
                handleNumbers(val);
            } else if (isDeci.test(val)) {
                handleDecimal(val);
            } else if (isClear.test(val)) {
                clear();
            } else if (isEvaluated.test(val)) {
                evaluated();
            } else {
                //pass
            }
        }
    };
    return (
        <div className="App">
            <div className="calculator">
                <FormulaScreen formula={formula.replace(/\*/g, "⋅")} />
                <Display curVal={curVal} />
                <KeyPad handleOnClick={handleOnClick} />
            </div>
        </div>
    );
}

export default App;

function FormulaScreen({ formula }) {
    return <div className="formulaScreen">{formula}</div>;
}
function Display({ curVal }) {
    return (
        <div id="display" className="displayScreen">
            {curVal}
        </div>
    );
}
function KeyPad({ handleOnClick }) {
    return (
        <div className="keypad">
            {btns.map((btn) => (
                <button
                    id={btn.id}
                    className={btn.class}
                    value={btn.val}
                    style={{ gridArea: btn.id }}
                    onClick={handleOnClick}
                >
                    {btn.val}
                </button>
            ))}
        </div>
    );
}
const isOperator = /[\*/+-]/;
const isNumbers = /[0-9]/;
const isClear = /AC/;
const isDeci = /\./;
const isEvaluated = /\=/;
const endsWithOperator = /[\*+-/]$/;
const endsWithNegativeSign = /\d[\*/+-]{1}-$/;

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
    { id: "multiply", val: "*", class: "oper" },
    { id: "divide", val: "/", class: "oper" },
    { id: "equals", val: "=", class: "equal" },
    { id: "decimal", val: ".", class: "num" },
    { id: "clear", val: "AC", class: "clear" },
];
