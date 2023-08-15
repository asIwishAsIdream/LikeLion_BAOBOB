import annotation from "../../image/annotation.png";

function Annotation() {

    return (
        <div>
            <img
                src={annotation}
                alt="annotation"
                style={{ position: "absolute", left: 377, top: 70 }}
            />
        </div>
    );

}

export default Annotation;