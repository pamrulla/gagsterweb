import {useEffect, useState} from 'react';
import Gags from '../components/Gags';
import ViewImage from '../components/ViewImage';
import styles from '../styles/view.module.scss';
import {useSearch} from '../hooks/useFeed';
import LoadingError from '../components/LoadingError';
import Spinner from '../components/Spinner';
import { fromBase64 } from 'js-base64';

export default function Home() {
  const [viewgag, setGag] = useState(false)
  var {feed, isLoading, isError} = useSearch(viewgag ? viewgag.Tags : null)
    useEffect(() => {
        async function settingGag(g) {
          await new Promise(r => setTimeout(r, 2000));
          setGag(g)
        }
        var params = new URLSearchParams(window.location.search)
        if(params.has("gag")) {
            var g = JSON.parse(fromBase64(params.get("gag")))
            if(viewgag === false) {
                settingGag(g)
            }
        }
    }, [viewgag])
  return (
    <>
      <ViewImage viewgag={viewgag}></ViewImage>
      <h1 className={styles.lead + ' ' + styles.title + ' ' + styles['text-center'] + ' ' + styles['text-light']}>Similar Gags</h1>
      <>
        { isError ? 
          (
            <LoadingError/>
          ) :
          isLoading ? 
          (
            <Spinner></Spinner>
          ) :
          (<Gags gags={feed.data.Gags}></Gags>)
        }
      </>
    </>
  )
}
