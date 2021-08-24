import DashboardLayout from "components/layout/Dashboard";
import routes from "configs/routes";
import { IUserProfileSR, IWithdrawalSR } from "helpers/interfaces";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FaDotCircle } from "react-icons/fa";
import { ssrCheckTokenValidity } from "services";
import { DashboardContentCard } from "..";

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

const WithdrawalsIndexPage = (props: IProps) => {
    const [withdrawals, setWithdrawals] = React.useState<Array<IWithdrawalSR>>([]);
    const router = useRouter();

    React.useEffect(() => {
        setWithdrawals(props.user.withdrawals);
    }, []);

    const getPayouts = () => props.user.withdrawals.filter(d => d.status == 'paid');

    const getDeposits = () => {
        return props.user.deposits.filter(d => d.status == 'active');
    }

    const withdrawableBalance = () => {
        let total = 0;

        getDeposits().forEach((d: any) => {
            const t = new Date(d.createdAt).getTime();
            const now = new Date().getTime();

            const diff = (now - t) / (1000 * 3600 * 24 * 30);
            const plans: any = {
                10: [6, 12],
                15: [5, 8],
                25: [3, 6]
            }

            if (diff >= plans[d.plan][0] && diff <= plans[d.plan][1]) {
                total += d.amount;
            }
        });

        return total;
    }

    return (
        <DashboardLayout overflow={false} user={props.user} title={`Withdrawals | KryptoCastle Investments Ltd.`}>
            <div className={`flex flex-col px-8 pt-6 h-full overflow-y-scroll`} style={{ background: `#efefef` }}>
                <div className={`w-full flex flex-col items-center justify-center`}>
                    {
                        props.user.withdrawals.length == 0 ? (
                            <>
                                <div className={`w-48 flex justify-center items-center`}>
                                    <img src={`/assets/images/piggy-bank.png`} alt={`picture-of-a-piggy-bank`} />
                                </div>
                                <div>
                                    <h1 className={`text-yellow-600 font-bold kalam uppercase`} style={{ fontSize: `2rem` }}>
                                        Oh, no! You do not have any payouts.
                                    </h1>
                                    {
                                        withdrawableBalance() > 10 ? <div className={`flex flex-row mt-8 sm:mt-0 justify-center`}>
                                            <Link href={routes.createDeposit}>
                                                <a className="btn-no-outline-px-4 hover:bg-blue-300 transition duration-100 cursor-pointer text-blue-500 py-2 border border-blue-400 px-4 bg-blue-200 uppercase text-xs rounded-lg">
                                                    Request one now
                                                </a>
                                            </Link>
                                        </div> : <div className={`sm:flex hidden flex-row mt-8 sm:mt-0 justify-center uppercase text-gray-500`}>
                                            You will be able to request a payout once your withdrawable balance reaches $10
                                        </div>
                                    }
                                </div>
                            </>
                        )
                            : (
                                <>
                                    <div className="w-full">
                                        <DashboardContentCard className={`mb-4`}>
                                            <div className="flex flex-row justify-between items-center w-full">
                                                <span className={`text-xxs uppercase font-bold text-red-400`}>
                                                    withdrawable balance: ${withdrawableBalance()}
                                                </span>
                                                {
                                                    withdrawableBalance() >= 0 ? <button onClick={() => router.push(routes.requestWithdrawal)} disabled={withdrawableBalance() < 0} className={`btn-no-outline px-4 flex flex-row items-center hover:bg-${withdrawableBalance() <= 0 ? 'gray' : 'green'}-300 transition duration-100 cursor-pointer text-${withdrawableBalance() <= 0 ? 'gray' : 'green'}-500 py-1 border border-${withdrawableBalance() <= 0 ? 'gray' : 'green'}-400 px-2 bg-${withdrawableBalance() <= 0 ? 'gray' : 'green'}-200 uppercase text-xxs rounded-lg`}>
                                                        request withdrawal
                                                    </button> :
                                                        <div className={`text-xxs hidden sm:block text-red-400`}>
                                                            You will be ale to request a payout once your<br /> withdrawable balance reaches $10
                                                        </div>
                                                }
                                            </div>
                                        </DashboardContentCard>
                                        <div className={`text-xxs sm:hidden block mb-2 text-red-400`}>
                                            You will be ale to request a payout once your<br /> withdrawable balance reaches $10
                                        </div>
                                        <div className="bg-white py-2 px-4 rounded-md overflow-x-scroll sm:overflow-hidden">
                                            <div className={`mb-3 text-xxs uppercase text-gray-500`}>
                                                withdrawals
                                            </div>
                                            <table className={`w-full border`}>
                                                <thead className={`text-gray-500 bg-gray-100 uppercase ticker-table-header`}>
                                                    <tr className={`divide-x divide-gray-200`}>
                                                        <th className={`py-1 text-left pl-2`}>SN</th>
                                                        <th className={`py-1 text-left pl-2`}>date requested</th>
                                                        <th className={`py-1 text-left pl-2`}>amount</th>
                                                        <th className={`py-1 text-left pl-2`}>date approved</th>
                                                        <th className={`py-1 text-left pl-2`}>status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        props.user.withdrawals.map((d, i) => (
                                                            <tr key={d.id} className={`py-1 cursor-pointer transition duration-750 hover:bg-gray-50 border-b border-gray-200 text-xxs text-gray-500 text-left divide-x uppercase`}>
                                                                <td className={`pl-2 pt-2 pb-1`}>{i + 1}</td>
                                                                <span className="sm:hidden">
                                                                    {new Date(d.createdAt).getDate()}/{new Date(d.createdAt).getMonth()}/{new Date(d.createdAt).getFullYear()}
                                                                </span>
                                                                <td className={`pl-2 pt-2 pb-1`}>${d.amount}</td>
                                                                <td className={`pl-2 pt-2 pb-1`}>{d.status == 'paid' ? new Date(d.updatedAt).toDateString() : '-'}</td>
                                                                <td className={`pl-2 pt-2 pb-1`}>
                                                                    {d.status == 'paid'
                                                                        ?
                                                                        <div className={`flex flex-row items-center`}><FaDotCircle size={13} color={`lightgreen`} className={`mr-1`} /> <span className={``}>{d.status}</span></div>
                                                                        :
                                                                        <div className={`flex flex-row items-center`}><FaDotCircle size={13} color={`red`} className={`mr-1`} /> <span className={``}>{d.status}</span></div>
                                                                    }
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </>
                            )
                    }
                </div>
            </div>
        </DashboardLayout>
    );
}

export default WithdrawalsIndexPage;