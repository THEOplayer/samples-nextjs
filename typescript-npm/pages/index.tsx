import Head from 'next/head'
import styles from '../styles/Home.module.css'
import dynamic from "next/dynamic";
const THEOplayerWrapper = dynamic(() => import('../pages/THEOplayerWrapper'), { ssr: false });

export default function Home() {
  const theoplayerData = {
      source: {
          "sources": [{
              "src": "//cdn.theoplayer.com/video/elephants-dream/playlist.m3u8",
              "type": "application/x-mpegurl"
          }],
          "poster": "//cdn.theoplayer.com/video/elephants-dream.png"
      },
      autoplay: false,
      preload: "auto"
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js TypeScript: THEOplayer with NPM</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <THEOplayerWrapper data={theoplayerData} onPlay={() => {console.log("The player has started playing.")}}></THEOplayerWrapper>
      </main>
    </div>
  )
}
