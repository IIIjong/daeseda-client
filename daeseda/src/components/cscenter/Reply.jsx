import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faTrashCan } from "@fortawesome/free-solid-svg-icons";

function Reply() {
  const { id } = useParams();
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [replyContent, setReplyContent] = useState("");
  const [replyList, setReplyList] = useState([]);
  useEffect(() => {
    axios
      .get(`${serverUrl}/reply/list`)
      .then(function (response) {
        setReplyList(response.data);
      })
      .catch(function (error) {
        alert("댓글을 불러오는 도중 에러가 발생하였습니다", error);
      });
  }, []);

  function replyHandler() {
    if (replyContent.length > 30) {
      alert(
        `댓글은 30자 이상 넘길 수 없습니다 현재 입력한 댓글은 ${replyContent.length}자입니다`
      );
    } else if (replyContent !== "") {
      axios
        .post(
          `${serverUrl}/reply/register`,
          { boardId: id, replyContent: replyContent },
          { headers }
        )
        .then(function (response) {
          alert("댓글이 작성되었습니다");

          // 댓글이 작성된 후에 댓글 목록을 다시 불러옴
          axios
            .get(`${serverUrl}/reply/list`)
            .then(function (response) {
              setReplyList(response.data);
            })
            .catch(function (error) {
              alert("댓글을 불러오는 도중 에러가 발생하였습니다", error);
            });
        })
        .catch(function (error) {
          alert("댓글을 작성하는 도중 에러가 발생하였습니다", error);
        });
    } else {
      alert("댓글 내용을 입력 후 작성하세요");
    }
  }

  function updateHandler() {}

  function deleteHandler(replyId) {
    axios
      .delete(`${serverUrl}/reply/${replyId}`, { headers })
      .then(function (response) {
        alert("댓글이 삭제되었습니다");
        // 댓글이 작성된 후에 댓글 목록을 다시 불러옴
        axios
          .get(`${serverUrl}/reply/list`)
          .then(function (response) {
            setReplyList(response.data);
          })
          .catch(function (error) {
            alert("댓글을 불러오는 도중 에러가 발생하였습니다", error);
          });
      })
      .catch(function (error) {
        alert("댓글 삭제 도중 에러가 발생하였습니다");
        console.log(error);
      });
  }

  function formatDate(inputDate) {
    const parts = inputDate.split("T");
    const datePart = parts[0];
    const timePart = parts[1].split(".")[0];

    const [year, month, day] = datePart.split("-");
    const [hour, minute, second] = timePart.split(":");

    const formattedDate = `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;

    return formattedDate;
  }

  return (
    <main>
      <ReplyRow>
        <ReplyBox
          placeholder="댓글을 입력하세요"
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
        ></ReplyBox>
        <Button onClick={replyHandler}>댓글 작성</Button>
      </ReplyRow>
      <ReplyCount>
        댓글 수({replyList.filter((reply) => reply.boardId == id).length}개)
      </ReplyCount>
      {replyList.filter((reply) => reply.boardId == id).length === 0 ? (
        <p style={{ textAlign: "center", margin: "10px 0" }}>
          작성된 댓글이 없습니다
        </p>
      ) : (
        replyList
          .filter((reply) => reply.boardId == id)
          .map((reply) => (
            <ReplyListRow key={reply.replyId}>
              <ReplyContentWrapper>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Name>유저명</Name>
                  <Date>{formatDate(reply.regDate)}</Date>
                  <input
                    type="text"
                    value={reply.replyContent}
                    onChange={(e) => {
                      // 여기서 댓글 내용을 수정하도록 처리할 수 있습니다.
                      // e.target.value를 이용해 수정된 내용을 저장하거나 서버로 보낼 수 있습니다.
                    }}
                  />
                </div>
              </ReplyContentWrapper>
              <ButtonWrapper>
                <FontAwesomeIcon
                  icon={faEraser}
                  onClick={updateHandler}
                  style={{ cursor: "pointer", color: "gray" }}
                />
                <FontAwesomeIcon
                  icon={faTrashCan}
                  onClick={() => {
                    deleteHandler(reply.replyId);
                  }}
                  style={{ cursor: "pointer", color: "gray" }}
                />
              </ButtonWrapper>
            </ReplyListRow>
          ))
      )}
    </main>
  );
}

const ReplyRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  width: 700px;
  height: 100px;

  @media (max-width: 700px) {
    width: 100%; // 스크린 너비가 768px 이하일 때 width를 300px로 변경
  }
`;

const ReplyBox = styled.textarea`
  border: 1px solid rgb(232, 234, 237);
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  font-size: 18px;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgb(73, 141, 242);
  color: white;
  font-size: 16px;
  padding: 8px 12px;
`;

const ReplyCount = styled.p`
  padding: 0 10px;
`;

const ReplyListRow = styled.article`
  padding: 10px;
  display: flex;
  gap: 10px;
`;

const ReplyContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.p`
  font-size: 16px;
`;

const Date = styled.p`
  font-size: 12px;
  color: gray;
  margin-bottom: 5px;
`;

const Content = styled.input`
  font-size: 15px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
`;

export default Reply;
