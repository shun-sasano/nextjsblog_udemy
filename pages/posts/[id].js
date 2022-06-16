import Head from "next/head";
import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/post";
import utilStyles from "../../styles/utils.module.css"


// nextで定義されている
// getStaticPathsを使っているが、開発環境ではSSGではなく、SSRになっているらしい
export async function getStaticPaths() {
    const paths = getAllPostIds();

    // pathsに書かれているpathをプリレンダリングに使うので大事。
    // fallbacksがtrueの場合はpathに含まれていないものなら動的に生成してくれる(SSR??)
    return {
        paths,
        fallback: false, // pathsに含まれていない場合は404にする
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);

    return {
        props: {
            postData,
        }
    }
}

export default function Post ({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <h1 className={utilStyles.headingX1}>{postData.title}</h1>
            <div className={utilStyles.lightText}>{postData.date}</div>
            <br />

            <br />
            <div dangerouslySetInnerHTML={{__html: postData.blogContentHTML}}></div>
        </Layout>
    );
}