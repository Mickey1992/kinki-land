import './Photo.css'
interface PhotoProps {
    folderName: string, 
    fileName: string,
    setLargePhotoSrc?: React.Dispatch<React.SetStateAction<string | null>>
}

export default function Photo(props: PhotoProps) {
    return (
        <div className="photo"  onClick={() => props.setLargePhotoSrc!(props.fileName)}>
            <img src={props.folderName+"/"+props.fileName} alt={props.fileName} />
        </div>
    )
}

export function LargePhoto(props: PhotoProps) {
    return (
        <div className="large-photo">
            <div className='large-photo-background'></div>
            <div className="large-photo-img">
                <img src={props.folderName+"/"+props.fileName} alt={props.fileName} />
            </div>
        </div>
    )
}