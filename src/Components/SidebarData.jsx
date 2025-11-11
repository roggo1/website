import React from "react";

export const SidebarData = [
    {
        title: "Home",
        link: "/Home",
    },
    {
        title: "Projects",
        isDropdown: true, 
        subLinks: [
            { title: "Game of Life", link: "/GameOfLife" },
            // Add more project links here
        ],
    },
    {
        title: "Blog",
        link: "/Blog",
    },
];