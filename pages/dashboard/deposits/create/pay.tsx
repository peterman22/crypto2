import DashboardLayout from "components/layout/Dashboard";
import routes from "configs/routes";
import { IDepositSR, IUserProfileSR } from "helpers/interfaces";
import { IWallet, plans, wallets } from "helpers/wallets";
import React from "react";
import { FaCopy } from "react-icons/fa";
import { getDepositRef, saveDeposit, ssrCheckTokenValidity } from "services";
import { useRouter } from 'next/router';
import getRates from "helpers/getRates";

interface IProps {
    user: IUserProfileSR;
    plan: string;
}

export const getServerSideProps = async (context: any) => {
    const { query } = context;
    const plans = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

    if (!query || !query['plan'] || !plans.includes(query['plan'])) return {
        redirect: {
            destination: routes.createDeposit,
            permanent: true
        },
        props: {}
    }

    const tokenValidity = await ssrCheckTokenValidity(context);
    if (tokenValidity[0] == true) {
        console.log(tokenValidity[2])
        return {
            props: {
                user: tokenValidity[2],
                plan: query['plan']
            },
            ...tokenValidity[1]
        }
    }
    return {
        props: {},
        ...tokenValidity[1]
    }
}


const DepositPaymentPage = (props: IProps) => {
    const [selectedWallet, setSelectedWallet] = React.useState<IWallet>(wallets[0]);
    const Plans: any = { ...plans };
    const [isCopied, setIsCopied] = React.useState(false);
    const [rates, setRates] = React.useState<any>({});
    const [amount, setAmount] = React.useState(0);
    const [trxRef, setTrxRef] = React.useState('');
    const [walletAddr, setWalletAddr] = React.useState('');

    const router = useRouter();

    React.useEffect(() => {
        saveRates();
        getRef();
    }, []);

    const getRef = async () => {
        const r = await getDepositRef();

        if (r) setTrxRef(r);
    }

    const copy = () => {
        navigator.clipboard.writeText(selectedWallet.address);
        setIsCopied(true);
    }

    const saveRates = async () => {
        const r = await getRates();
        setRates(r);
    }

    const handleAwaitingConfirmation = async () => {
        if (!amount || !(amount >= Plans[props.plan].minAmount && amount <= Plans[props.plan].maxAmount)) return;

        const addr = prompt('Enter the wallet address you deposited from');

        if (addr == null || addr.trim().length < 8) return;
        setWalletAddr(addr);

        const r = await save();
        if (r) router.push(routes.awaitingDepositConfirmation);
        else alert('An error occurred. Please, click the button again.');
    }

    const renderWallets = () =>
        <div className={`w-full flex items-center justify-center`}>
            {
                wallets.map(w => (
                    <>
                        <div onClick={() => setSelectedWallet(w)} className={`rounded-full hidden sm:block fade-grow-10 mx-8 cursor-pointer p-2`} style={{ width: 70, height: 70, }}>
                            <img src={w.icon} alt={w.shortname} />
                        </div>
                        <div onClick={() => setSelectedWallet(w)} className={`rounded-full mt-2 sm:hidden block fade-grow-10 mx-3 cursor-pointer p-2`} style={{ width: 90, height: 90, }}>
                            <img className={`w-full`} src={w.icon} alt={w.shortname} />
                        </div>
                    </>
                ))
            }
        </div>

    const save = async () => {
        const d: IDepositSR = {
            amount: amount,
            createdAt: new Date(),
            currency: selectedWallet.shortname,
            id: trxRef,
            plan: Plans[props.plan].percent,
            status: '',
            updatedAt: new Date(),
            walletAddress: walletAddr ?? ''
        };
        return await saveDeposit(d);
    }

    return (
        <DashboardLayout overflow={true} user={props.user} title={`Deposits | KryptoCastle Investments Ltd.`}>
            <div className={`flex flex-col px-8 pt-3 h-full overflow-y-scroll`} style={{ background: `#efefef` }}>
                <div className={`pb-10`}>
                    <div className={`text-sm bg-red-700 text-gray-100 px-1 py-1 text-center uppercase mt-4`}>
                        keep this page open until deposit is made!
                    </div>
                    <div className={`flex justify-center`}>
                        <img style={{ height: 200 }} src={selectedWallet.qr} />
                    </div>
                    <div className="flex mt-2 justify-center text-gray-700 font-bold">
                        Pay with {selectedWallet.shortname}
                    </div>
                    <div className={`flex justify-center`}>
                        <div className={`bg-blue-100 px-1 sm:px-4 text-xxs sm:text-sm sm:text-lg w-full sm:w-4/12 md:w-5/12 xl:w-6/12 text-red-700 divide-x divide-gray-400 rounded-md border border-blue-200 flex justify-between items-center`}>
                            <span className={`py-2`}>
                                {selectedWallet.address}
                            </span>
                            <button onClick={() => copy()} className={`flex btn-no-outline justify-center items-center ml-4 pl-2 ${isCopied ? 'text-green-700 hover:text-green-500' : 'text-blue-700 hover:text-blue-500'} transition duration-100`}>
                                <FaCopy />
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center text-gray-400 text-xxs mt-3">
                        Transaction ref. (keep this somewhere safe!)
                    </div>
                    <div className={`flex justify-center`}>
                        <div className={`bg-blue-100 px-4 text-sm text-gray-700 w-full sm:w-4/12 divide-x divide-gray-400 rounded-md border border-blue-200 flex justify-between items-center`}>
                            <span className={`py-2`}>
                                {trxRef}
                            </span>
                            <button onClick={() => navigator.clipboard.writeText(trxRef)} className={`flex btn-no-outline justify-center items-center ml-4 pl-2 ${isCopied ? 'text-green-700 hover:text-green-500' : 'text-blue-700 hover:text-blue-500'} transition duration-100`}>
                                <FaCopy />
                            </button>
                        </div>
                    </div>
                    <div className={`flex flex-col items-center mt-6`}>
                        <div className={`mb-2 text-xxs uppercase text-gray-600 text-center`}>
                            Amount (USD)
                        </div>
                        <div className={`w-full sm:w-3/12 flex rounded-md ${amount >= Plans[props.plan].minAmount && amount <= Plans[props.plan].maxAmount ? 'border border-yellow-200' : 'ring-4 ring-red-700 ring-opacity-50'}`}>
                            <span className={`bg-gray-200 rounded-l-md px-3 text-xxs flex justify-center items-center`}>
                                $
                            </span>
                            <input onChange={(e) => {
                                try {
                                    setAmount(parseFloat(e.currentTarget.value!));
                                } catch (e) {
                                    setAmount(0);
                                }
                            }} className={`w-full btn-no-outline rounded-r-md py-2 text-gray-500 px-4 text-xs`} type={`number`} min={Plans[props.plan].minAmount} max={Plans[props.plan].maxAmount} />
                        </div>
                        <div className={`text-xxs text-gray-400 uppercase mt-2`}>
                            {
                                amount >= Plans[props.plan].minAmount && amount <= Plans[props.plan].maxAmount ? `You will pay ${rates[selectedWallet.shortname] ? (amount / rates[selectedWallet.shortname]['USD']).toFixed(4) : '...'} ${selectedWallet.shortname}` : <span className={`text-red-700 text-center sm:text-left`}>{`You can only invest an amount between ${Plans[props.plan].minAmount} and ${Plans[props.plan].maxAmount}`}</span>
                            }
                        </div>
                    </div>
                    <div className="mt-7">
                        <div className={`text-xxs text-gray-600 mb-2 text-center uppercase`}>
                            or pay with another currency
                        </div>
                        {renderWallets()}
                    </div>
                    <div className="mt-2 sm:mt-14 flex justify-center">
                        <button onClick={() => handleAwaitingConfirmation()} className="btn-no-outline uppercase fade-grow-10 bg-red-300 text-red-600 px-6 py-2 rounded-md">
                            Completed payment? Click here
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default DepositPaymentPage;