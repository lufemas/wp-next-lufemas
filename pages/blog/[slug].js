import {useRouter} from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

//data GRAPHQL API
import { getAllPostsWithSlug, getPost } from '../../lib/api'

//stylesheets
import styles from '../../styles/Home.module.css';
import blogStyles from '../../styles/Blog.module.css';

export default function Post({ postData }){
    const router = useRouter();

    if (! router.isFallback && !postData?.slug){
        return <p>Can't find this post</p>
    }

    const formatDate = date => {
        const newDate = new Date(date)

        return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>{postData.title}</title>
                <link rel="icon" href="./favicon.ico"/>
            </Head>

            <main className={styles.main}>
                {router.isFallback ? (
                    <h2>Loading...</h2>
                ) : (
                    <article className={blogStyles.article}>
                        <figure>
                        <img
                            src={postData.featuredImage.node.sourceUrl}
                            alt={postData.title}
                        />
                        </figure>
                        <div className={blogStyles.postmeta}>
                            <h1 className={blogStyles.title}>{postData.title}</h1>
                            <p>{formatDate(postData.date)}</p>
                        </div>
                        <div
                            className='post-content content'
                            dangerouslySetInnerHTML={{__html: postData.content }}
                        />
                    </article>
                )}
                <p>
                    <Link href='/blog'>
                        <a>back to articles</a>
                    </Link>
                </p>
            </main>    
        </div>
    );

}

export async function getStaticProps ({params}){
    const data = await getPost( params.slug)

    return {
        props: {
            postData: data.post
        }
    }

}

export async function getStaticPaths() {
    const allPosts = await getAllPostsWithSlug();

    allPosts.edges.map( ({node}) => console.log(`$$$NODE$$$$: ${node}`) ) 

    return {
        paths: allPosts.edges.map( ({node}) => `/blog/${node.slug}` ) || [],
        fallback: true
    }
}

