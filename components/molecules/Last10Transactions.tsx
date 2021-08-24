interface IProps { }

interface IItem {
    title: string;
    icon: string;
    values: Array<IValue>
}
interface IValue {
    title: string;
    amount: number;
}
const Item = (props: IItem) => {
    return (
        <div className={`bg-yellow-500 rounded-3xl w-10/12 sm:w-5/12 mb-8 sm:mb-0`}>
            <div className={`h-12 flex flex-row items-center justify-between px-10 uppercase text-sm font-bold`}>
                <span>
                    {props.title}
                </span>
                <span>
                    <img src={props.icon} alt={props.title} />
                </span>
            </div>
            <div className={`bg-gray-800 py-2 rounded-b-3xl`} style={{ margin: 2 }}>
                {props.values.map(e => (
                    <div className={`flex flex-row justify-around text-white text-sm py-1`}>
                        <span>
                            {e.title}
                        </span>
                        <span>
                            ${e.amount}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}


const Last10Transactions = (props: IProps) => {
    return (
        <section className={`flex flex-col items-center sm:flex-row sm:justify-around`}>
            <Item title={`last 10 deposits`} icon={`./assets/images/ctn-ic5.png`} values={[{ title: 'John Doe', amount: 100 }]} />
            <Item title={`last 10 withdrawals`} icon={`./assets/images/ctn-ic6.png`} values={[{ title: 'John Doe', amount: 100 }]} />
        </section>
    );
}

export default Last10Transactions;