import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Layout from '@/components/Layout';
const inter = Inter({ subsets: ['latin'] });
export default function Home() {
    return (
        <Layout>
            <h1>Home</h1>
        </Layout>
    );
}
