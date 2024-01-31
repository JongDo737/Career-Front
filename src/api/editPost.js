import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";

export const onEditCommentContent = (id, content) => {
  console.log(getCookie("jwtToken"), id, content);
  axios
    .post(
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
    )
    .then(() => {
      // setTmpCommentInput("");
      setEditCommentContent("");
      setUpdateComment(true);
    });
};
