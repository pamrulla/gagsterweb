import {useEffect, useState} from 'react';
import Cover from '../components/Cover';
import Gags from '../components/Gags';
import LoadingError from '../components/LoadingError';
import Spinner from '../components/Spinner';
import { useAppState } from '../context/state';
import {useAuthor} from '../hooks/useFeed';

export default function Home() {
    const [author, setAuthor] = useState(false)
    const {feed, isLoading, isError} = useAuthor(author ? author.id : null)
    useEffect(() => {
        async function settingAuther(g) {
          await new Promise(r => setTimeout(r, 2000));
          setAuthor(g)
        }
        var params = new URLSearchParams(window.location.search)
        if(params.has("id") && params.has("name")) {
            var id = params.get("id")
            var name = params.get("name")

            if(author === false) {
                settingAuther({id: id, name: name})
            }
        }
    }, [author])
  
  return (
    <>
      {author ? <Cover main={author.name} sub="Checkout all the gags from the gagster"></Cover> : <Spinner></Spinner>}
      { isError ? 
        (
          <LoadingError/>
        ) :
        isLoading ? 
        (
          <Spinner></Spinner>
        ) :
        (<Gags gags={feed.data.gags}></Gags>)
      }
      
    </>
  )
}
