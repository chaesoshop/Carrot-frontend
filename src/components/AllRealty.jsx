import React from "react";
import RealtyHeader from "../layouts/RealtyHeader";
import LoginedRealtyHeader from "../layouts/LoginedRealtyHeader";
import Footer from "../layouts/Footer";
import "../styles/Realty.css";
import { AiOutlineRight } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { FaCarrot } from "react-icons/fa";
import "../styles/Jobs.css";
import RealtyPaging from "./RealtyPaging";
import { AiOutlineSearch } from "react-icons/ai";
import { BACKEND_URL } from "../config/config";

const AllRealty = ({ logined, setLogined }) => {
  const navigate = useNavigate();
  const [Realty, setRealty] = useState([]);
  const [page, setPage] = useState(1);
  const [currentPosts, setCurrentPosts] = useState([]);

  const [search, setSearch] = useState("");
  const moveSearch = async (data) => {
    navigate(`/realtysearch/${data}`);
  };

  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };
  const [postPerPage] = useState(10);
  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  const moveRealty = async (id) => {
    try {
      await axios({
        url: `http://${BACKEND_URL}:8083/realtyCheck/${id}`,
        method: "POST",
      });
    } catch (e) {
      console.log(e);
    }
    navigate(`/realtypost/${id}`);
  };

  const onRealty = (data) => {
    const datas = data.reverse();
    setRealty((prev) => datas);
  };

  useEffect(() => {
    const onSubmit = async () => {
      try {
        const data = await axios({
          url: `http://${BACKEND_URL}:8083/realty`,
          method: "GET",
        });
        onRealty(data.data);
        setCurrentPosts(data.data.slice(0, 10));
      } catch (e) {
        console.log(e);
      }
    };
    onSubmit();
  }, []);

  useEffect(() => {
    setCurrentPosts(Realty.slice(indexOfFirstPost, indexOfLastPost));
  }, [indexOfFirstPost, indexOfLastPost, page]);

  if (logined) {
    return (
      <div>
        <LoginedRealtyHeader setLogined={setLogined} />
        <section>
          <div
            style={{
              backgroundColor: "#cbeef8",
            }}
          >
            <div
              className="flex justify-center"
              style={{
                width: "1000px",
                margin: "0 auto",
                height: "300px",
              }}
            >
              <div
                className="flex justify-center flex-col gap-2"
                style={{
                  width: "350px",
                }}
              >
                <div
                  className="font-bold"
                  style={{
                    fontSize: "1.8rem",
                  }}
                >
                  <span>복비없이 투명한</span>
                  <div>부동산 직거래</div>
                </div>
                <div>
                  <span>이웃이 살던 집, 당근마켓에서</span>
                  <div>편하게 직거래해보세요.</div>
                </div>
              </div>
              <div
                className="flex items-center ml-3"
                style={{
                  width: "400px",
                }}
              >
                <img
                  src="https://www.daangn.com/_next/static/media/realty_hero_3x.5316d5c5.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div
            style={{
              width: "800px",
              margin: "0 auto",
            }}
          >
            <div className="mt-8 flex items-center gap-1">
              {" "}
              <AiOutlineSearch
                style={{
                  fontSize: "1.4rem",
                }}
              />
              <div>
                <input
                  type="text"
                  placeholder="동네를 검색해보세요."
                  value={search}
                  onChange={onSearch}
                  style={{
                    border: "1px #d5d5d5 solid",
                    width: "265px",
                    height: "30px",
                  }}
                  onKeyUp={(e) => {
                    if (e.key == "Enter") {
                      moveSearch(search);
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-3">
              <div
                className="font-bold"
                style={{
                  fontSize: "1.5rem",
                }}
              >
                모든 부동산 직거래 게시글
              </div>
              <span
                href={`/realtyWrite`}
                className="flex items-end justify-end "
                style={{
                  width: "62%",
                }}
              >
                <a
                  href={`/realtyWrite`}
                  className="rounded-md p-2"
                  style={{
                    backgroundColor: "#fc9d39",
                    color: "white",
                  }}
                >
                  {" "}
                  내 매물 내놓기
                </a>
              </span>
            </div>
            <h2
              style={{
                fontSize: "1.3rem",
                fontWeight: "bolder",
                marginTop: "10px",
              }}
            >
              <a href="/realty">＞인기 부동산 매물 보러가기</a>
            </h2>
            <div>
              <div className="mt-5">
                <ul className="grid grid-cols-2 gap-5">
                  {currentPosts.map((realty, index) => (
                    <li
                      key={index}
                      style={{
                        width: "360px",
                        height: "120px",
                      }}
                    >
                      <button
                        onClick={() => {
                          moveRealty(realty.realtyId);
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <div
                          className="flex"
                          style={{
                            height: "120px",
                          }}
                        >
                          <div
                            style={{
                              minWidth: "120px",
                              maxWidth: "120px",
                              height: "120px",

                              borderRadius: "10px",
                            }}
                          >
                            {realty.profileImage != null ? (
                              <img
                                src={realty.profileImage}
                                alt=""
                                style={{
                                  borderRadius: "15px",
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "fill",
                                  display: "block",
                                }}
                              />
                            ) : (
                              <FaCarrot
                                style={{
                                  color: "#fc9d39",
                                  fontSize: "7rem",
                                  transform: "translate(1.5%,1.5%)",
                                  border: "0.1px #fc9d39 solid",
                                  borderRadius: "50%",
                                }}
                              />
                            )}
                          </div>
                          <div
                            className="gap-2"
                            style={{
                              textAlign: "left",
                              marginLeft: "10px",
                            }}
                          >
                            <div>
                              {realty.realtyDeal == "판매중" ? (
                                ""
                              ) : (
                                <span
                                  className="mr-1"
                                  style={{
                                    padding: "2px 4px",
                                    border: "1px gray solid",
                                    fontSize: "0.85rem",
                                    color: "gray",
                                    textAlign: "center",
                                  }}
                                >
                                  거래 완료
                                </span>
                              )}
                              <span>{realty.realtyCategory}</span>
                              <span
                                style={{
                                  paddingRight: "3px",
                                }}
                              >
                                {realty.realtyDealing === "전세" &&
                                realty.realtySalePrice.length >= 7 ? (
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "inline",
                                      }}
                                    >
                                      <span
                                        style={{
                                          width: "25px",
                                          whiteSpace: "nowrap",
                                          display: "inline-flex",
                                          overflow: "hidden",
                                          justifyContent: "end",
                                          marginLeft: "3px",
                                        }}
                                      >
                                        {realty.realtySalePrice.charAt(0)}
                                        {realty.realtySalePrice.charAt(1)}
                                        {realty.realtySalePrice.charAt(2)}
                                      </span>
                                      <span>억</span>
                                      {realty.realtySalePrice.substring(3) !=
                                      0 ? (
                                        <span
                                          style={{
                                            width: "55px",
                                            whiteSpace: "nowrap",
                                            display: "inline-flex",
                                            overflow: "hidden",
                                            textAlign: "end",
                                            marginLeft: "10px",
                                          }}
                                        >
                                          {realty.realtySalePrice.substring(2)}
                                          만
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {realty.realtyDealing === "전세" &&
                                realty.realtySalePrice.length == 6 ? (
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "inline",
                                      }}
                                    >
                                      <span
                                        style={{
                                          width: "30px",
                                          whiteSpace: "nowrap",
                                          marginLeft: "5px",
                                        }}
                                      >
                                        {realty.realtySalePrice.charAt(0)}
                                        {realty.realtySalePrice.charAt(1)}
                                      </span>
                                      <span>억</span>
                                      {realty.realtySalePrice.substring(2) !=
                                      0 ? (
                                        <span
                                          style={{
                                            width: "55px",
                                            whiteSpace: "nowrap",

                                            textAlign: "end",
                                            marginLeft: "10px",
                                          }}
                                        >
                                          {realty.realtySalePrice.substring(2)}
                                          만
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {realty.realtyDealing === "전세" &&
                                realty.realtySalePrice.length == 5 ? (
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "inline",
                                      }}
                                    >
                                      <span
                                        style={{
                                          width: "20px",
                                          whiteSpace: "nowrap",
                                          display: "inline-flex",
                                          overflow: "hidden",
                                          justifyContent: "end",
                                        }}
                                      >
                                        {realty.realtySalePrice.charAt(0)}
                                      </span>
                                      <span>억</span>
                                      {realty.realtySalePrice.substring(1) !=
                                      0 ? (
                                        <span
                                          style={{
                                            width: "55px",
                                            whiteSpace: "nowrap",
                                            display: "inline-flex",
                                            overflow: "hidden",
                                            textAlign: "end",
                                            marginLeft: "10px",
                                          }}
                                        >
                                          {realty.realtySalePrice.substring(1)}
                                          만
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {realty.realtyDealing === "전세" &&
                                realty.realtySalePrice.length < 5 ? (
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span
                                      style={{
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        justifyContent: "end",
                                      }}
                                    >
                                      {realty.realtySalePrice}만
                                    </span>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {realty.realtyDealing === "매매" &&
                                realty.realtySalePrice.length >= 7 ? (
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "inline",
                                      }}
                                    >
                                      <span
                                        style={{
                                          width: "25px",
                                          whiteSpace: "nowrap",
                                          display: "inline-flex",
                                          overflow: "hidden",
                                          justifyContent: "end",
                                          marginLeft: "3px",
                                        }}
                                      >
                                        {realty.realtySalePrice.charAt(0)}
                                        {realty.realtySalePrice.charAt(1)}
                                        {realty.realtySalePrice.charAt(2)}
                                      </span>
                                      <span>억</span>
                                      {realty.realtySalePrice.substring(3) !=
                                      0 ? (
                                        <span
                                          style={{
                                            width: "55px",
                                            whiteSpace: "nowrap",
                                            display: "inline-flex",
                                            overflow: "hidden",
                                            textAlign: "end",
                                            marginLeft: "10px",
                                          }}
                                        >
                                          {realty.realtySalePrice.substring(2)}
                                          만
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {realty.realtyDealing === "매매" &&
                                realty.realtySalePrice.length == 6 ? (
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "inline",
                                      }}
                                    >
                                      <span
                                        style={{
                                          width: "30px",
                                          whiteSpace: "nowrap",
                                          marginLeft: "5px",
                                        }}
                                      >
                                        {realty.realtySalePrice.charAt(0)}
                                        {realty.realtySalePrice.charAt(1)}
                                      </span>
                                      <span>억</span>
                                      {realty.realtySalePrice.substring(2) !=
                                      0 ? (
                                        <span
                                          style={{
                                            width: "55px",
                                            whiteSpace: "nowrap",

                                            textAlign: "end",
                                            marginLeft: "10px",
                                          }}
                                        >
                                          {realty.realtySalePrice.substring(2)}
                                          만
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {realty.realtyDealing === "매매" &&
                                realty.realtySalePrice.length == 5 ? (
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "inline",
                                      }}
                                    >
                                      <span
                                        style={{
                                          width: "15px",
                                          whiteSpace: "nowrap",
                                          display: "inline-flex",
                                          overflow: "hidden",
                                          justifyContent: "end",
                                        }}
                                      >
                                        {realty.realtySalePrice.charAt(0)}
                                      </span>
                                      <span>억</span>
                                      {realty.realtySalePrice.substring(1) !=
                                      0 ? (
                                        <span
                                          style={{
                                            width: "55px",
                                            whiteSpace: "nowrap",
                                            display: "inline-flex",
                                            overflow: "hidden",
                                            textAlign: "end",
                                            marginLeft: "10px",
                                          }}
                                        >
                                          {realty.realtySalePrice.substring(1)}
                                          만
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {realty.realtyDealing === "매매" &&
                                realty.realtySalePrice.length < 5 ? (
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span
                                      style={{
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        justifyContent: "end",
                                      }}
                                    >
                                      &nbsp;{realty.realtySalePrice}만
                                    </span>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {realty.realtyDealing === "월세" ? (
                                  <span>
                                    {realty.realtyDeposit}만원/
                                    {realty.realtyMonthly}만원 -
                                  </span>
                                ) : (
                                  ""
                                )}{" "}
                                {realty.realtyDealing === "단기" ? (
                                  <span>
                                    {realty.realtyDeposit}만원/
                                    {realty.realtyMonthly}만원 -
                                  </span>
                                ) : (
                                  ""
                                )}
                              </span>

                              <span
                                style={{
                                  textAlign: "left",
                                }}
                              >
                                {realty.realtyIntroduce}
                              </span>
                            </div>
                            <div
                              className="text-sm"
                              style={{
                                color: "#73777B",
                                textAlign: "left",
                              }}
                            >
                              <div>{realty.realtyAddressDong}</div>
                            </div>

                            <div
                              className="font-bold pt-1"
                              style={{
                                textAlign: "left",
                              }}
                            >
                              {realty.realtyDealing === "전세" &&
                              realty.realtySalePrice.length >= 7 ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  {realty.realtyDealing} &nbsp;
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span
                                      style={{
                                        width: "25px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        justifyContent: "end",
                                      }}
                                    >
                                      {realty.realtySalePrice.charAt(0)}
                                      {realty.realtySalePrice.charAt(1)}
                                      {realty.realtySalePrice.charAt(2)}
                                    </span>
                                    <span>억</span>
                                    {realty.realtySalePrice.substring(3) !=
                                    0 ? (
                                      <span
                                        style={{
                                          width: "55px",
                                          whiteSpace: "nowrap",
                                          display: "inline-flex",
                                          overflow: "hidden",
                                          textAlign: "end",
                                          marginLeft: "10px",
                                        }}
                                      >
                                        {realty.realtySalePrice.substring(2)}만
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {realty.realtyDealing === "전세" &&
                              realty.realtySalePrice.length == 6 ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  {realty.realtyDealing} &nbsp;
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span
                                      style={{
                                        width: "20px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        justifyContent: "end",
                                      }}
                                    >
                                      {realty.realtySalePrice.charAt(0)}
                                      {realty.realtySalePrice.charAt(1)}
                                    </span>
                                    <span>억</span>
                                    {realty.realtySalePrice.substring(2) !=
                                    0 ? (
                                      <span
                                        style={{
                                          width: "55px",
                                          whiteSpace: "nowrap",
                                          display: "inline-flex",
                                          overflow: "hidden",
                                          textAlign: "end",
                                          marginLeft: "10px",
                                        }}
                                      >
                                        {realty.realtySalePrice.substring(2)}만
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {realty.realtyDealing === "전세" &&
                              realty.realtySalePrice.length == 5 ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  {realty.realtyDealing}
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span
                                      style={{
                                        width: "20px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        justifyContent: "end",
                                      }}
                                    >
                                      {realty.realtySalePrice.charAt(0)}
                                    </span>
                                    <span>억</span>
                                    {realty.realtySalePrice.substring(1) !=
                                    0 ? (
                                      <span
                                        style={{
                                          width: "55px",
                                          whiteSpace: "nowrap",
                                          display: "inline-flex",
                                          overflow: "hidden",
                                          textAlign: "end",
                                          marginLeft: "10px",
                                        }}
                                      >
                                        {realty.realtySalePrice.substring(1)}만
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {realty.realtyDealing === "전세" &&
                              realty.realtySalePrice.length < 5 ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  <span
                                    style={{
                                      whiteSpace: "nowrap",
                                      display: "inline-flex",
                                      overflow: "hidden",
                                      justifyContent: "end",
                                    }}
                                  >
                                    전세 {realty.realtySalePrice}만
                                  </span>
                                </div>
                              ) : (
                                ""
                              )}
                              {realty.realtyDealing === "매매" &&
                              realty.realtySalePrice.length >= 7 ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  {realty.realtyDealing} &nbsp;
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span
                                      style={{
                                        width: "25px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        justifyContent: "end",
                                      }}
                                    >
                                      {realty.realtySalePrice.charAt(0)}
                                      {realty.realtySalePrice.charAt(1)}
                                      {realty.realtySalePrice.charAt(2)}
                                    </span>
                                    <span>억</span>
                                    {realty.realtySalePrice.substring(3) !=
                                    0 ? (
                                      <span
                                        style={{
                                          width: "55px",
                                          whiteSpace: "nowrap",
                                          display: "inline-flex",
                                          overflow: "hidden",
                                          textAlign: "end",
                                          marginLeft: "10px",
                                        }}
                                      >
                                        {realty.realtySalePrice.substring(2)}만
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {realty.realtyDealing === "매매" &&
                              realty.realtySalePrice.length == 6 ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  {realty.realtyDealing} &nbsp;
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span
                                      style={{
                                        width: "20px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        justifyContent: "end",
                                      }}
                                    >
                                      {realty.realtySalePrice.charAt(0)}
                                      {realty.realtySalePrice.charAt(1)}
                                    </span>
                                    <span>억</span>
                                    {realty.realtySalePrice.substring(2) !=
                                    0 ? (
                                      <span
                                        style={{
                                          width: "55px",
                                          whiteSpace: "nowrap",
                                          display: "inline-flex",
                                          overflow: "hidden",
                                          textAlign: "end",
                                          marginLeft: "10px",
                                        }}
                                      >
                                        {realty.realtySalePrice.substring(2)}만
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {realty.realtyDealing === "매매" &&
                              realty.realtySalePrice.length == 5 ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  {realty.realtyDealing}
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span
                                      style={{
                                        width: "20px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        justifyContent: "end",
                                      }}
                                    >
                                      {realty.realtySalePrice.charAt(0)}
                                    </span>
                                    <span>억</span>
                                    {realty.realtySalePrice.substring(1) !=
                                    0 ? (
                                      <span
                                        style={{
                                          width: "55px",
                                          whiteSpace: "nowrap",
                                          display: "inline-flex",
                                          overflow: "hidden",
                                          textAlign: "end",
                                          marginLeft: "10px",
                                        }}
                                      >
                                        {realty.realtySalePrice.substring(1)}만
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {realty.realtyDealing === "매매" &&
                              realty.realtySalePrice.length < 5 ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  <span
                                    style={{
                                      whiteSpace: "nowrap",
                                      display: "inline-flex",
                                      overflow: "hidden",
                                      justifyContent: "end",
                                    }}
                                  >
                                    매매 {realty.realtySalePrice}만
                                  </span>
                                </div>
                              ) : (
                                ""
                              )}
                              {realty.realtyDealing === "월세" ? (
                                <div>
                                  {realty.realtyDealing} {realty.realtyDeposit}/
                                  {realty.realtyMonthly}
                                </div>
                              ) : (
                                ""
                              )}{" "}
                              {realty.realtyDealing === "단기" ? (
                                <div>
                                  {realty.realtyDealing} {realty.realtyDeposit}/
                                  {realty.realtyMonthly}
                                </div>
                              ) : (
                                ""
                              )}
                              <div></div>
                            </div>
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="rounded-xl font-bold p-8 mb-16"
                style={{
                  marginTop: "8%",
                  fontSize: "1.25rem",
                  backgroundColor: "#EEEEEE",
                }}
              >
                <div>
                  <span>복비 없이 투명한 투명한 부동산 직거래</span>
                </div>
                <div>
                  <span>당근마켓 내 근처 탭에서 바로 찾아보세요!</span>
                </div>
                <div
                  className="text-sm"
                  style={{
                    color: "#084594",
                  }}
                >
                  <div className="flex items-center font-bold">
                    <a href="#">앱 다운로드 하기</a>
                    <AiOutlineRight />
                  </div>
                </div>
              </div>
              <RealtyPaging
                totalCount={Realty.length}
                page={page}
                postPerPage={postPerPage}
                pageRangeDisplayed={5}
                handlePageChange={handlePageChange}
              />
            </div>
          </div>
        </section>
        <br />
        <br />
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <RealtyHeader />
        <section>
          <div
            style={{
              backgroundColor: "#cbeef8",
            }}
          >
            <div
              className="flex justify-center"
              style={{
                width: "1000px",
                margin: "0 auto",
                height: "300px",
              }}
            >
              <div
                className="flex justify-center flex-col gap-2"
                style={{
                  width: "350px",
                }}
              >
                <div
                  className="font-bold"
                  style={{
                    fontSize: "1.8rem",
                  }}
                >
                  <span>복비없이 투명한</span>
                  <div>부동산 직거래</div>
                </div>
                <div>
                  <span>이웃이 살던 집, 당근마켓에서</span>
                  <div>편하게 직거래해보세요.</div>
                </div>
              </div>
              <div
                className="flex items-center ml-3"
                style={{
                  width: "400px",
                }}
              >
                <img
                  src="https://www.daangn.com/_next/static/media/realty_hero_3x.5316d5c5.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div
            style={{
              width: "800px",
              margin: "0 auto",
            }}
          >
            <div className="mt-8 flex items-center gap-1">
              {" "}
              <AiOutlineSearch
                style={{
                  fontSize: "1.4rem",
                }}
              />
              <div>
                <input
                  type="text"
                  placeholder="동네를 검색해보세요."
                  value={search}
                  onChange={onSearch}
                  style={{
                    border: "1px #d5d5d5 solid",
                    width: "265px",
                    height: "30px",
                  }}
                  onKeyUp={(e) => {
                    if (e.key == "Enter") {
                      moveSearch(search);
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-3">
              <div
                className="font-bold"
                style={{
                  fontSize: "1.5rem",
                }}
              >
                모든 부동산 직거래 게시글
              </div>
              <span
                href={`/realtyWrite`}
                className="flex items-end justify-end "
                style={{
                  width: "62%",
                }}
              >
                <a
                  href={`/realtyWrite`}
                  className="rounded-md p-2"
                  style={{
                    backgroundColor: "#fc9d39",
                    color: "white",
                  }}
                >
                  {" "}
                  내 매물 내놓기
                </a>
              </span>
            </div>
            <h2
              style={{
                fontSize: "1.3rem",
                fontWeight: "bolder",
                marginTop: "10px",
              }}
            >
              <a href="/realty">＞인기 부동산 매물 보러가기</a>
            </h2>
            <div>
              <div className="mt-5">
                <ul className="grid grid-cols-2 gap-5">
                  {currentPosts.map((realty, index) => (
                    <li
                      key={index}
                      style={{
                        width: "360px",
                        height: "120px",
                      }}
                    >
                      <button
                        onClick={() => {
                          moveRealty(realty.realtyId);
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <div
                          className="flex"
                          style={{
                            height: "120px",
                          }}
                        >
                          <div
                            style={{
                              minWidth: "120px",
                              maxWidth: "120px",
                              height: "120px",

                              borderRadius: "10px",
                            }}
                          >
                            {realty.profileImage != null ? (
                              <img
                                src={realty.profileImage}
                                alt=""
                                style={{
                                  borderRadius: "15px",
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "fill",
                                  display: "block",
                                }}
                              />
                            ) : (
                              <FaCarrot
                                style={{
                                  color: "#fc9d39",
                                  fontSize: "7rem",
                                  transform: "translate(1.5%,1.5%)",
                                  border: "0.1px #fc9d39 solid",
                                  borderRadius: "50%",
                                }}
                              />
                            )}
                          </div>
                          <div
                            className="gap-2"
                            style={{
                              textAlign: "left",
                              marginLeft: "10px",
                            }}
                          >
                            <div>
                              {realty.realtyDeal == "판매중" ? (
                                ""
                              ) : (
                                <span
                                  className="mr-1"
                                  style={{
                                    padding: "2px 4px",
                                    border: "1px gray solid",
                                    fontSize: "0.85rem",
                                    color: "gray",
                                    textAlign: "center",
                                  }}
                                >
                                  거래 완료
                                </span>
                              )}
                              <span>{realty.realtyCategory}</span>
                              <span
                                style={{
                                  paddingRight: "3px",
                                }}
                              >
                                {realty.realtyDealing === "전세" &&
                                realty.realtySalePrice.length >= 7 ? (
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "inline",
                                      }}
                                    >
                                      <span
                                        style={{
                                          width: "25px",
                                          whiteSpace: "nowrap",
                                          display: "inline-flex",
                                          overflow: "hidden",
                                          justifyContent: "end",
                                          marginLeft: "3px",
                                        }}
                                      >
                                        {realty.realtySalePrice.charAt(0)}
                                        {realty.realtySalePrice.charAt(1)}
                                        {realty.realtySalePrice.charAt(2)}
                                      </span>
                                      <span>억</span>
                                      {realty.realtySalePrice.substring(3) !=
                                      0 ? (
                                        <span
                                          style={{
                                            width: "55px",
                                            whiteSpace: "nowrap",
                                            display: "inline-flex",
                                            overflow: "hidden",
                                            textAlign: "end",
                                            marginLeft: "10px",
                                          }}
                                        >
                                          {realty.realtySalePrice.substring(2)}
                                          만
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {realty.realtyDealing === "전세" &&
                                realty.realtySalePrice.length == 6 ? (
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "inline",
                                      }}
                                    >
                                      <span
                                        style={{
                                          width: "30px",
                                          whiteSpace: "nowrap",
                                          marginLeft: "5px",
                                        }}
                                      >
                                        {realty.realtySalePrice.charAt(0)}
                                        {realty.realtySalePrice.charAt(1)}
                                      </span>
                                      <span>억</span>
                                      {realty.realtySalePrice.substring(2) !=
                                      0 ? (
                                        <span
                                          style={{
                                            width: "55px",
                                            whiteSpace: "nowrap",

                                            textAlign: "end",
                                            marginLeft: "10px",
                                          }}
                                        >
                                          {realty.realtySalePrice.substring(2)}
                                          만
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {realty.realtyDealing === "전세" &&
                                realty.realtySalePrice.length == 5 ? (
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "inline",
                                      }}
                                    >
                                      <span
                                        style={{
                                          width: "20px",
                                          whiteSpace: "nowrap",
                                          display: "inline-flex",
                                          overflow: "hidden",
                                          justifyContent: "end",
                                        }}
                                      >
                                        {realty.realtySalePrice.charAt(0)}
                                      </span>
                                      <span>억</span>
                                      {realty.realtySalePrice.substring(1) !=
                                      0 ? (
                                        <span
                                          style={{
                                            width: "55px",
                                            whiteSpace: "nowrap",
                                            display: "inline-flex",
                                            overflow: "hidden",
                                            textAlign: "end",
                                            marginLeft: "10px",
                                          }}
                                        >
                                          {realty.realtySalePrice.substring(1)}
                                          만
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {realty.realtyDealing === "전세" &&
                                realty.realtySalePrice.length < 5 ? (
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span
                                      style={{
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        justifyContent: "end",
                                      }}
                                    >
                                      {realty.realtySalePrice}만
                                    </span>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {realty.realtyDealing === "매매" &&
                                realty.realtySalePrice.length >= 7 ? (
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "inline",
                                      }}
                                    >
                                      <span
                                        style={{
                                          width: "25px",
                                          whiteSpace: "nowrap",
                                          display: "inline-flex",
                                          overflow: "hidden",
                                          justifyContent: "end",
                                          marginLeft: "3px",
                                        }}
                                      >
                                        {realty.realtySalePrice.charAt(0)}
                                        {realty.realtySalePrice.charAt(1)}
                                        {realty.realtySalePrice.charAt(2)}
                                      </span>
                                      <span>억</span>
                                      {realty.realtySalePrice.substring(3) !=
                                      0 ? (
                                        <span
                                          style={{
                                            width: "55px",
                                            whiteSpace: "nowrap",
                                            display: "inline-flex",
                                            overflow: "hidden",
                                            textAlign: "end",
                                            marginLeft: "10px",
                                          }}
                                        >
                                          {realty.realtySalePrice.substring(2)}
                                          만
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {realty.realtyDealing === "매매" &&
                                realty.realtySalePrice.length == 6 ? (
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "inline",
                                      }}
                                    >
                                      <span
                                        style={{
                                          width: "30px",
                                          whiteSpace: "nowrap",
                                          marginLeft: "5px",
                                        }}
                                      >
                                        {realty.realtySalePrice.charAt(0)}
                                        {realty.realtySalePrice.charAt(1)}
                                      </span>
                                      <span>억</span>
                                      {realty.realtySalePrice.substring(2) !=
                                      0 ? (
                                        <span
                                          style={{
                                            width: "55px",
                                            whiteSpace: "nowrap",

                                            textAlign: "end",
                                            marginLeft: "10px",
                                          }}
                                        >
                                          {realty.realtySalePrice.substring(2)}
                                          만
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {realty.realtyDealing === "매매" &&
                                realty.realtySalePrice.length == 5 ? (
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "inline",
                                      }}
                                    >
                                      <span
                                        style={{
                                          width: "15px",
                                          whiteSpace: "nowrap",
                                          display: "inline-flex",
                                          overflow: "hidden",
                                          justifyContent: "end",
                                        }}
                                      >
                                        {realty.realtySalePrice.charAt(0)}
                                      </span>
                                      <span>억</span>
                                      {realty.realtySalePrice.substring(1) !=
                                      0 ? (
                                        <span
                                          style={{
                                            width: "55px",
                                            whiteSpace: "nowrap",
                                            display: "inline-flex",
                                            overflow: "hidden",
                                            textAlign: "end",
                                            marginLeft: "10px",
                                          }}
                                        >
                                          {realty.realtySalePrice.substring(1)}
                                          만
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {realty.realtyDealing === "매매" &&
                                realty.realtySalePrice.length < 5 ? (
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span
                                      style={{
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        justifyContent: "end",
                                      }}
                                    >
                                      &nbsp;{realty.realtySalePrice}만
                                    </span>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {realty.realtyDealing === "월세" ? (
                                  <span>
                                    {realty.realtyDeposit}만원/
                                    {realty.realtyMonthly}만원 -
                                  </span>
                                ) : (
                                  ""
                                )}{" "}
                                {realty.realtyDealing === "단기" ? (
                                  <span>
                                    {realty.realtyDeposit}만원/
                                    {realty.realtyMonthly}만원 -
                                  </span>
                                ) : (
                                  ""
                                )}
                              </span>

                              <span
                                style={{
                                  textAlign: "left",
                                }}
                              >
                                {realty.realtyIntroduce}
                              </span>
                            </div>
                            <div
                              className="text-sm"
                              style={{
                                color: "#73777B",
                                textAlign: "left",
                              }}
                            >
                              <div>{realty.realtyAddressDong}</div>
                            </div>

                            <div
                              className="font-bold pt-1"
                              style={{
                                textAlign: "left",
                              }}
                            >
                              {realty.realtyDealing === "전세" &&
                              realty.realtySalePrice.length >= 7 ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  {realty.realtyDealing} &nbsp;
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span
                                      style={{
                                        width: "25px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        justifyContent: "end",
                                      }}
                                    >
                                      {realty.realtySalePrice.charAt(0)}
                                      {realty.realtySalePrice.charAt(1)}
                                      {realty.realtySalePrice.charAt(2)}
                                    </span>
                                    <span>억</span>
                                    {realty.realtySalePrice.substring(3) !=
                                    0 ? (
                                      <span
                                        style={{
                                          width: "55px",
                                          whiteSpace: "nowrap",
                                          display: "inline-flex",
                                          overflow: "hidden",
                                          textAlign: "end",
                                          marginLeft: "10px",
                                        }}
                                      >
                                        {realty.realtySalePrice.substring(2)}만
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {realty.realtyDealing === "전세" &&
                              realty.realtySalePrice.length == 6 ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  {realty.realtyDealing} &nbsp;
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span
                                      style={{
                                        width: "20px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        justifyContent: "end",
                                      }}
                                    >
                                      {realty.realtySalePrice.charAt(0)}
                                      {realty.realtySalePrice.charAt(1)}
                                    </span>
                                    <span>억</span>
                                    {realty.realtySalePrice.substring(2) !=
                                    0 ? (
                                      <span
                                        style={{
                                          width: "55px",
                                          whiteSpace: "nowrap",
                                          display: "inline-flex",
                                          overflow: "hidden",
                                          textAlign: "end",
                                          marginLeft: "10px",
                                        }}
                                      >
                                        {realty.realtySalePrice.substring(2)}만
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {realty.realtyDealing === "전세" &&
                              realty.realtySalePrice.length == 5 ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  {realty.realtyDealing}
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span
                                      style={{
                                        width: "20px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        justifyContent: "end",
                                      }}
                                    >
                                      {realty.realtySalePrice.charAt(0)}
                                    </span>
                                    <span>억</span>
                                    {realty.realtySalePrice.substring(1) !=
                                    0 ? (
                                      <span
                                        style={{
                                          width: "55px",
                                          whiteSpace: "nowrap",
                                          display: "inline-flex",
                                          overflow: "hidden",
                                          textAlign: "end",
                                          marginLeft: "10px",
                                        }}
                                      >
                                        {realty.realtySalePrice.substring(1)}만
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {realty.realtyDealing === "전세" &&
                              realty.realtySalePrice.length < 5 ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  <span
                                    style={{
                                      whiteSpace: "nowrap",
                                      display: "inline-flex",
                                      overflow: "hidden",
                                      justifyContent: "end",
                                    }}
                                  >
                                    전세 {realty.realtySalePrice}만
                                  </span>
                                </div>
                              ) : (
                                ""
                              )}
                              {realty.realtyDealing === "매매" &&
                              realty.realtySalePrice.length >= 7 ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  {realty.realtyDealing} &nbsp;
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span
                                      style={{
                                        width: "25px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        justifyContent: "end",
                                      }}
                                    >
                                      {realty.realtySalePrice.charAt(0)}
                                      {realty.realtySalePrice.charAt(1)}
                                      {realty.realtySalePrice.charAt(2)}
                                    </span>
                                    <span>억</span>
                                    {realty.realtySalePrice.substring(3) !=
                                    0 ? (
                                      <span
                                        style={{
                                          width: "55px",
                                          whiteSpace: "nowrap",
                                          display: "inline-flex",
                                          overflow: "hidden",
                                          textAlign: "end",
                                          marginLeft: "10px",
                                        }}
                                      >
                                        {realty.realtySalePrice.substring(2)}만
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {realty.realtyDealing === "매매" &&
                              realty.realtySalePrice.length == 6 ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  {realty.realtyDealing} &nbsp;
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span
                                      style={{
                                        width: "20px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        justifyContent: "end",
                                      }}
                                    >
                                      {realty.realtySalePrice.charAt(0)}
                                      {realty.realtySalePrice.charAt(1)}
                                    </span>
                                    <span>억</span>
                                    {realty.realtySalePrice.substring(2) !=
                                    0 ? (
                                      <span
                                        style={{
                                          width: "55px",
                                          whiteSpace: "nowrap",
                                          display: "inline-flex",
                                          overflow: "hidden",
                                          textAlign: "end",
                                          marginLeft: "10px",
                                        }}
                                      >
                                        {realty.realtySalePrice.substring(2)}만
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {realty.realtyDealing === "매매" &&
                              realty.realtySalePrice.length == 5 ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  {realty.realtyDealing}
                                  <div
                                    style={{
                                      display: "inline",
                                    }}
                                  >
                                    <span
                                      style={{
                                        width: "20px",
                                        whiteSpace: "nowrap",
                                        display: "inline-flex",
                                        overflow: "hidden",
                                        justifyContent: "end",
                                      }}
                                    >
                                      {realty.realtySalePrice.charAt(0)}
                                    </span>
                                    <span>억</span>
                                    {realty.realtySalePrice.substring(1) !=
                                    0 ? (
                                      <span
                                        style={{
                                          width: "55px",
                                          whiteSpace: "nowrap",
                                          display: "inline-flex",
                                          overflow: "hidden",
                                          textAlign: "end",
                                          marginLeft: "10px",
                                        }}
                                      >
                                        {realty.realtySalePrice.substring(1)}만
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {realty.realtyDealing === "매매" &&
                              realty.realtySalePrice.length < 5 ? (
                                <div
                                  style={{
                                    display: "inline",
                                  }}
                                >
                                  <span
                                    style={{
                                      whiteSpace: "nowrap",
                                      display: "inline-flex",
                                      overflow: "hidden",
                                      justifyContent: "end",
                                    }}
                                  >
                                    매매 {realty.realtySalePrice}만
                                  </span>
                                </div>
                              ) : (
                                ""
                              )}
                              {realty.realtyDealing === "월세" ? (
                                <div>
                                  {realty.realtyDealing} {realty.realtyDeposit}/
                                  {realty.realtyMonthly}
                                </div>
                              ) : (
                                ""
                              )}{" "}
                              {realty.realtyDealing === "단기" ? (
                                <div>
                                  {realty.realtyDealing} {realty.realtyDeposit}/
                                  {realty.realtyMonthly}
                                </div>
                              ) : (
                                ""
                              )}
                              <div></div>
                            </div>
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="rounded-xl font-bold p-8 mb-16"
                style={{
                  marginTop: "8%",
                  fontSize: "1.25rem",
                  backgroundColor: "#EEEEEE",
                }}
              >
                <div>
                  <span>복비 없이 투명한 투명한 부동산 직거래</span>
                </div>
                <div>
                  <span>당근마켓 내 근처 탭에서 바로 찾아보세요!</span>
                </div>
                <div
                  className="text-sm"
                  style={{
                    color: "#084594",
                  }}
                >
                  <div className="flex items-center font-bold">
                    <a href="#">앱 다운로드 하기</a>
                    <AiOutlineRight />
                  </div>
                </div>
              </div>
              <RealtyPaging
                totalCount={Realty.length}
                page={page}
                postPerPage={postPerPage}
                pageRangeDisplayed={5}
                handlePageChange={handlePageChange}
              />
            </div>
          </div>
        </section>
        <br />
        <br />
        <Footer />
      </div>
    );
  }
};

export default AllRealty;
