import { AlbumNode, ROOT_ALBUM_FOLDER_PATH } from "../AlbumList/AlbumList";
import Album from "./Album";
import Photo from "./Photo";


export default function AlbumDetail (props: {path: string, albumNodes: AlbumNode[]}) {
    const folders = props.path.replace(ROOT_ALBUM_FOLDER_PATH, "").split("/").slice(1);
    return (
        <>
            <h3>{folders.join(" > ")}</h3>
            {
                props.albumNodes.map(node => {     
                    if(typeof node === "string"){
                        return <Photo key={node} folderName={props.path} fileName={node} />
                    }
                    const newPath = props.path+"/"+node.folderName;
                    return <Album key={node.folderName} path={newPath} album={node}/>
                })
            }
        </>
    )
}