import { useParams } from "react-router-dom"

export default function AlbumDetail () {
    let params = useParams();
    console.info(params["*"]);
    return <h2>{params["*"]}</h2>
}