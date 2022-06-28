import './Photo.css'

export default function Photo(props: {folderName: string, fileName: string}) {
    return (
        <div className="photo">
            <img src={props.folderName+"/"+props.fileName} alt={props.fileName} />
        </div>
    )
}