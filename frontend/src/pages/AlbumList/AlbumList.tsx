import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AlbumDetail from '../AlbumDetail/AlbumDetail';
import Navigation from './Navigation';

export type AlbumNode = string | AlbumData;

export interface AlbumData {
  folderName: string,
  displayName: string;
  children: AlbumNode[]
}

export const ROOT_ALBUM_FOLDER_PATH = "http://192.168.162.123:8080";

function AlbumList() {
  const albums = useAlbums();
  const [currentAlbumPath, setCurrentAlbumPath] = useState<string>("");


  if (albums === null) {
    return <div>...loading</div>
  }

  const albumFolders: string[] = currentAlbumPath.replace(ROOT_ALBUM_FOLDER_PATH, "").split("/").slice(1);
  return (
    <>
      <Navigation folders={albumFolders} />
      <Routes>
        <Route path="/" element={<AlbumDetail path={ROOT_ALBUM_FOLDER_PATH} albumNodes={albums} setCurrentAlbumPath={setCurrentAlbumPath} />} />
        {generateRoutes("", albums, setCurrentAlbumPath)}
      </Routes>
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

function generateRoutes(path: string, albumNodes: AlbumNode[], setCurrentFolder: React.Dispatch<React.SetStateAction<string>>): JSX.Element[] {
  let routes: JSX.Element[] = [];

  albumNodes.forEach(node => {
    if (typeof node === "object") {
      const newPath = path + "/" + node.folderName;
      routes.push(<Route key={newPath}
        path={encodeURI(newPath)}
        element={<AlbumDetail path={ROOT_ALBUM_FOLDER_PATH + newPath} albumNodes={node.children} setCurrentAlbumPath={setCurrentFolder} />}
      />);
      routes = routes.concat(generateRoutes(newPath, node.children, setCurrentFolder));
    }
  });

  return routes;
}

export default AlbumList;

