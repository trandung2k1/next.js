import React from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import connectDB from '@/db/db';
const About = () => {
    //Render client
    React.useEffect(() => {
        (async () => {
            const res = await axios.get('api/hello');
            console.log(res);
        })();
        console.log('Hi');
    }, []);
    return <div>About</div>;
};
export const getServerSideProps: GetServerSideProps = async () => {
    //Render server
    await connectDB();
    return {
        props: {},
    };
};
export default About;
