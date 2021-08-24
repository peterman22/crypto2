import Button from "./Button";
import { useRouter } from "next/router";
import routes from "configs/routes";

export interface IInvestmentPlan {
    percentage: number;
    minimum: number;
    maximum: number;
    minMonths: number;
    maxMonths?: number;
    caption: string;
    background: string;
    extra?: string;
}

const InvestmentPlanItem = (props: IInvestmentPlan) => {
    const router = useRouter();

    return (
        <section className={`${props.background} px-10 pb-6 sm:pb-9 w-10/12 sm:w-3/12 ${props.extra || 'pt-6 sm:pt-9'} mb-4`}>
            <h1 style={{ fontSize: 60, color: `white` }}>
                {props.percentage}%
            </h1>
            <h2 className={`text-yellow-500 font-bold my-6 sm:my-4`}>
                {props.caption}
            </h2>
            <p className={`text-white my-1 sm:my-3 text-xs sm:text-sm`}>
                Minimum deposit: <span>${props.minimum}</span>
            </p>
            <p className={`text-white my-1 sm:my-3 text-xs sm:text-sm`}>
                Maximum deposit: <span>${props.maximum}</span>
            </p>
            <div className={`mt-3 sm:mt-6`}>
                <Button onClick={() => router.push(routes.createDeposit)} title={`DEPOSIT`} extras={`hover:border-white btn-fade-action`} text={`text-xs font-bold text-black`} />
            </div>
        </section>
    );
}


export default InvestmentPlanItem;