import comments from "../../image/comments.png";

function Comments() {

    return (
        <div>
            <img
                src={comments}
                alt="comments"
                style={{ position: "absolute", left: 377, top: 70 }}
            />
        </div>
    );

}

export default Comments;