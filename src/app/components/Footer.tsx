import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faXTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 mt-20">
      <div className="max-w-screen-lg mx-auto flex flex-col items-center">
        <div className="flex space-x-6 mb-4">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faFacebookF}
              className="h-6 w-6 text-white hover:text-gray-400"
            />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faXTwitter}
              className="h-6 w-6 text-white hover:text-gray-400"
            />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              className="h-6 w-6 text-white hover:text-gray-400"
            />
          </a>
        </div>
        <p className="text-center text-sm">
          © {new Date().getFullYear()} Circuit City. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
