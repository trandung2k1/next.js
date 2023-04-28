import { Schema, models, model } from 'mongoose';
import { IBlog } from '@/types/blog';
const blogSchema = new Schema<IBlog>(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);
const Blog = models.Blog || model<IBlog>('Blog', blogSchema);
export default Blog;
