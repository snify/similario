import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import SearchBar from '../src/components/SearchBar';
import ListView from '../src/components/ListView';

import styles from '../styles/Home.module.css'
import { SearchProvider } from '../src/components/SearchContext';

export default function Home() {
  const [placeholder, setPlaceholder] = useState('');

  useEffect(() => {
    const movieNames = ['Godzilla', 'The Matrix', 'The Lord of the Rings', 'Star Wars', 'Pulp Fiction', 'Fight Club', 'Indiana Jones'];
    const randomMovieName = movieNames[Math.floor(Math.random() * movieNames.length)]
  
    const searchBarPlaceholder = `Enter movie name (for example "${randomMovieName}")`;

    setPlaceholder(searchBarPlaceholder);
  }, []);


  return (
    <div className={styles.container}>
      <Head>
        <title>similario</title>
        <meta name="description" content="similario" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="preload stylesheet" href="https://fonts.googleapis.com/css2?family=Spinnaker&display=swap" as="style" type="text/css" crossorigin="anonymous" />
      </Head>

      <main className={styles.main}>

        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>
            Similario
          </h1>
          <h2 className={styles.subtitle}>
            search similar movies online<sup> (alpha)</sup>
          </h2>
        </div>

        <br></br>

        <SearchProvider>
          <SearchBar debounce={300} placeholder={placeholder}></SearchBar>
          <ListView></ListView>
        </SearchProvider>
       
      </main>
    </div>
  )
}
