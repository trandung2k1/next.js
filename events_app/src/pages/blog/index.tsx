import React from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import moment from 'moment';
import Image from 'next/image';
import { IBlog } from '@/types/blog';
interface IProps {
    blogs: IBlog[];
}
const Blog: React.FC<IProps> = ({ blogs }) => {
    return (
        <div>
            <h1>Blogs</h1>
            {blogs.map((blog) => {
                return (
                    <div key={blog._id} style={{ display: 'flex' }}>
                        <div>
                            <Image src={blog.image} width={800} height={450} alt={blog.title} />
                        </div>
                        <div>
                            <h3>{blog.title}</h3>
                            <p>{blog.body}</p>
                            <p>createdAt: {moment(blog.createdAt).fromNow()}</p>
                            <p>updatedAt: {moment(blog.updatedAt).fromNow()}</p>
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
