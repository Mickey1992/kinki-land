import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AlbumDetail from '../AlbumDetail/AlbumDetail';
import './AlbumList.css';

type AlbumNode = string | AlbumData;

interface AlbumData {
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
      {albums.map(album => <Album key={album.folderName} album={album}/>)}
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

function Album(props: {album: AlbumData}) {
  const navigate = useNavigate();

  return (
    <div className="photo-album" onClick={() => {navigate(encodeURI(props.album.folderName))}}>
      <AlbumCover album={props.album} /> 
      <span className="photo-album-name" title={props.album.displayName}>{props.album.displayName}</span>
    </div>
  )
}

function AlbumCover(props: {album: AlbumData}) {
  const photos = getCoverPath("http://192.168.162.123:8080", props.album);
  return (
    <div className="cover">
      <div className="cover-photo1" style={{backgroundImage: `url("${photos[0]}")`}} />
      <div className="cover-photo2" style={{backgroundImage: `url("${photos[1]}")`}} />
    </div>
  )
}

function getCoverPath(parentPath: string, album: AlbumData) :string[]{
  const newParentPath = parentPath + "/" + album.folderName;
  
  const lastFile = album.children.at(-1);
  //an album
  if(typeof lastFile === "object"){
    return getCoverPath(newParentPath, lastFile);
  }


  return [newParentPath + "/" + lastFile, newParentPath + "/" + album.children.at(-2)];
}

function generateRoutes(albums: AlbumData[]) {
   return (
    <Routes>
      {albums.map(album => <Route path={encodeURI(album.folderName)} element={<AlbumDetail/>} />)}
    </Routes>);
}

export default AlbumList;

