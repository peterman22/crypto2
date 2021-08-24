import { useRouter } from 'next/router';
import Link from 'next/link';



interface IProps {
    exact: boolean;
    href: string;
    children?: React.ReactElement;
    title?: string;
    content?: React.ReactElement;
    className?: string;
    color: string;
    activeColor: string;
};

const NavLink = ({
    href,
    exact,
    children,
    className,
    content,
    color,
    activeColor,
    title,
    ...props
}: IProps) => {
    const { pathname } = useRouter();
    const isActive = exact ? pathname === href : pathname.startsWith(href);

    return (
        <Link href={href}>
            <a className={`${className} ${isActive ? activeColor : color}`}>
                {title ?? content ?? children}
            </a>
        </Link>
    );
}

export default NavLink;