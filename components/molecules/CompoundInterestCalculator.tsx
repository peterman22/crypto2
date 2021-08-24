import React from "react";

interface IProps { }

const CompoundInterestCalculator = (props: IProps) => {
    const [result, setResult] = React.useState(0);
    const amountRef = React.useRef(0);
    const percentageRef = React.useRef(5);
    const monthsRef = React.useRef(1);

    const calculateInterest = () => {
        const r: number = amountRef.current * (1 + percentageRef.current / 100) ** (monthsRef.current * 30);
        setResult(r);
    }

    return (
        <section className={`bg-gray-600 px-3 py-6 sm:py-10 flex flex-col items-center w-10/12 sm:w-3/12`}>
            <h1 className={`text-black text-xs font-bold uppercase flex flex-row justify-center`}>
                Compound interest calculator
            </h1>
            <div className={`my-6 flex flex-row justify-center w-full`}>
                <span className={`bg-gray-200 text-black font-semibold text-md w-10 flex flex-row items-center justify-center h-10`}>
                    $
                </span>
                <input onChange={e => { amountRef.current = parseFloat(e.currentTarget.value); calculateInterest(); }} className={`btn-no-outline text-sm pl-4`} type="number" />
            </div>
            <div className={`flex flex-col w-10/12 justify-between items-center`}>
                <select onChange={e => { percentageRef.current = parseFloat(e.currentTarget.value); calculateInterest(); }} className={`w-full btn-no-outline text-xs`}>
                    <option value="5">5% daily</option>
                    <option value="10">10% daily</option>
                    <option value="15">15% daily</option>
                    <option value="25">25% daily</option>
                </select>
                <div className={`mt-7 w-full flex flex-row`}>
                    <input onChange={e => { monthsRef.current = parseInt(e.currentTarget.value ?? 1); calculateInterest(); }} className={`w-8/12 pl-3 text-xs btn-no-outline`} type="number" min={1} max={12} step={1} />
                    <span className={`w-4/12 text-xxs bg-gray-200 h-8 flex flex-row justify-center items-center px-2`}>
                        MONTHS
                    </span>
                </div>
            </div>
            <div className={`mt-10 border border-yellow-500`} >
                <span className={`bg-gray-500 text-sm px-10`}>
                    ${isNaN(result) ? '0' : result.toLocaleString().slice(0, -1).length > 10 ? result.toPrecision() : result.toLocaleString().slice(0, -1)}
                </span>
            </div>
        </section>
    );
}

export default CompoundInterestCalculator;