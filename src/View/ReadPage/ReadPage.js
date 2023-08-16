// ReadPage.js
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import page1 from "../../image/1page.png";
import pencil from "../../image/pencil_simple_line_fill_icon.png";
import pencilBlue from "../../image/pencil_blue.png";
import eraser from "../../image/eraser_fill_icon.png";
import eraserBlue from "../../image/eraser_blue.png";
import downArrow from "../../image/down_arrow.png";
import leftArrow from "../../image/leftArrow.png";
import logo from "../../image/Group 154.png";
import bookmark from "../../image/bookmarks_simple_fill_icon.png";
import CommentComponent from "./Comment";
import "../ScrollBar.css";
import "./ReadPage.css";
import { fabric } from "fabric";

var rectArray = [];
var canvas;
var drawHighlight = false;
var deleteHighlight = false;
var rect;

function CanvasRender({}) {
  const canvasRef = useRef(null);

  var isDrawing = false;
  var startDrawingPoint;

  useEffect(() => {
    const canvasElement = canvasRef.current;

    if (canvasElement) {
      canvas = new fabric.Canvas(canvasElement, {
        selection: false, // 마우스 드래그로 여러 오브젝트를 선택할 수 없도록 설정
        width: 1202,
        height: 1550,
        position: "absolute",
      });

      const fabricImage = new fabric.Image(null, {
        selectable: false,
      });

      const imgObj = new Image();
      imgObj.src = page1; // 이미지 URL을 지정해주세요.
      imgObj.onload = function () {
        fabricImage.setElement(imgObj);
        canvas.add(fabricImage);
        canvas.sendToBack(fabricImage);
      };

      canvas.on("mouse:down", (event) => {
        if (drawHighlight) {
          isDrawing = true;
          var pointer = canvas.getPointer(event.e);
          startDrawingPoint = new fabric.Point(pointer.x, pointer.y);

          rect = new fabric.Rect({
            left: startDrawingPoint.x,
            top: startDrawingPoint.y,
            width: 0,
            height: 30,
            fill: "#FFC701",
            opacity: 0.3,
            selection: true,
            selectable: true,
          });
          canvas.add(rect);
          rectArray.push(rect);
        }
      });

      canvas.on("mouse:up", () => {
        isDrawing = false;
      });

      canvas.on("mouse:move", (event) => {
        if (isDrawing) {
          var endPoint = canvas.getPointer(event.e);
          var left = Math.min(startDrawingPoint.x, endPoint.x);
          var top = Math.min(startDrawingPoint.y, endPoint.y);
          var width = Math.abs(startDrawingPoint.x - endPoint.x);

          rect.set({ left: left, top: top, width: width, height: 30 });
          canvas.requestRenderAll();
        }
      });
    }
  }, []);

  return <canvas ref={canvasRef} />;
}
function deleteHigh() {
  canvas.remove(rectArray.pop());
  canvas.requestRenderAll();
}
function ReadPage() {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const navigate = useNavigate(); // useNavigate hook 사용
  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };
  // 현재 열려있는 섹션을 나타내는 state (null, 'myComment', 'reference', 'comment')
  const [openedSection, setOpenedSection] = useState("comment"); // 댓글 섹션을 처음에 보이게 설정

  return (
    <div
      style={{
        width: 1980,
        height: 1024,
        background: "#DBDBDB",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "151px",
          left: "148px",
          width: "1202px",
          height: "174px",
          background: "#FFFFFF",
          borderTopRightRadius: "5px",
          borderTopLeftRadius: "5px",
        }}
      />
      <div
        style={{
          position: "absolute",
          color: "#545454",
          left: "258px",
          top: "262px",
          fontSize: "30px",
          fontFamily: "SDSB",
          lineHeight: "36px",
        }}
      >
        {"현진건"}
      </div>
      <img
        src={bookmark}
        alt="Bookmark"
        style={{
          position: "absolute",
          left: "1048px",
          top: "206px",
          width: "40px",
          height: "40px",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "258px",
          top: "200px",
          fontSize: "40px",
          fontFamily: "SDB",
        }}
      >
        {"운수 좋은 날"}
      </div>
      <img
        src={leftArrow}
        alt="Left Arrow"
        style={{
          position: "absolute",
          left: "188px",
          top: "206px",
          width: "40px",
          height: "40px",
        }}
        onClick={() => {
          handleGoBack();
        }}
      />
      <img
        src={logo}
        alt="Logo"
        style={{ position: "absolute", top: "27px", left: "122px" }}
      />
      <div
        style={{
          position: "absolute",
          top: 325,
          left: 148,
          width: "1202px",
          background: "#FFFFFF",
          height: "699px",
        }}
      ></div>
      <div className="comment-wrapper">
        <div className="icon-row">
          <img
            src={selectedIcon === "pencil" ? pencilBlue : pencil}
            alt="Pencil"
            className="icon icon-pencil"
            onClick={() => {
              drawHighlight = selectedIcon === "pencil" ? false : true;
              setSelectedIcon(selectedIcon === "pencil" ? null : "pencil");
            }}
          />
          <img
            src={selectedIcon === "eraser" ? eraserBlue : eraser}
            alt="Eraser"
            className="icon icon-eraser"
            onClick={() => {
              deleteHighlight = selectedIcon === "eraser" ? false : true;
              deleteHigh();
              //setSelectedIcon(selectedIcon === "eraser" ? null : "eraser");
            }}
          />
        </div>
        <hr className="divider" />
        <div className="text-row">
          <div className="text">내 주석</div>

          <img
            src={downArrow}
            alt="Arrow"
            className="arrow-icon"
            onClick={() =>
              setOpenedSection(
                openedSection === "myComment" ? null : "myComment"
              )
            }
          />
        </div>
        {openedSection === "myComment" && (
          <div
            style={{
              background: "#DBDBDB",
              width: "100%",
              height: "403px",
              margin: "10px 0",
            }}
            className="animated-section"
          >
            {/* 원하는 요소들을 이곳에 추가 */}
          </div>
        )}

        <hr className="divider" />
        <div className="text-row">
          <div className="text">댓글</div>
          <img
            src={downArrow}
            alt="Arrow"
            className="arrow-icon"
            onClick={() =>
              setOpenedSection(openedSection === "comment" ? null : "comment")
            }
          />
        </div>
        {openedSection === "comment" && (
          <div style={{ margin: "10px 0", marginTop: "30px" }}>
            {/* 원하는 요소들을 이곳에 추가 */}
            <CommentComponent
              page={1}
              nickname="UserNickname"
            ></CommentComponent>
          </div>
        )}
      </div>
      <div
        className="custom-scrollbar"
        style={{
          position: "absolute",
          top: 325,
          left: 148,
          overflow: "auto",
          width: "1114px",
          overflowX: "hidden",
          maxHeight: "699px",
        }}
      >
        <CanvasRender alt="Page 1 of the book" />

        {/* 제목 박스 내부 글부분 */}
      </div>

      {/* 주석 부분 */}
    </div>
  );
}

export default ReadPage;
