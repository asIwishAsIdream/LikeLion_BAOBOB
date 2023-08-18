import React, { useState } from "react";
import rightArrow from "../../image/rightArrow_comment_pagenation.png";
import leftArrow from "../../image/leftArrow_comment_pagenation.png";
import filledHeart from "../../image/filled_heart.png";
import emptyheart from "../../image/empty_heart.png";
import recomment_arrow from "../../image/recomment_arrow.png";
import "./ReadPage.css";

const COMMENTS_PER_PAGE = 10;
const VISIBLE_COMMENTS = 4;

const CommentComponent = ({ page, nickname }) => {
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState(""); // 댓글 입력을 위한 상태
  const [replyContent, setReplyContent] = useState(""); // 답글 입력을 위한 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [replyTo, setReplyTo] = useState(null);

  const totalPages = Math.ceil(comments.length / COMMENTS_PER_PAGE);

  const pad = (num) => {
    return ("0" + num).slice(-2);
  };

  const currentDateTime = () => {
    const now = new Date();
    return `${pad(now.getFullYear().toString().substr(-2))}.${pad(
      now.getMonth() + 1
    )}.${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
  };

  const handleReplySubmit = () => {
    if (!replyContent.trim()) {
      alert("답글이 없습니다.");
      return;
    }

    if (replyContent.length > 80) {
      alert("답글은 80글자를 초과할 수 없습니다.");
      return;
    }

    const newReply = {
      nickname,
      replyContent,
      time: currentDateTime(),
    };

    const updatedComments = [...comments];
    if (!updatedComments[replyTo].replies) {
      updatedComments[replyTo].replies = [];
    }
    updatedComments[replyTo].replies.push(newReply);

    setComments(updatedComments);
    setReplyContent("");
    setReplyTo(null); // 답글 제출 후 답글 입력창 숨김
  };

  const newComment = {
    page,
    nickname,
    commentContent,
    time: currentDateTime(),
    likes: 0, // 초기 좋아요 수
    isLiked: false, // 좋아요를 눌렀는지 여부
    replies: [], // 댓글에 대한 답글들
  };

  const handleSubmit = () => {
    try {
      if (!commentContent.trim()) {
        alert("댓글이 없습니다.");
        return;
      }

      if (commentContent.length > 80) {
        alert("댓글은 80글자를 초과할 수 없습니다.");
        return;
      }

      const newComment = {
        page,
        nickname,
        commentContent,
        time: currentDateTime(),
      };

      setComments([...comments, newComment]);
      setCommentContent("");
    } catch (error) {
      alert("오류가 발생했습니다.");
      return;
    }
  };

  const handleReplyClick = (index) => {
    setReplyTo(index);
  };

  const getVisibleComments = () => {
    const startIndex = (currentPage - 1) * COMMENTS_PER_PAGE;
    return comments.slice(startIndex, startIndex + COMMENTS_PER_PAGE);
  };

  return (
    <div>
      <div
        style={{
          maxHeight: `${VISIBLE_COMMENTS * 125}px`,
          overflowY: "scroll",
        }}
      >
        {getVisibleComments().map((comment, index) => (
          <React.Fragment key={comment.page}>
            <div
              onClick={() => handleReplyClick(index)} // 클릭 이벤트 추가
              style={{
                marginLeft: "30px",
                width: "403px",
                borderColor: "#DBDBDB",
                borderWidth:
                  index === 0
                    ? "1px 2px 1px 2px"
                    : index === comments.length - 1
                    ? "1px 2px 1px 2px"
                    : "1px 2px 1px 2px",
                borderStyle: "solid",
                borderTopLeftRadius: index === 0 ? "5px" : "0",
                borderBottomLeftRadius:
                  index === comments.length - 1 ? "5px" : "0",
                padding: "10px",
                boxSizing: "border-box",
                whiteSpace: "pre-wrap",
                marginBottom: index !== comments.length - 1 ? "0" : "20px",
                backgroundColor: index % 2 === 0 ? "#F5F5F5" : "transparent",
              }}
            >
              <div
                style={{
                  color: "#3477CF",
                  fontSize: "25px",
                  marginBottom: "15px",
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <b>Page {comment.page}</b>
                <span
                  style={{
                    color: "#B1B1B1",
                    fontSize: "18px",
                    marginRight: "10px",
                  }}
                >
                  {comment.time}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "15px",
                }}
              >
                <span
                  style={{
                    color: "#244F8D",
                    fontSize: "22px",
                    textAlign: "left",
                  }}
                >
                  {comment.nickname}
                </span>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={comment.isLiked ? filledHeart : emptyheart}
                    alt="Heart Icon"
                    style={{
                      width: "23px",
                      height: "23px",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                    onClick={() => {
                      const updatedComments = [...comments];
                      if (comment.isLiked) {
                        updatedComments[index].likes--;
                      } else {
                        updatedComments[index].likes++;
                      }
                      updatedComments[index].isLiked = !comment.isLiked;
                      setComments(updatedComments);
                    }}
                  />
                  <span style={{ fontSize: "18px", marginRight: "10px" }}>
                    {comment.likes}
                  </span>
                </div>
              </div>

              <div
                style={{
                  color: "#545454",
                  fontSize: "20px",
                  marginBottom: "15px",
                  textAlign: "left",
                }}
              >
                {comment.commentContent}
              </div>

              {/* 답글들 표시 */}
              {comment.replies &&
                comment.replies.map((reply, rIndex) => (
                  <div
                    key={rIndex}
                    style={{
                      marginLeft: "30px",
                      width: "362px",
                      borderColor: "#DBDBDB",
                      borderWidth:
                        index === 0
                          ? "1px 2px 1px 2px"
                          : index === comments.length - 1
                          ? "1px 2px 1px 2px"
                          : "1px 2px 1px 2px",
                      borderStyle: "solid",
                      borderTopLeftRadius: index === 0 ? "5px" : "0",
                      borderBottomLeftRadius:
                        index === comments.length - 1 ? "5px" : "0",
                      padding: "10px",
                      boxSizing: "border-box",
                      whiteSpace: "pre-wrap",
                      backgroundColor:
                        index % 2 === 0 ? "#F5F5F5" : "transparent",
                    }}
                  >
                    <div
                      style={{
                        color: "#3477CF",
                        fontSize: "25px",
                        marginBottom: "15px",
                        textAlign: "left",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <img
                        src={recomment_arrow}
                        alt="Reply Arrow"
                        style={{ width: "25px", marginRight: "10px" }}
                      />
                      <span
                        style={{
                          color: "#B1B1B1",
                          fontSize: "18px",
                          marginRight: "10px",
                        }}
                      >
                        {reply.time}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "15px",
                      }}
                    >
                      <span
                        style={{
                          color: "#244F8D",
                          fontSize: "22px",
                          textAlign: "left",
                        }}
                      >
                        {reply.nickname}
                      </span>
                      {/* 답글에 좋아요 기능도 있으면 아래 로직도 추가할 수 있습니다. */}
                    </div>
                    <div
                      style={{
                        color: "#545454",
                        fontSize: "20px",
                        marginBottom: "15px",
                        textAlign: "left",
                      }}
                    >
                      {reply.replyContent}
                    </div>
                  </div>
                ))}
              {replyTo === index && (
                <div
                  style={{
                    marginLeft: "10px",
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    style={{
                      width: "364px",
                      height: "100px",
                      borderColor: "#DBDBDB",
                      borderRadius: "5px",
                      borderWidth: "2px",
                      boxSizing: "border-box",
                      resize: "vertical",
                    }}
                    placeholder="답글 남기기"
                    maxLength={80}
                  ></textarea>
                  <div
                    style={{
                      marginTop: "10px",
                      marginRight: "7px",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      onClick={handleReplySubmit}
                      style={{
                        background: "#3477CF",
                        color: "white",
                        width: "60px",
                        height: "35px",
                        borderRadius: "5px",
                        border: "none",
                        cursor: "pointer",
                        marginLeft: "10px",
                        fontSize: "18px",
                      }}
                    >
                      답글
                    </button>
                  </div>
                </div>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>

      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <img
            src={leftArrow}
            alt="left arrow"
            style={{ cursor: "pointer" }}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          />

          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              style={{
                margin: "0 5px",
                cursor: "pointer",
                backgroundColor:
                  currentPage === index + 1 ? "#3477CF" : "transparent",
                color: currentPage === index + 1 ? "white" : "black",
                borderRadius: "50%",
                width: "25px",
                height: "25px",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {index + 1}
            </button>
          ))}

          <img
            src={rightArrow}
            alt="right arrow"
            style={{ cursor: "pointer" }}
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
          />
        </div>
      )}

      <div style={{ marginTop: "70px", marginLeft: "30px" }}>
        <textarea
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          style={{
            width: "403px",
            height: "100px",
            borderColor: "#DBDBDB",
            borderRadius: "5px",
            borderWidth: "2px",
            boxSizing: "border-box",
            resize: "vertical",
            fontFamily: "SDSB",
          }}
          placeholder="댓글 남기기"
          maxLength={80}
        ></textarea>
        <div
          style={{
            marginTop: "10px",
            marginRight: "8px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={handleSubmit}
            style={{
              background: "#3477CF",
              color: "white",
              width: "60px",
              height: "35px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            댓글
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentComponent;
