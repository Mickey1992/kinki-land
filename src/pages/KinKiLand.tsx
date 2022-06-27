import { BrowserRouter } from "react-router-dom";
import AlbumList from "./AlbumList/AlbumList";
import WebpageHeader from "./common/WebsiteHeader";

export default function KinKiLand () {
    return (
        <BrowserRouter>
            <WebpageHeader />
            <AlbumList />
        </BrowserRouter>
    )
}