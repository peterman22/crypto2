import Head from 'next/head';

interface IProps {
    title: string;
    content?: React.ReactElement;
    children?: React.ReactElement;
    color?: string;
}

const Page = ({
    title, content, children, color
}: IProps) => {
    return (
        <div className={color}>
            <Head>
                <title>{title}</title>
                <meta name="author" content="Icheka Ozuru" />
                <meta name="description" content="KryptoCastle Investments is a leading finance and seurities consulting agency." />
            </Head>
            <main>
                {content ?? children}
            </main>
        </div>
    );
}

export default Page;