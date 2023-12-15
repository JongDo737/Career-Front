import React, { Fragment, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faPencil,
  faHeart as faHeartFull,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFlag,
  faHeart,
  faMessage,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { SV_LOCAL } from "../../constants";
import { getCookie } from "../../cookie";
import { dateParse } from "../../utils/dateParse";
import HorizontalLine from "../../components/Line/HorizontalLine";
import { getIdFromToken } from "../../auth/jwtFunctions";
import { CommunityCategoryList } from "../../settings/config";

const PostDetail = () => {
  // const post = {
  //   name: "김성애",
  //   age: "고3", //나중에 나이 숫자로 주면 파싱 생각해보기
  //   date: "2023.07.30", // 파싱 생각해보기
  //   category: "성적고민",
  //   title: "공대여신 성애의 python project 개강",
  //   content:
  //     "컴퓨터공학과로 진학하고 싶은 분들 있나요? \n어떤 걸 준비해야 하는지 모르거나 막막한 분들은 \n댓글 달아주시거나 상담 신청해주세요~!",
  //   like: true,
  //   likeCount: 10,
  //   message: 4,
  //   img: "https://image.ytn.co.kr/general/jpg/2022/1118/202211181457199274_d.jpg",
  // };
  const [post, setPost] = useState({});
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  const [isAddReply, setIsAddReply] = useState(false);
  const [replyTargetIdx, setReplyTargetIdx] = useState(0);
  const [commentInput, setCommentInput] = useState("");
  const [recommentInput, setRecommentInput] = useState("");
  const [originalPost, setOriginalPost] = useState();

  const [postUserId, setPostUserId] = useState();
  const [updateComment, setUpdateComment] = useState(true);
  const [updatePost, setUpdatePost] = useState(true);

  const [postOptionClick, setPostOptionClick] = useState(false);
  const [commentOptionClick, setCommentOptionClick] = useState("");
  const [recommentOptionClick, setRecommentOptionClick] = useState(false);

  const [editPostContent, setEditPostContent] = useState(false);
  const [editCommentContent, setEditCommentContent] = useState("");
  const [editRecommentContent, setEditRecommentContent] = useState(false);

  const postInputRef = useRef(null);
  const commentInputRef = useRef([]);
  const recommentInputRef = useRef(null);
  const recommentRef = useRef(null);
  const deleteModalRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [image, setImage] = useState([]);
  const [newImage, setNewImage] = useState([]);
  const [removeImg, setRemoveImg] = useState([]);
  const onChangeFiles = (e) => {
    let tmpFiles = [...newFiles, ...e.target.files];
    if (tmpFiles.length > 6) {
      tmpFiles.splice(6);
    }
    setNewFiles(tmpFiles);
    const filesArray = Object.values(tmpFiles);
    const loadImageData = (files) => {
      const promises = files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(promises).then((imageDataArray) => {
        // setImage((prev) => [...prev, ...imageDataArray]);
        // setFiles((prev) => [...prev, ...filesArray]);
        setNewImage([...imageDataArray]);
      });
    };

    loadImageData(filesArray);
  };
  const onDeleteFile = (fileName) => {
    setNewFiles(newFiles.filter((file) => file !== fileName));
  };

  const scrollToReplyInput = () => {
    if (recommentRef.current) {
      recommentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const ScrollUp = () => {
    if (!window.scrollY) return;
    window.scrollTo(0, 0);
  };

  const [deleteOption, setDeleteOption] = useState({
    type: "",
    id: "",
    parentId: "",
  });

  const onDeletePostOrComment = () => {
    document.body.style.overflow = "hidden";
    // post, comment, relpy 삭제
    return (
      <DeleteWrapper
        onClick={() => {
          setDeleteOption({ type: "", id: "" });
        }}
      >
        <DeleteModal onClick={(e) => e.stopPropagation()}>
          <header>
            <span>
              {deleteOption.type !== "0" ? "댓글" : "게시글"}을
              삭제하시겠습니까?
            </span>
          </header>
          <main>
            <div
              className="button"
              onClick={() => {
                setDeleteOption({ type: "", id: "" });
              }}
            >
              취소
            </div>
            <div className="button" onClick={onDeletePost}>
              삭제
            </div>
          </main>
        </DeleteModal>
      </DeleteWrapper>
    );
  };

  useEffect(() => {
    if (deleteOption.type === "") document.body.style.overflow = "auto";
  }, [deleteOption.type]);

  const onDeletePost = () => {
    if (deleteOption.type === "0") {
      axios
        .delete(
          `${SV_LOCAL}/community/article/delete`,

          {
            headers: {
              Authorization: `Bearer ${getCookie("jwtToken")}`,
            },

            data: { id: deleteOption.id },
          }
        )
        .then(() => {
          setDeleteOption({ type: "", id: "" });
          setUpdateComment(true);
          window.history.back();
        })
        .catch((err) => console.log(err));
    } else if (deleteOption.type === "1") {
      console.log(deleteOption.id);
      axios
        .delete(`${SV_LOCAL}/community/comment/delete`, {
          headers: {
            Authorization: `Bearer ${getCookie("jwtToken")}`,
          },
          data: { id: deleteOption.id, articleId: post.id },
        })
        .then(() => {
          setDeleteOption({ type: "", id: "" });
          setUpdateComment(true);
        })
        .catch((err) => console.log(err));
    } else if (deleteOption.type === "2") {
      console.log(deleteOption.id);
      axios
        .delete(`${SV_LOCAL}/community/recomment/delete`, {
          headers: {
            Authorization: `Bearer ${getCookie("jwtToken")}`,
          },
          data: {
            id: deleteOption.id,
            articleId: post.id,
            commentId: deleteOption.parentId,
          },
        })
        .then(() => {
          setDeleteOption({ type: "", id: "", parentId: "" });
          setUpdateComment(true);
        })
        .catch((err) => console.log(err));
    }
  };

  const onEnterRecomment = (commentIdx) => {
    console.log(post.id, commentIdx, recommentInput);
    axios
      .post(
        `${SV_LOCAL}/community/recomment/add`,
        {
          articleId: post.id,
          commentId: comments[commentIdx].id,
          content: recommentInput,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${getCookie("jwtToken")}`,
          },
        }
      )
      .catch((err) => console.log(err));
    setRecommentInput("");
    setUpdateComment(true);
    // const updatedComments = [...comments];
    // updatedComments[commentIdx].replyList.push({
    //   name: "새로운 아이",
    //   age: "한국대 재학", //나중에 나이 숫자로 주면 파싱 생각해보기
    //   date: `${new Date().getFullYear()}.${String(
    //     new Date().getMonth() + 1
    //   ).padStart(2, "0")}.${String(new Date().getDate()).padStart(2, "0")}`, // 파싱 생각해보기
    //   content: recommentInput,
    //   like: false,
    //   likeCount: 0,
    //   message: 0,
    //   img: "",
    //   target: "",
    // });
    // setComments(updatedComments);
    // setrecommentInput("");
    // setIsAddReply(false);
  };

  const onEnterComment = () => {
    axios
      .post(
        `${SV_LOCAL}/community/comment/add`,
        { articleId: post.id, content: commentInput },
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${getCookie("jwtToken")}`,
          },
        }
      )
      .catch((err) => console.log(err));
    setCommentInput("");
    setUpdateComment(true);
    // 댓글 쓰고 window.scrollTo(0, document.body.scrollHeight); 적용할 수 있는 방법 찾아보자
  };
  useEffect(() => {
    if (isAddReply && recommentInputRef.current)
      recommentInputRef.current.focus();
  }, [isAddReply]);

  const onEditPostContent = () => {
    const formData = new FormData();
    console.log("remove ", removeImg);
    console.log("file", files);
    console.log("new file", newFiles);
    console.log("img", image);
    console.log("new img", newImage);
    formData.append(
      "json",
      JSON.stringify({
        id: post.id,
        categoryId: post.categoryId,
        title: post.title,
        content: post.content,
        removedImageUrls: removeImg,
      })
    );
    if (Array.isArray(image)) {
      newFiles.forEach((file) => formData.append("images", file));
      // formData.append("images", newFiles);
      console.log("array", newFiles);
    } else {
      formData.append("images", newFiles);
    }
    // console.log("form data", formData);
    axios
      .post(`${SV_LOCAL}/community/article/modify`, formData, {
        headers: {
          Authorization: `Bearer ${getCookie("jwtToken")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setEditPostContent(false);
        setUpdatePost(true);
      });
  };

  const onEditCommentContent = (id, commentIdx) => {
    axios(
      `${SV_LOCAL}/community/comment/modify`,
      {
        id: id,
        content: comments[commentIdx].content,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
      }
    ).then(() => {
      // setTmpCommentInput("");
      setEditCommentContent("");
      setUpdateComment(true);
    });
  };

  const onEditRecommentContent = (id, commentIdx, recommentIdx) => {
    axios
      .post(
        `${SV_LOCAL}/community/recomment/modify`,
        {
          id: id,
          content: comments[commentIdx].recomments[recommentIdx].content,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("jwtToken")}`,
          },
        }
      )
      .then(() => {
        setEditRecommentContent("");
        setUpdateComment(true);
      });
  };

  useEffect(() => {
    console.log("detail api");
    if (updateComment || updatePost) {
      axios
        .get(`${SV_LOCAL}/community/article/detail`, {
          headers: {
            Authorization: `Bearer ${getCookie("jwtToken")}`,
          },
          params: {
            id: id,
          },
        })
        .then((res) => {
          const data = res.data;
          // console.log(data);
          setPost(data.article || {});
          setComments(data.comments || []);
          setPostUserId(data.article?.user?.id || "");
          setOriginalPost({ ...data });
          setImage([...data.article.imgs]);
          const fileName = [];
          for (let idx = 0; idx < data.article.imgs.length; idx++) {
            fileName.push({ name: `기존 이미지${idx + 1}` });
          }
          setFiles([...fileName]);
          setNewFiles([]);
          setNewImage([]);
          setRemoveImg([]);
        })
        .catch((err) => console.error(err));
      setUpdateComment(false);
      setUpdatePost(false);
    }
  }, [id, updateComment, updatePost]);

  // useEffect(() => {
  //   setUserId(getIdFromToken(getCookie("jwtToken")));
  //   console.log(post.user);
  // }, []);

  const optionInitialize = () => {
    setPostOptionClick(false);
    setCommentOptionClick("");
    setRecommentOptionClick("");
  };
  const onAddHeart = (type, id) => {
    axios
      .post(
        `${SV_LOCAL}/community/heart/add`,
        { typeId: id, type: type },
        {
          headers: {
            Authorization: `Bearer ${getCookie("jwtToken")}`,
          },
        }
      )
      .then((res) => {
        setUpdatePost(true);
      })
      .catch((err) => console.log(err));
  };

  const onDeleteHeart = (type, id) => {
    axios
      .delete(
        `${SV_LOCAL}/community/heart/delete`,

        {
          headers: {
            Authorization: `Bearer ${getCookie("jwtToken")}`,
          },

          data: { typeId: id, type: type },
        }
      )
      .then((res) => {
        setUpdatePost(true);
      })
      .catch((err) => console.log(err));
  };
  // console.log(files);
  return (
    <>
      <Form>
        {editPostContent ? (
          <Post
            img={post.img || ""}
            onSubmit={(e) => {
              e.preventDefault();
              onEditPostContent();
            }}
          >
            <header>
              <select
                name="category-select"
                className="category-select"
                value={post.categoryId} //
                onChange={(e) => {
                  setPost({ ...post, categoryId: e.target.value });
                }}
                required
              >
                <option value="">카테고리</option>
                {CommunityCategoryList.map((category, idx) => (
                  <option value={idx} key={idx}>
                    {category.title}
                  </option>
                ))}
              </select>
              <span className="post-header__title">제목</span>
              <input
                type="text"
                className="post-header__input"
                placeholder="제목을 작성해 주세요."
                value={post.title}
                required
                onChange={(e) => setPost({ ...post, title: e.target.value })}
              />
            </header>
            <main style={{ padding: "2rem 3rem" }}>
              <textarea
                className={
                  editPostContent
                    ? "post-content post-content-write"
                    : "post-content"
                }
                required
                value={post.content}
                disabled={!editPostContent}
                ref={postInputRef}
                onChange={(e) => {
                  setPost({ ...post, content: e.target.value });
                }}
              />
            </main>
            <div className="write-file">
              <input
                id="file"
                type="file"
                multiple
                accept="image/*"
                className="write-file__input"
                onChange={(e) => onChangeFiles(e)}
                disabled={files.length + newFiles.length >= 6 ? true : false}
              />
              <label
                htmlFor="file"
                style={{
                  cursor:
                    files.length + newFiles.length >= 6
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                파일 선택
              </label>
              <span>6개 파일 중 {files.length + newFiles.length}개 선택</span>
              <div className="write-file-wrapper">
                <ul className="write-file__list-name">
                  {files.map((file, idx) => (
                    <li key={idx}>
                      <span>{file.name}</span>
                      <img
                        src="/svg/close-black.svg"
                        alt="close-button"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          // onDeleteFile(file);
                          setFiles(files.filter((item) => item !== file));
                          setRemoveImg((prev) => [...prev, image[idx]]);
                          setImage(
                            image.filter((file, index) => index !== idx)
                          );
                        }}
                      />
                    </li>
                  ))}
                  {newFiles.map((file, idx) => (
                    <li key={idx}>
                      <span>{file.name}</span>
                      <img
                        src="/svg/close-black.svg"
                        alt="close-button"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          onDeleteFile(file);
                          setNewImage(
                            newImage.filter((file, index) => index !== idx)
                          );
                        }}
                      />
                    </li>
                  ))}
                </ul>
                <ul className="write-file__list">
                  {image.map((img, imgIdx) => (
                    <img
                      key={imgIdx}
                      src={img}
                      alt=""
                      className="write-file__img"
                    />
                  ))}
                  {newImage.map((img, imgIdx) => (
                    <img
                      key={imgIdx}
                      src={img}
                      alt=""
                      className="write-file__img"
                      // onClick={() => {
                      //   fileInput.current.click();
                      // }}
                    />
                  ))}
                </ul>
              </div>
            </div>
            <footer>
              <div
                className="button"
                style={{ margin: "0" }}
                onClick={() => {
                  setEditPostContent(false);
                  setPost({
                    ...post,
                    content: originalPost.article.content,
                    categoryId: originalPost.article.categoryId,
                    title: originalPost.article.title,
                  });
                  setImage([...originalPost.article.imgs]);
                  const fileName = [];
                  for (
                    let idx = 0;
                    idx < originalPost.article.imgs.length;
                    idx++
                  ) {
                    fileName.push({ name: `기존 이미지${idx + 1}` });
                  }
                  setFiles([...fileName]);
                  setNewImage([]);
                  setNewFiles([]);
                }}
              >
                취소
              </div>
              <button type="submit">등록</button>
            </footer>
          </Post>
        ) : (
          <>
            <Post img={post.img || ""}>
              <header>
                <div className="post-header__title">{post.title}</div>
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  className="post-option__btn"
                  onClick={() => {
                    optionInitialize();
                    if (!postOptionClick) setPostOptionClick(true);

                    //setPostOptionClick((current) => !current);
                  }}
                />
                {postOptionClick &&
                  (postUserId === getIdFromToken(getCookie("jwtToken")) ? (
                    <div className="post-options">
                      <div
                        className="post-options__item"
                        onClick={() => {
                          setEditPostContent(true);
                          setPostOptionClick(false);
                          setTimeout(() => {
                            postInputRef.current.focus();
                            const textLength =
                              postInputRef.current.value.length;
                            postInputRef.current.setSelectionRange(
                              textLength,
                              textLength
                            );
                          }, 0);
                        }}
                      >
                        <FontAwesomeIcon icon={faPencil} className="icon" />
                        <span>편집</span>
                      </div>
                      <div
                        className="post-options__item"
                        onClick={() => {
                          setPostOptionClick(false);
                          setDeleteOption({ type: "0", id: post.id });
                        }}
                      >
                        <FontAwesomeIcon icon={faTrashCan} className="icon" />
                        <span>삭제</span>
                      </div>
                    </div>
                  ) : (
                    <div className="post-options">
                      <div
                        className="post-options__item"
                        onClick={() => setPostOptionClick(false)}
                      >
                        <FontAwesomeIcon icon={faFlag} className="icon" />
                        <span>신고</span>
                      </div>
                    </div>
                  ))}
              </header>
              <main>
                <div className="post-main-info">
                  <div className="post-main-info__img"></div>
                  <span className="post-main-info__name">
                    {post.user?.nickname || ""} (
                    {post.user?.isTutor ? "멘토" : "멘티"})
                  </span>
                </div>
                <div className="post-date">
                  작성일 {dateParse(post.createdAt)}
                  {post.createdAt !== post.updatedAt ? " (수정됨)" : ""}
                </div>
                <textarea
                  className={"post-content"}
                  value={post.content}
                  disabled={!editPostContent}
                  ref={postInputRef}
                  onChange={(e) => {
                    setPost({ ...post, content: e.target.value });
                  }}
                />
                <div className="write-file-wrapper">
                  <ul className="write-file__list">
                    {image.map((img, imgIdx) => (
                      <img
                        key={imgIdx}
                        src={img}
                        alt=""
                        className="write-file__img"
                        onClick={() => console.log(image)}
                      />
                    ))}
                  </ul>
                </div>
              </main>

              <footer>
                {post.isHeartClicked ? (
                  <FontAwesomeIcon
                    icon={faHeartFull}
                    className="icon heart-full"
                    onClick={() => {
                      onDeleteHeart(0, post.id); //게시글은 type 0
                      setUpdatePost(true);
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="icon"
                    onClick={() => {
                      onAddHeart(0, post.id); //게시글은 type 0
                    }}
                  />
                )}
                <span>{post.heartCnt}</span>
                <FontAwesomeIcon icon={faMessage} className="icon" />
                <span>{post.commentCnt}</span>
              </footer>
            </Post>
            <CommentWrapper>
              <div
                style={{
                  fontSize: "1.35rem",
                  fontWeight: "500",
                  margin: "1rem 0",
                  width: "100%",
                  textAlign: "start",
                }}
              >
                댓글 ({post.commentCnt})
              </div>
              {/*위 댓글수와 중복되긴 함*/}
              {comments.map((comment, commentIdx) => (
                <Fragment key={comment.id}>
                  <Comment img={comment.img || ""}>
                    <header>
                      <div className="header-left">
                        <div className="img-container"></div>
                        <div className="info">
                          <span className="name">
                            {comment.user.nickname || "익명"} (
                            {comment.user.isTutor ? "멘토" : "멘티"})
                          </span>
                          <span className="date">
                            작성일 {dateParse(comment.createdAt)}
                            {comment.createdAt !== comment.updatedAt
                              ? " (수정됨)"
                              : ""}
                          </span>
                        </div>
                      </div>
                      <FontAwesomeIcon
                        icon={faEllipsisVertical}
                        className="post-option__btn"
                        style={{ color: "black" }}
                        onClick={() => {
                          optionInitialize();
                          if (commentOptionClick === "")
                            setCommentOptionClick(commentIdx);
                          else if (commentOptionClick !== commentIdx)
                            setCommentOptionClick(commentIdx);
                        }}
                      />
                      {commentOptionClick === commentIdx &&
                        (comment.user.id ===
                        getIdFromToken(getCookie("jwtToken")) ? (
                          <div className="post-options">
                            <div
                              className="post-options__item"
                              onClick={() => {
                                setEditCommentContent(commentIdx);
                                setCommentOptionClick("");
                                setTimeout(() => {
                                  commentInputRef[commentIdx].current.focus();
                                  const textLength =
                                    commentInputRef[commentIdx].current.value
                                      .length;
                                  commentInputRef[
                                    commentIdx
                                  ].current.setSelectionRange(
                                    textLength,
                                    textLength
                                  );
                                }, 0);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faPencil}
                                className="icon"
                              />
                              <span>편집</span>
                            </div>
                            <div
                              className="post-options__item"
                              onClick={() => {
                                setCommentOptionClick("");
                                setDeleteOption({ type: "1", id: comment.id });
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faTrashCan}
                                className="icon"
                              />
                              <span>삭제</span>
                            </div>
                          </div>
                        ) : (
                          <div className="post-options">
                            <div
                              className="post-options__item"
                              onClick={() => {
                                setCommentOptionClick("");
                              }}
                            >
                              <FontAwesomeIcon icon={faFlag} className="icon" />
                              <span>신고</span>
                            </div>
                          </div>
                        ))}
                    </header>
                    <main>
                      <textarea
                        className={
                          editCommentContent === commentIdx
                            ? "main-content-write main-content"
                            : "main-content"
                        }
                        disabled={!(editCommentContent === commentIdx)}
                        value={comment.content}
                        ref={(inputRef) => {
                          if (!commentInputRef[commentIdx]) {
                            commentInputRef[commentIdx] = React.createRef();
                          }
                          commentInputRef[commentIdx].current = inputRef;
                        }}
                        onChange={(e) => {
                          const updatedComment = [...comments];
                          updatedComment[commentIdx] = {
                            ...updatedComment[commentIdx],
                            content: e.target.value,
                          };
                          // console.log(updatedComment[commentIdx]);
                          setComments(updatedComment);
                          // setTmpCommentInput(e.target.value);
                        }}
                      />
                    </main>

                    {editCommentContent === commentIdx ? (
                      <footer
                        style={{
                          justifyContent: "flex-end",
                          padding: "0 2.5rem",
                          gap: "0.5rem",
                        }}
                      >
                        <button
                          style={{ margin: "0" }}
                          onClick={() => {
                            setEditCommentContent("");
                            const updatedComment = [...comments];
                            updatedComment[commentIdx] = {
                              ...updatedComment[commentIdx],
                              content:
                                originalPost.comments[commentIdx].content,
                            };
                            console.log(
                              updatedComment,
                              originalPost.comments[commentIdx].content
                            );
                            setComments(updatedComment);
                          }}
                        >
                          취소
                        </button>
                        <button
                          type="submit"
                          style={{ margin: "0" }}
                          onClick={() => {
                            // onEditCommentContent 함수를 호출하면 detail 을 받아오는 api 도 호출돼서 아래 코드 setComments 를 통해 업데이트해줄 필요가 없지만 api 불러오는 딜레이를 없애기 위해 추가하였음
                            // const updatedComment = [...comments];
                            // updatedComment[commentIdx].content = tmpCommentInput;
                            // setComments(updatedComment);
                            //
                            onEditCommentContent(comment.id, commentIdx);
                          }}
                        >
                          등록
                        </button>
                      </footer>
                    ) : (
                      <footer>
                        <div className="footer-left">
                          {comment.isHeartClicked ? (
                            <FontAwesomeIcon
                              icon={faHeartFull}
                              className="icon heart-full"
                              onClick={() => {
                                onDeleteHeart(1, comment.id); //댓글은 type 1
                                setUpdateComment(true);
                              }}
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faHeart}
                              className="icon"
                              onClick={() => {
                                onAddHeart(1, comment.id); //댓글은 type 1
                              }}
                            />
                          )}
                          <span>{comment.heartCnt}</span>
                          <FontAwesomeIcon icon={faMessage} className="icon" />
                          <span>{comment.recommentCnt}</span>
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setIsAddReply(true);
                              setReplyTargetIdx(commentIdx);
                              scrollToReplyInput();
                              setTimeout(() => {
                                recommentRef.current.focus();
                              }, 0);
                            }}
                          >
                            답글쓰기
                          </span>
                        </div>
                      </footer>
                    )}
                  </Comment>
                  {comment.recomments.map((recomment, recommentIdx) => (
                    <Comment
                      img={recomment.img || ""}
                      key={recommentIdx}
                      style={{ width: "90%" }}
                    >
                      <header>
                        <div className="header-left">
                          <div className="img-container"></div>
                          <div className="info">
                            <span className="name">
                              {recomment.user.nickname || "익명"} (
                              {recomment.user.isTutor ? "멘토" : "멘티"})
                            </span>
                            <span className="date">
                              작성일 {dateParse(recomment.createdAt)}
                              {recomment.createdAt !== recomment.updatedAt
                                ? " (수정됨)"
                                : ""}
                            </span>
                          </div>
                        </div>
                        <FontAwesomeIcon
                          icon={faEllipsisVertical}
                          className="post-option__btn"
                          style={{ color: "black" }}
                          onClick={() => {
                            optionInitialize();
                            if (commentOptionClick === "")
                              setRecommentOptionClick(recommentIdx);
                            else if (commentOptionClick !== recommentIdx)
                              setRecommentOptionClick(recommentIdx);
                          }}
                        />
                        {recommentOptionClick === recommentIdx &&
                          (recomment.user.id ===
                          getIdFromToken(getCookie("jwtToken")) ? (
                            <div className="post-options">
                              <div
                                className="post-options__item"
                                onClick={() => {
                                  setEditRecommentContent(recommentIdx);
                                  setRecommentOptionClick("");
                                  setTimeout(() => {
                                    recommentInputRef[
                                      recommentIdx
                                    ].current.focus();
                                    const textLength =
                                      recommentInputRef[recommentIdx].current
                                        .value.length;
                                    recommentInputRef[
                                      recommentIdx
                                    ].current.setSelectionRange(
                                      textLength,
                                      textLength
                                    );
                                  }, 0);
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faPencil}
                                  className="icon"
                                />
                                <span>편집</span>
                              </div>
                              <div
                                className="post-options__item"
                                onClick={() => {
                                  setRecommentOptionClick("");
                                  setDeleteOption({
                                    type: "2",
                                    id: recomment.id,
                                    parentId: comment.id,
                                  });
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faTrashCan}
                                  className="icon"
                                />
                                <span>삭제</span>
                              </div>
                            </div>
                          ) : (
                            <div className="post-options">
                              <div
                                className="post-options__item"
                                onClick={() => {
                                  setCommentOptionClick("");
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faFlag}
                                  className="icon"
                                />
                                <span>신고</span>
                              </div>
                            </div>
                          ))}
                      </header>
                      <main>
                        <textarea
                          className={
                            editRecommentContent === recommentIdx
                              ? "main-content-write main-content"
                              : "main-content"
                          }
                          disabled={!(editRecommentContent === recommentIdx)}
                          value={recomment.content}
                          ref={(inputRef) => {
                            if (!recommentInputRef[recommentIdx]) {
                              recommentInputRef[recommentIdx] =
                                React.createRef();
                            }
                            recommentInputRef[recommentIdx].current = inputRef;
                          }}
                          onChange={(e) => {
                            const updatedComments = [...comments];
                            const updatedComment = {
                              ...updatedComments[commentIdx],
                            };
                            const updatedRecomments = [
                              ...updatedComment.recomments,
                            ];
                            updatedRecomments[recommentIdx] = {
                              ...updatedRecomments[recommentIdx],
                              content: e.target.value,
                            };
                            // console.log(updatedComment[commentIdx]);
                            updatedComment.recomments = updatedRecomments;
                            updatedComments[commentIdx] = updatedComment;
                            setComments(updatedComments);
                            // setTmpCommentInput(e.target.value);
                          }}
                        />
                        {/* {recomment.target && (
                        <span style={{ color: "#2F5383", fontWeight: "600" }}>
                          @{recomment.target}
                        </span>
                      )}
                      {recomment.content}
                    </textarea> */}
                      </main>
                      {editRecommentContent === recommentIdx ? (
                        <footer
                          style={{
                            justifyContent: "flex-end",
                            padding: "0 2.5rem",
                            gap: "0.5rem",
                          }}
                        >
                          <button
                            style={{ margin: "0" }}
                            onClick={() => {
                              setEditRecommentContent("");
                              // const updatedComment = [...comments];
                              // updatedComment[commentIdx] = {
                              //   ...updatedComment[commentIdx],
                              //   content: originalPost.comments[commentIdx].content,
                              // };

                              //setComments(updatedComment);
                              const updatedComments = [...comments];
                              const updatedComment = {
                                ...updatedComments[commentIdx],
                              };
                              const updatedRecomments = [
                                ...updatedComment.recomments,
                              ];
                              updatedRecomments[recommentIdx] = {
                                ...updatedRecomments[recommentIdx],
                                content:
                                  originalPost.comments[commentIdx].recomments[
                                    recommentIdx
                                  ].content,
                              };
                              // console.log(updatedComment[commentIdx]);
                              updatedComment.recomments = updatedRecomments;
                              updatedComments[commentIdx] = updatedComment;
                              setComments(updatedComments);
                              console.log(updatedComments);
                            }}
                          >
                            취소
                          </button>
                          <button
                            type="submit"
                            style={{ margin: "0" }}
                            onClick={() => {
                              // onEditCommentContent 함수를 호출하면 detail 을 받아오는 api 도 호출돼서 아래 코드 setComments 를 통해 업데이트해줄 필요가 없지만 api 불러오는 딜레이를 없애기 위해 추가하였음
                              // const updatedComment = [...comments];
                              // updatedComment[commentIdx].content = tmpCommentInput;
                              // setComments(updatedComment);
                              //

                              onEditRecommentContent(
                                recomment.id,
                                commentIdx,
                                recommentIdx
                              );
                            }}
                          >
                            등록
                          </button>
                        </footer>
                      ) : (
                        <footer>
                          <div className="footer-left">
                            {recomment.isHeartClicked ? (
                              <FontAwesomeIcon
                                icon={faHeartFull}
                                className="icon heart-full"
                                onClick={() => {
                                  onDeleteHeart(2, recomment.id); //대댓글은 type 2
                                  setUpdateComment(true);
                                }}
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faHeart}
                                className="icon"
                                onClick={() => {
                                  onAddHeart(2, recomment.id); //대댓글은 type 2
                                  setUpdateComment(true);
                                }}
                              />
                            )}
                            <span>{recomment.heartCnt}</span>
                          </div>
                        </footer>
                      )}
                    </Comment>
                  ))}
                  {isAddReply && commentIdx === replyTargetIdx ? (
                    <ReplyInput
                      style={{ width: "90%" }}
                      onSubmit={(e) => {
                        e.preventDefault();
                        onEnterRecomment(commentIdx);
                      }}
                    >
                      <input
                        type="text"
                        placeholder={`${comment.user.nickname}님 댓글에 답글쓰기`}
                        onChange={(e) => setRecommentInput(e.target.value)}
                        value={recommentInput}
                        ref={recommentRef}
                      />
                      <div className="reply-title">답글쓰기</div>
                      <div className="reply-option">
                        <div
                          className="reply-option__item"
                          onClick={() => setIsAddReply(false)}
                        >
                          취소
                        </div>
                        <div
                          className="reply-option__item"
                          onClick={
                            // onEditRecommentContent(
                            //   recomment.id,
                            //   commentIdx,
                            //   recommentIdx
                            // );
                            () => onEnterRecomment(commentIdx)
                          }
                        >
                          등록
                        </div>
                      </div>
                    </ReplyInput>
                  ) : (
                    ""
                  )}
                  <HorizontalLine color="#929292" height="1px" />
                </Fragment>
              ))}
              <ReplyInput>
                <input
                  type="text"
                  placeholder="여기에 댓글을 입력해주세요."
                  onChange={(e) => setCommentInput(e.target.value)}
                  value={commentInput}
                />
                <div className="reply-title">댓글쓰기</div>
                <div className="reply-option">
                  <div className="reply-option__item" onClick={onEnterComment}>
                    등록
                  </div>
                </div>
              </ReplyInput>
            </CommentWrapper>
          </>
        )}

        <UtilBox>
          <Link className="util-item write" to={"/community/write"}>
            <FontAwesomeIcon icon={faPencil} />
            <span>글쓰기</span>
          </Link>
          <div className="util-item up" onClick={ScrollUp}>
            <FontAwesomeIcon icon={faChevronUp} />
            <span>위로</span>
          </div>
        </UtilBox>
      </Form>
      {deleteOption.type !== "" && onDeletePostOrComment()}
    </>
  );
};

export default PostDetail;

const Form = styled.div`
  display: flex;
  margin: 8rem 0;
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .post-option__btn {
    position: absolute;
    right: 2rem;
    font-size: 1.4rem;
    cursor: pointer;
  }
  .post-options {
    position: absolute;
    top: 4rem;
    right: 1.4rem;
    padding: 1rem;
    border: 1px solid gray;
    border-radius: 0.8rem;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    z-index: 99;
    &__item {
      display: flex;
      justify-content: center;
      gap: 1rem;
      font-size: 1.3rem;
      cursor: pointer;

      .icon,
      span {
        color: black;
        &:hover {
          font-weight: 700;
        }
      }
    }
  }
  button,
  .button {
    width: 5rem;
    height: 2.5rem;
    align-items: center;
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 1.5rem;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    &:hover {
      font-weight: 600;
      background-color: #e9e9e9;
    }
  }
  button[type="submit"] {
    width: 5rem;
    height: 2.5rem;
    align-items: center;
    background-color: #516a8b;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 1.5rem;
    font-size: 1.2rem;
    &:hover {
      background-color: #2f5383;
    }
  }
`;

const Post = styled.form`
  width: 60rem;
  border: 1px solid black;
  border-radius: 10px;
  overflow: hidden;
  > header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
    background-color: #2f5383;
    color: white;
    position: relative;
    height: 2rem;
    gap: 2rem;
    .category-select {
      width: 10rem;
      height: 2.3rem;
      text-align: center;
      background-color: #f5f5f5;
      border-radius: 5px;
      &__info {
        position: absolute;
        left: 4rem;
        top: 4rem;
        font-size: 1rem;
        color: red;
      }
    }
    .post-header__title {
      font-size: 1.4rem;
      font-weight: 600;
    }
    .post-header__input {
      width: 60%;
      border: 1px solid gray;
      border-radius: 5px;
      padding: 0.5rem;
    }
  }
  > main {
    display: flex;
    flex-direction: column;
    padding: 2rem 3rem 0;
    gap: 0.5rem;
    position: relative;

    .post-date {
      position: absolute;
      top: 1.7rem;
      right: 2rem;
      font-size: 1.2rem;
    }
    .post-main-info {
      display: flex;
      align-items: center;
      gap: 1rem;
      &__img {
        background-image: ${(props) =>
          props.img
            ? `url(${props.img})`
            : `url("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")`};
        background-size: cover;
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 50%;
        border: 1px solid black;
      }
      &__name {
        font-size: 1.2rem;
        font-weight: 600;
      }
    }
    .post-content {
      font-size: 1.2rem;
      line-height: 2.5rem;
      border: none;
      background-color: transparent;
      color: black;
      resize: none;
    }
    .post-content-write {
      min-height: 25rem;
      vertical-align: top;
      align-items: start;
      border: 1px solid gray;
    }
  }
  .write-file {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    &__input {
      display: none;
      font-size: 1.2rem;
    }
    > label {
      font-size: 1.2rem;
      border: 1px solid gray;
      padding: 0.3rem 1rem;
    }
    &-wrapper {
      display: flex;
      gap: 2rem;
    }
    &__list {
      list-style: none;
      padding: 0;
      display: flex;
      gap: 1rem;
      font-size: 1.2rem;
      flex: 1;
      flex-wrap: wrap;
      .write-file__img {
        width: 8rem;
        height: 8rem;
        object-fit: cover;
      }
    }
    &__list-name {
      display: flex;
      flex-direction: column;
      max-height: 10rem;
      overflow-y: auto;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        span {
          width: 17rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        img {
          width: 1rem;
        }
      }
    }
  }
  > footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 4rem;
    padding: 0 1rem;
    box-sizing: border-box;
    color: #646464;
    gap: 0.5rem;
    .icon {
      font-size: 1.4rem;
      cursor: pointer;
    }
    span {
      font-size: 1.2rem;
      margin-right: 1rem;
    }
  }
`;

const CommentWrapper = styled.div`
  width: 60rem;
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 1rem;
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
    background-color: #23354d;
    color: white;
  }
`;

const Comment = styled.div`
  width: 100%;
  border: 1px solid black;
  border-radius: 10px;
  overflow: hidden;
  > header {
    background-color: #eeeeee;
    width: 100%;
    border-bottom: 1px solid #b3b3b3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 2rem;
    box-sizing: border-box;
    position: relative;
    .header-left {
      display: flex;
      gap: 3rem;
      .img-container {
        background-image: ${(props) =>
          props.img
            ? `url(${props.img})`
            : `url("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")`};
        background-size: cover;
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 50%;
        border: 1px solid black;
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.3rem;
        color: black;
        .name {
          font-size: 1.2rem;
          font-weight: 600;
        }
        .date {
          font-size: 1rem;
          /* color: #4f4f4f; */
        }
      }
    }
    .category {
      font-size: 1.3rem;
      font-weight: 600;
      color: #fee501;
    }
    .icon-wrapper {
      display: flex;
      gap: 1rem;
    }
  }
  > main {
    padding: 2rem 3rem 0;
    width: 100%;
    height: 50%;
    box-sizing: border-box;
    font-size: 1.2rem;
    line-height: 2rem;
    color: black;
    .main-title {
      font-size: 1.1rem;
      font-weight: 700;
    }
    .main-content {
      resize: none;
      display: block;
      width: 100%;
      background-color: white;
      border: none;
    }
    .main-content-write {
      border: 1px solid gray;
    }
  }
  > footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
    padding: 0 3rem;
    box-sizing: border-box;
    color: black;
    .footer-left {
      display: flex;
      gap: 0.5rem;
      .icon {
        font-size: 1.4rem;
        cursor: pointer;
      }
      span {
        font-size: 1.2rem;
        margin-right: 1rem;
      }
    }
  }
`;

const ReplyInput = styled.div`
  width: 100%;
  /* border: 1px solid black; */
  font-size: 1.2rem;
  position: relative;
  > input {
    width: 100%;
    padding: 4rem 3rem;
    box-sizing: border-box;
    font-size: 1.1rem;
    border: 1px solid gray;
    border-radius: 10px;
  }
  .reply-title {
    position: absolute;
    top: 1.5rem;
    left: 3rem;
    font-weight: 600;
  }
  .reply-option {
    display: flex;
    gap: 1rem;
    position: absolute;
    bottom: 1.2rem;
    right: 2rem;
    color: gray;
    font-weight: 600;
    &__item:hover {
      cursor: pointer;
      color: black;
    }
  }
`;

const DeleteWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #8080806d;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const DeleteModal = styled.div`
  width: 20rem;
  height: 10rem;
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  > header {
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
  }
  > main {
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    font-size: 1.3rem;
    .button {
      padding: 1rem 1.5rem;
      cursor: pointer;
      border-radius: 0.7rem;
      &:nth-of-type(1) {
        background-color: #f5f5f5;
        &:hover {
          background-color: #e9e9e9;
        }
      }
      &:nth-of-type(2) {
        background-color: #516a8b;
        color: white;
        &:hover {
          background-color: #2f5383;
        }
      }
    }
  }
`;
