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

export default KeyPad;
