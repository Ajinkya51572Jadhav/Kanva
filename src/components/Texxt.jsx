import { useState, useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Typography, Divider, Input, Button, Spin } from "antd";

import { RiFontSize2 } from "react-icons/ri";
import { FaHeading } from "react-icons/fa6";
import { RxHeading } from "react-icons/rx";
import { GoHeading } from "react-icons/go";

const { Text } = Typography;

export default function Texxt({ setPagesWithHistory, openMiniFor }) {
    const { activeIndex, fontList } = useSelector((state) => state?.editor ?? {});

    const loaderRef = useRef(null);

    const [search, setSearch] = useState("");
    const [visibleCount, setVisibleCount] = useState(40);
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 300);
        return () => clearTimeout(timer);
    }, [search]);

    const filteredFonts = useMemo(() => {
        return fontList?.filter((f) =>
            f?.family?.toLowerCase().includes(debouncedSearch?.toLowerCase())
        );
    }, [fontList, debouncedSearch]);

    useEffect(() => {
        if (!fontList?.length) return;
        const style = document.createElement("style");

        style.innerHTML = fontList
            ?.map((f) => {
                const url = f?.files?.regular || Object.values(f?.files || {})[0];
                if (!url) return "";
                return `
          @font-face {
            font-family: '${f?.family}';
            src: url('${url}');
          }
        `;
            })
            ?.join("");

        document.head.appendChild(style);
        return () => style?.remove();
    }, [fontList]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    setVisibleCount((prev) => prev + 40); // load 40 more fonts
                }
            },
            { threshold: 1 }
        );

        if (loaderRef?.current) observer?.observe(loaderRef?.current);
        return () => observer.disconnect();
    }, []);

    const addText = (text, size = 36, font = "Roboto") => {
        const id = `t${Date.now()}`;
        setPagesWithHistory((prev) => {
            const cp = JSON.parse(JSON.stringify(prev));
            const page =
                cp[activeIndex] || {
                    id: activeIndex + 1,
                    children: [],
                    background: "#ffffff",
                };
            page.children = page?.children || [];
            page?.children?.push({
                id,
                type: "text",
                text,
                x: 80,
                y: 80,
                width: 400,
                fontSize: size,
                fill: "#111827",
                fontFamily: font,
            });
            cp[activeIndex] = page;
            return cp;
        });
        setTimeout(() => openMiniFor(id), 0);
    };

    return (
        <>

            <Row gutter={[12, 12]}>
                <Col span={24}>
                    <Button block type="primary" icon={<RiFontSize2 size={25} />} style={{ height: 50, fontSize: 20, fontWeight: "bold" }}
                        onClick={() => addText("Add a heading", 48, "Poppins")}
                    >
                        Add a heading
                    </Button>
                </Col>
                <Col span={24}>
                    <Button block icon={<FaHeading size={19} />} style={{ height: 45, fontSize: 16, fontWeight: 500 }}
                        onClick={() => addText("Add a subheading", 32, "Poppins")}
                    >
                        Add a subheading
                    </Button>
                </Col>
                <Col span={24}>
                    <Button block icon={<RxHeading size={18} />} style={{ height: 40, fontSize: 14, fontWeight: 400 }}
                        onClick={() => addText("Your body text", 20, "Poppins")}
                    >
                        Add a body text
                    </Button>
                </Col>
                <Col span={24}>
                    <Button block icon={<GoHeading size={15} />} style={{ height: 35, fontSize: 12, fontWeight: 400 }}
                        onClick={() => addText("Your paragraph text", 15, "Poppins")}
                    >
                        Add a paragraph
                    </Button>
                </Col>
            </Row>

            {
                fontList && fontList?.length > 0 && (
                    <>
                        <Divider>Font Styles</Divider>

                        <Input.Search
                            placeholder="Search fonts..."
                            allowClear
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setVisibleCount(40); // reset on search
                            }}
                        />

                        {/* Scrollable Font List */}
                        {filteredFonts?.slice(0, visibleCount)?.map((font) => (
                            <Button
                                key={font?.family}
                                block
                                style={{ padding: 20, margin: "5px 0px" }}
                                onClick={() => addText(font?.family, 36, font?.family)}>
                                <Text style={{ fontFamily: font?.family, fontSize: 14, fontWeight: 400 }}>
                                    {font?.family}
                                </Text>
                            </Button>
                        ))}

                        {/* Infinite scroll trigger */}
                        {visibleCount < filteredFonts?.length && (
                            <div ref={loaderRef} style={{ textAlign: "center", padding: "16px" }}>
                                <Spin />
                            </div>
                        )}
                    </>
                )
            }
        </>
    );
};