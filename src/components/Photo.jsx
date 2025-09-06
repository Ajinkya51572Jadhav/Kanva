import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import { setPopUp, setSelectedUniqueId } from "../redux/editorReducer";

import photo1 from "../assets/photo1.avif";
import photo2 from "../assets/photo2.avif";
import photo3 from "../assets/photo3.jpg";
import photo4 from "../assets/photo4.jpg";
import photo5 from "../assets/photo5.jpg";
import photo6 from "../assets/photo6.avif";
import photo7 from "../assets/photo7.jpg";
import photo8 from "../assets/photo8.avif";
import photo9 from "../assets/photo9.avif";
import photo10 from "../assets/photo10.avif";



export default function Photo({ setPagesWithHistory }) {
    const dispatch = useDispatch();
    const { activeIndex, canvasSize } = useSelector((state) => state?.editor ?? {});

    const [galleryPhotos, setGalleryPhotos] = useState([photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10]);
    const [galleryPage, setGalleryPage] = useState(1);

    useEffect(() => {
        const abort = new AbortController();
        const fetchPics = async () => {
            try {
                const res = await fetch(
                    `https://picsum.photos/v2/list?page=${galleryPage}&limit=30`,
                    { signal: abort.signal }
                );
                if (!res.ok) return;
                const data = await res.json();
                setGalleryPhotos((prev) =>
                    galleryPage === 1 ? data : [...prev, ...data]
                );
            } catch (err) {
                if (err.name !== "AbortError") {
                }
            }
        };
        fetchPics();
        return () => abort.abort();
    }, [galleryPage]);

    const addImageToCanvas = ({ previewSrc, hdSrc, w, h }) => {
        const id = `i${Date.now()}`;
        const x = (canvasSize?.w - w) / 2;
        const y = (canvasSize?.h - h) / 2;

        setPagesWithHistory((prev) => {
            const cp = JSON.parse(JSON.stringify(prev));
            const page =
                cp[activeIndex] || {
                    id: activeIndex + 1,
                    children: [],
                    background: "#ffffff",
                };
            page?.children?.push({
                id,
                type: "image",
                src: previewSrc, 
                fullSrc: hdSrc, 
                x,
                y,
                width: w,
                height: h,
                rotation: 0,
                opacity: 1,
            });
            cp[activeIndex] = page;
            return cp;
        });

        message.success("Image added successfully!");
        dispatch(setSelectedUniqueId(id));
        dispatch(setPopUp(false));
    };

    const handleAddGalleryImage = (photo, sizeW = 800) => {
        if (!photo) return;
        if (photo?.id) {
            const aspect =
                Number(photo?.width) && Number(photo?.height)
                    ? Number(photo?.width) / Number(photo?.height)
                    : 1.5;
            const w = Math.min(1000, sizeW);
            const h = Math.round(w / aspect);

            // preview (tiny, shows instantly)
            const previewSrc = `https://picsum.photos/id/${photo?.id}/200/140`;
            // HD (loads later)
            const hdSrc = `https://picsum.photos/id/${photo?.id}/${w}/${h}`;

            addImageToCanvas({ previewSrc, hdSrc, w, h });
        } else {
            let previewSrc = photo;
            let hdSrc = photo;
            addImageToCanvas({ previewSrc, hdSrc, w: 500, h: 500 });
        }
    };

    return (
        <>
            <div style={{ display: "grid", gap: 8 }}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 8,
                    }}
                >
                    {galleryPhotos && galleryPhotos?.map((p) => {
                        const thumb = p?.id ? `https://picsum.photos/id/${p?.id}/200/140` : p;
                        return (
                            <img
                                key={p?.id || thumb}
                                src={thumb}
                                alt={p?.author || ""}
                                loading="lazy"
                                style={{
                                    width: "100%",
                                    height: 80,
                                    objectFit: "cover",
                                    borderRadius: 6,
                                    cursor: "pointer",
                                }}
                                onClick={() => handleAddGalleryImage(p, 800)}
                            />
                        );
                    })}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setGalleryPage((p) => p + 1)}>Load more</button>
                    <div
                        style={{
                            marginLeft: "auto",
                            fontSize: 12,
                            color: "#666",
                        }}
                    >
                        Picsum (free)
                    </div>
                </div>
            </div>
        </>
    );
};