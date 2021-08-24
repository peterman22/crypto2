import DashboardLayout from "components/layout/Dashboard";
import routes from "configs/routes";
import { IUserProfileSR } from "helpers/interfaces";
import { useRouter } from "next/router";
import React from "react";
import { ssrCheckTokenValidity } from "services";

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

const DepositsAwaitingConfirmationPage = (props: IProps) => {
    const router = useRouter();

    return (
        <DashboardLayout overflow={false} user={props.user} title={`Deposits | KryptoCastle Investments Ltd.`}>
            <div className={`flex flex-col px-8 pt-6 h-full`} style={{ background: `#efefef` }}>
                <div className={`w-full flex flex-col items-center justify-center`}>
                    <div className={`w-48 flex justify-center items-center`}>
                        <img src={`/assets/images/piggy-bank.png`} alt={`picture-of-a-piggy-bank`} />
                    </div>
                    <div>
                        <h1 className={`text-red-400 font-bold kalam uppercase text-xl text-center`}>
                            we are confirming your deposit. for the safety of our clients, we put every transaction through a rigorous security vetting process.
                            depending on the number of concurrent transactions, it can take between 10 minutes and 24 hours for your deposit to be confirmed.
                            contact us (using the chat widget) if this message persists after 24 hours.
                        </h1>
                        <div className={`flex flex-row mt-8 sm:mt-4 justify-center`}>
                            <button onClick={() => router.back()} className="btn-no-outline px-4 hover:bg-blue-300 transition duration-100 cursor-pointer text-blue-500 py-2 border border-blue-400 px-4 bg-blue-200 uppercase text-xs rounded-lg">
                                go back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default DepositsAwaitingConfirmationPage;