import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faMessage,
  faStar,
} from "@fortawesome/free-regular-svg-icons";
import {
  faChevronRight,
  faStar as faStarFill,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CategoryPost from "../../pages/Community/CategoryPost";

const CategoryItem = () => {
  const [categories, setCategories] = useState([
    {
      title: "진로고민",
      info: "진로 관련된 상담이 필요한 게시글입니다.",
      content:
        "부모님과 희망 학과가 달라서 갈등이 있습니다. 어떻게 해결하면 좋을지 도와주세요.",
      likeCount: "3,041",
      message: "1,546",
      interest: false,
    },
    {
      title: "공부고민",
      info: "공부 관련된 상담이 필요한 게시글입니다.",
      content:
        "부모님과 희망 학과가 달라서 갈등이 있습니다. 어떻게 해결하면 좋을지 도와주세요.",
      likeCount: "3,041",
      message: "1,546",
      interest: true,
    },
    {
      title: "일상고민",
      info: "일상 관련된 상담이 필요한 게시글입니다.",
      content:
        "부모님과 희망 학과가 달라서 갈등이 있습니다. 어떻게 해결하면 좋을지 도와주세요.",
      likeCount: "3,041",
      message: "1,546",
      interest: true,
    },
    {
      title: "입시상담",
      info: "입시 관련된 상담이 필요한 게시글입니다.",
      content:
        "부모님과 희망 학과가 달라서 갈등이 있습니다. 어떻게 해결하면 좋을지 도와주세요.",
      likeCount: "3,041",
      message: "1,546",
      interest: false,
    },
    {
      title: "진로고민",
      info: "진로 관련된 상담이 필요한 게시글입니다.",
      content:
        "부모님과 희망 학과가 달라서 갈등이 있습니다. 어떻게 해결하면 좋을지 도와주세요.",
      likeCount: "3,041",
      message: "1,546",
      interest: false,
    },
    {
      title: "진로고민",
      info: "진로 관련된 상담이 필요한 게시글입니다.",
      content:
        "부모님과 희망 학과가 달라서 갈등이 있습니다. 어떻게 해결하면 좋을지 도와주세요.",
      likeCount: "3,041",
      message: "1,546",
      interest: true,
    },
  ]);

  const [selectCategory, setSelectCategory] = useState("");
  useEffect(() => {
    setSelectCategory("");
  }, []);

  return (
    <>
      {selectCategory === "" ? (
        categories.map((item, idx) => (
          <Category key={idx}>
            <Link
              to={`/community/category/${item.title}`}
              className="category-header"
              onClick={() => setSelectCategory(idx)}
            >
              {/* <header className="category-header" > */}
              <div className="title">
                <span className="name">{item.title}</span>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  style={{ fontSize: "1.4rem" }}
                />
              </div>
              {/* </header> */}
            </Link>
            <main>
              <div className="info">{item.info}</div>
              <div className="content">{`> ${item.content}`}</div>
            </main>
            <footer>
              {item.interest ? (
                <FontAwesomeIcon
                  icon={faStarFill}
                  className="icon"
                  onClick={() =>
                    setCategories((prev) => [
                      ...prev,
                      (prev[idx] = { ...item, interest: !item.interest }),
                    ])
                  }
                />
              ) : (
                <FontAwesomeIcon
                  icon={faStar}
                  className="icon"
                  onClick={() =>
                    setCategories((prev) => [
                      ...prev,
                      (prev[idx] = { ...item, interest: !item.interest }),
                    ])
                  }
                />
              )}
              <span>{item.likeCount}</span>
              <FontAwesomeIcon icon={faMessage} className="icon" />
              <span>{item.message}</span>
            </footer>
          </Category>
        ))
      ) : (
        <CategoryPost
          category={selectCategory}
          title={categories[selectCategory].title}
        />
      )}
    </>
  );
};

export default React.memo(CategoryItem);

const Category = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #516684;
  border-radius: 5px;
  box-shadow: 0.1rem 0.1rem 5px 1px rgba(0, 0, 0, 0.2);
  height: 17rem;
  cursor: default;
  .category-header {
    width: 85%;
    height: 30%;
    border-bottom: 1px solid #b3b3b3;
    display: flex;
    align-items: center;
    gap: 3rem;
    box-sizing: border-box;
    margin: 0 auto;
    text-decoration: none;
    color: black;
    cursor: pointer;
    .title {
      display: flex;
      align-items: center;
      gap: 1rem;
      .name {
        font-weight: 600;
        font-size: 1.5rem;
      }
    }
  }
  main {
    width: 85%;
    height: 50%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    gap: 1rem;
    .info {
      font-size: 1.2rem;
      font-weight: 500;
    }
    .content {
      font-size: 1.1rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  footer {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    height: 15%;
    padding: 0 1rem;
    margin-bottom: 5%;
    box-sizing: border-box;
    color: #646464;
    gap: 0.5rem;
    .icon {
      font-size: 1.4rem;
      color: black;
      cursor: pointer;
    }
    span {
      font-size: 1rem;
      margin-right: 1rem;
    }
  }
`;
