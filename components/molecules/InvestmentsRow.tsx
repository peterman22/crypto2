import InvestmentPlanItem, { IInvestmentPlan } from "components/atoms/InvestmentPlanItem";
import Investments from "configs/investment_plans";
import CompoundInterestCalculator from "./CompoundInterestCalculator";

interface IProps {
    parentClassesExtra?: string;
    itemsClassesExtra?: string;
}

const InvestmentsRow = (props: IProps) => {



    return (
        <div className={`flex flex-col ${props.parentClassesExtra && props.parentClassesExtra} items-center sm:items-start sm:flex-row px-8 sm:px-24 flex-wrap`}>
            {Investments.map((v: IInvestmentPlan) => <InvestmentPlanItem extra={props.itemsClassesExtra} percentage={v.percentage} minimum={v.minimum} maximum={v.maximum} minMonths={v.minMonths} caption={v.caption} background={v.background} maxMonths={12} />)}
            <CompoundInterestCalculator />
        </div>
    );
}

export default InvestmentsRow;