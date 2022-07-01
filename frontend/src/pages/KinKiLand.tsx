import { Routes, Route } from "react-router-dom";
import AlbumList from "./AlbumList/AlbumList";
import WebpageHeader from "./common/WebsiteHeader";

export default function KinKiLand() {
    return (
        <>
            <WebpageHeader />
            <Routes>
                <Route path="*" element={<AlbumList />} />
            </Routes>
        </>
    )
}