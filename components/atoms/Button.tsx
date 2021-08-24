interface IProps {
    title: string;
    border?: string;
    background?: string;
    text?: string;
    width?: string;
    extras?: string;
    onClick?: any;
}


const Button = (props: IProps) => {
    return (
        <button onClick={props.onClick && props.onClick} className={`btn-no-outline ${props.width ?? 'w-24'} flex-row items-center justify-center ${props.text ?? 'text-black'} rounded-2xl h-8 shadow-inner shadow-2xl ${props.background ?? 'bg-yellow-500 hover:bg-white'} ${props.border ?? 'border-2 border-yellow-500'} ${props.extras}`}>
            {props.title}
        </button>
    );
}

export default Button;