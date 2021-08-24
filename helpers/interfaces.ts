import { ReactElement } from "react";

export interface IToast {
    background: string;
    content: string | ReactElement;
    header?: string | ReactElement;
}

interface IDepositObj {
    amount: number;
}
export interface IUserProfile {
    firstName: string;
    lastName: string;
    email: string;
    profileImage: string | null;
}

export interface IDepositSR {
    id: string;
    amount: number;
    currency: string;
    walletAddress: string;
    plan: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IWithdrawalSR {
    id: string;
    amount: number;
    currency: string;
    walletAddress: string;
    status: 'pending' | 'paid';
    createdAt: Date;
    updatedAt: Date;
    bankName: string;
    bankAccName: string;
    bankAccNumber: number;
}

export interface IUserProfileSR {
    firstname: string;
    lastname: string;
    email: string;
    image: string | null;
    deposits: Array<IDepositSR>;
    withdrawals: Array<IWithdrawalSR>;
    profits: number | null;
    logins: string;
}