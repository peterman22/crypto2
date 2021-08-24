import { IUserProfileSR } from "helpers/interfaces";
import React, { ReactElement } from "react";
import DashboardSidebar from "./DashboardSidebar";
import Page from "./Page";
import MiniNavbar from "./shared/MiniNavbar";

export interface IDashboardLayout {
    title: string;
    children: ReactElement;
    user: IUserProfileSR;
    overflow: boolean;
}

const DashboardLayout = (props: IDashboardLayout) => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(false);

    return (
        <Page title={props.title}>
            <div className={`flex flex-col bg-gray-900 pt-10 h-screen`}>
                <MiniNavbar isSidebarActive={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} user={props.user} />
                <section className={`flex flex-row flex-grow ${props.overflow && 'overflow-y-scroll'} scrollbar-transparent-bg`}>
                    <section className={`sm:w-64 sidebar ${isSidebarOpen && 'active'} absolute top-14 sm:block sm:static flex-grow`}>
                        <DashboardSidebar user={props.user} />
                    </section>
                    <div className={`w-full`}>
                        {props.children}
                    </div>
                </section>
            </div>
        </Page>
    );
}

export default DashboardLayout;