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

var drawHighlight = false;
var deleteHighlight = false;

const plusButton = new fabric.Image(null, {
  selectable: false,
});
const imgObj = new Image();
imgObj.src = plusAnnotation; // 이미지 URL을 지정해주세요.
imgObj.onload = function () {
  plusButton.setElement(imgObj);
};

function CanvasRender({}) {
  const canvasRef = useRef(null);

  var startDrawingPoint;

  var tempGroup;
  useEffect(() => {
    const canvasElement = canvasRef.current;

    var isWriting = false;
    var textBoxArray = [];
    var tb = {
      obj: null,
      connectedRectId: 0,
    };

    if (canvasElement) {
      const canvas = new fabric.Canvas(canvasElement, {
        width: 1202,
        height: 1550,
        position: "absolute",
        selection: false,
      });

      var img = new Image(); //페이지 로드
      img.src = page1;
      img.onload = function () {
        var fabricImage = new fabric.Image(img, {
          left: 0,
          top: 0,
          selectable: false,
        });

        canvas.add(fabricImage);
        canvas.sendToBack(fabricImage);
      };

      canvas.on("object:scaling", function (e) {
        var eventObject = e.target;
        if (eventObject.type === "rect" || eventObject.type === "group") {
          var eventObject = e.target;
          if (eventObject.type === "rect" || eventObject.type === "group") {
            if (numBox != null) {
              canvas.remove(numBox);
              canvas.remove(textBox);
              canvas.remove(eb);
              textBox.exitEditing();
              numBox.set({
                left:
                  eventObject.left + eventObject.width * eventObject.scaleX + 5,
                top: eventObject.top - 30, //plusButton 일때는 30, 텍스트일때는 55
              });
              textBox.set({
                left:
                  eventObject.left +
                  eventObject.width * eventObject.scaleX +
                  40,
                top: eventObject.top - 55,
              });
              eb.set({
                left:
                  eventObject.left +
                  eventObject.width * eventObject.scaleX +
                  30,
                top: eventObject.top - 70,
              });
              canvas.renderAll();
            }
          } else if (tempGroup != null) {
            tempGroup.set({
              left:
                eventObject.left + eventObject.width * eventObject.scaleX + 5,
              top: eventObject.top - 30, //plusButton 일때는 30, 텍스트일때는 55
            });
            canvas.renderAll();
          }
          eventObject.set({
            scaleY: 1, // Lock the vertical scaling
          });
        }
      });

      canvas.on("object:moving", function (e) {
        var eventObject = e.target;
        if (eventObject.type === "rect" || eventObject.type === "group") {
          if (numBox != null) {
            canvas.remove(numBox);
            canvas.remove(textBox);
            canvas.remove(eb);
            textBox.exitEditing();
            numBox.set({
              left:
                eventObject.left + eventObject.width * eventObject.scaleX + 5,
              top: eventObject.top - 30, //plusButton 일때는 30, 텍스트일때는 55
            });
            textBox.set({
              left:
                eventObject.left + eventObject.width * eventObject.scaleX + 40,
              top: eventObject.top - 55,
            });
            eb.set({
              left:
                eventObject.left + eventObject.width * eventObject.scaleX + 30,
              top: eventObject.top - 70,
            });
            canvas.renderAll();
          }
        } else if (tempGroup != null) {
          tempGroup.set({
            left: eventObject.left + eventObject.width * eventObject.scaleX + 5,
            top: eventObject.top - 30, //plusButton 일때는 30, 텍스트일때는 55
          });
          canvas.renderAll();
        }
      });

      var rect;
      var isDrawing = false;
      var rectTag = 0;
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
            selectable: "multiple",
          });
          canvas.add(rect);
          rectTag++;
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

      var clickedObject;
      var textBox;
      var numBox;
      var eb;
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
                if (textBoxArray[i].connectedRectId === clickedObject.id) {
                  textBoxArray.splice(i, 1);
                  break;
                }
              }
              canvas.remove(tempGroup);
              tempGroup = null;
              canvas.renderAll();
              return;
            } else if (clickedObject.type === "group") return;
            else if (drawHighlight) return;
            textBoxArray.forEach((ob, index) => {
              if (ob.connectedRectId == clickedObject.id) {
                return;
              }
            });

            if (tempGroup != null) canvas.remove(tempGroup);
            numBox = new fabric.IText("[" + clickedObject.id + "]", {
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

            eb = new fabric.Image(null, {
              left:
                clickedObject.left +
                clickedObject.width * clickedObject.scaleX +
                30,
              top: clickedObject.top - 80,
              selectable: false,
            });
            var tempImg = new Image();
            tempImg.src = editBox; // 이미지 URL을 지정해주세요.
            tempImg.onload = function () {
              eb.setElement(tempImg);
              canvas.add(eb);
              canvas.add(numBox);
              canvas.add(textBox);
            };

            textBox.enterEditing();
            canvas.renderAll();
          }
        }
      });

      canvas.on("mouse:over", function (e) {
        var eventObject = e.target;
        if (!eventObject) return;
        if (eventObject.type === "image") return;
        if (isWriting || isDrawing) return;

        if (eventObject.type === "rect" || eventObject.type === "group") {
          var yesAnnotation = false;
          var obb;
          textBoxArray.forEach((ob, index) => {
            if (ob.connectedRectId === eventObject.id) {
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

            if (numBox != null) {
              canvas.remove(numBox);
              canvas.remove(textBox);
              canvas.remove(eb);
              textBox.exitEditing();
            }
            plusButton.set({
              left: xmin,
              top: ymin,
            });
            tempGroup = plusButton;
          }
          if (drawHighlight) return;
          canvas.add(tempGroup);
          canvas.renderAll();
        }
      });

      canvas.on("mouse:out", function (e) {
        var eventObject = e.target;
        if (!eventObject) return;
        if (isWriting || isDrawing) return;
        if (eventObject.type === "image") return;

        if (eventObject.type === "rect" || eventObject.type === "group") {
          if (tempGroup != null) canvas.remove(tempGroup);
          tempGroup = null;
          canvas.renderAll();
        }
      });

      canvas.on("selection:updated", function (event) {
        if (numBox == null) return;

        var tbt = Object.create(tb);
        tbt.obj = textBox;
        tbt.connectedRectId = clickedObject.id;
        textBoxArray.push(tbt);

        textBox.exitEditing();

        var grp = new fabric.Group([numBox, clickedObject], {
          id: clickedObject.id,
          left: clickedObject.left,
          top: clickedObject.top - 30,
        });

        canvas.remove(textBox);
        canvas.remove(eb);
        canvas.remove(clickedObject);
        canvas.remove(numBox);
        if (grp != null) canvas.add(grp);
        canvas.renderAll();
        numBox = null;
        textBox = null;
        clickedObject = null;
      });

      canvas.on("selection:cleared", function (event) {
        if (numBox == null) return;

        var tbt = Object.create(tb);
        tbt.obj = textBox;
        tbt.connectedRectId = clickedObject.id;

        textBox.exitEditing();

        var grp = null;
        if (textBox.text != "주석 남기기") {
          grp = new fabric.Group([numBox, clickedObject], {
            id: clickedObject.id,
            left: clickedObject.left,
            top: clickedObject.top - 30,
          });

          textBoxArray.push(tbt);
          canvas.remove(clickedObject);
        }

        canvas.remove(textBox);
        canvas.remove(eb);
        canvas.remove(numBox);
        if (grp != null) canvas.add(grp);
        canvas.renderAll();
        numBox = null;
        textBox = null;
        clickedObject = null;
      });

      canvas.on("selection:created", function (event) {
        var eventObject = event.target;
        if (!eventObject) return;

        if (eventObject.length > 1) {
          eventObject.forEach((obj) => {
            obj.set("active", false);
          });
        } else if (eventObject.type === "image") {
          eventObject.forEach((obj) => {
            obj.set("active", false);
          });
        } else if (drawHighlight)
          eventObject.forEach((obj) => {
            obj.set("active", false);
          });
        else return;
        canvas.renderAll();
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
