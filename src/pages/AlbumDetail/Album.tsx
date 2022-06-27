import { useNavigate } from "react-router-dom";
import { AlbumData } from "../AlbumList/AlbumList";
import './Album.css';

export default function Album(props: {album: AlbumData}) {
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