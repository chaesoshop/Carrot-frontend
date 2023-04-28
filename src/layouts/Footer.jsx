import React from "react";
import { GrApple } from "react-icons/gr";
import { FaGooglePlay } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsYoutube, BsFacebook, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <div
      style={{
        height: "500px",
        marginTop: "20px",
      }}
    >
      <hr />
      <footer
        className="p-10 flex gap-12"
        style={{
          width: "850px",
          height: "200px",
          margin: "0 auto",
        }}
      >
        
        <div
          style={{
            paddingTop: "15px",
          }}
        >
          <span
            className="font-bold flex"
            style={{
              paddingBottom: "15px",
            }}
          >
            채소마켓 앱 다운로드
          </span>
          <div className="flex gap-8">
            <a
              href="#"
              className="flex items-center gap-2 font-bold rounded-md"
              style={{
                fontSize: "1rem",
                padding: "10px",
                backgroundColor: "#EEEEEE",
              }}
            >
              <GrApple />
              App Store
            </a>

            <a
              href="#"
              className="flex items-center gap-2 font-bold rounded-md"
              style={{
                fontSize: "1rem",
                padding: "10px",
                backgroundColor: "#EEEEEE",
              }}
            >
              <FaGooglePlay />
              Google Play
            </a>
          </div>
        </div>
      </footer>
      <div
        className="flex py-4 border-t  text-base-content border-base-300 gap-4"
        style={{
          width: "800px",
          margin: "0 auto",
        }}
      >
        <div
          className="text-sm "
          style={{
            width: "520px",
            color: "gray",
          }}
        >
          <span className="font-bold">MADE</span>
          <span> 이승은 박유은 최수애 홍진주</span>
          <br />
          <span className="font-bold">Sungkyul University</span>
          <br />
          <span> Department of Information and Communication Engineering</span>
          <br />
          <span className="font-bold">Graduation Products</span>
          <span> 2023 -</span>
          <br />
          <br />
        </div>

        <div
          className="flex gap-4"
          style={{
            width: "200px",
            fontSize: "1.5rem",
            color: "gray",
          }}
        >
          <a href="#">
            <BsFacebook />
          </a>
          <a href="#">
            <BsYoutube />
          </a>
          <a href="#">
            <AiOutlineInstagram />
          </a>
          <a href="#">
            <BsTwitter />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
