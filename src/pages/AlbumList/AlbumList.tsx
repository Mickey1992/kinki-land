import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AlbumDetail from '../AlbumDetail/AlbumDetail';

export type AlbumNode = string | AlbumData;

export interface AlbumData {
    folderName: string,
    displayName: string;
    children: AlbumNode[]
}

function AlbumList() {
  const albums = useAlbums();

  if(albums === null){
    return <div>...loading</div>
  }

  return (
    <>
      {generateRoutes(albums)}
    </>
  )
}

function useAlbums() {
  const [albums, setAlbums] = useState<AlbumData[] | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      const response = await fetch("/photoAlbums.json");
      const json = await response.json();
      setAlbums(json);
    }

    fetchData();
    return () => {
      abortController.abort();
    }
  }, [setAlbums]);

  return albums;
}

function generateRoutes(albums: AlbumData[]) {
   return (
    <Routes>
      {albums.map(album => <Route key={album.folderName} path={encodeURI(album.folderName)} element={<AlbumDetail node={album.children}/>} />)}
      <Route path="/" element={<AlbumDetail node={albums}/>}/>
    </Routes>);
}

export default AlbumList;

