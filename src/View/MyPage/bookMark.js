import bookMark from "../../image/bookMark.png";

function BookMark() {

    return (
        <div>
            <img
                src={bookMark}
                alt="bookMark"
                style={{ position: "absolute", left: 377, top: 70 }}
            />
        </div>
    );

}

export default BookMark;