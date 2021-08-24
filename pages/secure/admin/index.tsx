import AdminDashboardLayout from "components/layout/AdminDashboard";
import { useRouter } from "next/router";
import getRates from "helpers/getRates";
import { IUserProfileSR } from "helpers/interfaces";
import { ReactElement } from "react";
import Card from 'react-bootstrap/Card';
import { adminGetAllUsers, adminGetDeposits, adminGetWithdrawals, ssrAdminCheckTokenValidity } from "services";
import routes from "configs/routes";
import { FaCaretLeft, FaCaretRight, FaUser } from "react-icons/fa";
import React from "react";

export const getServerSideProps = async (context: any) => {
    console.log('admin dashboard home');
    // console.log(context.req.cookies)

    const tokenValidity = await ssrAdminCheckTokenValidity(context);
    console.log(tokenValidity);
    // return {
    //     props: {}
    // }

    const rates = await getRates();

    if (tokenValidity[0] == true) {
        console.log(tokenValidity[2])
        return {
            props: {
                rates,
                user: tokenValidity[2]
            },
            ...tokenValidity[1]
        }
    }
    return {
        props: {
            rates
        },
        ...tokenValidity[1]
    }
}

interface IProps {
    rates: any;
    user: IUserProfileSR;
}

const AdminDashboardHome = (props: IProps) => {
    const router = useRouter();

    React.useEffect(() => {
        getUsers();
        getDeposits();
        getWithdrawals();
    }, []);

    const [isPanelOpen, setIsPanelOpen] = React.useState(true);
    const [allUsers, setAllUsers] = React.useState<any>();
    const [deposits, setDeposits] = React.useState<any>([]);
    const [withdrawals, setWithdrawals] = React.useState<any>([]);
    const [viewMoreTx, setViewMoreTx] = React.useState(false);

    const getUsers = async () => {
        const users = await adminGetAllUsers();
        setAllUsers(users);
    }

    const totalUsers = () => {
        if (!allUsers) return '...';

        return allUsers.length;
    }

    const getDeposits = async () => {
        const d = await adminGetDeposits();
        setDeposits(d || []);
    }

    const getWithdrawals = async () => {
        const d = await adminGetWithdrawals();
        setWithdrawals(d || []);
    }

    const totalDeposits = () => {
        if (!deposits) return '...';

        let total = 0;
        deposits.forEach((d: any) => {
            total += d.amount;
        });
        return total;
    }

    const totalProfit = () => {
        if (!deposits) return '...';

        let total = 0;
        deposits.forEach((d: any) => {
            const t = new Date().getTime() - new Date(d.createdAt).getTime();
            const e = t / (1000 * 3600 * 24);
            console.log(e)
            total += ((d.plan * d.amount) / 100) * e;
        });
        return total.toFixed(2);
    }

    const transactions = () => {
        let r: any = [];
        r = r.concat(deposits);
        r = r.concat(withdrawals);
        return r;
    }

    const newUsers = () => allUsers ? allUsers.filter((u: any) => new Date(u.createdAt).getDate() >= (new Date().getDate() - 7)).length : '...';

    return (
        <AdminDashboardLayout overflow={true} user={props.user} title={`Dashboard | KryptoCastle Investments Ltd.`}>
            <div className={`flex flex-row px-8 pt-6 h-full overflow-y-scroll`} style={{ background: `#efefef` }}>
                <div className={`flex flex-col w-full relative`}>
                    <button onClick={() => setIsPanelOpen(!isPanelOpen)} className="btn-no-outline hidden sm:inline absolute -right-8 z-10 bg-white rounded-full">
                        {
                            isPanelOpen ? <FaCaretRight color={`red`} size={24} /> : <FaCaretLeft color={`green`} size={24} />
                        }
                    </button>
                    <div className="flex flex-col sm:flex-row w-full sm:justify-between">
                        <div className={`w-full sm:mr-5 mb-4 sm:mb-0`}>
                            <DashboardWidget title={`Total users`} valueColor={`text-yellow-500`} value={totalUsers()} icon={<img src={'/assets/images/ctn-ic2.png'} alt={`users`} />} />
                        </div>
                        <div className={`w-full sm:ml-5`}>
                            <DashboardWidget title={`new users`} valueColor={`text-yellow-500`} value={newUsers()} icon={<FaUser size={60} color={`orange`} />} />
                        </div>
                    </div>

                    <div className={`w-full mt-8`}>
                        <DashboardContentCard>
                            <div className="flex flex-col">
                                <div className={`uppercase text-xxs sm:text-xs text-gray-500 sm:mt-2 h-6 w-full flex flex-row items-center justify-between mb-2`}>
                                    <div>Recent transactions <span className={`hidden sm:inline text-blue-400 text-xxs`}>({!viewMoreTx ? `1 - 5 of ${transactions().length}` : `all of ${transactions().length}`})</span></div>
                                    <button onClick={() => setViewMoreTx(!viewMoreTx)} className="btn-no-outline uppercase text-xxs text-red-800 bg-red-200 px-2 rounded-md">
                                        {viewMoreTx ? 'View less' : 'View more'}
                                    </button>
                                </div>
                                <div className="flex w-full overflow-x-scroll sm:overflow-hidden">
                                    <table className={`w-full flex-grow`}>
                                        <thead className={`bg-yellow-100 py-4`}>
                                            <th className={`text-blue-300 uppercase text-xxs py-1`}>
                                                ID
                                            </th>
                                            <th className={`text-blue-300 uppercase text-xxs py-1`}>
                                                Asset/currency
                                            </th>
                                            <th className={`text-blue-300 uppercase text-xxs py-1`}>
                                                amount(Usd)
                                            </th>
                                            <th className={`text-blue-300 uppercase text-xxs py-1`}>
                                                amount
                                            </th>
                                            <th className={`text-blue-300 uppercase text-xxs py-1`}>
                                                date
                                            </th>
                                            <th className={`text-blue-300 uppercase text-xxs py-1`}>
                                                time
                                            </th>
                                        </thead>
                                        <tbody>
                                            {
                                                transactions().slice(0, viewMoreTx ? undefined : 5).map((t: any) => (
                                                    <tr>
                                                        <td className={`text-gray-400 text-center uppercase text-xxs py-1`}>
                                                            {t.id}
                                                        </td>
                                                        <td className={`text-gray-400 text-center uppercase text-xxs py-1`}>
                                                            {t.currency}
                                                        </td>
                                                        <td className={`text-gray-400 text-center uppercase text-xxs py-1`}>
                                                            ${t.amount}
                                                        </td>
                                                        <td className={`text-gray-400 text-center uppercase text-xxs py-1`}>
                                                            0.07
                                                        </td>
                                                        <td className={`text-gray-400 text-center uppercase text-xxs py-1`}>
                                                            {new Date(t.createdAt).getDate()}/{new Date(t.createdAt).getMonth()}/{new Date(t.createdAt).getFullYear()}
                                                        </td>
                                                        <td className={`text-gray-400 text-center uppercase text-xxs py-1`}>
                                                            {new Date(t.createdAt).getHours() % 12}:{new Date(t.createdAt).getMinutes()}{new Date(t.createdAt).getHours() >= 12 ? 'pm' : 'am'}
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </DashboardContentCard>
                    </div>

                    <div className="mt-8 pb-8 flex flex-col sm:flex-row sm:justify-start">
                        <div className={`mb-3 sm:mb-0 sm:mr-5`}>
                            <DashboardWidget title={`total deposits`} valueColor={`text-yellow-500`} value={`\$${totalDeposits()}`} background={`bg-white`} />
                        </div>
                        <div className={`mb-3 sm:mb-0`}>
                            <DashboardWidget title={`total Profits`} valueColor={`text-yellow-500`} value={`\$${totalProfit()}`} background={`bg-white`} />
                        </div>
                    </div>
                </div>

                <div className={`w-3/12 pl-5 hidden ${isPanelOpen && 'sm:block'} relative`}>
                    <div onClick={() => router.push(routes.createDeposit)} className={`w-full mr-5 mb-4 cursor-pointer`}>
                        <DashboardWidget title={`btc`} value={`\$${props.rates.BTC ? props.rates.BTC.USD : ''}`} background={`bg-gray-300`} />
                    </div>
                    <div onClick={() => router.push(routes.createDeposit)} className={`w-full mr-5 mb-4 cursor-pointer`}>
                        <DashboardWidget title={`eth`} value={`\$${props.rates.ETH ? props.rates.ETH.USD : ''}`} background={`bg-gray-300`} />
                    </div>
                    <div onClick={() => router.push(routes.createDeposit)} className={`w-full mr-5 mb-4 cursor-pointer`}>
                        <DashboardWidget title={`ltc`} value={`\$${props.rates.LTC ? props.rates.LTC.USD : ''}`} background={`bg-gray-300`} />
                    </div>
                </div>
            </div>
        </AdminDashboardLayout>
    );
}

export interface ICardWidget {
    value: string;
    title: string;
    icon?: any;
    background?: string;
    valueLiteral?: ReactElement;
    valueColor?: string;
}

export const DashboardWidget = (props: ICardWidget) => {
    return (
        <Card className={``}>
            <Card.Body>
                <div className={`${props.background ? props.background : 'bg-white'} rounded-lg shadow-md flex flex-row justify-between flex-grow px-4 py-2 w-full`} style={{ minHeight: 160 }}>
                    <div className={`flex flex-col justify-end`}>
                        {
                            props.valueLiteral ??
                            <div className={`${props.valueColor ? props.valueColor : 'text-gray-400'} text-white`} style={{ fontSize: `240%` }}>
                                {props.value}
                            </div>
                        }
                        <div className={`text-xxs text-gray-500 uppercase`}>
                            {props.title}
                        </div>
                    </div>

                    <div className={`w-24 flex flex-col justify-center`}>
                        {props.icon}
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export interface IDashboardContentCard {
    content?: any;
    children?: any;
    className?: string;
}

export const DashboardContentCard = (props: IDashboardContentCard) => {
    return (
        <Card className={props.className}>
            <Card.Body>
                <div className={`bg-white rounded-lg shadow-md flex-grow px-4 py-2 w-full`} style={{}}>
                    {props.content ?? props.children ?? ''}
                </div>
            </Card.Body>
        </Card>
    );
}

export default AdminDashboardHome;