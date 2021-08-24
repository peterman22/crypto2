import DashboardLayout from "components/layout/Dashboard";
import getRates from "helpers/getRates";
import { IUserProfileSR, IWithdrawalSR } from "helpers/interfaces";
import React from "react";
import { getWithdrawalRef, requestWithdrawal, ssrCheckTokenValidity } from "services";
import Switch from "react-switch";
import { FaBitcoin, FaCaretDown, FaCopy, FaEthereum, FaMoneyBill } from "react-icons/fa";
import { InputGroup, FormControl, Dropdown } from "react-bootstrap";


export const getServerSideProps = async (context: any) => {
    const rates = await getRates();

    const tokenValidity = await ssrCheckTokenValidity(context);
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
    user: IUserProfileSR;
}


const RequestWithdrawalPage = (props: IProps) => {
    const [selectedWithdrawalMethod, setSelectedWithdrawalMethod] = React.useState<'fiat' | 'crypto'>('fiat');
    const [isMethodCrypto, setIsMethodCrypto] = React.useState(true);
    const [withdrawal, setWithdrawal] = React.useState<IWithdrawalSR>({
        amount: 0,
        bankAccName: '',
        bankAccNumber: 0,
        bankName: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        currency: 'btc',
        id: '',
        status: 'pending',
        walletAddress: '',
    });
    const [ref, setRef] = React.useState('');
    const [isCopied, setIsCopied] = React.useState(false);

    React.useEffect(() => {
        getRef();
    }, []);

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

    const toggleMethod = () => {
        setIsMethodCrypto(!isMethodCrypto);

        setWithdrawal({
            amount: 0,
            bankAccName: '',
            bankAccNumber: 0,
            bankName: '',
            createdAt: new Date(),
            updatedAt: new Date(),
            currency: 'btc',
            id: '',
            status: 'pending',
            walletAddress: '',
        });
    }

    const getRef = async () => {
        const ref = await getWithdrawalRef();
        if (ref) setRef(ref);
        else
            alert('An error occurred. Reload this page and try again or contact us.');
    }

    const submit = async () => {
        const u = confirm('Are you sure you want to save this request for withdrawal? These details cannot be modified.');
        if (!u) return;

        setWithdrawal({ ...withdrawal, id: ref });
        const r = await requestWithdrawal(withdrawal);

        if (!r) alert('An error occurred. Please, try again.');
        else alert('Your request for withdrawal was sent!');
    }

    return (
        <DashboardLayout overflow={true} user={props.user} title={`Withdrawals | KryptoCastle Investments Ltd.`}>
            <div className={`flex flex-col px-8 pt-6 h-full overflow-y-scroll`} style={{ background: `#efefef` }}>
                <div className="flex flex-col sm:flex-row w-full justify-between items-center">
                    <div>
                        <div className="text-yellow-500 text-center text-4xl sm:text-6xl">
                            ${withdrawableBalance()}
                        </div>
                        <div className="text-xxs text-gray-900 text-center uppercase">
                            Withdrawable balance
                        </div>
                    </div>

                    <div className="flex flex-row h-10 mt-3 sm:mt-0">
                        <label className={`flex flex-col items-center`}>
                            <span className={`text-xs mr-2 text-red-400 uppercase mb-4 sm:mb-0`}>Withdraw with crypto?</span>
                            <Switch
                                onChange={() => toggleMethod()}
                                checked={isMethodCrypto}
                                onColor={`#ffae00`}
                                offColor={`#bbb`}
                                checkedIcon={false}
                                uncheckedIcon={false}
                            />
                            <div className={`flex flex-col w-full mt-4`}>
                                <div className={`text-gray-400 text-xxs`}>
                                    Transaction ref: (keep this safe)
                                </div>
                                <div className={`bg-blue-100 px-4 text-sm text-gray-700 w-full  divide-x divide-gray-400 rounded-md border border-blue-200 flex justify-between items-center`}>
                                    <span className={`py-1 text-xxs`}>
                                        {ref}
                                    </span>
                                    <button onClick={() => { navigator.clipboard.writeText(ref); setIsCopied(true); }} className={`flex btn-no-outline relative z-10 justify-center items-center ml-4 pl-2 ${isCopied ? 'text-green-700 hover:text-green-500' : 'text-blue-700 hover:text-blue-500'} transition duration-100`}>
                                        <FaCopy />
                                    </button>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>

                <div className={`flex items-center justify-center`}>
                    <form onSubmit={e => { e.preventDefault(); submit(); }} className={`w-full flex flex-col items-center justify-center`}>
                        {
                            isMethodCrypto
                                ?
                                <div className={`flex flex-col w-full mt-24 justify-center items-center`}>
                                    <div className={`w-full sm:w-5/12`}>
                                        <InputGroup className="mb-3 w-full flex flex-row border border-yellow-300 rounded-md">
                                            <InputGroup.Text className={`bg-gray-200 px-2 py-3 flex items-center justify-center rounded-l-md`}>
                                                <Dropdown className={``}>
                                                    <Dropdown.Toggle className={`btn-no-outline justify-center flex items-center`}>
                                                        {
                                                            withdrawal.currency == 'btc'
                                                                ?
                                                                <FaBitcoin size={20} color={`goldenrod`} />
                                                                :
                                                                (
                                                                    withdrawal.currency == 'eth'
                                                                        ?
                                                                        <FaEthereum size={20} color={`blue`} />
                                                                        :
                                                                        <img className={`ml-3`} src={`/assets/images/ltc.svg`} />
                                                                )
                                                        }
                                                        <span className="ml-1">
                                                            <FaCaretDown size={12} />
                                                        </span>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className={`text-gray-800 bg-white border border-gray-200 flex flex-col rounded-md p-2 text-xs`}>
                                                        <Dropdown.Item onClick={() => setWithdrawal({ ...withdrawal, currency: 'btc' })} className={`text-gray-800 border-b border-b-gray-100 pt-2`}>
                                                            Bitcoin
                                                        </Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setWithdrawal({ ...withdrawal, currency: 'eth' })} className={`text-gray-800 border-b border-b-gray-100 pt-2`}>
                                                            Ethereum
                                                        </Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setWithdrawal({ ...withdrawal, currency: 'ltc' })} className={`text-gray-800 border-b border-b-gray-100 pt-2`}>
                                                            Litecoin
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </InputGroup.Text>
                                            <FormControl
                                                onChange={e => setWithdrawal({ ...withdrawal, walletAddress: e.currentTarget.value })}
                                                required
                                                placeholder="Wallet address"
                                                aria-label="Wallet address"
                                                aria-describedby="basic-addon1"
                                                className={`w-full rounded-r-md pl-4 btn-no-outline`}
                                            />
                                        </InputGroup>
                                    </div>
                                    <div className={`w-full sm:w-5/12`}>
                                        <InputGroup className="mb-3 w-full flex flex-row border border-yellow-300 rounded-md">
                                            <InputGroup.Text className={`bg-gray-200 uppercase text-gray-400 text-xs px-2 py-3 flex items-center justify-center rounded-l-md`}>
                                                amount
                                            </InputGroup.Text>
                                            <FormControl
                                                onChange={e => setWithdrawal({ ...withdrawal, amount: parseFloat(e.currentTarget.value) || 0 })}
                                                required
                                                placeholder=""
                                                aria-label="Amount"
                                                aria-describedby="basic-addon1"
                                                className={`w-full rounded-r-md pl-4 btn-no-outline`}
                                                type={`number`}
                                                min={10}
                                                max={withdrawableBalance() + 100}
                                            />
                                        </InputGroup>
                                    </div>
                                </div>
                                :
                                <div className={`flex flex-col w-full mt-32 sm:mt-10 justify-center items-center`}>
                                    <div className={`w-full sm:w-5/12`}>
                                        <InputGroup className="mb-3 w-full flex flex-row border border-yellow-300 rounded-md">
                                            <InputGroup.Text className={`bg-gray-200 w-10/12 sm:w-4/12 uppercase text-gray-400 text-xs px-2 py-3 flex items-center justify-center rounded-l-md`}>
                                                Bank name
                                            </InputGroup.Text>
                                            <FormControl
                                                onChange={e => setWithdrawal({ ...withdrawal, bankName: e.currentTarget.value })}
                                                required
                                                placeholder=""
                                                aria-label="bank name"
                                                aria-describedby="basic-addon1"
                                                className={`w-full rounded-r-md pl-4 btn-no-outline`}
                                            />
                                        </InputGroup>
                                    </div>
                                    <div className={`w-full sm:w-7/12`}>
                                        <InputGroup className="mb-3 w-full flex flex-row border border-yellow-300 rounded-md">
                                            <InputGroup.Text className={`bg-gray-200 w-64 sm:w-6/12 uppercase text-gray-400 text-xs px-2 py-3 flex items-center justify-center rounded-l-md`}>
                                                <span className={`hidden sm:inline mr-1`}>account</span> holder name
                                            </InputGroup.Text>
                                            <FormControl
                                                onChange={e => setWithdrawal({ ...withdrawal, bankAccName: e.currentTarget.value })}
                                                required
                                                placeholder=""
                                                aria-label="account name"
                                                aria-describedby="basic-addon1"
                                                className={`w-full rounded-r-md pl-4 btn-no-outline`}
                                                type={`number`}
                                                min={10}
                                                max={withdrawableBalance()}
                                            />
                                        </InputGroup>
                                    </div>
                                    <div className={`w-full sm:w-5/12`}>
                                        <InputGroup className="mb-3 w-full flex flex-row border border-yellow-300 rounded-md">
                                            <InputGroup.Text className={`bg-gray-200 w-10/12 sm:w-9/12 uppercase text-gray-400 text-xs px-2 py-3 flex items-center justify-center rounded-l-md`}>
                                                account number
                                            </InputGroup.Text>
                                            <FormControl
                                                onChange={e => setWithdrawal({ ...withdrawal, bankAccNumber: parseInt(e.currentTarget.value) || 0 })}
                                                required
                                                placeholder=""
                                                aria-label="account number"
                                                aria-describedby="basic-addon1"
                                                className={`w-full rounded-r-md pl-4 btn-no-outline`}
                                            />
                                        </InputGroup>
                                    </div>
                                    <div className={`w-full sm:w-4/12`}>
                                        <InputGroup className="mb-3 w-full flex flex-row border border-yellow-300 rounded-md">
                                            <InputGroup.Text className={`bg-gray-200 w-5/12 sm:w-5/12 uppercase text-gray-400 text-xs px-2 py-3 flex items-center justify-center rounded-l-md`}>
                                                amount
                                            </InputGroup.Text>
                                            <FormControl
                                                onChange={e => setWithdrawal({ ...withdrawal, amount: parseFloat(e.currentTarget.value) || 0 })}
                                                required
                                                placeholder=""
                                                aria-label="account number"
                                                aria-describedby="basic-addon1"
                                                className={`w-full rounded-r-md pl-4 btn-no-outline`}
                                                type={`number`}
                                                min={10}
                                                max={withdrawableBalance()}
                                            />
                                        </InputGroup>
                                    </div>
                                </div>
                        }
                        <div className={`text-xxs text-red-500`}>
                            10% processing fee applies
                        </div>
                        <div className="flex items-center-justify-center mt-3">
                            <button className="btn-no-outline px-4 py-2 text-white bg-green-400 uppercase text-xs rounded-md hover:bg-green-500 transition duration-300">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}


export default RequestWithdrawalPage;