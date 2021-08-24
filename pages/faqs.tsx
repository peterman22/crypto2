import axios from "axios";
import Accordion from "components/atoms/Accordion";
import BackToTop from "components/atoms/BackToTop";
import Overlay from "components/layout/Overlay";
import Page from "components/layout/Page";
import HomeNavBar from "components/layout/shared/HomeNavbar";
import Footer from "components/molecules/Footer";
import React from "react";

interface IProps {
    rates: any;
}

export const getServerSideProps = async () => {
    const rates = await axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,DASH,LTC&tsyms=USD')
        .then(res => res.data)
        .catch(err => {
            console.log('An error occurred while attempting to fetch tickers', err);
            return {};
        });
    return {
        props: {
            rates
        }
    };
}


const FaqsPage = (props: IProps) => {
    return (
        <Page title={`KryptoCastle investments Ltd.`} color={`bg-gray-900`}>
            <div className={` h-full pb-10`} style={{ backgroundImage: `url("./assets/images/bg.png")`, height: `auto`, minHeight: `100vh` }}>
                <Overlay />
                <div style={{ position: `absolute`, top: 0, right: 0, width: `100%`, zIndex: 10 }}>
                    <HomeNavBar rates={props.rates} />
                    <h1 className={`text-yellow-500 text-2xl sm:text-3xl uppercase mt-10 text-center mb-0 sm:mb-10`}>
                        FRequently <span className={`text-white`}>asked</span> questions
                    </h1>
                    <div className={`bg-black py-6 sm:py-10 text-white px-8 sm:px-20 text-sm`}>
                        <div className={`mb-3 border-b border-yellow-500 pb-2`}>
                            <Accordion title={`What is KryptoCastle Investment?`}>
                                The KryptoCastle Investment is modern investment program who owned by KryptoCastle Investment based in the United Kingdom. Our Corporate Headquarters is located here: 21 Kensington High Street, Kensington, London, United Kingdom, W8 5NP . Company registration number is NO.111222333.You can I check the company Companies House The KryptoCastle Investment offers high-return investing in the Forex, digital currency known as Bitcoin, stock market and Fintech start-ups. Our company is constantly evolving, it improves its marketing components and creates new investment proposals. All this makes the KryptoCastle Investment an industry leader and to be able to adapt to the constantly changing market conditions.
                            </Accordion>
                        </div>
                        <div className={`mb-3 border-b border-yellow-500 pb-2`}>
                            <Accordion title={`How does kryptocastle investments ltd. earn profit for its members?`}>
                                SignalCastleFree is involved in cloud mining, which enables our company to earn Bitcoins without mining hardware, software, electricity, or bandwidth.
                            </Accordion>
                        </div>
                        <div className={`mb-3 border-b border-yellow-500 pb-2`}>
                            <Accordion title={`Who can become a client of KryptoCastle Investment?`}>
                                Everyone may be client of SignalCastleFree, regardless of nationality or residence. The only condition is, you must be of mature age (at least 18 years old) to become our client.
                            </Accordion>
                        </div>
                        <div className={`mb-3 border-b border-yellow-500 pb-2`}>
                            <Accordion title={`Where can i read about your investment proposal and also calculate my expected profit?`}>
                                You can check all our investment plans and calculate your profit on Home page & in your account on "Make Deposit" page.
                            </Accordion>
                        </div>
                        <div className={`mb-3 border-b border-yellow-500 pb-2`}>
                            <Accordion title={`Where can i check your current bitcoin exchange rate?`}>
                                <>We use the exchange rate on <a href="https://markets.blockchain.info">https://markets.blockchain.info</a></>
                            </Accordion>
                        </div>
                        <div className={`mb-3 border-b border-yellow-500 pb-2`}>
                            <Accordion title={`How can I invest with KryptoCastle Investment?`}>
                                To make a investment you must first become a member of SignalCastleFree. Once you are signed up, you can make your first deposit. All deposits must be made through the Members Area. You can login using the member username and password you receive when signup.
                            </Accordion>
                        </div>
                        <div className={`mb-3 border-b border-yellow-500 pb-2`}>
                            <Accordion title={`how can I change my email address or password?`}>
                                Sign in into your SignalCastleFree account and click on the "Edit Account". You can change your password or Email there.
                            </Accordion>
                        </div>
                        <div className={`mb-3 border-b border-yellow-500 pb-2`}>
                            <Accordion title={`I forgot my password and I cannot log in`}>
                                Click Your forgot Password link, enter your username or e-mail and follow instruction. You'll receive your account information in seconds.
                            </Accordion>
                        </div>
                        <div className={`mb-3 border-b border-yellow-500 pb-2`}>
                            <Accordion title={`how often can I check my account balance?`}>
                                You can access your account information for 24 hours, seven days a week over the Internet.
                            </Accordion>
                        </div>
                        <div className={`mb-3 border-b border-yellow-500 pb-2`}>
                            <Accordion title={`How can I invest? WHat payment methods are acceptable?`}>
                                SignalCastleFree accepts popular e-currencies such as Perfectmoney , Payeer , Bitcoin , Bitcoin Cash , Litecoin , Ethereum , Dash, Dogecoin and Visa/Master Card.
                            </Accordion>
                        </div>
                    </div>
                    <BackToTop />
                    <Footer />
                </div>
            </div>
        </Page>
    );
}


export default FaqsPage;