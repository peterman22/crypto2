import AdminDashboardLayout from "components/layout/AdminDashboard";
import { IUserProfileSR } from "helpers/interfaces";
import React from "react";
import { FaDotCircle, FaFilter } from "react-icons/fa";
import { adminApproveDeposit, adminApproveWithdrawal, adminGetDeposits, adminGetWithdrawals, ssrAdminCheckTokenValidity } from "services";
import { DashboardContentCard } from "../../dashboard";
import { Dropdown } from "react-bootstrap";
import { useRouter } from "next/router";

interface IProps {
    user: IUserProfileSR;
}

export const getServerSideProps = async (context: any) => {
    console.log('admin deposit');

    const tokenValidity = await ssrAdminCheckTokenValidity(context);

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
        props: {
        },
        ...tokenValidity[1]
    }
}

const WithdrawalsIndexPage = (props: IProps) => {
    const [deposits, setDeposits] = React.useState<any>([]);
    const [filter, setFilter] = React.useState<'all' | 'pending' | 'paid'>('all');


    const router = useRouter();
    React.useEffect(() => {
        getDeposits();
    }, []);

    const getDeposits = async () => {
        const d = await adminGetWithdrawals();
        d ? setDeposits(d) : setDeposits([]);
    }

    const totalDeposits = () => {
        if (!deposits) return '...';

        let total = 0;
        deposits.forEach((d: any) => {
            total += d.amount;
        });
        return total;
    }

    const filterBy = () => {
        switch (filter) {
            case 'all':
                return deposits;
            case 'pending':
                return deposits.filter((d: any) => d.status == 'pending');
            case 'paid':
                return deposits.filter((d: any) => d.status == 'paid');

            default:
                return [];
        }
    }

    const markAspaid = async (d: any) => {
        await adminApproveWithdrawal([d.id]);
        router.reload();
    }

    return (
        <AdminDashboardLayout overflow={false} user={props.user} title={`Deposits | KryptoCastle Investments Ltd.`}>
            <div className={`flex flex-col px-8 pt-6 h-full`} style={{ background: `#efefef` }}>
                <div className={`w-full flex flex-col items-center justify-center`}>

                    <div className="w-full">

                        <DashboardContentCard className={`mb-4`}>
                            <div className="flex flex-row justify-between items-center w-full">
                                <span className={`text-xxs uppercase text-${filter == 'all' ? 'blue' : (filter == 'pending' ? 'red' : 'green')}-400`}>
                                    {filter} withdrawals
                                </span>
                                <Dropdown>
                                    <Dropdown.Toggle className={`btn-no-outline flex items-center`}>
                                        <FaFilter /> <span className={`text-xs ml-1 text-gray-400`}>FILTER</span>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className={`text-gray-800 bg-white border border-gray-200 flex flex-col rounded-md p-2 text-xs`}>
                                        <Dropdown.Item onClick={() => setFilter('all')} className={`text-gray-800 border-b border-b-gray-100 pt-2`}>
                                            All
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => setFilter('pending')} className={`text-gray-800 border-b border-b-gray-100 pt-2`}>
                                            Pending
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => setFilter('paid')} className={`text-gray-800 border-b border-b-gray-100 pt-2`}>
                                            Paid
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </DashboardContentCard>
                        <div className="bg-white py-2 px-4 rounded-md overflow-x-scroll sm:overflow-hidden">
                            <div className={`mb-3 text-xxs uppercase text-gray-500`}>
                                withdrawals
                            </div>
                            <table className={`w-full border`}>
                                <thead className={`text-gray-500 bg-gray-100 uppercase ticker-table-header`}>
                                    <tr className={`divide-x divide-gray-200`}>
                                        <th className={`py-1 text-left pl-2`}>SN</th>
                                        <th className={`py-1 text-left pl-2`}>date</th>
                                        <th className={`py-1 text-left pl-2`}>amount</th>
                                        <th className={`py-1 text-left pl-2`}>currency</th>
                                        <th className={`py-1 text-left pl-2`}>wallet address</th>
                                        <th className={`py-1 text-left pl-2`}>bank</th>
                                        <th className={`py-1 text-left pl-2`}>account holder</th>
                                        <th className={`py-1 text-left pl-2`}>account number</th>
                                        <th className={`py-1 text-left pl-2`}>status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filterBy().map((d: any, i: number) => (
                                            <tr key={d.id} className={`py-1 cursor-pointer transition duration-750 hover:bg-gray-50 border-b border-gray-200 text-xxs text-gray-500 text-left divide-x uppercase`}>
                                                <td className={`pl-2 pt-2 pb-1`}>{i + 1}</td>
                                                <span className="sm:hidden">
                                                    {new Date(d.createdAt).getDate()}/{new Date(d.createdAt).getMonth()}/{new Date(d.createdAt).getFullYear()}
                                                </span>
                                                <td className={`pl-2 pt-2 pb-1`}>${d.amount}</td>
                                                <td className={`pl-2 pt-2 pb-1`}>{d.currency}</td>
                                                <td className={`pl-2 pt-2 pb-1`}>{d.walletAddress}</td>
                                                <td className={`pl-2 pt-2 pb-1`}>{d.bankName}</td>
                                                <td className={`pl-2 pt-2 pb-1`}>{d.bankAccName}</td>
                                                <td className={`pl-2 pt-2 pb-1`}>{d.bankAccNumber}</td>
                                                <td className={`pl-2 pt-2 pb-1 bg-gray-50`}>
                                                    <Dropdown>
                                                        <Dropdown.Toggle className={`btn-no-outline flex uppercase items-center`}>
                                                            {d.status == 'paid'
                                                                ?
                                                                <div className={`flex flex-row items-center`}><FaDotCircle size={13} color={`lightgreen`} className={`mr-1`} /> <span className={``}>paid</span></div>
                                                                :
                                                                <div className={`flex flex-row items-center`}><FaDotCircle size={13} color={`red`} className={`mr-1`} /> <span className={``}>{d.status}</span></div>
                                                            }
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu className={`text-gray-800 bg-gray-200 border border-gray-300 font-semibold flex flex-col rounded-md p-2 text-xxs`}>
                                                            {
                                                                d.status == 'pending'
                                                                    ?
                                                                    <Dropdown.Item onClick={() => markAspaid(d)} className={`text-red-600 pt-1`}>
                                                                        <span className="">
                                                                            mark as paid?
                                                                        </span>
                                                                    </Dropdown.Item>
                                                                    :
                                                                    null
                                                            }
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminDashboardLayout>
    );
}

export default WithdrawalsIndexPage;