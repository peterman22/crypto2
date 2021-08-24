import DashboardLayout from "components/layout/Dashboard";
import routes from "configs/routes";
import { IDepositSR, IUserProfileSR } from "helpers/interfaces";
import React from "react";
import { FaDotCircle } from "react-icons/fa";
import { ssrCheckTokenValidity } from "services";
import Link from 'next/link';
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

const DepositsIndexPage = (props: IProps) => {
    const [deposits, setDeposits] = React.useState<Array<IDepositSR>>();


    React.useEffect(() => {
        setDeposits(props.user.deposits);
    }, []);

    const getDeposits = () => props.user.deposits.filter(d => d.status == 'active');

    const totalDeposits = (): number => {
        const deposits = getDeposits();
        return deposits.length > 0 ? deposits.reduce((a, b) => a + b.amount, 0) : 0;
    }

    return (
        <DashboardLayout overflow={false} user={props.user} title={`Deposits | KryptoCastle Investments Ltd.`}>
            <div className={`flex flex-col px-8 pt-6 h-full`} style={{ background: `#efefef` }}>
                <div className={`w-full flex flex-col items-center justify-center`}>
                    {
                        props.user.deposits.length == 0 ? (
                            <>
                                <div className={`w-48 flex justify-center items-center`}>
                                    <img src={`/assets/images/piggy-bank.png`} alt={`picture-of-a-piggy-bank`} />
                                </div>
                                <div>
                                    <h1 className={`text-yellow-600 font-bold kalam uppercase`} style={{ fontSize: `2rem` }}>
                                        Oh, no! You do not have any deposits.
                                    </h1>
                                    <div className={`flex flex-row mt-8 sm:mt-0 justify-center`}>
                                        <Link href={routes.createDeposit}>
                                            <a className="btn-no-outline-px-4 hover:bg-blue-300 transition duration-100 cursor-pointer text-blue-500 py-2 border border-blue-400 px-4 bg-blue-200 uppercase text-xs rounded-lg">
                                                Create one now
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )
                            : (
                                <>
                                    <div className="w-full">
                                        <DashboardContentCard className={`mb-4`}>
                                            <div className="flex flex-row justify-between items-center w-full">
                                                <span className={`text-xxs uppercase text-gray-400`}>
                                                    current investments
                                                </span>
                                                <Link href={routes.createDeposit}>
                                                    <a className="btn-no-outline-px-4 flex flex-row items-center hover:bg-blue-300 transition duration-100 cursor-pointer text-blue-500 py-1 border border-blue-400 px-2 bg-blue-200 uppercase text-xxs rounded-lg">
                                                        new investment
                                                    </a>
                                                </Link>
                                            </div>
                                        </DashboardContentCard>
                                        <div className="bg-white py-2 px-4 rounded-md overflow-x-scroll sm:overflow-hidden">
                                            <div className={`mb-3 text-xxs uppercase text-gray-500`}>
                                                investments
                                            </div>
                                            <table className={`w-full border`}>
                                                <thead className={`text-gray-500 bg-gray-100 uppercase ticker-table-header`}>
                                                    <tr className={`divide-x divide-gray-200`}>
                                                        <th className={`py-1 text-left pl-2`}>SN</th>
                                                        <th className={`py-1 text-left pl-2`}>date</th>
                                                        <th className={`py-1 text-left pl-2`}>amount</th>
                                                        <th className={`py-1 text-left pl-2`}>plan</th>
                                                        <th className={`py-1 text-left pl-2`}>wallet address</th>
                                                        <th className={`py-1 text-left pl-2`}>status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        props.user.deposits.map((d, i) => (
                                                            <tr key={d.id} className={`py-1 cursor-pointer transition duration-750 hover:bg-gray-50 border-b border-gray-200 text-xxs text-gray-500 text-left divide-x uppercase`}>
                                                                <td className={`pl-2 pt-2 pb-1`}>{i + 1}</td>
                                                                <span className="sm:hidden">
                                                                    {new Date(d.createdAt).getDate()}/{new Date(d.createdAt).getMonth()}/{new Date(d.createdAt).getFullYear()}
                                                                </span>
                                                                <td className={`pl-2 pt-2 pb-1`}>${d.amount}</td>
                                                                <td className={`pl-2 pt-2 pb-1`}>
                                                                    {d.plan}
                                                                    <span className="hidden sm:inline">
                                                                        % profit each day
                                                                    </span>
                                                                </td>
                                                                <td className={`pl-2 pt-2 pb-1`}>{d.walletAddress}</td>
                                                                <td className={`pl-2 pt-2 pb-1`}>
                                                                    {d.status == 'active'
                                                                        ?
                                                                        <div className={`flex flex-row items-center`}><FaDotCircle size={13} color={`lightgreen`} className={`mr-1`} /> <span className={``}>active</span></div>
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

export default DepositsIndexPage;