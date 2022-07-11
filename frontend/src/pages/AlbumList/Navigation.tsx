import { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css"

interface NavigationProps {
    navigationPath: string[]
}

export default function Navigation({ navigationPath }: NavigationProps) {
    const navigationTags: JSX.Element[] = [];
    let className: string = "navigation-tag-0"
    navigationTags.push(navigationPath.length === 0 ? <NavigationTag key="0" className={className}>Home</NavigationTag> : <NavigationTag key="0" link="/" className={className}>Home</NavigationTag>)

    for (let i = 0; i < navigationPath.length - 1; i++) {
        className = "navigation-tag-" + (i + 1)
        const navigationItem = navigationPath[i];
        navigationTags.push(
            <NavigationTag key={i + 1} link={"/" + navigationPath.slice(0, i + 1).join("/")} className={className}>{navigationItem}</NavigationTag>
        );
    }

    className = "navigation-tag-" + navigationPath.length
    navigationPath.length > 0 && navigationTags.push(<NavigationTag key={navigationPath.length} className={className}>{navigationPath[navigationPath.length - 1]}</NavigationTag>);

    return (
        <div className="navigation">
            {navigationTags}
        </div>
    )

}

interface NavigationTagProps {
    children: ReactNode,
    link?: string,
    className: string
}

function NavigationTag({ children, link, className }: NavigationTagProps) {
    return (
        <span className={`navigation-tag ${className} ${link ? "has-link" : "no-link"}`}>
            {link ? <Link to={link}>{children}</Link> : children}
        </span>
    )
}