import React from 'react';
import axios from 'axios';
import { IPost } from '@/types/post';
import { useRouter } from 'next/router';
interface IProps {
    post: IPost;
}
interface IContext {
    params: { id: string };
}
const PostItem = ({ post }: IProps) => {
    const router = useRouter();
    if (router.isFallback) {
        return <h2>Loading..</h2>;
    }
    return (
        <div>
            <h1>
                {post.id} - {post?.title}
            </h1>
            <p>{post.body}</p>
            <button onClick={() => router.back()}>Back</button>
        </div>
    );
};
export async function getStaticPaths() {
    const { data } = await axios.get<IPost[]>(
        'https://jsonplaceholder.typicode.com/posts?_limit=10',
    );
    const paths = data.map((post) => ({
        params: { id: post.id.toString() },
    }));
    return { paths, fallback: true };
}
export const getStaticProps = async (context: IContext) => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${+context.params.id}`);
    return {
        props: {
            post: res.data,
        },
    };
};
export default PostItem;
