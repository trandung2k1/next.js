import React from 'react';
import axios from 'axios';
import { IPost } from '@/types/post';
import Link from 'next/link';
interface IProps {
    posts: IPost[];
}
const Posts = ({ posts }: IProps) => {
    // console.log(posts);
    return (
        <div>
            <h2>All post</h2>
            {posts.map((post) => {
                return (
                    <>
                        <h1>
                            {post.id} - {post.title}
                        </h1>
                        <Link href={`posts/${post.id}`}>See more</Link>
                    </>
                );
            })}
        </div>
    );
};

export async function getStaticProps() {
    const response = await axios.get<IPost[]>('https://jsonplaceholder.typicode.com/posts');
    return {
        props: {
            posts: response.data,
        },
        revalidate: 1,
    };
}

export default Posts;
