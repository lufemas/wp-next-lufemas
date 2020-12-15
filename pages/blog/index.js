import Head from 'next/head';
import Link from 'next/link';

// data

// styles
import styles from '../../styles/Home.module.css';


const Blog = () => (
    <div className={styles.container}>
      <Head>
        <title>Blog articles page</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
  
      <main className={styles.main}>
        <p>LF</p>
      </main>
    </div>
  );
  
export default Blog;
