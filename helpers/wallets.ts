import React, { ReactElement } from "react";

export interface IWallet {
    qr: string;
    address: string;
    name: string;
    shortname: string;
    icon: string;
}

export const wallets: Array<IWallet> = [
    {
        qr: `/assets/images/btc-qr.jpeg`,
        address: '1MEkPcMRqMpXuUbPHkaQXayLoLmhc5znvf',
        name: 'Bitcoin',
        shortname: 'BTC',
        icon: `/assets/images/btc.svg`
    },
    {
        qr: `/assets/images/eth-qr.jpeg`,
        address: '0x47e22648580116ca40af512775fba0ab310cccd0',
        name: 'Ethereum',
        shortname: 'ETH',
        icon: `/assets/images/eth.svg`
    },
    {
        qr: `/assets/images/ltc-qr.jpeg`,
        address: 'LbLee3i4j5V1fRHBPPVb1VJfpZw275QwKg',
        name: 'LiteCoin',
        shortname: 'LTC',
        icon: `/assets/images/ltc.svg`
    },
    {
        qr: `/assets/images/doge-qr.jpeg`,
        address: 'D7NzgY5jqJvjeJEnsp5jHhuLzADD2iTtbi',
        name: 'Doge',
        shortname: 'Doge',
        icon: `/assets/images/doge.png`
    },
    {
        qr: `/assets/images/usdt-qr.jpeg`,
        address: '0x47e22648580116ca40af512775fba0ab310cccd0',
        name: 'USDT',
        shortname: 'USDT',
        icon: `/assets/images/usdt.png`
    },
];

export const plans = {
    a: {
        percent: 5,
        minAmount: 2500,
        maxAmount: 9999,
        minMonths: 6,
    },
    b: {
        percent: 10,
        minAmount: 10000,
        maxAmount: 19999,
        minMonths: 5,
    },
    c: {
        percent: 10,
        minAmount: 20000,
        maxAmount: 49999,
        minMonths: 3,
    },
    d: {
        percent: 10,
        minAmount: 50000,
        maxAmount: 99000,
        minMonths: 2,
    },
    e: {
        percent: 25,
        minAmount: 25000,
        maxAmount: 45000,
        minMonths: 6,
        maxMonths: 12
    },
    f: {
        percent: 35,
        minAmount: 50000,
        maxAmount: 80000,
        minMonths: 5,
        maxMonths: 8
    },
    g: {
        percent: 40,
        minAmount: 100000,
        maxAmount: 100000,
        minMonths: 4,
        maxMonths: 6
    },
}
