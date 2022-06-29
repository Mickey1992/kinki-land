import { useEffect, useState } from "react";
import { AlbumNode } from "../AlbumList/AlbumList";
import Album from "./Album";
import Photo, { LargePhoto } from "./Photo";

interface AlbumDetailProps {
    path: string,
    albumNodes: AlbumNode[],
    setCurrentAlbumPath: React.Dispatch<React.SetStateAction<string>>
}
export default function AlbumDetail(props: AlbumDetailProps) {
    const [largePhotoName, setLargePhotoName] = useState<string | null>(null);

    useEffect(() => {
        setLargePhotoName(null);
        props.setCurrentAlbumPath(props.path);
    }, [setLargePhotoName, props])

    return (
        <>
            {
                props.albumNodes.map(node => {
                    if (typeof node === "string") {
                        return <Photo key={node} folderName={props.path} fileName={node} setLargePhotoName={setLargePhotoName} />
                    }
                    const newPath = props.path + "/" + node.folderName;
                    return <Album key={node.folderName} path={newPath} album={node} />
                })
            }
            {largePhotoName && <LargePhoto folderName={props.path} fileName={largePhotoName} setLargePhotoName={setLargePhotoName} />}
        </>
    )
}

