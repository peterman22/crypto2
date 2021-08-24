import NavLink from "components/atoms/NavLink";
import routes from "configs/routes";
import React from "react";

interface IProps { }


const Footer = (props: IProps) => {
    return (
        <>
            <section className={`bg-gray-600 border-t-2 border-b-2 border-yellow-500 py-8 flex flex-row justify-center items-center`}>
                <img src={`./assets/images/solid.png`} alt={``} />
            </section>
            <footer className={`pt-8 pb-4 px-10 flex sm:flex-row text-center items-center sm:justify-between flex-col bg-gray-900`}>
                <div className={`text-white mb-4 sm:mb-0 text-xxs sm:text-sm uppercase`}>
                    &copy; Kryptocastle investments ltd, all rights reserved
                </div>
                <div className={`text-xs`}>
                    <NavLink href={routes.about} title={`About`} exact color={`text-white hover:text-yellow-500`} activeColor={`text-yellow-400`} className={`uppercase text-xxs mr-4`} />
                    <NavLink href={routes.faqs} title={`FAQ`} exact color={`text-white hover:text-yellow-500`} activeColor={`text-yellow-400`} className={`uppercase text-xxs mr-4`} />
                    <NavLink href={routes.plans} title={`Plans`} exact color={`text-white hover:text-yellow-500`} activeColor={`text-yellow-400`} className={`uppercase text-xxs mr-4`} />
                    <NavLink href={routes.affiliates} title={`Affiliates`} exact color={`text-white hover:text-yellow-500`} activeColor={`text-yellow-400`} className={`uppercase text-xxs mr-4`} />
                    <NavLink href={routes.support} title={`Support`} exact color={`text-white hover:text-yellow-500`} activeColor={`text-yellow-400`} className={`uppercase text-xxs mr-4`} />
                </div>
            </footer>
        </>
    );
}


export default Footer;