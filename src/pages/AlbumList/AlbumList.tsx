import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AlbumDetail from '../AlbumDetail/AlbumDetail';

export type AlbumNode = string | AlbumData;

export interface AlbumData {
    folderName: string,
    displayName: string;
    children: AlbumNode[]
}

const rootAlbumFolderPath = "http://192.168.162.123:8080";

function AlbumList() {
  const albums = useAlbums();

  if(albums === null){
    return <div>...loading</div>
  }

  console.info(generateRoutes("", albums));

  return (
    <Routes>
      <Route path="/" element={<AlbumDetail path={rootAlbumFolderPath} albumNodes={albums}/>}/>
      {generateRoutes("", albums)}
    </Routes>
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

function generateRoutes(path:string, albumNodes: AlbumNode[]): JSX.Element[] {
  let routes: JSX.Element[] = [];
  
  albumNodes.forEach(node => {
    if(typeof node === "object") {
      const newPath = path+"/"+node.folderName;
      routes.push(<Route key={newPath} path={encodeURI(newPath)} element={<AlbumDetail path={rootAlbumFolderPath+newPath} albumNodes={node.children}/>} />);
      routes = routes.concat(generateRoutes(newPath, node.children));
    }
  });

  
  return routes;
}

export default AlbumList;

