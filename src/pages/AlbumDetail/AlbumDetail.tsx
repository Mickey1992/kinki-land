import { AlbumNode } from "../AlbumList/AlbumList";
import Album from "./Album";


export default function AlbumDetail (props: {path: string, albumNodes: AlbumNode[]}) {
    return <>{props.albumNodes.map(node => {     
        if(typeof node === "string"){
            return<p>{node}</p>;
        }
        const newPath = props.path+"/"+node.folderName;
        return <Album path={newPath} key={node.folderName} album={node}/>
    })}</>
}