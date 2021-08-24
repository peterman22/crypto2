import { FaAngleDoubleUp } from 'react-icons/fa';
import ScrollToTop from "react-scroll-to-top";

interface IProps { }

const BackToTop = (props: IProps) => {
    return (
        <ScrollToTop
            smooth
            component={
                <FaAngleDoubleUp title={`Back to top`} color={`black`} size={24} />
            }
            style={{
                background: `gray`,
                display: `flex`,
                justifyContent: `center`,
                alignItems: `center`
            }}
        />
    );
}

export default BackToTop;