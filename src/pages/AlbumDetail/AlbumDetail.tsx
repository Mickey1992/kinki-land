import { useParams } from "react-router-dom"
import { AlbumNode } from "../AlbumList/AlbumList";
import Album from "./Album";

export default function AlbumDetail (props: {albumNodes: AlbumNode[]}) {
    let params = useParams();
    console.info(params);
    return <>{props.albumNodes.map(node => {
        if(typeof node === "string"){
            return<p>node</p>;
        }
        return <Album key={node.folderName} album={node}/>
    })}</>
}