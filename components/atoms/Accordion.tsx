import React, { Children, ReactElement } from "react";
import { FaPlus, FaMinus } from 'react-icons/fa';

interface IProps {
    title: string;
    content?: ReactElement | string;
    children?: ReactElement | string;
}

const Accordion = ({ title, content, children }: IProps) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div>
            <div className={`bg-gray-700 text-white font-bold flex flex-row px-4 py-2 uppercase text-sm`}>
                <button onClick={() => setIsOpen(!isOpen)} className={`btn-no-outline btn-fade-action uppercase w-full flex flex-row justify-start`}>
                    <div className={`w-1/12 sm:w-0`}>{isOpen ? <FaMinus size={16} /> : <FaPlus size={16} />}</div>
                    <span className={`ml-1 sm:ml-8 text-xs sm:text-sm`}>
                        {title}
                    </span>
                </button>
            </div>
            <div className={`pt-3 px-2 text-xs ${isOpen ? 'top-0' : 'hidden -top-60 h-0'} relative transition duration-1000`}>
                {content ?? children}
            </div>
        </div>
    );
}


export default Accordion;