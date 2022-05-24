import React from "react";
import { ImLinkedin, ImGithub, ImTwitter } from "react-icons/im";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="social__media__icons">
        <ImLinkedin />
        <ImGithub />
        <ImTwitter />
      </div>

      <div className="footer__text">
        <h3>Made by Deepak Kamat🚀</h3>
        <h3>Connect with me 🧑‍💻</h3>
      </div>
    </div>
  );
}

export default Footer;
