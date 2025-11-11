import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { SidebarData } from "./SidebarData";

function Sidebar() {
    return (
        <div className="Sidebar">
            <ul className="SidebarList">
                {SidebarData.map((val, key) => {
                    // Check if the item is a dropdown
                    if (val.isDropdown) {
                        return (
                            <li key={key} className="dropdown">
                                <Link to={val.link} className="dropdown-title">
                                    {val.title}
                                </Link>
                                <ul className="dropdown-content">
                                    {val.subLinks.map((subVal, subKey) => (
                                        <li key={subKey}>
                                            <Link to={subVal.link}>{subVal.title}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        );
                    }

                    // Regular links
                    return (
                        <Link to={val.link} key={key} className="row">
                            <li id="title">{val.title}</li>
                        </Link>
                    );
                })}
            </ul>
        </div>
    );
}

export default Sidebar;