import { useNavigate } from "react-router-dom";
import { AlbumData } from "../AlbumList/AlbumList";
import './Album.css';
interface AlbumProps {
  albumURL: string,
  album: AlbumData
}

export default function Album({ albumURL, album }: AlbumProps) {
  const navigate = useNavigate();

  return (
    <div className="photo-album" onClick={() => { navigate(encodeURI(album.folderName)) }}>
      <AlbumCover albumURL={albumURL} album={album} />
      <span className="photo-album-name" title={album.displayName}>{album.displayName}</span>
    </div>
  )
}

function AlbumCover({ albumURL, album }: AlbumProps) {
  const photoURLs = getCoverPhotoURLs(albumURL, album);
  return (
    <div className="cover">
      <div className="cover-photo1" style={{ backgroundImage: `url("${photoURLs[0]}")` }} />
      <div className="cover-photo2" style={{ backgroundImage: `url("${photoURLs[1]}")` }} />
    </div>
  )
}

function getCoverPhotoURLs(path: string, album: AlbumData): string[] {
  const lastItem = album.children.at(-1);
  //an album
  if (typeof lastItem === "object") {
    const childPath = path + "/" + lastItem.folderName;
    return getCoverPhotoURLs(childPath, lastItem);
  }

  return [path + "/" + lastItem, path + "/" + album.children.at(-2)];
}