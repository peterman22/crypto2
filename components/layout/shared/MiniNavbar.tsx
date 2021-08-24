
import routes from 'configs/routes';
import getRates from 'helpers/getRates';
import { IUserProfileSR } from 'helpers/interfaces';
import useInterval from 'helpers/useInterval';
import { useRouter } from 'next/router';
import React from 'react';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { HiLogout } from 'react-icons/hi';
import { logout } from 'services';
import Link from 'next/link';

interface IProps {
    user: IUserProfileSR;
    toggleSidebar: () => void;
    isSidebarActive: boolean;
}

const MiniNavbar = (props: IProps) => {
    const router = useRouter();
    const [rates, setRates] = React.useState<any>({});

    React.useEffect(() => {
        loadTickers();
    }, [0]);

    useInterval(() => loadTickers(), 10000);

    const loadTickers = async () => {
        const tickers = await getRates();
        setRates(tickers);
    }

    return (
        <nav className={`bg-gray-200 fixed top-0 left-0 w-full border-b border-yellow-200 flex px-4 py-0 flex-grow flex-row items-center justify-between`} style={{ height: 55 }}>
            <span>
                <Link href={routes.home}>
                    <a className={`text-white`}>
                        KRYPTOCASTLE
                    </a>
                </Link>
            </span>
            <div className={`flex flex-row items-center text-xxs`}>
                <div className={`bg-transparent hidden sm:block mb-3 mx-3 text-xs sm:mb-0 flex flex-row justify-center items-center`}>
                    <span className={`text-white mr-1`}>BTC:</span>
                    <span className={`text-yellow-400`}>${rates.BTC ? rates.BTC.USD : '...'}</span>
                </div>
                <div className={`bg-transparent hidden sm:block mb-3 mx-3 text-xs sm:mb-0 flex flex-row justify-center items-center`}>
                    <span className={`text-white mr-1`}>ETH:</span>
                    <span className={`text-yellow-400`}>${rates.ETH ? rates.ETH.USD : '...'}</span>
                </div>
                <div className={`bg-transparent hidden sm:block mb-3 mx-3 text-xs sm:mb-0 flex flex-row justify-center items-center`}>
                    <span className={`text-white mr-1`}>LTC:</span>
                    <span className={`text-yellow-400`}>${rates.LTC ? rates.LTC.USD : '...'}</span>
                </div>
                <div className={`bg-transparent hidden sm:block mb-3 mx-3 text-xs sm:mb-0 flex flex-row justify-center items-center`}>
                    <span className={`text-white mr-1`}>DASH:</span>
                    <span className={`text-yellow-400`}>${rates.DASH ? rates.DASH.USD : '...'}</span>
                </div>
                <div className="ml-3 mr-2 hidden sm:flex flex-row items-center">
                    <FaUserCircle size={20} color={`#aaa`} />
                    <span className={`text-gray-400 text-xxs ml-1`}>
                        Hi, {props.user ? props.user.firstname ?? 'USER' : 'USER'}
                    </span>
                </div>
                <button onClick={async () => { await logout(); router.push(routes.home) }} title={`Log out`} className={`ml-3 cursor-pointer btn-no-outline p-0`}>
                    <HiLogout size={24} color={`#ccc`} />
                </button>
                <button onClick={() => props.toggleSidebar()} title={`Log out`} className={`ml-3 cursor-pointer sm:hidden btn-no-outline p-0 transition duration-300`}>
                    {props.isSidebarActive ? <FaTimes size={18} color={`darkred`} /> : <FaBars size={18} color={`#aaa`} />}
                </button>
            </div>
        </nav>
    );
}

export default MiniNavbar;