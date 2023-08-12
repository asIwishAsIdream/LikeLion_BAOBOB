// ReadPage.js
import React, { useState, useEffect, useRef } from 'react';
import page1 from '../../image/1page.png';
import pencil from '../../image/pencil_simple_line_fill_icon.png';
import pencilBlue from '../../image/pencil_blue.png';
import eraser from '../../image/eraser_fill_icon.png';
import eraserBlue from '../../image/eraser_blue.png';
import downArrow from '../../image/down_arrow.png';
import leftArrow from '../../image/leftArrow.png';
import logo from "../../image/Group 93.png";
import bookmark from "../../image/bookmarks_simple_fill_icon.png";
import './ReadPage.css';

function ReadPage() {
    const [selectedIcon, setSelectedIcon] = useState(null); // 'pencil' or 'eraser'

    // 현재 열려있는 섹션을 나타내는 state (null, 'myComment', 'reference', 'comment')
    const [openedSection, setOpenedSection] = useState('comment'); // 댓글 섹션을 처음에 보이게 설정



    useEffect(() => {
        const handleMouseUp = () => {
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);

            if (selectedIcon === 'pencil' && !range.collapsed) {
                const span = document.createElement('span');
                span.classList.add('highlighted');
                range.surroundContents(span);
                selection.removeAllRanges();
            } else if (selectedIcon === 'eraser' && !range.collapsed) {
                const spans = document.querySelectorAll(".highlighted");

                spans.forEach(span => {
                    if (range.intersectsNode(span)) {
                        const parent = span.parentNode;
                        while (span.firstChild) {
                            parent.insertBefore(span.firstChild, span);
                        }
                        parent.removeChild(span);
                    }
                });
                selection.removeAllRanges();
            }
        };

        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
        }
    }, [selectedIcon]);

    return (
        <div style={{ background: '#DBDBDB', overflowY: 'hidden' }}>
            <img src={logo} style={{ position: 'absolute', top: '57px', left: '148px' }} />
            {/* 글부분 */}
            <div style={{
                position: 'absolute',
                top: '151px',
                left: '148px',
                overflowY: 'scroll',
                maxHeight: 'calc(100vh - 153px)', // 2px를 빼줌
                width: '1116px',
                fontFamily: 'SDB',
                borderTop: '2px solid #DBDBDB',
                borderRight: '2px solid #DBDBDB',
                borderLeft: '2px solid #DBDBDB',
                borderRadius: '5px'
            }}>
                <div style={{ position: 'fixed', top: '153px', width: '1116px', height: '172px', background: '#FFFFFF' }}>
                    <img src={leftArrow} alt="Left Arrow" style={{ position: 'absolute', left: '33px', top: '47px', width: '40px', height: '40px' }} />
                    <div style={{ position: 'absolute', left: '105px', top: '45px', fontSize: '40px', fontWeight: 700, lineHeight: '48px' }}>
                        {"운수 좋은 날"}
                    </div>
                    <div style={{ position: 'absolute', color: '#545454', left: '105px', top: '115px', fontSize: '30px', fontWeight: 400, lineHeight: '36px' }}>
                        {"현진건"}
                    </div>
                    <img src={bookmark} alt="Bookmark" style={{ position: 'absolute', left: '931px', top: '50px', width: '40px', height: '40px' }} />
                </div>
                <img src={page1} alt="Page 1 of the book" style={{ marginTop: '175px' }} />
            </div>
            {/* 주석 부분 */}
            <div className="comment-wrapper">
                <div className="icon-row">
                    <img
                        src={selectedIcon === 'pencil' ? pencilBlue : pencil}
                        alt="Pencil"
                        className="icon icon-pencil"
                        onClick={() => setSelectedIcon(selectedIcon === 'pencil' ? null : 'pencil')}
                    />
                    <img
                        src={selectedIcon === 'eraser' ? eraserBlue : eraser}
                        alt="Eraser"
                        className="icon icon-eraser"
                        onClick={() => setSelectedIcon(selectedIcon === 'eraser' ? null : 'eraser')}
                    />
                </div>
                <hr className="divider" />
                <div className="text-row">
                    <div className="text">내 주석</div>

                    <img
                        src={downArrow}
                        alt="Arrow"
                        className="arrow-icon"
                        onClick={() => setOpenedSection(openedSection === 'myComment' ? null : 'myComment')}
                    />
                </div>
                {openedSection === 'myComment' && (
                    <div style={{ background: '#DBDBDB', width: '100%', height: '403px', margin: '10px 0' }}
                        className="animated-section">
                        {/* 원하는 요소들을 이곳에 추가 */}
                    </div>
                )}

                <hr className="divider" />
                <div className="text-row">
                    <div className="text">관련 자료</div>
                    <img
                        src={downArrow}
                        alt="Arrow"
                        className="arrow-icon"
                        onClick={() => setOpenedSection(openedSection === 'reference' ? null : 'reference')}
                    />
                </div>
                {openedSection === 'reference' && (
                    <div style={{ background: '#DBDBDB', width: '100%', height: '403px', margin: '10px 0' }}
                        className="animated-section">
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
                        onClick={() => setOpenedSection(openedSection === 'comment' ? null : 'comment')}
                    />
                </div>
                {openedSection === 'comment' && (
                    <div style={{ background: '#DBDBDB', width: '100%', height: '403px', margin: '10px 0' }}>
                        {/* 원하는 요소들을 이곳에 추가 */}
                    </div>
                )}

            </div>
        </div>
    );
}

export default ReadPage;
