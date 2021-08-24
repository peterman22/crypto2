import { IInvestmentPlan } from 'components/atoms/InvestmentPlanItem';


const Investments: Array<IInvestmentPlan> = [
    {
        background: `bg-black`,
        caption: `Asia plan: 5% profit daily for 6 months`,
        minimum: 2500,
        maximum: 9999,
        minMonths: 6,
        percentage: 5
    },
    {
        background: `bg-gray-800`,
        caption: `Southern America plan: 10% profit daily for 5 months`,
        minimum: 10000,
        maximum: 19999,
        minMonths: 5,
        percentage: 10
    },
    {
        background: `bg-black`,
        caption: `European plan: 10% profit daily for 3 months`,
        minimum: 20000,
        maximum: 49999,
        minMonths: 3,
        percentage: 10
    },
    {
        background: `bg-black`,
        caption: `Master plan: 10% profit daily for 2 months`,
        minimum: 50000,
        maximum: 98000,
        minMonths: 2,
        percentage: 10
    },
    {
        background: `bg-gray-800`,
        caption: `25% profit every month for 6 months - 1 year`,
        maxMonths: 12,
        minimum: 25000,
        maximum: 45000,
        minMonths: 6,
        percentage: 25
    },
    {
        background: `bg-black`,
        caption: `35% profit every month for 5 - 8 months`,
        maxMonths: 8,
        minimum: 50000,
        maximum: 80000,
        minMonths: 5,
        percentage: 35
    },
    {
        background: `bg-gray-800`,
        caption: `40% profit every month for 4 - 6 months`,
        maxMonths: 6,
        minimum: 100000,
        maximum: 100000,
        minMonths: 4,
        percentage: 40
    },
];

export default Investments;