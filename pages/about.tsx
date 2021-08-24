import BackToTop from "components/atoms/BackToTop";
import Overlay from "components/layout/Overlay";
import Page from "components/layout/Page";
import HomeNavBar from "components/layout/shared/HomeNavbar";
import Blurb from "components/molecules/Blurb";
import Footer from "components/molecules/Footer";
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

const AboutPage = (props: IProps) => {
    return (
        <Page title={`KryptoCastle investments Ltd.`} color={`bg-gray-900`}>
            <div className={` h-full pb-10`} style={{ backgroundImage: `url("./assets/images/bg.png")`, height: `auto`, minHeight: `100vh` }}>
                <Overlay />
                <div style={{ position: `absolute`, top: 0, right: 0, width: `100%`, zIndex: 10 }}>
                    <HomeNavBar rates={props.rates} />
                    <h1 className={`text-yellow-500 text-3xl uppercase mt-10 text-center mb-4 sm:mb-10`}>
                        about <span className={`text-white`}>us</span>
                    </h1>
                    <div className={`bg-gray-900 py-6 sm:py-10 text-white px-8 sm:px-20 text-sm`}>
                        <p className={`mb-4`}>
                            Welcome to the website of SignalCastleFree.com LTD! If you find yourself here, you are definitely in search of reliable and profitable investment. Yes, you are just at the right place! Our company offers trust assets management of the highest quality on the basis of foreign exchange and profitable trade through Funds exchanges. There is no other worldwide financial market that can guarantee a Hourly ability to generate constant profit with the large price swings of BitCoin and other crypto currencies. Proposed modalities for strengthening cooperation will be accepted by anyone who uses cryptocurrency and knows about its fantastic prospects.
                        </p>

                        <p className={`mb-4`}>
                            SignalCastleFree.com LTD investment project is a product of careful preparation and fruitful work of experts in the field of mining, highly profitable trade in cryptocurrencies and online marketing. Using modern methods of doing business and a personal approach to each client, we offer a unique investment model to people who want to use cryptocurrencies not only as a method of payment, but also as a reliable source of stable income.
                        </p>

                        Your deposit is working on an ongoing basis, and makes profit every hour with the ability to withdraw profit. Your deposit is for life and irretrievable. This proposal would be interesting not only for beginners of cryptocurrency operation, but also for experienced online investors. SignalCastleFree.com LTD Business uses only modern mining equipment and trades at the most stable markets, which minimizes the risk of financial loss to customers and guarantees them a stable income accrued every 60 minutes. Join our company today and start making high profits!
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


export default AboutPage;