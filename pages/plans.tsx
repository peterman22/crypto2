import BackToTop from "components/atoms/BackToTop";
import Overlay from "components/layout/Overlay";
import Page from "components/layout/Page";
import HomeNavBar from "components/layout/shared/HomeNavbar";
import Blurb from "components/molecules/Blurb";
import Footer from "components/molecules/Footer";
import InvestmentsRow from "components/molecules/InvestmentsRow";
import getRates from "helpers/getRates";
import React from "react";

interface IProps {
    rates: any;
}

export const getServerSideProps = async () => {
    const rates = await getRates();
    return {
        props: {
            rates
        }
    }
}


const Plans = (props: IProps) => {
    return (
        <Page title={`KryptoCastle investments Ltd.`} color={`bg-gray-900`}>
            <div className={` h-full pb-10`} style={{ backgroundImage: `url("./assets/images/bg.png")`, height: `auto`, minHeight: `100vh` }}>
                <Overlay />
                <div style={{ position: `absolute`, top: 0, right: 0, width: `100%`, zIndex: 10 }}>
                    <HomeNavBar rates={props.rates} />
                    <h1 className={`text-yellow-500 text-2xl sm:text-3xl uppercase mt-10 text-center mb-4 sm:mb-10`}>
                        <span className={`text-white`}>investment</span> plans
                    </h1>
                    <div className={`bg-gray-900 py-6 sm:py-10 text-white px-8 sm:px-20 text-sm`}>
                        <InvestmentsRow itemsClassesExtra={`pt-12 sm:pt-20`} />
                    </div>
                    <BackToTop />
                    <section className={`py-8 sm:py-10 px-0 sm:px-0 bg-gray-800`}>
                        <Blurb />
                    </section>
                    <Footer />
                </div>
            </div>
        </Page>
    );
}

export default Plans;