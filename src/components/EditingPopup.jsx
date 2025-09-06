
import TextEdite from '../editing/TextEdite';
import ImageEdit from '../editing/ImageEdit';
import ShapeEdit from '../editing/ShapeEdit';
import CircleEdit from '../editing/circleEdit';
import TriangleEdit from '../editing/TriangleEdit';
import StarEdit from '../editing/StarEdit';
import ArrowEdit from '../editing/ArrowEdit';
import LineEdit from '../editing/LineEdit';
import PolygonEdit from '../editing/PolygonEdit';

export default function EditingPopup({ selectedEl, setElement }) {

    const toggle = (key) => {
        setElement(selectedEl?.id, (el) => ({
            ...el,
            [key]: !el[key],
        }));
    };


    return (
        <>
            {selectedEl && (
                <>
                    {selectedEl?.type === "text" && <TextEdite selectedEl={selectedEl} setElement={setElement} toggle={toggle} />}
                    {selectedEl?.type === "image" && <ImageEdit selectedEl={selectedEl} setElement={setElement} toggle={toggle} />}
                    {selectedEl?.type === "rect" && <ShapeEdit selectedEl={selectedEl} setElement={setElement} />}
                    {selectedEl?.type === "circle" && <CircleEdit selectedEl={selectedEl} setElement={setElement} />}
                    {selectedEl?.type === "triangle" && <TriangleEdit selectedEl={selectedEl} setElement={setElement} />}
                    {selectedEl?.type === "star" && <StarEdit selectedEl={selectedEl} setElement={setElement} />}
                    {selectedEl?.type === "arrow" && <ArrowEdit selectedEl={selectedEl} setElement={setElement} />}
                    {selectedEl?.type === "line" && <LineEdit selectedEl={selectedEl} setElement={setElement} />}
                    {selectedEl?.type === "polygon" && <PolygonEdit selectedEl={selectedEl} setElement={setElement} />}
                </>

            )}
        </>

    )
}
