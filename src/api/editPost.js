import axios from "axios";
import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";

export const onEnterComment = async (postId, commentInput) => {
  try {
    await axios.post(
      `${SV_LOCAL}/community/comment/add`,
      { articleId: postId, content: commentInput },
      {
        headers: {
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
      }
    );
    // window.location.reload();
  } catch (err) {
    console.error(err);
  }
};

export const onEditCommentContent = async (id, content) => {
  try {
    await axios.post(
      `${SV_LOCAL}/community/comment/modify`,
      {
        id: id,
        content: content,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
      }
    );
    // window.location.reload();
  } catch (err) {
    console.error(err);
  }
};

export const onEditRecommentContent = async (id, content) => {
  try {
    await axios.post(
      `${SV_LOCAL}/community/recomment/modify`,
      {
        id: id,
        content: content,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
      }
    );
    // window.location.reload();
  } catch (err) {
    console.error(err);
  }
};

export const onEnterRecomment = async (postId, commentId, content) => {
  try {
    await axios.post(
      `${SV_LOCAL}/community/recomment/add`,
      {
        articleId: postId,
        commentId: commentId,
        content: content,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
      }
    );
    window.location.reload();
  } catch (err) {
    console.error(err);
  }
};
