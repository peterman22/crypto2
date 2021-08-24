import axios from 'axios';
import NavLink from 'components/atoms/NavLink';
import routes from 'configs/routes';
import { useRouter } from 'next/router';

interface IProps {
    rates: any;
}

const HomeNavBar = (props: IProps) => {
    const router = useRouter();

    return (
        <nav className={`border-b border-yellow-500 flex flex-col justify-between`} style={{ height: 150 }}>
            <div className={`text-white relative flex flex-row justify-end sm:block pt-6 sm:pt-0 px-4 sm:px-0`}>
                <span className={`absolute top-1 left-4 w-20 xl:w-32 flex object-fit`}>
                    <img src={`/assets/images/logo.png`} />
                </span>
                <div className={`flex flex-row sm:hidden`}>
                    <button onClick={() => router.push(routes.login)} className={`btn-no-outline block sm:hidden btn-fade-action w-20 text-xxs sm:text-sm sm:w-24 flex-row items-center justify-center text-black rounded-2xl bg-yellow-500 h-5 sm:h-8 shadow-inner shadow-2xl hover:bg-transparent border-2 border-yellow-500 hover:text-white mr-2`}>
                        LOGIN
                    </button>
                    <button onClick={() => router.push(routes.signup)} className={`btn-no-outline block sm:hidden btn-fade-action w-20 sm:w-24 text-xxs sm:text-sm flex-row items-center justify-center hover:text-black rounded-2xl hover:bg-yellow-500 h-6 sm:h-8 shadow-inner shadow-2xl bg-transparent border-2 border-yellow-500 text-white`}>
                        SIGNUP
                    </button>
                </div>
            </div>
            <div className={`flex sm:flex-row sm:justify-around flex-col items-center`}>
                <div className={`w-full sm:w-48 bg-gray-900 mb-3 sm:mb-0 flex flex-row justify-center items-center h-14 sm:h-20`} style={{ fontSize: 14 }}>
                    <span className={`text-white mr-1`}>1 BTC:</span>
                    <span className={`text-yellow-400`}>${props.rates ? props.rates.BTC?.USD ?? '' : ''}</span>
                </div>
                <div className={`text-white flex flex-row items-center`} style={{ fontSize: 13 }}>
                    <NavLink href={routes.home} title={`Home`} exact color={`text-white`} activeColor={`text-yellow-400`} className={`uppercase mr-4 text-xxs sm:text-sm`} />
                    <NavLink href={routes.about} title={`About`} exact color={`text-white`} activeColor={`text-yellow-400`} className={`uppercase mr-4 text-xxs sm:text-sm`} />
                    <NavLink href={routes.faqs} title={`FAQ`} exact color={`text-white`} activeColor={`text-yellow-400`} className={`uppercase mr-4 text-xxs sm:text-sm`} />
                    <NavLink href={routes.plans} title={`Plans`} exact color={`text-white`} activeColor={`text-yellow-400`} className={`uppercase mr-4 text-xxs sm:text-sm`} />
                    <NavLink href={routes.dashboard} title={`dashboard`} exact color={`text-white`} activeColor={`text-yellow-400`} className={`uppercase mr-4 text-xxs sm:text-sm`} />
                    <NavLink href={routes.support} title={`Contact Us`} exact color={`text-white`} activeColor={`text-yellow-400`} className={`uppercase mr-4 text-xxs sm:text-sm`} />
                    <button onClick={() => router.push(routes.login)} className={`btn-no-outline hidden sm:block btn-fade-action w-24 flex-row items-center justify-center text-black rounded-2xl bg-yellow-500 h-8 shadow-inner shadow-2xl hover:bg-transparent border-2 border-yellow-500 hover:text-white mr-2`}>
                        LOGIN
                    </button>
                    <button onClick={() => router.push(routes.signup)} className={`btn-no-outline hidden sm:block btn-fade-action w-24 flex-row items-center justify-center hover:text-black rounded-2xl hover:bg-yellow-500 h-8 shadow-inner shadow-2xl bg-transparent border-2 border-yellow-500 text-white`}>
                        SIGNUP
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default HomeNavBar;