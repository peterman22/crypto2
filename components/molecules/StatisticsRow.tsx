import Statistic from "components/atoms/HomepageStatistic";
import { IHomeStatistics } from "components/atoms/HomepageStatistic";

interface IProps { }


const StatisticsRow = (props: IProps) => {
    const statistics: Array<IHomeStatistics> = [
        {
            caption: 'Total deposited',
            figure: '$983,098',
            image: '/assets/images/ctn-ic1.png'
        },
        {
            caption: 'Total members',
            figure: '1870',
            image: '/assets/images/ctn-ic2.png'
        },
        {
            caption: 'Total payments',
            figure: '$565,098',
            image: '/assets/images/ctn-ic3.png'
        },
        {
            caption: 'Days online',
            figure: '3498',
            image: '/assets/images/ctn-ic4.png'
        },
    ];

    return (
        <div className={`flex flex-col sm:flex-row justify-around`}>
            {statistics.map((v: IHomeStatistics) => <Statistic figure={v.figure} image={v.image} caption={v.caption} />)}
        </div>
    );
}

export default StatisticsRow;