import { useEffect } from 'react'
import './Photo.css'
interface PhotoProps {
    albumURL: string,
    photoFileName: string,
    setLargePhotoFileName: React.Dispatch<React.SetStateAction<string | null>>
}

export default function Photo({ albumURL, photoFileName, setLargePhotoFileName }: PhotoProps) {
    return (
        <div className="photo" onClick={() => setLargePhotoFileName!(photoFileName)}>
            <img src={albumURL + "/" + photoFileName} alt={photoFileName} />
        </div>
    )
}

export function LargePhoto({ albumURL, photoFileName, setLargePhotoFileName }: PhotoProps) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setLargePhotoFileName(null);
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [setLargePhotoFileName])

    return (
        <div className="large-photo" onClick={e => handleLargePhotoClick(e, setLargePhotoFileName)}>
            <div className='large-photo-background'></div>
            <div className="large-photo-img">
                <img src={albumURL + "/" + photoFileName} alt={photoFileName} />
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