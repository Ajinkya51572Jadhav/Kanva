// src/components/Element.jsx
import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopUp, setSelectedUniqueId } from "../redux/editorReducer";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import { Input } from "antd";

export const Element = ({ setPagesWithHistory }) => {
    const dispatch = useDispatch();
    const { activeIndex } = useSelector((state) => state.editor);

    const [search, setSearch] = useState("");

    // merge icon sets once
    const allIcons = useMemo(() => ({ ...FaIcons, ...MdIcons, ...AiIcons }), []);

    // only filter what is needed
    const iconsArray = useMemo(
        () =>
            Object.entries(allIcons)
                .filter(([name]) =>
                    name.toLowerCase().includes(search.toLowerCase())
                )
                .slice(0, 200), // ✅ limit results for speed
        [allIcons, search]
    );

    const addShape = (IconComp, name) => {
        const id = `icon-${Date.now()}`;

        // get SVG path from ReactIcon
        const svgElement = IconComp({ size: 24 });
        const path = svgElement.props.children[0].props.d;

        console.log("path", path)

        setPagesWithHistory((prev) => {
            const cp = JSON.parse(JSON.stringify(prev));
            const page =
                cp[activeIndex] || {
                    id: activeIndex + 1,
                    children: [],
                    background: "#ffffff",
                };

            page.children.push({
                id,
                type: "icon",
                name,
                path,
                x: 150,
                y: 200,
                width: 10, // ✅ start bigger like Canva
                height: 10,
                rotation: 0,
                color: "#000",
                opacity: 1,
            });

            cp[activeIndex] = page;
            return cp;
        });

        dispatch(setSelectedUniqueId(id));
        dispatch(setPopUp(false));
    };

    return (
        <>
            <Input
                placeholder="Search icons..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: 12 }}
            />

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, 50px)",
                    gap: 12,
                    maxHeight: "400px",
                    overflowY: "auto",
                }}
            >
                {iconsArray.map(([name, IconComp]) => (
                    <div
                        key={name}
                        onClick={() => addShape(IconComp, name)}
                        style={{
                            cursor: "pointer",
                            border: "1px solid #ddd",
                            borderRadius: 6,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: 50,
                        }}
                    >
                        <IconComp size={24} />
                    </div>
                ))}
            </div>
        </>
    );
};






// // src/components/Element.jsx
// import React, { useState } from "react";
// import * as FaIcons from "react-icons/fa";
// import * as MdIcons from "react-icons/md";
// import * as AiIcons from "react-icons/ai";
// import { Button, Modal, Input } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { setPopUp, setSelectedUniqueId } from "../redux/editorReducer";

// export const Element = ({ setPagesWithHistory }) => {
//     const dispatch = useDispatch();
//     const { activeIndex } = useSelector((state) => state.editor);

//     const [search, setSearch] = useState("");

//     // merge icon sets
//     const allIcons = { ...FaIcons, ...MdIcons, ...AiIcons };
//     const iconsArray = Object.entries(allIcons).filter(([name]) =>
//         name.toLowerCase().includes(search.toLowerCase())
//     );

//     const addShape = (IconComp, name) => {
//         const id = `icon-${Date.now()}`;

//         // render icon as SVG to extract its <path d="">
//         const svgElement = IconComp({ size: 24 });
//         const path = svgElement.props.children[0].props.d;

//         setPagesWithHistory((prev) => {
//             const cp = JSON.parse(JSON.stringify(prev));
//             const page =
//                 cp[activeIndex] || { id: activeIndex + 1, children: [], background: "#ffffff" };
//             page.children.push({
//                 id,
//                 type: "icon",
//                 name,
//                 path,
//                 x: 150,
//                 y: 200,
//                 width: 10,   // ✅ default like image
//                 height: 10,  // ✅ can resize freely
//                 rotation: 0,
//                 color: "#000",
//             });
//             cp[activeIndex] = page;
//             return cp;
//         });

//         dispatch(setSelectedUniqueId(id));
//         dispatch(setPopUp(false));
//     };


//     return (
//         <>
//             <h4>Elements</h4>


//             <Input
//                 placeholder="Search icons..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 style={{ marginBottom: 12 }}
//             />

//             <div
//                 style={{
//                     display: "grid",
//                     gridTemplateColumns: "repeat(auto-fill, 50px)",
//                     gap: 12,
//                     maxHeight: "400px",
//                     overflowY: "auto",
//                 }}
//             >
//                 {iconsArray.map(([name, IconComp]) => (
//                     <div
//                         key={name}
//                         onClick={() => addShape(IconComp, name)}
//                         style={{
//                             cursor: "pointer",
//                             border: "1px solid #ddd",
//                             borderRadius: 6,
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             height: 50,
//                         }}
//                     >
//                         <IconComp size={24} />
//                     </div>
//                 ))}
//             </div>
//         </>
//     );
// };