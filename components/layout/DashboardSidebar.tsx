import NavLink from "components/atoms/NavLink";
import routes from "configs/routes";
import React, { ReactElement } from "react";
import { FaCashRegister, FaPiggyBank, FaTicketAlt, FaUserCircle, FaUserEdit, FaUserLock } from "react-icons/fa";
import Link from 'next/link';
import { IUserProfileSR } from "helpers/interfaces";

interface IDashboardSidebarLink {
    path: string;
    name: string;
    icon: ReactElement;
}

const paths: Array<IDashboardSidebarLink> = [
    {
        name: 'Dashboard',
        path: routes.dashboard,
        icon: <img className={`w-7`} src={`/assets/images/ctn-icon2.png`} alt={`Dashboard`} />
    },
    {
        name: 'Deposits',
        path: routes.deposits,
        icon: <FaPiggyBank size={24} />
    },
    {
        name: 'Withdrawals',
        path: routes.withdrawals,
        icon: <FaCashRegister size={24} />
    },
    {
        name: 'Tickers',
        path: routes.tickers,
        icon: <FaTicketAlt size={24} />
    },
    {
        name: 'Profile',
        path: routes["edit-account"],
        icon: <FaUserEdit size={24} />
    },
    {
        name: 'Security',
        path: routes.security,
        icon: <FaUserLock size={24} />
    },
];

const BigLink = (props: IDashboardSidebarLink) => (
    <div className={`flex flex-row items-center px-3 mb-4`}>
        <NavLink href={props.path} exact color={`text-black`} activeColor={`text-yellow-400`} className={`uppercase text-xs sm:text-sm`}>
            <div className={`flex flex-row items-center`}>
                <em className={`mr-4`}>{props.icon}</em><span className={`text-xxs`}>{props.name}</span>
            </div>
        </NavLink>
    </div>
);

interface IProps {
    user: IUserProfileSR;
}


const DashboardSidebar = (props: IProps) => {
    return (
        <aside className={`bg-gray-200 h-full py-5 flex flex-col justify-between`}>
            <div>
                <div className={`flex flex-col mb-8 items-center justify-center`}>
                    <div>
                        {
                            props.user.image
                                ?
                                <img style={{ width: 75, height: 75, borderRadius: 1000 }} src={props.user.image} alt={`profile-picture`} />
                                :
                                <FaUserCircle size={60} color={`steelblue`} />
                        }
                    </div>
                    <div className={`uppercase text-xxs mt-2 text-gray-500`}>
                        {props.user ? props.user.firstname ? `${props.user.firstname} ${props.user.lastname}` : 'USER' : 'USER'}
                    </div>
                </div>
                <div className={`pl-4`}>
                    {
                        paths.map(path => <BigLink icon={path.icon} name={path.name} path={path.path} />)
                    }
                </div>
            </div>
            <div className={`px-6`}>
                <hr className={`bg-gray-300 mb-3`} style={{ height: `3px` }} />
                <div>
                    <div className={`text-center`}>
                        <Link href={routes.home}>
                            <a className={`text-xxs text-gray-600`}>BACK TO HOME</a>
                        </Link>
                    </div>
                    <div className={`text-center`}>
                        <Link href={routes.home}>
                            <a className={`text-xxs text-gray-600`}>CONTACT US</a>
                        </Link>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default DashboardSidebar;