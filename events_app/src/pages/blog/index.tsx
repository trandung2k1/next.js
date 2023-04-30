import React from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import Image from 'next/image';
import { IBlog } from '@/types/blog';
import Link from 'next/link';
interface IProps {
    blogs: IBlog[];
}
const Blog: React.FC<IProps> = ({ blogs }) => {
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>All Blog</h1>
            {blogs.map((blog) => {
                return (
                    <div key={blog._id!} style={{ display: 'flex' }}>
                        <div>
                            <Image src={blog.image} width={800} height={450} alt={blog.title} />
                        </div>
                        <div>
                            <h3>{blog.title}</h3>
                            <p>{blog.body}</p>
                            <Link href={`blog/${blog._id}`}>See more</Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=10');
    let blogs: IBlog[] = [];
    try {
        const { data } = await axios.get<IBlog[]>('http://localhost:3000/api/blog');
        blogs = data;
    } catch (error) {}
    return {
        props: {
            blogs: blogs,
        },
    };
};

export default Blog;
