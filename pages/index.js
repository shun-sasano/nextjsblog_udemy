import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/Layout'
import utilStyle from '../styles/utils.module.css'
import { getPostsData } from '../lib/post'

// SSGの場合
// next.jsに定義されているらしい
// 何やってるんだこれ？？
export async function getStaticProps() {
  const allPostsData = getPostsData();
  console.log(allPostsData);
  
  // この辺はgetStaticProps特有のものらしいので
  // 覚えるしかない
  // ここのpropsはHomeに渡るらしい
  return {
    props: {
      allPostsData
    }
  }
}

// SSRの場合
// export async function getServerSideProps(context) {
//   return {
//     props: {

//     }
//   }
// }

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyle.headingMd}>
        <p>
          私はフルスタックエンジニアです
        </p>
      </section>

      <section>
        <h2>エンジニアのブログ</h2>
        <div className={styles.grid}>  
          {allPostsData.map(({ id, title, date, thumbnail }) => {
            return <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} 
                alt="" className={styles.thumbnailImage}/>
              </Link>
              <Link href={`/posts/${id}`}>
                <a className={utilStyle.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utilStyle.lightText}>{date}</small>
            </article>
          })}
        </div>
      </section>
      
    </Layout>
  );
}
