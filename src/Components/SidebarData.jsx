import React from "react";

export const SidebarData = [
    {
        title: "Home",
        link: "/Home",
    },
    {
        title: "Projects",
        isDropdown: true,
        link: "/Projects", // Add this so clicking the title goes to Projects page
        subLinks: [
            { title: "Fractals", link: "/Projects/Fractals" },
            { title: "Game of Life", link: "/Projects/GameOfLife" },
        ],
    },
    {
        title: "Blog",
        link: "/Blog",
    },
];