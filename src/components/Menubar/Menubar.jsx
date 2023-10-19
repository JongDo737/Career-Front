import styles from "./Menubar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { getCookie } from "../../cookie";
import { FRONT_LOCAL, SV_HOST } from "../../constants";

const Menubar = () => {
  const [login, setLogin] = useState("로그인");
  const [loginSelect, setLoginSelect] = useState(false);

  const [signup, setSignup] = useState("회원가입");
  const [signupSelect, setSignupSelect] = useState(false);
  const [leftMenu, setLeftMenu] = useState(["홈", "멘토", "게시판"]);
  const [rightMenu, setRightMenu] = useState(["초대하기", "추가메뉴"]);
  const [isLogin, setIsLogin] = useState(true);
  const [isMentor, setIsMentor] = useState(true);
  const [subMenu, setSubMenu] = useState("");
  const [leftLink, setLeftLink] = useState([
    `${FRONT_LOCAL}`,
    `${FRONT_LOCAL}`,
    `${FRONT_LOCAL}`,
  ]);
  const [rightLink, setRightLink] = useState([
    `${FRONT_LOCAL}`,
    `${FRONT_LOCAL}`,
  ]);
  const [subSelect, setSubSelect] = useState(false);
  const toggleLogin = () => {
    setLoginSelect((current) => !current);
    setSignupSelect(false);
  };

  const toggleSignup = () => {
    setSignupSelect((current) => !current);
    setLoginSelect(false);
  };

  const toggleSubSelect = () => {
    setSubSelect((current) => !current);
  };
  useEffect(() => {
    if (!isLogin) {
      setLeftMenu(["홈", "멘토", "게시판"]);
      setRightMenu([]);
      setLeftLink([`${FRONT_LOCAL}`, `${FRONT_LOCAL}`, `${FRONT_LOCAL}`]);
    } else {
      if (isMentor) {
        setLeftMenu(["홈", "상담내역", "시간표", "커뮤니티"]);
        setRightMenu(["초대하기", "추가메뉴"]);
        setLeftLink([
          `${FRONT_LOCAL}/mentor`,
          `${FRONT_LOCAL}/mentor/consult`,
          `${FRONT_LOCAL}/mentor`,
          `${FRONT_LOCAL}/community`,
        ]);
        setRightLink([`${FRONT_LOCAL}/mentor`, `${FRONT_LOCAL}/mentor`]);
      } else {
        setLeftMenu(["홈", "멘토", "게시판", "상담", "커뮤니티"]);
        setRightMenu(["초대하기", "이용권 구매"]);
        setLeftLink([
          `${FRONT_LOCAL}/mentee`,
          `${FRONT_LOCAL}/mentee/mentor`,
          `${FRONT_LOCAL}/mentee`,
          `${FRONT_LOCAL}/mentee`,
          `${FRONT_LOCAL}/community`,
        ]);
        setRightLink([`${FRONT_LOCAL}/mentee`, `${FRONT_LOCAL}/mentee`]);
      }
    }
  }, [isLogin, isMentor]);

  const test = () => {
    console.log(getCookie("jwtToken"));
    axios
      .get(`${SV_HOST}/test/jwt`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
      })
      // post로 할 때는 payload가 empty여도 아래 줄과 같이 empty {}를 포함해야함.
      // ngrok가 get method를 사용하면 cors 에러가 나오는데, ngrok 사이트를 get method로 접근 시 ngork관련 html이 나와 그런 것임.
      // 이를 무시하기 위해서 다음과 같이 headers에 'ngrok-skip-browser-warning': '69420'를 넣어줘야함.
      // 관련 설명: https://velog.io/@jy3026/ngrok-CORS-%ED%95%B4%EA%B2%B02
      // .post(`https://1c05-183-107-1-194.ngrok-free.app/test/jwt`, {}, {
      //   headers: {
      //     "Content-Type": "application/json",
      //     'ngrok-skip-browser-warning': '69420',
      //     Authorization: `Bearer ${getCookie("jwtToken")}`,
      //   },
      // })
      .then((res) => {
        console.log(res);
        window.alert("success");
      })
      .catch((err) => {
        console.log(err);
        window.alert("error");
      });
  };
  useEffect(() => {});
  return (
    <>
      <div className={styles.Menubar}>
        <div className={styles.MenubarLeft}>
          <div
            className={styles.Logo}
            onClick={
              // setIsMentor((current) => !current);
              test
            }
          >
            CAREER
          </div>
          {/* <button
            onClick={() => {
              setIsLogin((current) => !current);
            }}
          >
            {isLogin ? "로그아웃" : "로그인"}
          </button> */}
          {leftMenu.map((menu, i) => {
            return (
              <Link to={leftLink[i]} className={styles.MenubarSpan} key={i}>
                {menu}
              </Link>
            );
          })}
        </div>
        <div className={styles.MenubarRight}>
          {isLogin ? (
            <>
              {rightMenu.map((menu, i) => {
                return (
                  <Fragment key={i}>
                    <div className={[styles.CircleIcon, styles.Icon].join(" ")}>
                      <FontAwesomeIcon icon={faCircle} />
                    </div>
                    <Link to={rightLink[i]} className={styles.MenubarSpan}>
                      {menu}
                    </Link>
                  </Fragment>
                );
              })}

              <img
                alt=""
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              />
              <div className={styles.MenubarSpan}>
                {isMentor ? "멘토" : "멘티"}
                <span>김성애</span>
              </div>
              <div className={styles.Icon}>
                <FontAwesomeIcon onClick={toggleSubSelect} icon={faAngleDown} />
              </div>
              {subSelect ? (
                <div className={[styles.Popup, styles.SignPopup].join(" ")}>
                  <span
                    onClick={() => {
                      setSubMenu("설정");
                      setSubSelect(false);
                    }}
                  >
                    <Link
                      to={
                        isMentor
                          ? `${FRONT_LOCAL}/mentor/setting`
                          : `${FRONT_LOCAL}/mentee/setting`
                      }
                      style={
                        subMenu === "설정"
                          ? {
                              color: "#3B71B9",
                              fontWeight: "800",
                              textDecoration: "none",
                            }
                          : { color: "#2F5383", textDecoration: "none" }
                      }
                    >
                      설정
                    </Link>
                  </span>
                  <hr />
                  <span
                    onClick={() => {
                      setSubMenu("내 프로필");
                      setSubSelect(false);
                    }}
                  >
                    <Link
                      to={
                        isMentor
                          ? `${FRONT_LOCAL}/mentor/profile`
                          : `${FRONT_LOCAL}/mentee/profile`
                      }
                      style={
                        subMenu === "내 프로필"
                          ? {
                              color: "#3B71B9",
                              fontWeight: "800",
                              textDecoration: "none",
                            }
                          : { color: "#2F5383", textDecoration: "none" }
                      }
                    >
                      내 프로필
                    </Link>
                  </span>
                  <hr />
                  <span
                    onClick={() => {
                      setSubMenu("로그아웃");
                      setSubSelect(false);
                      setIsLogin(false);
                    }}
                  >
                    <Link
                      to={`${FRONT_LOCAL}/`}
                      style={{ color: "#2F5383", textDecoration: "none" }}
                    >
                      로그아웃
                    </Link>
                  </span>
                </div>
              ) : null}
            </>
          ) : (
            <>
              <div className={[styles.CircleIcon, styles.Icon].join(" ")}>
                <FontAwesomeIcon icon={faCircle} />
              </div>
              <div className={styles.MenubarSpan}>{login}</div>
              <div className={styles.Icon}>
                <FontAwesomeIcon onClick={toggleLogin} icon={faAngleDown} />
              </div>
              {loginSelect ? (
                <div className={styles.Popup}>
                  <span
                    onClick={() => {
                      setLogin("멘티 로그인");
                      toggleLogin();
                      setSignup("회원가입");
                    }}
                  >
                    <Link
                      to={`${FRONT_LOCAL}/loginStudent`}
                      style={
                        login === "멘티 로그인"
                          ? {
                              color: "#3B71B9",
                              fontWeight: "800",
                              textDecoration: "none",
                            }
                          : { color: "#2F5383", textDecoration: "none" }
                      }
                    >
                      멘티 로그인
                    </Link>
                  </span>
                  <hr />
                  <span
                    style={
                      login === "멘토 로그인"
                        ? { color: "#3B71B9", fontWeight: "800" }
                        : { color: "#2F5383" }
                    }
                    onClick={() => {
                      setLogin("멘토 로그인");
                      toggleLogin();
                      setSignup("회원가입");
                    }}
                  >
                    멘토 로그인
                  </span>
                </div>
              ) : null}
              <div className={styles.MenubarSpan}>{signup}</div>
              <div className={styles.Icon}>
                <FontAwesomeIcon onClick={toggleSignup} icon={faAngleDown} />
              </div>
              {signupSelect ? (
                <div className={[styles.Popup, styles.SignPopup].join(" ")}>
                  <span
                    onClick={() => {
                      setSignup("멘토 회원가입");
                      toggleSignup();
                      setLogin("로그인");
                    }}
                  >
                    <Link
                      to={`${FRONT_LOCAL}/signMentor`}
                      style={
                        signup === "멘토 회원가입"
                          ? {
                              color: "#3B71B9",
                              fontWeight: "800",
                              textDecoration: "none",
                            }
                          : { color: "#2F5383", textDecoration: "none" }
                      }
                    >
                      멘토 회원가입
                    </Link>
                  </span>
                  <hr />
                  <span
                    style={
                      login === "멘티 회원가입"
                        ? {
                            color: "#3B71B9",
                            fontWeight: "800",
                            textDecoration: "none",
                          }
                        : { color: "#2F5383", textDecoration: "none" }
                    }
                    onClick={() => {
                      setSignup("멘티 회원가입");
                      toggleSignup();
                      setLogin("로그인");
                    }}
                  >
                    <Link
                      to={`${FRONT_LOCAL}/signMentee`}
                      style={
                        signup === "멘티 회원가입"
                          ? {
                              color: "#3B71B9",
                              fontWeight: "800",
                              textDecoration: "none",
                            }
                          : { color: "#2F5383", textDecoration: "none" }
                      }
                    >
                      맨티 회원가입
                    </Link>
                  </span>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
      <hr className={styles.Line} />
    </>
  );
};

export default Menubar;
