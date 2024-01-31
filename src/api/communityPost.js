export const onDeletePost = (deleteOption) => {
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
      .catch((err) => console.error(err));
  } else if (deleteOption.type === "1") {
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
      .catch((err) => console.error(err));
  } else if (deleteOption.type === "2") {
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
      .catch((err) => console.error(err));
  }
};
