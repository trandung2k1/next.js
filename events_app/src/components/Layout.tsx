import Head from 'next/head';
import React, { FC } from 'react';
interface IProps {
    children: React.ReactNode;
}
const Layout: FC<IProps> = ({ children }) => {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main> {children}</main>
        </>
    );
};

export default Layout;