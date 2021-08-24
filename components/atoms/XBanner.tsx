interface IProps { }

const XBanner = (props: IProps) => {
    return (
        <div className={`relative z-20 hidden sm:block`}>
            <div className={`bg-gray-500 flex flex-row`}>
                <div className={`bg-gray-500 h-10 sm:h-24 w-32 sm:ml-14 transform rotate-45 relative -right-8 -top-0`}>

                </div>
                <div className={`bg-yellow-500 h-14 sm:h-24 flex flex-row justify-center items-center w-full text-xl`}>
                    THE BEST INVESTMENT PLANS OF 2021. YOU CAN EARN UP TO <b className={`ml-2`}>20% DAILY</b>
                </div>
                <div className={`h-14 sm:h-24 w-32 mr-14 transform rotate-45 relative -left-8 -top-0 bg-gray-500`}>

                </div>
            </div>
        </div>
    );
}

export default XBanner;