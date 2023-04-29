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
        if (!mongoose.isValidObjectId(req.query.id?.toString())) {
            return res.status(400).json({
                message: 'Invalid id',
            });
        } else {
            const { title, body, image } = req.body;
            const id = req.query.id;
            const updateBlog = await Blog.findByIdAndUpdate(
                id,
                {
                    title,
                    body,
                    image,
                },
                {
                    new: true,
                },
            );
            if (!updateBlog?.id) {
                return res.status(404).json({
                    message: 'Blog not found',
                });
            }
            return res.status(200).json(updateBlog);
        }
    } else if (req.method === 'DELETE') {
        if (!mongoose.isValidObjectId(req.query.id?.toString())) {
            return res.status(400).json({
                message: 'Invalid id',
            });
        } else {
            const deleteBlog = await Blog.deleteOne({ _id: req.query.id });
            if (deleteBlog.deletedCount === 0) {
                return res.status(404).json({
                    message: 'Blog not found',
                });
            }
            return res.status(200).json({
                message: 'Blog has been successfully deleted',
            });
        }
    }
}
