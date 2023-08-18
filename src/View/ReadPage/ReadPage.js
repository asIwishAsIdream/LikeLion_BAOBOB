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
import editBox from "../../image/Rectangle 34.png";
import "../ScrollBar.css";
import "./ReadPage.css";
import { fabric } from "fabric";
import { render } from "@testing-library/react";
import plusAnnotation from "../../image/Group 118.png";
import { eventWrapper } from "@testing-library/user-event/dist/utils";
import { click } from "@testing-library/user-event/dist/click";

var rectTag = 0;
var canvas;
var drawHighlight = false;
var deleteHighlight = false;
var rect;
var isWriting = false;
var textBoxArray = [];
var tb = {
  obj: null,
  connectedRectId: 0,
};

const plusButton = new fabric.Image(null, {
  selectable: false,
});
var isPlusOn = false;
var tempGroup;
const imgObj = new Image();
imgObj.src = plusAnnotation; // 이미지 URL을 지정해주세요.
imgObj.onload = function () {
  plusButton.setElement(imgObj);
};

const eb = new fabric.Image(null, {
  selectable: false,
});

const tempImg = new Image();
tempImg.src = editBox; // 이미지 URL을 지정해주세요.
tempImg.onload = function () {
  eb.setElement(tempImg);
};

function CanvasRender({}) {
  const canvasRef = useRef(null);

  var isDrawing = false;
  var startDrawingPoint;

  useEffect(() => {
    const canvasElement = canvasRef.current;

    if (canvasElement) {
      canvas = new fabric.Canvas(canvasElement, {
        width: 1202,
        height: 1550,
        position: "absolute",
        selection: "single",
      });

      const fabricImage = new fabric.Image(null, {
        selectable: false,
      });

      const imgObj = new Image();
      imgObj.src = page1; // 이미지 URL을 지정해주세요.
      imgObj.onload = function () {
        fabricImage.setElement(imgObj);
        fabricImage.set({
          selectable: false,
        });
        canvas.add(fabricImage);
        canvas.sendToBack(fabricImage);
      };

      canvas.on("object:scaling", function (e) {
        var scaledObject = e.target;
        if (scaledObject.type === "rect" || scaledObject.type === "group") {
          scaledObject.set({
            scaleY: 1, // Lock the vertical scaling
          });
        }
      });

      canvas.on("object:modified", function (e) {
        var eventObject = e.target;
        if (!eventObject) return;
        if (eventObject.type === "rect" || eventObject.type === "group") {
          tempGroup.set({
            left: eventObject.left + eventObject.width * eventObject.scaleX + 5,
            top: eventObject.top - 55,
          });
          canvas.renderAll();
        }
      });

      canvas.on("mouse:over", function (e) {
        var eventObject = e.target;
        if (!eventObject) return;
        if (eventObject.type === null) return;
        if (eventObject.type === "image") return;
        if (isWriting) return;
        if (eventObject.type === "rect" || eventObject.type === "group") {
          var yesAnnotation = false;
          var obb;
          textBoxArray.forEach((ob, index) => {
            if (ob.connectedRectId == eventObject.id) {
              yesAnnotation = true;
              obb = ob;
            }
          });
          if (yesAnnotation) {
            eb.set({
              selectable: false,
              left:
                eventObject.left + eventObject.width * eventObject.scaleX + 30,
              top: eventObject.top - 70,
            });

            textBox = obb.obj;
            textBox.set({
              left:
                eventObject.left + eventObject.width * eventObject.scaleX + 40,
              top: eventObject.top - 55,
              width: 100, // 너비 조절
              fontSize: 20,
              fill: "black",
              fontFamily: "SDSB",
            });
            tempGroup = new fabric.Group([eb, textBox], {
              left:
                eventObject.left + eventObject.width * eventObject.scaleX + 5,
              top: eventObject.top - 55,
            });
          } else {
            var xmin =
              eventObject.left + eventObject.width * eventObject.scaleX;
            var ymin = eventObject.top - 30;
            plusButton.set({
              left: xmin,
              top: ymin,
              width: 30,
              height: 30,
            });
            canvas.remove(tempGroup);
            tempGroup = plusButton;

            isPlusOn = true;
          }

          tempGroup.bringToFront();
          canvas.add(tempGroup);

          canvas.renderAll();
        }
      });

      canvas.on("mouse:out", function (e) {
        if (isWriting) return;
        var eventObject = e.target;
        if (!eventObject) return;
        if (eventObject.type === null) return; // 이미지에 마우스가 올라가면 하이라이트 안되게)
        if (eventObject.type === "image") return;

        if (eventObject.type === "rect" || eventObject.type === "group") {
          if (tempGroup != null) canvas.remove(tempGroup);
          tempGroup = null;
          isPlusOn = false;
          canvas.renderAll();
        }
      });

      var clickedObject;
      var textBox;
      var numBox;
      canvas.on("mouse:up", (event) => {
        if (isDrawing) {
          isDrawing = false;
        } else {
          var pointer = canvas.getPointer(event.e);
          clickedObject = canvas.findTarget(pointer, (obj) => obj.selectable);
          if (clickedObject.type === "rect" || clickedObject.type === "group") {
            // 텍스트 박스 생성
            if (deleteHighlight) {
              canvas.remove(clickedObject);
              for (var i = 0; i < textBoxArray.length; i++) {
                if (textBoxArray[i].connectedRectId == clickedObject.id) {
                  textBoxArray.splice(i, 1);

                  break;
                }
              }
              canvas.renderAll();
              return;
            }
            if (clickedObject.type === "group") return;
            textBoxArray.forEach((ob, index) => {
              if (ob.connectedRectId == clickedObject.id) {
                return;
              }
            });

            isWriting = true;
            if (tempGroup != null) canvas.remove(tempGroup);
            numBox = new fabric.IText("[" + textBoxArray.length + "]", {
              left:
                clickedObject.left + clickedObject.width * clickedObject.scaleX,
              top: clickedObject.top - 30,
              width: 30, // 너비 조절
              fontSize: 20,
              fill: "#244F8D",
              fontFamily: "SDEB",
            });
            textBox = new fabric.IText("주석 남기기", {
              left:
                clickedObject.left +
                clickedObject.width * clickedObject.scaleX +
                40,
              top: clickedObject.top - 65,
              width: 100, // 너비 조절
              fontSize: 20,
              fill: "black",
              fontFamily: "SDSB",
            });

            eb.set({
              selectable: false,
              left:
                clickedObject.left +
                clickedObject.width * clickedObject.scaleX +
                30,
              top: clickedObject.top - 80,
            });

            eb.src = editBox;
            canvas.add(eb);
            canvas.add(numBox);
            canvas.add(textBox);

            textBox.enterEditing();
            canvas.renderAll();
          }
        }
      });

      canvas.on("mouse:down", (event) => {
        var pointer = canvas.getPointer(event.e);

        if (drawHighlight) {
          isDrawing = true;
          startDrawingPoint = new fabric.Point(pointer.x, pointer.y);

          rect = new fabric.Rect({
            id: rectTag,
            left: startDrawingPoint.x,
            top: startDrawingPoint.y,
            width: 0,
            height: 30,
            fill: "#FFC701",
            opacity: 0.3,
            selectable: true,
          });
          canvas.add(rect);
          rectTag++;
        }
      });

      canvas.on("selection:updated", function (event) {
        var tbt = Object.create(tb);

        if (numBox == null) return;

        canvas.remove(eb);
        tbt.obj = textBox;
        tbt.connectedRectId = clickedObject.id;
        textBoxArray.push(tbt);

        textBox.exitEditing();
        canvas.remove(textBox);
        var grp = new fabric.Group([numBox, clickedObject], {
          id: clickedObject.id,
          left: clickedObject.left,
          top: clickedObject.top - 30,
        });

        canvas.remove(clickedObject);
        canvas.remove(numBox);
        if (grp != null) canvas.add(grp);
        canvas.renderAll();
        numBox = null;
        textBox = null;
        clickedObject = null;
        isWriting = false;
      });

      canvas.on("selection:cleared", function (event) {
        var tbt = Object.create(tb);

        if (numBox == null) return;

        canvas.remove(eb);
        tbt.connectedRectId = clickedObject.id;

        tbt.obj = textBox;
        textBoxArray.push(tbt);

        textBox.exitEditing();

        canvas.remove(textBox);
        var grp = new fabric.Group([numBox, clickedObject], {
          id: clickedObject.id,
          left: clickedObject.left,
          top: clickedObject.top - 30,
        });
        canvas.remove(clickedObject);
        canvas.remove(numBox);
        if (grp != null) canvas.add(grp);
        canvas.renderAll();
        numBox = null;
        textBox = null;
        clickedObject = null;
        isWriting = false;
      });

      canvas.on("selection:created", function (event) {
        if (event.target == null) return;
        if (event.target.type === "image") {
          canvas.deactivateAll().renderAll();
        }
      });

      canvas.on("object:moving", function (e) {
        var eventObject = e.target;
        if (!eventObject) return;
        if (eventObject.type === "rect" || eventObject.type === "group") {
          canvas.remove(tempGroup);
        }
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
              if (deleteHighlight) {
                deleteHighlight = false;
              }
              setSelectedIcon(selectedIcon === "pencil" ? null : "pencil");
            }}
          />
          <img
            src={selectedIcon === "eraser" ? eraserBlue : eraser}
            alt="Eraser"
            className="icon icon-eraser"
            onClick={() => {
              deleteHighlight = selectedIcon === "eraser" ? false : true;
              if (drawHighlight) {
                drawHighlight = false;
              }
              setSelectedIcon(selectedIcon === "eraser" ? null : "eraser");
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
