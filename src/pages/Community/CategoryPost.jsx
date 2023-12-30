import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostList from "../../components/List/PostList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronUp,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../../cookie";
import { SV_LOCAL } from "../../constants";
import { CommunityCategoryList } from "../../settings/config";
import { colors } from "../../styles/common/theme";

const CategoryPost = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const ScrollUp = () => {
    if (!window.scrollY) return;
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    axios
      .get(`${SV_LOCAL}/community/article/all_category`, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
        params: {
          categoryId: id,
          page: 0,
          size: 10,
        },
      })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);
  // const posts = [
  //   {
  //     name: "김성애",
  //     age: "고3", //나중에 나이 숫자로 주면 파싱 생각해보기
  //     date: "2023.07.30", // 파싱 생각해보기
  //     category: "성적고민",
  //     content:
  //       "수능 최저2 합4를 맞춰야 합니다. 영어랑 생윤을 준비중인데 하나 더 공부를 하려구요. 단기간 공부하기에 어떤 게 좋을까요?",
  //     likeCount: 10,
  //     message: 4,
  //     img: "https://image.ytn.co.kr/general/jpg/2022/1118/202211181457199274_d.jpg",
  //   },
  //   {
  //     name: "채희문",
  //     age: "고2", //나중에 나이 숫자로 주면 파싱 생각해보기
  //     date: "2023.07.29", // 파싱 생각해보기
  //     category: "진로고민",
  //     content:
  //       "희망하는 과가 부모님 생각과 달라서 트러블이 생기는데 어떻게 하면 좋을까요. 부모님을 설득해야 하는데 설득할 자신이 없어요. 제가 좋아하는 과를 가는 게 맞을까요? 아니면 부모님 말씀처럼 유망한 과를 가는 게 맞을까요? 도와주세요 ㅠㅠㅠㅠ",
  //     likeCount: 25,
  //     message: 11,
  //     img: "https://img.hankyung.com/photo/202001/BF.21480816.1.jpg",
  //   },
  //   {
  //     name: "신종민",
  //     age: "고1", //나중에 나이 숫자로 주면 파싱 생각해보기
  //     date: "2023.07.29", // 파싱 생각해보기
  //     category: "진로고민",
  //     content:
  //       "희망하는 과가 부모님 생각과 달라서 트러블이 생기는데 어떻게 하면 좋을까요. 부모님을 설득해야 하는데 설득할 자신이 없어요. 제가 좋아하는 과를 가는 게 맞을까요? 아니면 부모님 말씀처럼 유망한 과를 가는 게 맞을까요? 도와주세요 ㅠㅠㅠㅠ",
  //     likeCount: 4,
  //     message: 13,
  //     img: "https://image.xportsnews.com/contents/images/upload/article/2021/1125/mb_1637825577788244.jpg",
  //   },
  //   {
  //     name: "한재준",
  //     age: "고2", //나중에 나이 숫자로 주면 파싱 생각해보기
  //     date: "2023.07.28", // 파싱 생각해보기
  //     category: "공부고민",
  //     content:
  //       "수능 최저2 합4를 맞춰야 합니다. 영어랑 생윤을 준비중인데 하나 더 공부를 하려구요. 단기간 공부하기에 어떤 게 좋을까요?",
  //     likeCount: 21,
  //     message: 7,
  //     img: "https://file.mk.co.kr/meet/neds/2021/11/image_readtop_2021_1097541_16378776624856653.jpg",
  //   },
  //   {
  //     name: "아무개",
  //     age: "고1", //나중에 나이 숫자로 주면 파싱 생각해보기
  //     date: "2023.07.27", // 파싱 생각해보기
  //     category: "진로고민",
  //     content:
  //       "희망하는 과가 부모님 생각과 달라서 트러블이 생기는데 어떻게 하면 좋을까요. 부모님을 설득해야 하는데 설득할 자신이 없어요. 제가 좋아하는 과를 가는 게 맞을까요? 아니면 부모님 말씀처럼 유망한 과를 가는 게 맞을까요? 도와주세요 ㅠㅠㅠㅠ",
  //     likeCount: 5,
  //     message: 13,
  //     img: "",
  //   },
  //   {
  //     name: "김성애",
  //     age: "고3", //나중에 나이 숫자로 주면 파싱 생각해보기
  //     date: "2023.07.30", // 파싱 생각해보기
  //     category: "성적고민",
  //     content:
  //       "수능 최저2 합4를 맞춰야 합니다. 영어랑 생윤을 준비중인데 하나 더 공부를 하려구요. 단기간 공부하기에 어떤 게 좋을까요?",
  //     likeCount: 10,
  //     message: 4,
  //     img: "https://image.ytn.co.kr/general/jpg/2022/1118/202211181457199274_d.jpg",
  //   },
  //   {
  //     name: "채희문",
  //     age: "고2", //나중에 나이 숫자로 주면 파싱 생각해보기
  //     date: "2023.07.29", // 파싱 생각해보기
  //     category: "진로고민",
  //     content:
  //       "희망하는 과가 부모님 생각과 달라서 트러블이 생기는데 어떻게 하면 좋을까요. 부모님을 설득해야 하는데 설득할 자신이 없어요. 제가 좋아하는 과를 가는 게 맞을까요? 아니면 부모님 말씀처럼 유망한 과를 가는 게 맞을까요? 도와주세요 ㅠㅠㅠㅠ",
  //     likeCount: 25,
  //     message: 11,
  //     img: "https://img.hankyung.com/photo/202001/BF.21480816.1.jpg",
  //   },
  //   {
  //     name: "신종민",
  //     age: "고1", //나중에 나이 숫자로 주면 파싱 생각해보기
  //     date: "2023.07.29", // 파싱 생각해보기
  //     category: "진로고민",
  //     content:
  //       "희망하는 과가 부모님 생각과 달라서 트러블이 생기는데 어떻게 하면 좋을까요. 부모님을 설득해야 하는데 설득할 자신이 없어요. 제가 좋아하는 과를 가는 게 맞을까요? 아니면 부모님 말씀처럼 유망한 과를 가는 게 맞을까요? 도와주세요 ㅠㅠㅠㅠ",
  //     likeCount: 4,
  //     message: 13,
  //     img: "https://image.xportsnews.com/contents/images/upload/article/2021/1125/mb_1637825577788244.jpg",
  //   },
  //   {
  //     name: "한재준",
  //     age: "고2", //나중에 나이 숫자로 주면 파싱 생각해보기
  //     date: "2023.07.28", // 파싱 생각해보기
  //     category: "진로고민",
  //     content:
  //       "수능 최저2 합4를 맞춰야 합니다. 영어랑 생윤을 준비중인데 하나 더 공부를 하려구요. 단기간 공부하기에 어떤 게 좋을까요?",
  //     likeCount: 21,
  //     message: 7,
  //     img: "https://file.mk.co.kr/meet/neds/2021/11/image_readtop_2021_1097541_16378776624856653.jpg",
  //   },
  //   {
  //     name: "아무개",
  //     age: "고1", //나중에 나이 숫자로 주면 파싱 생각해보기
  //     date: "2023.07.27", // 파싱 생각해보기
  //     category: "진로고민",
  //     content:
  //       "희망하는 과가 부모님 생각과 달라서 트러블이 생기는데 어떻게 하면 좋을까요. 부모님을 설득해야 하는데 설득할 자신이 없어요. 제가 좋아하는 과를 가는 게 맞을까요? 아니면 부모님 말씀처럼 유망한 과를 가는 게 맞을까요? 도와주세요 ㅠㅠㅠㅠ",
  //     likeCount: 5,
  //     message: 13,
  //     img: "",
  //   },
  // ];
  return (
    <PostWrapper>
      <Section>
        <Search>
          <span>{CommunityCategoryList[id].title} 게시판</span>
        </Search>
        <Wrapper>
          <PostList posts={posts} setPosts={setPosts} postStyle="category" />
        </Wrapper>
        <UtilBox>
          <Link
            className="util-item write"
            // onClick={() => setIsWrite(true)}
            to={"/community/write"}
          >
            <FontAwesomeIcon icon={faPencil} />
            <span>글쓰기</span>
          </Link>
          <div className="util-item up" onClick={ScrollUp}>
            <FontAwesomeIcon icon={faChevronUp} />
            <span>위로</span>
          </div>
        </UtilBox>
      </Section>
    </PostWrapper>
  );
};

export default CategoryPost;

const PostWrapper = styled.div`
  height: 70%;
  display: flex;
  margin: 60px 0;
  justify-content: center;
  box-sizing: border-box;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  .header {
    margin: 50px 0;
    font-size: 2rem;
    font-weight: 600;
    color: ${colors.primaryBlue};
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 5rem;
  span {
    font-size: 1.7rem;
    font-weight: 600;
  }
  input {
    width: 30rem;
    height: 2.2rem;
    border: 1px solid black;
    border-radius: 3px;
  }
  .glass-icon {
    background-color: #2f5383;
    padding: 0.7rem 1rem;
    font-size: 1.2rem;
    color: white;
    border-radius: 5px;
  }
`;

const Wrapper = styled.div`
  width: 50rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const UtilBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: fixed;
  bottom: 2rem;
  right: 3rem;
  .util-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.3rem;
    border: 1px solid black;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    padding: 0.7rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
  }
  .write {
    background-color: #eaeaea;
    text-decoration: none;
    color: black;
  }
  .up {
    background-color: ${colors.primaryBlue};
    color: white;
  }
`;

const CategoryLayout = styled.div`
  width: 70rem;
  display: grid;
  grid-template-columns: repeat(2, 35rem);
  grid-gap: 2rem;
`;
