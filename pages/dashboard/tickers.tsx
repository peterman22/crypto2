import axios from "axios";
import DashboardLayout from "components/layout/Dashboard";
import routes from "configs/routes";
import { IUserProfileSR } from "helpers/interfaces";
import useInterval from "helpers/useInterval";
import React from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { ssrCheckTokenValidity } from "services";
import { DashboardContentCard } from ".";

interface IProps {
    user: IUserProfileSR;
}

export const getServerSideProps = async (context: any) => {
    const tokenValidity = await ssrCheckTokenValidity(context);
    if (tokenValidity[0] == true) {
        console.log(tokenValidity[2])
        return {
            props: {
                user: tokenValidity[2]
            },
            ...tokenValidity[1]
        }
    }
    return {
        props: {},
        ...tokenValidity[1]
    }
}

const TickersPage = (props: IProps) => {
    const [currentRates, setCurrentRates] = React.useState({});
    const [prevRates, setPrevRates] = React.useState({});

    React.useEffect(() => {
        getRates();
        getRates();
    }, [0]);

    useInterval(() => getRates(), 10000);

    const getRates = async () => {
        const rates = await axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,DASH,LTC,DOGE,XLM,BNB,ADA,XRP,BCH,LINK&tsyms=USD')
            .then(res => res.data)
            .catch(err => {
                console.log('An error occurred while attempting to fetch tickers', err);
                return {};
            });

        if (Object.keys(rates).length == 0) {
            return;
        }

        setPrevRates(currentRates);
        setCurrentRates(rates);
    }

    const getDeposits = () => {
        return props.user.deposits.filter(d => d.status == 'active');
    }

    const profit = () => {
        let total = 0;
        getDeposits().forEach((d: any) => {
            const t = new Date().getTime() - new Date(d.createdAt).getTime();
            const e = t / (1000 * 3600 * 24);
            console.log(e)
            total += ((d.plan * d.amount) / 100) * e;
        });
        return total.toFixed(2);
    }

    const totalDeposits = (): number => {
        const deposits = getDeposits();
        return deposits.length > 0 ? deposits.reduce((a, b) => a + b.amount, 0) : 0;
    }


    const renderRates = () => {
        const rates: any = { ...currentRates };
        const prev: any = { ...prevRates };

        const percentage = (current: number, prev: number): [string, 'increase' | 'decrease'] => {
            if (current > prev) return [(((current - prev) / prev) * 100).toFixed(3), 'increase'];
            return [(((prev - current) / prev) * 100).toFixed(3), 'decrease'];
        }

        // const loader = <div className={`w-full bg-white flex flex-grow flex-row justofy-center py-10`}><img style={{ width: 40 }} src={`/assets/images/ellipsis-spinner.svg`} alt={`loading...`} /></div>
        const loader = '';

        if (Object.keys(currentRates).length == 0) return loader;
        if (Object.keys(prevRates).length == 0) return loader;

        return (
            <tbody className={`bg-white text-center text-xxs text-gray-500`}>
                {
                    Object.keys(currentRates).map(R => {
                        return (
                            <tr className={`mb-2 border-b border-gray-200`}>
                                <td className={`py-2`}>
                                    {R}
                                </td>
                                <td>
                                    {rates[R]['USD']}
                                </td>
                                <td>
                                    {prev[R]['USD']}
                                </td>
                                <td>
                                    {
                                        (() => {
                                            const p = percentage(rates[R]['USD'], prev[R]['USD']);
                                            if (p[1] == 'increase') {
                                                return (
                                                    <span className={`flex flex-row items-center justify-center`}>
                                                        {`${p[0]}%`}<FaCaretUp className={`ml-1`} color={`green`} />
                                                    </span>
                                                );
                                            }

                                            return (
                                                <span className={`flex flex-row items-center justify-center`}>
                                                    {`${p[0]}%`}<FaCaretDown className={`ml-1`} color={`red`} />
                                                </span>
                                            );
                                        })()
                                    }
                                </td>
                            </tr>
                        );
                    })
                }
            </tbody>
        );
    }

    return (
        <DashboardLayout overflow={false} user={props.user} title={`Tickers | KryptoCastle Investments Ltd.`}>
            <div className={`flex flex-col px-8 pt-6 h-full overflow-y-scroll`} style={{ background: `#efefef` }}>
                <div className="w-full">
                    <DashboardContentCard className={`mb-4`}>
                        <div className="flex flex-row justify-between items-center">
                            <span className={`text-xxs uppercase text-gray-400`}>
                                Wallet
                                <span className={`sm:hidden mx-1`}>bal.</span>
                                <span className={`hidden sm:inline mx-1`}>balance</span>
                                ${(profit() + totalDeposits())}
                            </span>
                            <a href={routes.createDeposit} className="btn-no-outline-px-4 hover:bg-green-300 transition duration-100 cursor-pointer text-green-500 py-1 border border-green-400 px-2 bg-green-200 uppercase text-xxs rounded-lg">
                                <span className={`hidden sm:inline`}>
                                    create investment
                                </span>
                                <span className={`sm:hidden px-3 inline`}>
                                    invest
                                </span>
                            </a>
                        </div>
                    </DashboardContentCard>
                    <div className={`rounded-t-lg bg-blue-100`} style={{ padding: 1 }}>
                        <table className={`w-full rounded-lg`}>
                            <thead className={`py-10 ticker-table-header`}>
                                <th className={`text-gray-500 uppercase py-2`}>
                                    currency
                                </th>
                                <th className={`text-gray-500 uppercase py-2`}>
                                    price (usd)
                                </th>
                                <th className={`text-gray-500 uppercase py-2`}>
                                    <span className={`hidden sm:inline`}>price (60 seconds ago)</span>
                                    <span className={`inline sm:hidden`}>price (60 secs. ago)</span>
                                </th>
                                <th className={`text-gray-500 uppercase py-2`}>
                                    status
                                </th>
                            </thead>
                            {renderRates()}
                        </table>
                        {
                            Object.keys(currentRates).length == 0 || Object.keys(prevRates).length == 0
                                ?
                                <div className={`w-full bg-white flex flex-grow flex-row justify-center py-10`}><img style={{ width: 50, borderRadius: 1000 }} src={`/assets/images/ellipsis-spinner.svg`} alt={`loading...`} /></div>
                                : null
                        }
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default TickersPage;