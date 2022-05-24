import React from "react";
import { ImLinkedin, ImGithub, ImTwitter } from "react-icons/im";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="social__media__icons">
        <a
          className="footer__linkedin"
          href="https://linkedin.com/in/deepak-1373"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ImLinkedin />
        </a>
        <a
          href="https://github.com/Deepak-1373"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ImGithub />
        </a>
        <a
          className="footer__twitter"
          href="https://twitter.com/dkamat001"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ImTwitter />
        </a>
      </div>

      <div className="footer__text">
        <h3>Made by Deepak Kamat🚀</h3>
        <h3>Connect with me 🧑‍💻</h3>
      </div>
    </div>
  );
}

export default Footer;
