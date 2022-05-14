import { useEffect, useState } from 'react';
import './App.css';

type AlbumNode = string | Album;

interface Album {
    folderName: string,
    displayName: string;
    cover?: string,
    children: AlbumNode[]
}

function AlbumList() {
  const [albums, setAlbums] = useState<Album[] | null>(null);

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

  let content = null;
  if(albums === null){
    content = <div>...loading</div>
  }else{
    const albumList = albums.map(album => {
      return (
                <div key={album.folderName} className="photo-album">
                  <img className="photo-album-cover" src={getCoverPath("http://localhost:8080", album)} alt={album.displayName} />
                  <br/>
                  <span className="photo-album-name">{album.displayName}</span>
                </div>
              )
    })
    content = <>{albumList}</>

  }

  return content;
}

function getCoverPath(parentPath: string, album: Album) :string{
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

