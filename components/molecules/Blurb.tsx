interface IProps { }


const Blurb = (props: IProps) => {
    const items: Array<IItem> = [
        {
            title: `professional team`,
            caption: `We are a team of professional traders in Forex & Crypto Exchange and Coins trading and Crypto Mining who know how to grab the profit end of the day.`,
            icon: `./assets/images/ctn-tf1.png`
        },
        {
            title: `ddos protection`,
            caption: `We are a team of professional traders in Forex & Crypto Exchange and Coins trading and Crypto Mining who know how to grab the profit end of the day.`,
            icon: `./assets/images/ctn-tf2.png`
        },
        {
            title: `comodo ssl security`,
            caption: `We are a team of professional traders in Forex & Crypto Exchange and Coins trading and Crypto Mining who know how to grab the profit end of the day.`,
            icon: `./assets/images/ctn-tf3.png`
        },
        {
            title: `ddos protection`,
            caption: `We are a team of professional traders in Forex & Crypto Exchange and Coins trading and Crypto Mining who know how to grab the profit end of the day.`,
            icon: `./assets/images/ctn-tf4.png`
        },
        {
            title: `ddos protection`,
            caption: `We are a team of professional traders in Forex & Crypto Exchange and Coins trading and Crypto Mining who know how to grab the profit end of the day.`,
            icon: `./assets/images/ctn-tf5.png`
        },
        {
            title: `ddos protection`,
            caption: `We are a team of professional traders in Forex & Crypto Exchange and Coins trading and Crypto Mining who know how to grab the profit end of the day.`,
            icon: `./assets/images/ctn-tf6.png`
        },
    ];

    return (
        <section>
            <h1 className={`text-yellow-500 text-md sm:text-2xl mb-5 text-center font-bold px-4 sm:px-0`}>WHY CHOOSE KRYPTOCASTLE INVESTMENTS</h1>
            <div className={`sm:px-32`}>
                <div className={`flex flex-row justify-evenly sm:justify-between w-full mb-6 sm:mb-14`}>
                    {items.slice(0, 2).map(e => (
                        <div className={`w-5/12`}>
                            <Item title={e.title} caption={e.caption} icon={e.icon} />
                        </div>
                    ))}
                </div>
                <div className={`flex flex-row justify-evenly sm:justify-between w-full mb-6 sm:mb-14`}>
                    {items.slice(2, 4).map(e => (
                        <div className={`w-5/12`}>
                            <Item title={e.title} caption={e.caption} icon={e.icon} />
                        </div>
                    ))}
                </div>
                <div className={`flex flex-row justify-evenly sm:justify-between w-full mb-6 sm:mb-14`}>
                    {items.slice(4, 6).map(e => (
                        <div className={`w-5/12`}>
                            <Item title={e.title} caption={e.caption} icon={e.icon} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

interface IItem {
    title: string;
    icon: string;
    caption: string;
}

const Item = (props: IItem) => {
    return (
        <div className={`flex flex-col sm:flex-row items-center`}>
            <div className={`w-3/12 mb-3 sm:mb-0 sm:w-4/12`}>
                <img src={props.icon} alt={props.title} />
            </div>
            <div className={`ml-8`}>
                <h3 className={`text-yellow-500 text-sm sm:text-lg uppercase mb-2`}>
                    {props.title}
                </h3>
                <div className={`text-xs text-white text-left sm:text-justify`}>
                    {props.caption}
                </div>
            </div>
        </div>
    );
}


export default Blurb;