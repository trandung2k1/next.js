import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Image from 'next/image';
import moment from 'moment';
import axios from 'axios';
import { IBlog } from '@/types/blog';
import { ParsedUrlQuery } from 'querystring';
interface IProps {
    blog: IBlog;
}
interface IParams extends ParsedUrlQuery {
    id: string;
}
const BlogItem = ({ blog }: IProps) => {
    const router = useRouter();
    if (router.isFallback) {
        return <h2>Loading..</h2>;
    } else {
        return (
            <div>
                <div style={{ display: 'flex' }}>
                    <div>
                        <Image src={blog.image} width={800} height={450} alt={blog.title} />
                    </div>
                    <div>
                        <h3>{blog.title}</h3>
                        <p>{blog.body}</p>
                        <p>createdAt: {moment(blog.createdAt).fromNow()}</p>
                        <p>updatedAt: {moment(blog.updatedAt).fromNow()}</p>
                        <button onClick={() => router.back()}>Back</button>
                    </div>
                </div>
            </div>
        );
    }
};
export const getStaticPaths: GetStaticPaths<IParams> = async () => {
    const { data } = await axios.get<IBlog[]>('http://localhost:3000/api/blog?limit=1');
    const paths = data.map((blog) => ({
        params: { id: blog?._id!.toString() },
    }));
    return { paths, fallback: true };
};
export const getStaticProps: GetStaticProps<IProps, IParams> = async (
    context: GetStaticPropsContext<IParams>,
) => {
    const res = await axios.get<IBlog>(`http://localhost:3000/api/blog/${context.params?.id}`);
    return {
        props: {
            blog: res.data,
        },
    };
};
export default BlogItem;
