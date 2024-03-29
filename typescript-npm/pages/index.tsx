import { useCallback, useMemo, useState } from "react";
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import dynamic from "next/dynamic";
import type { PreloadType, SourceDescription } from "theoplayer";
import 'theoplayer/ui.css';

const THEOplayerWrapper = dynamic(() => import('../components/THEOplayerWrapper'), {
    ssr: false,
    loading: () => (<div className={"video-js theoplayer-skin vjs-16-9"} />)
});

const preloadTypes: PreloadType[] = ['none', 'metadata', 'auto'];

export default function Home() {
  const source = useMemo<SourceDescription>(() => ({
      sources: [{
          src: "//cdn.theoplayer.com/video/elephants-dream/playlist.m3u8",
          type: "application/x-mpegurl"
      }],
      poster: "//cdn.theoplayer.com/video/elephants-dream.png"
  }), []);
  const [autoplay, setAutoPlay] = useState(false);
  const [preload, setPreload] = useState<PreloadType>("none");
  const onPlay = useCallback(() =>  {
      console.log("The player has started playing.");
  }, []);

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
        <THEOplayerWrapper
            source={source}
            preload={preload}
            autoplay={autoplay}
            onPlay={onPlay}
        />
        <div className={styles.options}>
          <label><input type="checkbox" checked={autoplay} onChange={() => setAutoPlay(!autoplay)} /> Autoplay</label>
          <label>Preload:&nbsp;
            <select value={preload} onChange={(e) => setPreload(e.target.value as PreloadType)}>
              {preloadTypes.map((preloadOption) => (<option key={preloadOption} value={preloadOption}>{preloadOption}</option>))}
            </select>
          </label>
        </div>
      </main>
    </div>
  )
}
