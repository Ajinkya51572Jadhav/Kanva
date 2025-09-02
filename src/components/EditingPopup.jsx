
import TextEdite from '../editing/TextEdite';
import ImageEdit from '../editing/ImageEdit';
import ShapeEdit from '../editing/ShapeEdit';

export const
    EditingPopup = ({ selectedEl, setElement }) => {

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
                        {selectedEl.type === "text" && <TextEdite selectedEl={selectedEl} setElement={setElement} toggle={toggle} />}
                        {selectedEl?.type === "image" && <ImageEdit selectedEl={selectedEl} setElement={setElement} toggle={toggle} />}
                        {selectedEl?.type === "rect" && <ShapeEdit selectedEl={selectedEl} setElement={setElement} />}
                    </>

                )}
            </>

        )
    }
