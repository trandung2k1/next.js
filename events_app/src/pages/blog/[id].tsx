import React from 'react';
import mongoose from 'mongoose';
import { useRouter } from 'next/router';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import axios from 'axios';
import { IBlog } from '@/types/blog';
const BlogItem = () => {
    const router = useRouter();
    const id: string = router.query.id as string;
    console.log(typeof id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return (
            <>
                <h1>Invalid Id</h1>
            </>
        );
    } else if (router.isFallback) {
        return <h2>Loading..</h2>;
    }
    return <div>BlogItem</div>;
};

export const getStaticPaths = async () => {
    const { data } = await axios.get<IBlog[]>('http://localhost:3000/api/blog');
    const paths = data.map((blog) => ({
        params: { id: blog?._id!.toString() },
    }));
    console.log(paths);
    return { paths, fallback: true };
};
export const getStaticProps = async (context: any) => {
    const res = await axios.get<IBlog>(`http://localhost:3000/api/blog/${context.params?.id}`);
    return {
        props: {
            post: res.data,
        },
    };
};
export default BlogItem;
