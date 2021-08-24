import DashboardLayout from "components/layout/Dashboard";
import { IUserProfileSR } from "helpers/interfaces";
import React from "react";
import { ssrCheckTokenValidity } from "services";
import Link from 'next/link';
import routes from "configs/routes";
import { FaAngleDoubleRight } from "react-icons/fa";

interface IProps {
    user: IUserProfileSR;
}

export const getServerSideProps = async (context: any) => {
    const tokenValidity = await ssrCheckTokenValidity(context);
    if (tokenValidity[0] == true) {
        console.log(tokenValidity[2])
        return {
            props: {
                user: tokenValidity[2]
            },
            ...tokenValidity[1]
        }
    }
    return {
        props: {},
        ...tokenValidity[1]
    }
}

const CreateDepositPage = (props: IProps) => {
    const [selectedPlan, setSelectedPlan] = React.useState<PlanPosition>();


    const DepositItem = (props: IItem) => {
        return (
            <button onClick={() => setSelectedPlan(props.position)} className={`${selectedPlan == props.position ? 'border-4 border-yellow-500' : `border-2 border-${props.background}-400`} btn-no-outline bg-${props.background}-300 rounded-lg p-4 w-full mb-4 sm:mb-5 sm:w-3/12 cursor-pointer hover:border-yellow-500 fade-grow-10 mr-14`}>
                <div className={`uppercase text-center text-xs text-gray-700`}>
                    You get
                </div>
                <div>
                    <span className="text-4xl text-yellow-600">
                        {props.percent}%
                    </span>
                    <span className={`text-xs text-gray-700 font-semiBold ml-4`}>
                        of your principal {props.regularity ?? 'everyday'} for {props.maxMonths ? props.maxMonths - props.minMonths : props.minMonths} months after your investment matures.
                    </span>
                </div>
                <div>

                </div>
                <div className={`mt-6 text-xxs text-center text-gray-500`}>
                    Your investment matures in {props.minMonths} months
                </div>
            </button>
        );
    }

    return (
        <DashboardLayout overflow={false} user={props.user} title={`Deposits | KryptoCastle Investments Ltd.`}>
            <div className={`flex flex-col px-8 pt-6 h-full`} style={{ background: `#ddd`, backgroundRepeat: `no-repeat`, backgroundSize: `cover` }}>
                <div className={`md:text-md text-4xl text-gray-700 uppercase`}>
                    <span className={`font-bold text-yellow-600`} style={{ fontSize: 26 }}>Choose a plan</span>
                </div>
                <div className="flex flex-wrap flex-col sm:flex-row justify-start w-full mt-1 sm:mt-6">
                    <DepositItem
                        background={`blue`}
                        maxDeposit={9999}
                        minDeposit={2500}
                        minMonths={6}
                        percent={5}
                        key={1}
                        ordinance={`th`}
                        position={`a`}
                    />
                    <DepositItem
                        background={`blue`}
                        maxDeposit={19999}
                        minDeposit={10000}
                        minMonths={5}
                        percent={10}
                        key={1}
                        ordinance={`th`}
                        position={`b`}
                    />
                    <DepositItem
                        background={`blue`}
                        maxDeposit={49999}
                        minDeposit={20000}
                        minMonths={3}
                        percent={10}
                        key={1}
                        ordinance={`th`}
                        position={`c`}
                    />
                    <DepositItem
                        background={`blue`}
                        maxDeposit={98000}
                        minDeposit={50000}
                        minMonths={2}
                        percent={10}
                        key={1}
                        ordinance={`th`}
                        position={`d`}
                    />
                    <DepositItem
                        background={`blue`}
                        maxDeposit={45000}
                        minDeposit={25000}
                        minMonths={6}
                        maxMonths={12}
                        percent={25}
                        key={1}
                        ordinance={`th`}
                        position={`e`}
                    />
                    <DepositItem
                        background={`blue`}
                        maxDeposit={80000}
                        minDeposit={50000}
                        minMonths={5}
                        maxMonths={8}
                        percent={35}
                        key={1}
                        ordinance={`th`}
                        position={`f`}
                    />
                    <DepositItem
                        background={`blue`}
                        minDeposit={100000}
                        maxDeposit={100000}
                        minMonths={4}
                        maxMonths={6}
                        percent={40}
                        key={1}
                        ordinance={`th`}
                        position={`g`}
                    />


                </div>
                <div className={`mt-0 sm:mt-20 flex justify-center items-center w-full sm:w-11/12`}>
                    <Link href={`${routes.payDeposit}?plan=${selectedPlan}`}>
                        <a className={`px-6 py-2 flex flex-row items-center text-md text-gray-100 rounded-md bg-green-600 ${selectedPlan !== undefined ? 'ring-4 ring-opacity-40 ring-green-300' : ''}`}>
                            Next
                            <FaAngleDoubleRight className={`ml-2`} />
                        </a>
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    );
}

interface IItem {
    background: string;
    percent: number;
    minMonths: number;
    maxMonths?: number;
    minDeposit: number;
    maxDeposit: number;
    ordinance: 'rd' | 'th' | 'st';
    position: PlanPosition;
    regularity?: string;
}

export type PlanPosition = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g';

export default CreateDepositPage;
