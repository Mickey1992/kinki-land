import './Photo.css'
interface PhotoProps {
    folderName: string,
    fileName: string,
    setLargePhotoName: React.Dispatch<React.SetStateAction<string | null>>
}

export default function Photo(props: PhotoProps) {
    return (
        <div className="photo" onClick={() => props.setLargePhotoName!(props.fileName)}>
            <img src={props.folderName + "/" + props.fileName} alt={props.fileName} />
        </div>
    )
}

export function LargePhoto(props: PhotoProps) {
    return (
        <div className="large-photo" onClick={e => handleLargePhotoClick(e, props.setLargePhotoName)}>
            <div className='large-photo-background'></div>
            <div className="large-photo-img">
                <img src={props.folderName + "/" + props.fileName} alt={props.fileName} />
            </div>
        </div>
    )
}

function handleLargePhotoClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>, setLargePhotoName: React.Dispatch<React.SetStateAction<string | null>>) {
    const target = event.target as HTMLElement;
    const classList = target.classList
    if (classList.contains("large-photo-background") || classList.contains("large-photo-img")) {
        setLargePhotoName(null);
    }
}