import mongoose from 'mongoose';
export interface IBlog {
    _id?: string;
    title: string;
    body: string;
    image: string;
    createdAt?: Date;
    updatedAt?: Date;
}
