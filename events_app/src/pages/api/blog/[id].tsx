import Blog from '@/models/blog.model';
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/db/db';
import mongoose from 'mongoose';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();
    if (req.method === 'GET') {
        if (!mongoose.isValidObjectId(req.query.id?.toString())) {
            return res.status(400).json({
                message: 'Invalid id',
            });
        } else {
            const blog = await Blog.findById(req.query.id);
            if (!blog) {
                return res.status(404).json({
                    message: 'Blog not found',
                });
            }
            return res.status(200).json(blog);
        }
    } else if (req.method === 'PUT') {
    } else if (req.method === 'DELETE') {
    }
}
