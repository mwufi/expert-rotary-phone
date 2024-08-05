import ReactMarkdown from 'react-markdown';
import { Merriweather } from 'next/font/google';

const merriweather = Merriweather({
    weight: ['300', '400', '700'],
    subsets: ['latin'],
});

const markdown = `
# heading

this is my first post

[Back to home](/personal)
`


const BlogPost = () => {
    return (
        <div className={`${merriweather.className} max-w-2xl mx-auto px-4 py-16`}>
            <ReactMarkdown className="prose prose-invert">
                {markdown}
            </ReactMarkdown>
        </div>
    );
};

export default BlogPost;
