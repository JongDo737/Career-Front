import styles from "./Menubar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
function Menubar() {
  const [login, setLogin] = useState("로그인");
  const [loginSelect, setLoginSelect] = useState(false);

  const [signup, setSignup] = useState("회원가입");
  const [signupSelect, setSignupSelect] = useState(false);

  const toggleLogin = () => {
    setLoginSelect((current) => !current);
    setSignupSelect(false);
  };

  const toggleSignup = () => {
    setSignupSelect((current) => !current);
    setLoginSelect(false);
  };
  return (
    <>
      <div className={styles.Menubar}>
        <div className={styles.MenubarLeft}>
          <div className={styles.Logo}>CAREER</div>
          <div className={styles.MenubarSpan}>홈</div>
          <div className={styles.MenubarSpan}>튜터</div>
          <div className={styles.MenubarSpan}>게시판</div>
          <div className={styles.MenubarSpan}>상담</div>
        </div>
        <div className={styles.MenubarRight}>
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
                  setLogin("학생 로그인");
                  toggleLogin();
                  setSignup("회원가입");
                }}
              >
                <Link
                  to={`http://localhost:3000/loginStudent`}
                  style={
                    login === "학생 로그인"
                      ? {
                          color: "#3B71B9",
                          fontWeight: "800",
                          textDecoration: "none",
                        }
                      : { color: "#2F5383", textDecoration: "none" }
                  }
                >
                  학생 로그인
                </Link>
              </span>
              <hr />
              <span
                style={
                  login === "선생님 로그인"
                    ? { color: "#3B71B9", fontWeight: "800" }
                    : { color: "#2F5383" }
                }
                onClick={() => {
                  setLogin("선생님 로그인");
                  toggleLogin();
                  setSignup("회원가입");
                }}
              >
                선생님 로그인
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
                  setSignup("학생 회원가입");
                  toggleSignup();
                  setLogin("로그인");
                }}
              >
                <Link
                  to={`http://localhost:3000/signStudent`}
                  style={
                    signup === "학생 회원가입"
                      ? {
                          color: "#3B71B9",
                          fontWeight: "800",
                          textDecoration: "none",
                        }
                      : { color: "#2F5383", textDecoration: "none" }
                  }
                >
                  학생 회원가입
                </Link>
              </span>
              <hr />
              <span
                style={
                  login === "선생님 회원가입"
                    ? {
                        color: "#3B71B9",
                        fontWeight: "800",
                        textDecoration: "none",
                      }
                    : { color: "#2F5383", textDecoration: "none" }
                }
                onClick={() => {
                  setSignup("선생님 회원가입");
                  toggleSignup();
                  setLogin("로그인");
                }}
              >
                선생님 회원가입
              </span>
            </div>
          ) : null}
        </div>
      </div>
      <hr className={styles.Line} />
    </>
  );
}

export default Menubar;
