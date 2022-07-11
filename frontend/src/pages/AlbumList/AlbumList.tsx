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

const ROOT_PHOTO_RESOURCE_PATH = window.location.port === "3000" ? "http://192.168.162.123:8080" : "/photos";

function AlbumList() {
  const albums = useAlbums();
  const [currentAlbumURL, setCurrentAlbumURL] = useState<string>("");


  if (albums === null) {
    return <div>...loading</div>
  }

  const albumFolderHierarchy: string[] = currentAlbumURL.replace(ROOT_PHOTO_RESOURCE_PATH, "").split("/").slice(1);
  return (
    <>
      <Navigation navigationPath={albumFolderHierarchy} />
      <Routes>
        <Route path="/" element={<AlbumDetail albumURL={ROOT_PHOTO_RESOURCE_PATH} albumNodes={albums} setCurrentAlbumURL={setCurrentAlbumURL} />} />
        {generateRoutes("", albums, setCurrentAlbumURL)}
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

function generateRoutes(routePath: string, albumNodes: AlbumNode[], setCurrentAlbumURL: React.Dispatch<React.SetStateAction<string>>): JSX.Element[] {
  let routes: JSX.Element[] = [];

  albumNodes.forEach(node => {
    if (typeof node === "object") {
      const newRoutePath = routePath + "/" + node.folderName;
      routes.push(<Route key={newRoutePath}
        path={encodeURI(newRoutePath)}
        element={<AlbumDetail albumURL={ROOT_PHOTO_RESOURCE_PATH + newRoutePath} albumNodes={node.children} setCurrentAlbumURL={setCurrentAlbumURL} />}
      />);
      routes = routes.concat(generateRoutes(newRoutePath, node.children, setCurrentAlbumURL));
    }
  });

  return routes;
}

export default AlbumList;

