import React from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { IBlog } from '@/types/blog';
interface IProps {
    blogs: IBlog[];
}
const Blog: React.FC<IProps> = ({ blogs }) => {
    console.log(blogs);
    return <div>Blog</div>;
};
export const getServerSideProps: GetServerSideProps = async () => {
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
