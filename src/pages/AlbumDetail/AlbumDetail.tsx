import { useEffect, useState } from "react";
import { AlbumNode, ROOT_ALBUM_FOLDER_PATH } from "../AlbumList/AlbumList";
import Album from "./Album";
import Photo, { LargePhoto } from "./Photo";


export default function AlbumDetail (props: {path: string, albumNodes: AlbumNode[]}) {
    const folders = props.path.replace(ROOT_ALBUM_FOLDER_PATH, "").split("/").slice(1);
    const [largePhotoName, setLargePhotoName] = useState<string|null>(null);

    useEffect(() => {
        setLargePhotoName(null);
    }, [setLargePhotoName, props.path])
    
    return (
        <>
            <h3>{folders.join(" > ")}</h3>
            {
                props.albumNodes.map(node => {     
                    if(typeof node === "string"){
                        return <Photo key={node} folderName={props.path} fileName={node} setLargePhotoName={setLargePhotoName}/>
                    }
                    const newPath = props.path+"/"+node.folderName;
                    return <Album key={node.folderName} path={newPath} album={node}/>
                })
            }
            {largePhotoName && <LargePhoto folderName={props.path} fileName={largePhotoName} setLargePhotoName={setLargePhotoName}/>}
        </>
    )
}
