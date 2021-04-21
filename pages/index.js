import React from 'react';
import Cover from '../components/Cover';
import Gags from '../components/Gags';
import LoadingError from '../components/LoadingError';
import Spinner from '../components/Spinner';
import { useAppState } from '../context/state';
import {useFeed} from '../hooks/useFeed';

export default function Home() {
  const {feed, isLoading, isError} = useFeed()
  const isl = useAppState()

  return (
    <>
      <Cover main="Gags for everyone" sub="Seach gags and your favorite gagster"></Cover>
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
