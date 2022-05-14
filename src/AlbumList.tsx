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
  const [albumData, setAlbumData] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      const response = await fetch("/photoAlbums.json");
      const json = await response.json();
      setAlbumData(json);
    }

    fetchData();
    return () => {
      abortController.abort();
    }
  }, [setAlbumData]);

  let content = null;
  if(albumData === null){
    content = <div>...loading</div>
  }else{
    const albumsNodes: Album[] = albumData;
    const displayAlbums = albumsNodes.map(albumNode => {
      return (
                <div key={albumNode.folderName} className="photo-album">
                  <img className="photo-album-cover" src={getCoverPath("http://localhost:8080", albumNode)} alt={albumNode.displayName} />
                  <br/>
                  <span className="photo-album-name">{albumNode.displayName}</span>
                </div>
              )
    })
    content = <>{displayAlbums}</>

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

