import axios from "axios";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { authenticatedState } from "../recoil/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarrot, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const LoginedBoardHeader = ({ setLogined }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "65px",
        position: "sticky",
        top: "0%",
        zIndex: "9999",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          width: "1100px",
          height: "100%",
          justifyContent: "space-between",
          margin: "0 auto",
          display: "flex",
          backgroundColor: "white",
          position: "sticky",
          top: "0%",
          zIndex: "9999",
        }}
      >
        <div
          className="flex items-center justify-around"
          style={{
            width: "550px",
            height: "100%",
            fontSize: "1.2rem",
            fontWeight: "bolder",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              color: "#ffa445",
              fontSize: "1.4rem",
            }}
          >
            <a href="http://localhost:3000/" className="fontt">
              <FontAwesomeIcon
                icon={faCarrot}
                style={{
                  fontSize: "1.8rem",
                }}
              />
              당근마켓
            </a>
          </div>
          <div>
            <a href="http://localhost:3000/allproduct">중고거래</a>
          </div>
          <div>
            <a href="http://localhost:3000/alljobs">알바</a>
          </div>
          <div>
            <a href="http://localhost:3000/allrealty">부동산 직거래</a>
          </div>
          <div
            style={{
              color: "#ffa445",
            }}
          >
            <a href="http://localhost:3000/board">동네게시판</a>
          </div>
        </div>
        <div className="flex-grow justify-center items-center flex" style={{}}>
          <button
            style={{
              outline: "1px #bcbcbc solid",
              padding: "5px 5px",
              borderRadius: "5px",
            }}
            onClick={() => {
              sessionStorage.clear();
              setLogined(false);
              window.location.replace("");
            }}
          >
            로그아웃
          </button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{
              fontSize: "1.5rem",
            }}
          />
          <input
            type="text"
            placeholder="물품이나 동네를 검색해 보세요"
            style={{
              width: "300px",
              backgroundColor: "#f3f6f4",
              padding: "5px 10px",
              borderRadius: "10px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginedBoardHeader;