export interface IHomeStatistics {
    figure: string;
    caption: string;
    image: any;
}

const Statistic = (props: IHomeStatistics) => {
    return (
        <div className={`bg-black fade-grow-10 rounded-3xl w-full mb-4 sm:mb-0 sm:w-2/12 flex flex-col justify-center items-center py-5`}>
            <div>
                <img src={props.image} alt={props.caption} />
            </div>
            <div className={`text-yellow-500 my-3 uppercase`}>
                {props.figure}
            </div>
            <div className={`text-white text-xs uppercase`}>
                {props.caption}
            </div>
        </div>
    );
}

export default Statistic;