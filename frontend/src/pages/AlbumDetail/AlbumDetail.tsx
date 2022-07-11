import { useEffect, useState } from "react";
import { AlbumNode } from "../AlbumList/AlbumList";
import Album from "./Album";
import Photo, { LargePhoto } from "./Photo";

interface AlbumDetailProps {
    albumURL: string,
    albumNodes: AlbumNode[],
    setCurrentAlbumURL: React.Dispatch<React.SetStateAction<string>>
}
export default function AlbumDetail({ albumURL, albumNodes, setCurrentAlbumURL }: AlbumDetailProps) {
    const [largePhotoFileName, setLargePhotoFileName] = useState<string | null>(null);

    useEffect(() => {
        setLargePhotoFileName(null);
        setCurrentAlbumURL(albumURL);
    }, [setLargePhotoFileName, setCurrentAlbumURL, albumURL])

    return (
        <>
            {
                albumNodes.map(node => {
                    if (typeof node === "string") {
                        return <Photo key={node} albumURL={albumURL} photoFileName={node} setLargePhotoFileName={setLargePhotoFileName} />
                    }
                    const newURL = albumURL + "/" + node.folderName;
                    return <Album key={node.folderName} albumURL={newURL} album={node} />
                })
            }
            {largePhotoFileName && <LargePhoto albumURL={albumURL} photoFileName={largePhotoFileName} setLargePhotoFileName={setLargePhotoFileName} />}
        </>
    )
}

