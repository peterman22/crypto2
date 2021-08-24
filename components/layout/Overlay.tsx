interface IProps {
    color?: string;
    children?: React.ReactElement
}

const Overlay = ({
    color,
    children
}: IProps) => {
    return (
        <div style={{
            position: `absolute`,
            top: 0,
            left: 0,
            width: `100%`,
            height: `100%`,
            zIndex: 10,
            opacity: 0.4
        }}
            className={`${color ?? 'bg-black'}`}
        >
            {children}
        </div>
    );
}

export default Overlay;