import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
    if (replyContent !== "") {
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

      {replyList
        .filter((reply) => reply.boardId == id)
        .map((reply) => (
          <ReplyListRow key={reply.replyId}>
            <ReplyContentWrapper>
              <Name>유저명</Name>
              <Content>{reply.replyContent}</Content>
            </ReplyContentWrapper>
            <ButtonWrapper>
              <EditDeleteBtn onClick={updateHandler}>수정</EditDeleteBtn>
              <EditDeleteBtn
                onClick={() => {
                  deleteHandler(reply.replyId);
                }}
              >
                삭제
              </EditDeleteBtn>
            </ButtonWrapper>
          </ReplyListRow>
        ))}
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
  border-radius: 4px;

  @media (max-width: 768px) {
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
  margin-bottom: 10px;
`;

const Button = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgb(73, 141, 242);
  color: white;
  padding: 8px;
`;

const ReplyCount = styled.p`
  padding: 0 10px;
`;

const ReplyListRow = styled.article`
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ReplyContentWrapper = styled.div`
  width: 400px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Name = styled.p`
  font-size: 18px;
  background-color: rgb(93, 141, 242);
  color: white;
  padding: 4px;
  border-radius: 5px;
`;

const Content = styled.p``;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const EditDeleteBtn = styled.button`
  padding: 8px;
  background-color: rgb(232, 234, 237);
  border-radius: 5px;
`;

export default Reply;
