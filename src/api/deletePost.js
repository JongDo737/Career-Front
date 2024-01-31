import axios from "axios";
import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";

export const onDeletePost = async (postId) => {
  try {
    axios.delete(`${SV_LOCAL}/community/article/delete`, {
      headers: {
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
      data: { id: postId },
    });
  } catch (err) {
    console.error(err);
  }
};

export const onDeleteComment = async (commentId, articleId) => {
  try {
    axios.delete(`${SV_LOCAL}/community/comment/delete`, {
      headers: {
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
      data: { id: commentId, articleId: articleId },
    });
  } catch (err) {
    console.error(err);
  }
};

export const onDeleteRecomment = async (recommentId, commentId, articleId) => {
  try {
    axios.delete(`${SV_LOCAL}/community/recomment/delete`, {
      headers: {
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
      data: { id: recommentId, articleId: articleId, commentId: commentId },
    });
  } catch (err) {
    console.error(err);
  }
};
