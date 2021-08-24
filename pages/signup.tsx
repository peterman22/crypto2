import Overlay from "components/layout/Overlay";
import Page from "components/layout/Page";
import React from "react";
import Link from 'next/link';
import routes from "configs/routes";
import { FaEllipsisH, FaLock, FaUser } from "react-icons/fa";
import { INewUser, signup } from "services";
import Toast from 'react-bootstrap/Toast';
import { IToast } from "helpers/interfaces";

interface IProps { }

const Signup = (props: IProps) => {
    const [user, setUser] = React.useState<INewUser>({ firstname: '', lastname: '', middlename: '', email: '', password: '', password2: '' });
    const [customAlert, setCustomAlert] = React.useState<IToast>({
        background: 'bg-white',
        content: '',
        header: ''
    });
    const [showToast, setShowToast] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleInputChange = (e: any, key: 'firstname' | 'lastname' | 'middlename' | 'email' | 'password' | 'password2') => {
        let newUser = { ...user };
        newUser[key] = e.currentTarget.value!;
        setUser(newUser);
    }

    const handleSubmit = async () => {
        if (user.password !== user.password2) {
            setCustomAlert({ ...customAlert, content: "Passwords do not match", background: 'bg-white', header: 'An error occurred' });
            setShowToast(true);
            return;
        }

        const newUser: any = { ...user };
        delete newUser.password2;
        setIsLoading(true);
        const m = await signup(newUser);
        setIsLoading(false);
        setCustomAlert({ ...customAlert, content: m.code == 0 ? `${m.message.message}. Proceed to the Login page to sign in to your account.` : m.message, background: m.code == 0 ? 'bg-green-400' : 'bg-white', header: m.code == 0 ? 'Success!' : 'An error occurred' });
        setShowToast(true);
    }

    return (
        <Page title={`Signup | KryptoCastle investments Ltd.`} color={`bg-gray-900`}>
            <div className={`h-full pb-4 sm:pb-10`} style={{ backgroundImage: `url("./assets/images/bg.png")`, height: `auto`, minHeight: `100vh` }}>
                <Overlay />
                <div className={`flex flex-col`} style={{ position: `absolute`, top: 0, right: 0, width: `100%`, zIndex: 10 }}>
                    <div className={`flex flex-col h-screen justify-evenly sm:justify-center items-between bg-gray-900`}>
                        <Toast show={showToast} onClose={() => setShowToast(!showToast)} className={`${customAlert.background} bg-gradient-to-r from-yellow-300 via-red-500 to-pink-500 w-11/12 sm:w-4/12 mx-auto sm:mx-8 sm:relative sm:-top-24 sm:self-end rounded-md`}>
                            <Toast.Header className={`flex justify-between items-center px-2`}>
                                <span className={`text-xs text-gray-800 uppercase`}>
                                    {customAlert.header}
                                </span>
                            </Toast.Header>
                            <Toast.Body className={`px-3 uppercase text-xs text-gray-500 pb-2`}>
                                {customAlert.content}
                            </Toast.Body>
                        </Toast>
                        <div className={`flex flex-col sm:flex-row justify-between items-center px-8`}>
                            <div className={`py-6 bg-gray-700 sm:py-10 text-white px-2 px-8 sm:px-20 text-sm w-full sm:w-4/12 flex justify-center items-center`}>
                                <form onSubmit={e => { e.preventDefault(); handleSubmit(); }} className={`block w-full py-5`}>
                                    <div className={`flex flex-row mb-8 sm:mb-6`}>
                                        <span className={`px-3 flex justify-center border border-gray-700 border-r-0 rounded-md rounded-r-none items-center bg-gray-300`}>
                                            <FaUser color={`gray`} />
                                        </span>
                                        <input onChange={e => handleInputChange(e, 'firstname')} placeholder="First name" className={`w-full block border bg-blue-50 border-gray-700 btn-no-outline text-black px-4 text-xs rounded-md rounded-l-none border-l-0 h-10`} type="text" required />
                                    </div>
                                    <div className={`flex flex-row mb-8 sm:mb-6`}>
                                        <span className={`px-3 flex justify-center border border-gray-700 border-r-0 rounded-md rounded-r-none items-center bg-gray-300`}>
                                            <FaUser color={`gray`} />
                                        </span>
                                        <input onChange={e => handleInputChange(e, 'lastname')} placeholder="Last name" className={`w-full block border bg-blue-50 border-gray-700 btn-no-outline text-black px-4 text-xs rounded-md rounded-l-none border-l-0 h-10`} type="text" required />
                                    </div>
                                    <div className={`flex flex-row mb-8 sm:mb-6`}>
                                        <span className={`px-3 flex justify-center border border-gray-700 border-r-0 rounded-md rounded-r-none items-center bg-gray-300`}>
                                            <FaUser color={`gray`} />
                                        </span>
                                        <input onChange={e => handleInputChange(e, 'email')} placeholder="Email" className={`w-full block border bg-blue-50 border-gray-700 btn-no-outline text-black px-4 text-xs rounded-md rounded-l-none border-l-0 h-10`} type="email" required />
                                    </div>
                                    <div className={`flex flex-row mb-8 sm:mb-6`}>
                                        <span className={`px-3 flex justify-center border border-gray-700 border-r-0 rounded-md rounded-r-none items-center bg-gray-300`}>
                                            <FaLock color={`gray`} />
                                        </span>
                                        <input onChange={e => handleInputChange(e, 'password')} placeholder={`Password`} className={`w-full block border bg-blue-50 border-gray-700 btn-no-outline text-black px-4 text-xs rounded-md rounded-l-none border-l-0 h-10`} type="password" required />
                                    </div>
                                    <div className={`flex flex-row mb-8 sm:mb-6`}>
                                        <span className={`px-3 flex justify-center border border-gray-700 border-r-0 rounded-md rounded-r-none items-center bg-gray-300`}>
                                            <FaLock color={`gray`} />
                                        </span>
                                        <input onChange={e => handleInputChange(e, 'password2')} placeholder={`Re-type password`} className={`w-full block border bg-blue-50 border-gray-700 btn-no-outline text-black px-4 text-xs rounded-md rounded-l-none border-l-0 h-10`} type="password" required />
                                    </div>
                                    <div className={`mt-3 flex justify-center items-center`}>
                                        <button className={`uppercase text-xxs bg-blue-300 text-black px-6 py-2 rounded-md btn-no-outline hover:bg-blue-400 transition duration-100`}>
                                            {isLoading ? <FaEllipsisH color={`gray`} /> : 'Sign up'}
                                        </button>
                                    </div>
                                    <div className={`text-xxs mt-4 sm:mt-3 text-gray-200 text-center mb-6`}>
                                        Already have an account? <span className={`text-blue-300`}><Link href={routes.login}>Log in here</Link></span>
                                    </div>
                                </form>
                            </div>

                            <div className={`flex flex-row justify-center sm:justify-end`}>
                                <img className={`w-0 sm:w-full`} src={`./assets/images/ctn-icon2.png`} alt={``} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}


export default Signup;