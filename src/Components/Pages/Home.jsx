import React from "react";
import "./Home.css";
import { CiMail } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";

/*
TO DO:
The basic plan for the homepage is for it basically to introduce the website and what there is on it. But the main thing on it should be 
basically a resume for me with links to my github, linkedin, email I'll make a dedicated email so that I don't have a bunch of spam people that
I send out my resume to will get a different one.

It should have a list of my skills, a brief summary about me, and a link to download my full resume as a PDF.
As well as Education and Experience sections.
*/


const Home = () => {
  return (
    <div className="home-container">
      <img src="/public/profile_default.png" alt="Avatar"></img>
      <h1>Roger McPhail</h1>
      <p className="contact_info">rogermcphail07@gmail.com <CiMail size = {24}/>  https://github.com/roggo1 <FaGithub size = {24}/></p>
      <h2>Bio here</h2>
      <p>Skills: List of skills here</p>
      <p>Education: List of education here</p>
      <p>Link to the projects</p>
      <p>link to</p>
    </div>
  );
};

export default Home;