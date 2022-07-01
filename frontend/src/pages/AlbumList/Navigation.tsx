import { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css"

export default function Navigation(props: { folders: string[] }) {
    const naviTags: JSX.Element[] = [];
    let className: string = "navigation-tag-0"
    naviTags.push(props.folders.length === 0 ? <NavigationTag key="0" className={className}>Home</NavigationTag> : <NavigationTag key="0" link="/" className={className}>Home</NavigationTag>)

    for (let i = 0; i < props.folders.length - 1; i++) {
        className = "navigation-tag-" + (i + 1)
        const folder = props.folders[i];
        naviTags.push(
            <NavigationTag key={i + 1} link={"/" + props.folders.slice(0, i + 1).join("/")} className={className}>{folder}</NavigationTag>
        );
    }

    className = "navigation-tag-" + props.folders.length
    props.folders.length > 0 && naviTags.push(<NavigationTag key={props.folders.length} className={className}>{props.folders[props.folders.length - 1]}</NavigationTag>);

    return (
        <div className="navigation">
            {naviTags}
        </div>
    )

}

function NavigationTag(props: { children: ReactNode, link?: string, className: string }) {
    return (
        <span className={`navigation-tag ${props.className} ${props.link ? "has-link" : "no-link"}`}>
            {props.link ? <Link to={props.link}>{props.children}</Link> : props.children}
        </span>
    )
}