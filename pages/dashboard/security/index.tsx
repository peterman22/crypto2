import DashboardLayout from "components/layout/Dashboard";
import React from "react";
import { DashboardContentCard } from "..";
import { FaDotCircle } from "react-icons/fa";
import { IUserProfileSR } from "helpers/interfaces";
import { changePassword, ssrCheckTokenValidity } from "services";

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

const SecurityIndexPage = (props: IProps) => {
    const logins = JSON.parse(props.user.logins);

    const changepassword = async () => {
        const old = prompt('Enter your current password');
        if (!old) return;

        const n = prompt('Enter a new password');
        if (!n) return;

        const c = prompt('Confirm new password');
        if (!c) return;

        if (n !== c) return alert('Passwords do not match!');

        const r = await changePassword(old, n);
        if (r) alert('Password changed successfully!');
        else alert('An error occurred while attempting to update your password. Please, try again.');
    }

    return (
        <DashboardLayout overflow={true} user={props.user} title={`Tickers | KryptoCastle Investments Ltd.`}>
            <div className={`flex flex-col px-8 pt-6 h-full overflow-y-scroll`} style={{ background: `#efefef` }}>
                <div className="w-full">
                    <DashboardContentCard className={`mb-4`}>
                        <div className="flex flex-row justify-between items-center">
                            <span className={`text-xxs uppercase text-gray-400`}>
                                SECURITY
                            </span>
                            <button onClick={() => changepassword()} className="btn-no-outline px-4 flex flex-row items-center hover:bg-red-300 transition duration-100 cursor-pointer text-red-500 py-1 border border-red-400 px-2 bg-red-200 uppercase text-xxs rounded-lg">
                                change password
                            </button>
                        </div>
                    </DashboardContentCard>

                    <div className="bg-white py-2 px-4 rounded-md overflow-y-scroll sm:overflow-hidden">
                        <div className={`mb-3 text-xxs uppercase text-gray-500`}>
                            Login history
                        </div>
                        <table className={`w-full border`}>
                            <thead className={`text-gray-500 w-full bg-gray-100 uppercase ticker-table-header`}>
                                <tr className={`divide-x divide-gray-200`}>
                                    <th className={`py-1 text-left pl-2`}>SN</th>
                                    <th className={`py-1 text-left pl-2`}>date</th>
                                    <th className={`py-1 text-left pl-2`}>time</th>
                                    <th className={`py-1 text-left pl-2`}>ip address</th>
                                    <th className={`py-1 text-left pl-2`}>summary</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    logins.map((l: any, i: number) => (
                                        <tr className={`py-1 cursor-pointer transition duration-750 hover:bg-gray-50 border-b border-gray-200 text-xxs text-gray-4r00 text-left divide-x uppercase`}>
                                            <td className={`pl-2 pt-2 pb-1`}>{i + 1}</td>
                                            <td className={`pl-2 pt-2 pb-1`}>
                                                <span className="hidden sm:inline">
                                                    {new Date(l.timestamp).toDateString()}
                                                </span>
                                                <span className="sm:hidden">
                                                    {new Date(l.timestamp).getDate()}/{new Date(l.timestamp).getMonth()}/{new Date(l.timestamp).getFullYear()}
                                                </span>
                                            </td>
                                            <td className={`pl-2 pt-2 pb-1`}>
                                                <span className="hidden sm:inline">
                                                    {new Date(l.timestamp).toTimeString()}
                                                </span>
                                                <span className="sm:hidden">
                                                    {new Date(l.timestamp).toTimeString().slice(0, 8)}
                                                </span>
                                            </td>
                                            <td className={`pl-2 pt-2 pb-1`}>{l.ip}</td>
                                            <td className={`pl-2 pt-2 pb-1`}>
                                                <span className={`flex flex-row items-center text-green-600`}>
                                                    {
                                                        l.summary == 'genuine'
                                                            ?
                                                            <FaDotCircle size={13} color={`lightgreen`} className={`mr-2`} />
                                                            :
                                                            <FaDotCircle size={13} color={`red`} className={`mr-2`} />
                                                    }

                                                    <span className={`hidden sm:inline`}>
                                                        {l.summary == 'genuine' ? 'this login event appears to be genuine' : l.summary}
                                                    </span>
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout >
    );
}


export default SecurityIndexPage;