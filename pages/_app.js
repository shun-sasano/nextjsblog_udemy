import '../styles/globals.css'
// NOTE: もうちょっと範囲の狭いglobals.cssが欲しいときはどうしたらいいのだろう
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
