import Overlay from "components/layout/Overlay";
import Page from "components/layout/Page";
import getRates from "helpers/getRates";
import React from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import routes from "configs/routes";
import { FaEllipsisH, FaLock, FaUser } from "react-icons/fa";
import { IReturningUser, login } from "services";
import { IToast } from "helpers/interfaces";
import Toast from 'react-bootstrap/Toast';
import axios from "axios";
import { baseUrl } from "configs/api";
import { useCookies } from 'react-cookie';
import cookieHandler from 'js-cookie';


export const getServerSideProps = async (context: any) => {
    console.log('redireced ')
    console.log(context.req.headers)

    const rates = await getRates();

    const token = context.req.cookies.auth;

    if (!token) {
        console.log('No token');
        return {
            props: {
                rates
            }
        }
    }

    const callback = context.query.onsuccess;

    return await axios.get(baseUrl + '/users/me', {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            console.log(res.data);
            if (!callback) {
                console.log('No callback!');
                return {
                    redirect: {
                        destination: routes.dashboard,
                        permanent: true
                    }
                }
            }
            return {
                redirect: {
                    destination: callback,
                    permanent: true
                }
            }
        })
        .catch(err => {
            console.log(err.response.data.message);
            return {
                props: {}
            };
        });
}

interface IProps {
    rates: any;
}

const Login = (props: IProps) => {
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['auth']);

    const [user, setUser] = React.useState<IReturningUser>({ email: '', password: '' });
    const [customAlert, setCustomAlert] = React.useState<IToast>({
        background: 'bg-white',
        content: '',
        header: ''
    });
    const [showToast, setShowToast] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleInputChange = (e: any, key: 'email' | 'password') => {
        let newUser = { ...user };
        newUser[key] = e.currentTarget.value!;
        setUser(newUser);
    }

    const handleSubmit = async () => {
        const newUser: any = { ...user };
        setIsLoading(true);
        const m = await login(newUser);
        setIsLoading(false);
        if (m.code !== 0) {
            setCustomAlert({ ...customAlert, content: m.code == 1 ? m.message : '', background: m.code == 0 ? 'bg-green-400' : 'bg-white', header: m.code == 1 ? 'An error occurred' : '' });
            setShowToast(true);
        } else {
            const callback = router.query.onsuccess;

            // setCookie('auth', localStorage.getItem('token')); // for prod oo!
            cookieHandler.set('auth', localStorage.getItem('token') ?? '');

            // if (!callback) console.log('callback')
            if (!callback) {
                return router.push(routes.dashboard);
            } else {
                return router.push(callback!.toString());
            }
        }
    }

    return (
        <Page title={`Login | KryptoCastle investments Ltd.`} color={`bg-gray-900`}>
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
                            <div className={`flex flex-row sm:flex-col items-start sm:items-center justify-center`}>
                                <span className={`text-4xl sm:text-5xl text-yellow-500 uppercase`}>
                                    user login
                                </span>
                                <FaLock color={`goldenrod`} className={`ml-3 text-4xl sm:text-4xl sm:ml-0`} />
                            </div>

                            <div className={`py-6 mt-4 sm:m-0 sm:py-10 sm:mx-3 text-white px-2 px-8 sm:px-20 text-sm w-full sm:w-6/12 sm:border border-gray-700 flex justify-center uppercase items-center`}>
                                <form onSubmit={e => { e.preventDefault(); handleSubmit(); }} className={`block w-full sm:w-10/12 py-5`}>
                                    <div className={`flex flex-row mb-8 sm:mb-6`}>
                                        <span className={`px-3 py-2 flex justify-center border border-gray-700 border-r-0 rounded-md rounded-r-none items-center bg-gray-300`}>
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
                                    <div className={`mt-3 flex justify-center items-center`}>
                                        <button className={`uppercase text-xxs bg-blue-300 text-black px-8 py-2 rounded-md btn-no-outline hover:bg-blue-400 transition duration-100`}>
                                            {isLoading ? <FaEllipsisH color={`gray`} /> : 'Log in'}
                                        </button>
                                    </div>
                                    <div className={`text-xxs mt-5 sm:mt-7 text-gray-200 text-center mb-6`}>
                                        Don't have an account? <span className={`text-blue-300`}><Link href={routes.signup}>Signup here</Link></span>
                                    </div>
                                </form>
                            </div>

                            <div className={`flex flex-row justify-center sm:justify-end`}>
                                <img className={`w-4/12 sm:w-full`} src={`./assets/images/ctn-icon2.png`} alt={``} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}


export default Login;