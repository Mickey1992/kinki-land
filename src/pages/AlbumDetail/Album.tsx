import { useNavigate } from "react-router-dom";
import { AlbumData } from "../AlbumList/AlbumList";
import './Album.css';

export default function Album(props: { path: string, album: AlbumData }) {
  const navigate = useNavigate();

  return (
    <div className="photo-album" onClick={() => { navigate(encodeURI(props.album.folderName)) }}>
      <AlbumCover path={props.path} album={props.album} />
      <span className="photo-album-name" title={props.album.displayName}>{props.album.displayName}</span>
    </div>
  )
}

function AlbumCover(props: { path: string, album: AlbumData }) {
  const photos = getCoverPath(props.path, props.album);
  return (
    <div className="cover">
      <div className="cover-photo1" style={{ backgroundImage: `url("${photos[0]}")` }} />
      <div className="cover-photo2" style={{ backgroundImage: `url("${photos[1]}")` }} />
    </div>
  )
}

function getCoverPath(path: string, album: AlbumData): string[] {
  const lastFile = album.children.at(-1);
  //an album
  if (typeof lastFile === "object") {
    const childPath = path + "/" + lastFile.folderName;
    return getCoverPath(childPath, lastFile);
  }

  return [path + "/" + lastFile, path + "/" + album.children.at(-2)];
}