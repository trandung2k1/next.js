import type { NextApiRequest, NextApiResponse } from 'next';
import Blog from '@/models/blog.model';
import connectDB from '@/db/db';
import { IBlog } from '@/types/blog';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();
    if (req.method === 'GET') {
        const limit = req.query?.limit!;
        let blogs: IBlog[] = [];
        if (limit) {
            blogs = await Blog.find().limit(+limit);
        } else {
            blogs = await Blog.find();
        }
        return res.status(200).json(blogs);
    } else if (req.method === 'POST') {
        const { title, body, image } = req.body;
        const findBlog = await Blog.findOne({ title: title });
        if (findBlog) {
            return res.status(200).json({
                message: 'Blog already exists',
            });
        }
        const newBlog = new Blog({ title, body, image });
        const savedBlog = await newBlog.save();
        return res.status(200).json(savedBlog);
    }
}
