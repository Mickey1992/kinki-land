import { useEffect, useState } from 'react';
import './AlbumList.css';

type AlbumNode = string | AlbumData;

interface AlbumData {
    folderName: string,
    displayName: string;
    cover?: string,
    children: AlbumNode[]
}

function AlbumList() {
  const albums = useAlbums();

  if(albums === null){
    return <div>...loading</div>
  }else{
    return <>{albums.map(album => <Album key={album.folderName} album={album}/>)}</>

  }
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
  return (
    <div className="photo-album">
      <span className="photo-album-cover"><img src={getCoverPath("http://192.168.162.123:8080", props.album)} alt={props.album.displayName} /></span>
      <span className="photo-album-name" title={props.album.displayName}>{props.album.displayName}</span>
    </div> 
  )
}

function getCoverPath(parentPath: string, album: AlbumData) :string{
  const newParentPath = parentPath + "/" + album.folderName;

  if(album.cover){
    return newParentPath + "/" + album.cover;
  }
  
  const lastFile = album.children.at(-1);
  //an album
  if(typeof lastFile === "object"){
    return getCoverPath(newParentPath, lastFile);
  }
  return newParentPath + "/" + lastFile;
}

export default AlbumList;

