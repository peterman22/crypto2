import routes from 'configs/routes';
import Link from 'next/link';


interface IProps { }


const SupportPage = (props: IProps) => {
    return (
        <div className={`h-screen bg-gray-200 flex justify-center items-center`}>

            <div className={`rounded-lg bg-white px-5 py-3 shadow-xl`}>
                <div className={`font-bold text-center mb-4 underline`}>
                    You can contact us at the following:
                </div>
                <div>
                    <span className={`font-bold mr-3`}>Email:</span>
                    <a className={`underline text-blue-900`} href="mailto:kryptocastleinvest@gmail.com">
                        kryptocastleinvest@gmail.com
                    </a>
                </div>
                <div>
                    <span className={`font-bold mr-3`}>Tel:</span>
                    <a href="tel:+"></a>
                </div>
                <div className={`mt-3 text-xxs text-right`}>
                    <Link href={routes.home}>
                        <a className={`text-blue-800 underline`}>
                            Go back to home
                        </a>
                    </Link>
                </div>
            </div>

        </div>
    );
}


export default SupportPage;