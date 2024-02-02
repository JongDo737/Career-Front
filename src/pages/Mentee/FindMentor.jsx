import React, { useEffect, useState } from "react";
import { MenteeMentorLinkList, MenteeMentorMenu } from "../../settings/config";
import SubMenubar from "../../components/Menubar/SubMenubar";
import styled from "styled-components";
import { colors } from "../../styles/common/Theme";
import { MenteeHeader, MentorCardGrid } from "../../styles/common/Mentee";
import Input from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import MentorCard from "../../components/List/MentorCard";
import { useQuery } from "react-query";
import { fetchMentor } from "../../api/fetchMentor";
import { fetchMajorAutoComplete } from "../../api/fetchMajorList";
import { yScrollStyle } from "../../styles/common/Scroll";

const FindMentor = () => {
  const subMenuList = MenteeMentorMenu;
  const subMenuLinkList = MenteeMentorLinkList;
  const subMenu = subMenuList[1];
  const SortOptions = ["최신순", "후기 많은순", "수강 많은순"];
  const [keyword, setKeyword] = useState("");
  const [tmpKeyword, setTmpKeyword] = useState("");
  const [sort, setSort] = useState(1);
  const [isInputFocused, setIsInputFocused] = useState(false); // Input 포커스 상태 추적
  const INPUT_WIDTH = "35rem";
  const INPUT_HEIGHT = "3rem";

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const { data: mentorData } = useQuery(["findMentor", { sort, keyword }], () =>
    fetchMentor({
      keyword,
      sortOption: sort,
      page: 0,
      size: 10,
    })
  );

  const { data: keywordData } = useQuery(tmpKeyword, () =>
    fetchMajorAutoComplete(tmpKeyword)
  );

  // console.log(keywordData);

  const onSearch = (e) => {
    e.preventDefault();
    setKeyword(tmpKeyword);
  };

  return (
    <>
      <SubMenubar
        subMenuList={subMenuList}
        selectMenu={subMenu}
        subMenuLinkList={subMenuLinkList}
      />
      <StyledLayout>
        <MenteeHeader>
          전공 태그를 통해 원하는 멘토를 검색해 보세요!
        </MenteeHeader>
        <SearchContainer onSubmit={onSearch}>
          <Input
            size="large"
            placeholder="전공 태그를 입력해 주세요."
            onChange={(e) => setTmpKeyword(e.target.value)}
            value={tmpKeyword}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            height={INPUT_HEIGHT}
            width={INPUT_WIDTH}
          />
          <Button height="auto">검색</Button>
          {isInputFocused && keywordData && (
            <KeywordAutoComplete top={INPUT_HEIGHT} width={INPUT_WIDTH}>
              {keywordData.map((keywordItem, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setTmpKeyword(keywordItem);
                  }}
                  style={{
                    display:
                      tmpKeyword && tmpKeyword === keywordItem ? "none" : "",
                  }}
                >
                  {keywordItem}
                </li>
              ))}
            </KeywordAutoComplete>
          )}
        </SearchContainer>
        <SortList>
          {SortOptions &&
            SortOptions.map((item, idx) => (
              <div
                className={sort === idx ? "selected-sort" : ""}
                key={idx}
                onClick={() => setSort(idx)}
              >
                {item}
              </div>
            ))}
        </SortList>
        {!!mentorData ? ( // !isLoading 넣기???
          <MentorCardGrid>
            {mentorData.map((item, idx) => (
              <MentorCard key={idx} mentor={item} />
            ))}
          </MentorCardGrid>
        ) : (
          <div>loading...</div>
        )}
      </StyledLayout>
    </>
  );
};

export default FindMentor;

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const SearchContainer = styled.form`
  display: flex;
  gap: 1rem;
  position: relative;
`;

const KeywordAutoComplete = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: ${(prop) => prop.top};
  width: ${(prop) => prop.width};
  background-color: #f8f8f8df;
  z-index: 99;
  font-size: 1.1rem;
  max-height: 20rem;
  overflow-y: auto;
  box-sizing: border-box;
  ${yScrollStyle}
  > li {
    padding: 0.7rem;
    cursor: pointer;
    border: 1px solid #b9b9b9df;
    border-top: none;
    &:hover {
      background-color: #d8d8d8df;
    }
  }
`;

const SortList = styled.div`
  div {
    border: 2px solid black;
    padding: 0.5rem 1rem;
    text-align: center;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    &:hover,
    &.selected-sort {
      background-color: ${colors.primaryBlue};
      color: white;
    }
  }
  margin: 1rem 0;
  display: flex;
  gap: 1rem;
`;
