import Page from "components/layout/Page";
import Overlay from "components/layout/Overlay";
import HomeNavBar from "components/layout/shared/HomeNavbar";
import StatisticsRow from "components/molecules/StatisticsRow";
import XBanner from "components/atoms/XBanner";
import InvestmentsRow from "components/molecules/InvestmentsRow";
import Last10Transactions from "components/molecules/Last10Transactions";
import Blurb from "components/molecules/Blurb";
import React from "react";
import NavLink from "components/atoms/NavLink";
import routes from "configs/routes";
import BackToTop from "components/atoms/BackToTop";
import axios from "axios";
import { useRouter } from "next/router";

interface Props {
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

const Home = (props: Props) => {
  const router = useRouter();

  return (
    <Page title={`KryptoCastle investments Ltd.`} color={`bg-gray-800`}>
      <div className={`min-h-screen`} style={{ backgroundImage: `url("./assets/images/bg.png")`, height: `100%` }}>
        <Overlay />
        <div style={{ position: `absolute`, top: 0, right: 0, width: `100%`, zIndex: 10 }}>
          <HomeNavBar rates={props.rates} />
          <div className={`flex flex-col-reverse items-center sm:items-start sm:flex-row justify-around mt-12`}>
            <div className={`w-11/12 pl-8 sm:pl-0 sm:w-5/12 xl:pl-20`}>
              <h1 className={`flex flex-col`}>
                <span className={`text-yellow-500`} style={{ fontSize: 46 }}>BRAND NEW</span>
                <span className={`text-white`} style={{ fontSize: 46 }}>ONLINE TRADING</span>
                <span className={`text-yellow-500`} style={{ fontSize: 46 }}>PLATFORM</span>
              </h1>
              <div className={`xl:flex justify-end`}>
                <p className={`text-white text-sm`}>
                  KryptoCastle Investments makes financial freedom so easy that even investors with zeo trading experience
                  are successfully turning tidy profits. Our programs, unlike any other, guarantees fixed hourly
                  interest for investors regardless of market conditions.
                </p>
              </div>
            </div>
            <div className={`w-9/12 sm:w-6/12 border-2 hidden sm:block border-transparent text-white flex object-contain`} style={{ background: `url('/assets/images/bn-bg.png')`, backgroundSize: `contain`, backgroundRepeat: `no-repeat`, backgroundPosition: `center`, minHeight: `55vh` }}>
              {/* <img src={`/assets/images/bn-bg.png`} style={{ height: '70%' }} /> */}
              &nbsp;
            </div>
          </div>
          <div className={`pt-5 sm:pt-7 pb-7 px-6`} style={{ backgroundImage: `url("./assets/images/bg.png")`, height: `100%` }}>
            <div className={`flex flex-col`}>
              <span className={`text-yellow-500 uppercase text-lg mb-2 text-center sm:text-left sm:mb-5`}>Earn up to 20% daily profit</span>
              <div className={`flex flex-row justify-center sm:block`}>
                <button onClick={() => router.push(routes.login)} className={`btn-no-outline btn-fade-action w-5/12 sm:w-24 sm:w-48 flex-row items-center justify-center text-black rounded-full hover:bg-yellow-500 h-8 sm:h-10 shadow-inner shadow-2xl bg-white text-xs sm:text-sm`}>
                  LOGIN
                </button>
                <button onClick={() => router.push(routes.signup)} className={`btn-no-outline btn-fade-action w-5/12 sm:w-48 flex-row items-center justify-center text-black rounded-full bg-yellow-500 h-8 sm:h-10 shadow-inner shadow-2xl hover:bg-transparent border-2 border-yellow-500 hover:text-white ml-6 text-xs sm:text-sm`}>
                  REGISTRATION
                </button>
              </div>
            </div>

            <div className={`px-7 pt-10`}>
              <StatisticsRow />
            </div>
          </div>
          <div className={`mt-0 bg-gray-900 pt-10 pb-6`}>
            <XBanner />
            <InvestmentsRow />
            <section className={`flex flex-col-reverse sm:flex-row mt-10 px-10 sm:px-24 border-t border-b border-yellow-500 py-10`}>
              <main className={`w-full sm:w-7/12`}>
                <h1 className={`text-yellow-500 font-semibold uppercase mb-2 sm:mb-4`} style={{ fontSize: 24 }}>
                  Welcome to Kryptocastle investments ltd.
                </h1>
                <p className={`text-white text-sm mb-4 text-justify sm:pr-12`}>
                  Looking for highest returns on your investments? SignalCastleFree.com LTD is an automatic online investment platform, part of SignalCastleFree.com LTD – team of professional traders focusing mainly on Bitcoin and other crypto currencies trading over multiple Exchanges and markets. Thanks to the extraordinary diversification of our investments, we are able to deliver steady income for our investors.
                </p>
                <p className={`text-white text-sm text-justify sm:pr-12`}>
                  Headquartered in London in 2019, SignalCastleFree.com LTD is already becoming the Panam's fastest growing trading company. Our name is synonymous with effective and profitable trading solutions where our investors need little to no trading experience at all. With SignalCastleFree.com LTD, investors choose one of our four simple investment plans, make a deposit and sit back while our experts go to work. They can withdraw their profit any time and schedule withdrawals quickly and easily through our website. If you have been looking for an easy to use investment platform, choose SignalCastleFree.com LTD now and let our professionals help you choose an investment plan that meets your needs today!
                </p>
              </main>
              <aside className={`w-4/12 mb-4 sm:mb-0`}>
                <img className={`float-right`} src={`./assets/images/ctn-icon2.png`} alt={``} />
              </aside>
            </section>
            <section className={`py-10`} style={{ backgroundImage: `url('./assets/images/ctn-bg.png')` }}>
              <Last10Transactions />
            </section>
            <section className={`pt-8 sm:pt-10 px-0 sm:px-0`}>
              <Blurb />
            </section>
            <section className={`bg-gray-600 py-10 px-6 sm:px-24 fade-grow-10 hover:border-2 border-0 hover:rounded-md hover:border-yellow-500 hover:bg-black`}>
              <h1 className={`text-yellow-500 text-lg sm:text-2xl text-center uppercase font-bold mb-3 sm:mb-4`}>
                More insight about investment
              </h1>
              <p className={`text-white text-sm`}>
                We promise we going to make some people big and also financially free by working from home.
                A time will come people in your cities will be looking for where to lodge there money just to earn 5% returns monthly.
                You’ll be earning 15% of there money and return 5% back.
                <br />
                <br />
                Look at it this way.
                A friends gives you $10,000 to keep for him or invest with it.
                And hoping to get 5% returns monthly

                5% is $500

                Now you are investing on $10,000 with Signals Castle Free
                And you earning 20%

                20% is $2000

                How smart is that, you return $500

                And you left with $1500 just by staying at home.

                Isn’t it cool 😎 cash?

                We are your online key to financial freedom
              </p>
              <h2 className={`mt-8 text-yellow-500 uppercase text-md sm:text-lg text-center font-bold`}>Benefits</h2>
              <div className={`flex flex-row justify-center`}>
                <span className={`bg-yellow-500 h-1 rounded-lg mb-4 w-2/12 sm:w-1/12`}>&nbsp;</span>
              </div>
              <p className={`flex flex-row text-white justify-center px-6 sm:px-0`}>
                <ol style={{ listStyle: `outside` }}>
                  <li>Tax free</li>
                  <li>No office to rush to</li>
                  <li>Risk of trading yourself (monitoring the market)</li>
                  <li>Admins are always online for you to communicate with</li>
                </ol>
              </p>
              <p className={`mt-4 text-white text-center sm:text-left`}>
                You can't win daily just by trading yourself.
                But with our investment bot you can.
                As a professional we don’t always loss big,
                Know when to exit trade.

                Note in trading there are WINS AND LOSSES:
                This to show us how trading goes....
                We can’t win always.
              </p>
              <div className={`flex flex-col items-center justify-center mt-8 sm:mt-8`}>
                <div className={`bg-yellow-500 mb-2 sm:h-2 h-1 rounded-lg mb-4 w-3/12 sm:w-1/12`}>&nbsp;</div>
                <p className={`bg-gray-200 mt-1 sm:mt-0 text-xs uppercase text-gray-500 px-2 sm:px-4 py-4 w-full sm:w-4/12 border-l-4 sm:border-l-8 rounded-sm border-yellow-500`}>
                  Trading is making <strong>huge</strong> sums of money <strong>(profit)</strong> when the trade favors you, and losing <strong>little</strong> when a trade goes against you.
                </p>
              </div>
            </section>
            <section className={`bg-gray-900 py-6 px-5 sm:px-0`}>
              <section className={`flex sm:flex-row flex-col sm:px-20  sm:divide-y-0 sm:divide-x divide-solid divide-yellow-500`}>
                <div className={`w-full sm:w-4/12 py-6 px-4`}>
                  <h1 className={`uppercase text-center mb-1 text-yellow-500 text-lg`}>our why</h1>
                  <p className={`text-white text-sm text-justify`}>
                    Kryptocastle exists to create a more sustainable world through investing. We want to make sure our grandchildren, and yours, inherit a Planet Earth that is liveable.
                  </p>
                </div>
                <div className={`w-full sm:w-4/12 py-6 px-4`}>
                  <h1 className={`uppercase text-center mb-1 text-yellow-500 text-lg`}>our vision</h1>
                  <p className={`text-white text-sm text-justify`}>
                    A financial system that doesn’t just benefit the finance industry – but also people and their environment. Lives that are rich in more than wealth alone. And a sustainable world with a bright future.
                  </p>
                </div>
                <div className={`w-full sm:w-4/12 py-6 px-4`}>
                  <h1 className={`uppercase text-center mb-1 text-yellow-500 text-lg`}>our mission</h1>
                  <p className={`text-white text-sm text-justify`}>
                    To make it easy for everyone – even beginners – to invest in a sustainable and responsible future, without compromising their returns.
                  </p>
                </div>
              </section>
            </section>
            <BackToTop />
            <section className={`bg-gray-600 border-t-2 border-b-2 border-yellow-500 py-8 flex flex-row justify-center items-center`}>
              <img src={`./assets/images/solid.png`} alt={``} />
            </section>
            <footer className={`pt-8 px-10 flex sm:flex-row text-center items-center sm:justify-between flex-col`}>
              <div className={`text-white mb-4 sm:mb-0 text-xxs sm:text-sm uppercase`}>
                &copy; Kryptocastle investments ltd, all rights reserved
              </div>
              <div className={`text-xs`}>
                <NavLink href={routes.about} title={`About`} exact color={`text-white hover:text-yellow-500`} activeColor={`text-yellow-400`} className={`uppercase mr-4 text-xxs sm:text-sm`} />
                <NavLink href={routes.faqs} title={`FAQ`} exact color={`text-white hover:text-yellow-500`} activeColor={`text-yellow-400`} className={`uppercase mr-4 text-xxs sm:text-sm`} />
                <NavLink href={routes.plans} title={`Plans`} exact color={`text-white hover:text-yellow-500`} activeColor={`text-yellow-400`} className={`uppercase mr-4 text-xxs sm:text-sm`} />
                <NavLink href={routes.affiliates} title={`Affiliates`} exact color={`text-white hover:text-yellow-500`} activeColor={`text-yellow-400`} className={`uppercase mr-4 text-xxs sm:text-sm`} />
                <NavLink href={routes.support} title={`Support`} exact color={`text-white hover:text-yellow-500`} activeColor={`text-yellow-400`} className={`uppercase mr-4 text-xxs sm:text-sm`} />
              </div>
            </footer>
          </div>

        </div>
      </div>
    </Page>
  );
}


export default Home;