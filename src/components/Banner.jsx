import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Image, Row } from "antd";
import { setPopUp, setSelectedUniqueId } from "../redux/editorReducer";
import banner1 from "../assets/banner-1.png";
import banner2 from "../assets/banner-2.png";
import banner3 from "../assets/banner-3.png";
import banner4 from "../assets/banner-4.png";
import banner5 from "../assets/banner-5.png";
import banner6 from "../assets/banner-6.png";


const banners = [
    {
        name: "Creative Portfolio Banner",
        preview: banner1,
        x: 100,
        y: 60,
        type: "banner",
        children: [
            {
                id: `b${Date.now()}-bg`,
                type: "rect",
                x: 0,
                y: 0,
                width: 900,
                height: 400,
                fillLinearGradientStartPoint: { x: 0, y: 0 },
                fillLinearGradientEndPoint: { x: 900, y: 400 },
                fillLinearGradientColorStops: [0, "#fdf2f8", 1, "#e0f2fe"],
                cornerRadius: 20,
                fill: "#258FFF"
            },
            {
                id: `b${Date.now()}-title`,
                type: "text",
                text: "Hi, I'm Alex 👋\nCreative Web Designer",
                x: 60,
                y: 80,
                fontSize: 40,
                fontStyle: "bold",
                lineHeight: 1.3,
                fill: "#111827",
            },
            {
                id: `b${Date.now()}-desc`,
                type: "text",
                text: "Building modern websites with a focus on design & performance.",
                x: 60,
                y: 180,
                fontSize: 18,
                fill: "#374151",
            },
            {
                id: `b${Date.now()}-btn`,
                type: "rect",
                x: 60,
                y: 240,
                width: 180,
                height: 45,
                fill: "#2563eb",
                cornerRadius: 12,
            },
            {
                id: `b${Date.now()}-btn-text`,
                type: "text",
                text: "View Portfolio",
                x: 90,
                y: 253,
                fontSize: 16,
                fontStyle: "bold",
                fill: "#fff",
            },
            {
                id: `b${Date.now()}-photo`,
                type: "image",
                x: 580,
                y: 60,
                width: 240,
                height: 280,
                src: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=600",
            },
        ],
    },
    {
        name: "Website Hero Banner",
        preview: banner6,
        x: 100,
        y: 60,
        type: "banner",
        children: [
            {
                id: `b${Date.now()}-bg`,
                type: "rect",
                x: 0,
                y: 0,
                width: 900,
                height: 400,
                fill: "#111827",
                cornerRadius: 16,
            },
            {
                id: `b${Date.now()}-title`,
                type: "text",
                text: "Launch Your Startup 🚀",
                x: 60,
                y: 100,
                fontSize: 42,
                fontStyle: "bold",
                lineHeight: 1.2,
                fill: "#fff",
            },
            {
                id: `b${Date.now()}-desc`,
                type: "text",
                text: "We help you design, build, and scale your online business.",
                x: 60,
                y: 170,
                fontSize: 18,
                fill: "#d1d5db",
            },
            {
                id: `b${Date.now()}-cta`,
                type: "rect",
                x: 60,
                y: 230,
                width: 160,
                height: 45,
                fill: "#10b981",
                cornerRadius: 12,
            },
            {
                id: `b${Date.now()}-cta-text`,
                type: "text",
                text: "Get Started",
                x: 95,
                y: 243,
                fontSize: 16,
                fontStyle: "bold",
                fill: "#fff",
            },
            {
                id: `b${Date.now()}-img`,
                type: "image",
                x: 540,
                y: 60,
                width: 280,
                height: 280,
                src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600",
            },
        ],
    },
    {
        name: "Music Vibes Banner",
        preview: banner5,
        x: 100,
        y: 60,
        type: "banner",
        children: [
            {
                id: `b${Date.now()}-bg`,
                type: "rect",
                x: 0,
                y: 0,
                width: 900,
                height: 400,
                fillLinearGradientStartPoint: { x: 0, y: 0 },
                fillLinearGradientEndPoint: { x: 900, y: 400 },
                fillLinearGradientColorStops: [0, "#f0f9ff", 1, "#dbeafe"],
                cornerRadius: 20,
            },
            {
                id: `b${Date.now()}-title`,
                type: "text",
                text: "Feel The Beat 🎶",
                x: 60,
                y: 100,
                fontSize: 40,
                fontStyle: "bold",
                fill: "#111827",
            },
            {
                id: `b${Date.now()}-desc`,
                type: "text",
                text: "Stream unlimited music anytime, anywhere.",
                x: 60,
                y: 170,
                fontSize: 18,
                fill: "#374151",
            },
            {
                id: `b${Date.now()}-cta`,
                type: "rect",
                x: 60,
                y: 230,
                width: 160,
                height: 45,
                fill: "#ef4444",
                cornerRadius: 12,
            },
            {
                id: `b${Date.now()}-cta-text`,
                type: "text",
                text: "Listen Now",
                x: 95,
                y: 243,
                fontSize: 16,
                fontStyle: "bold",
                fill: "#fff",
            },
            {
                id: `b${Date.now()}-girl-img`,
                type: "image",
                x: 540,
                y: 60,
                width: 280,
                height: 280,
                src: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600",
            },
        ],
    },
    {
        name: "Party Night Banner",
        preview: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
        x: 100,
        y: 60,
        type: "banner",
        children: [
            {
                id: `b${Date.now()}-bg`,
                type: "rect",
                x: 0,
                y: 0,
                width: 900,
                height: 400,
                fill: "#1e3a8a",
                cornerRadius: 20,
            },
            {
                id: `b${Date.now()}-title`,
                type: "text",
                text: "Friday Night Party 🎉",
                x: 60,
                y: 100,
                fontSize: 42,
                fontStyle: "bold",
                fill: "#fef3c7",
            },
            {
                id: `b${Date.now()}-desc`,
                type: "text",
                text: "Join us for music, dance, and unforgettable vibes.",
                x: 60,
                y: 170,
                fontSize: 18,
                fill: "#d1d5db",
            },
            {
                id: `b${Date.now()}-cta`,
                type: "rect",
                x: 60,
                y: 240,
                width: 180,
                height: 50,
                fill: "#f59e0b",
                cornerRadius: 14,
            },
            {
                id: `b${Date.now()}-cta-text`,
                type: "text",
                text: "Book Tickets",
                x: 95,
                y: 253,
                fontSize: 18,
                fontStyle: "bold",
                fill: "#fff",
            },
            {
                id: `b${Date.now()}-party-img`,
                type: "image",
                x: 540,
                y: 60,
                width: 280,
                height: 280,
                src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
            },
        ],
    },
    {
        name: "Creative Portfolio Banner",
        preview: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=800",
        x: 100,
        y: 60,
        type: "banner",
        children: [
            // White Header Background
            {
                id: `b${Date.now()}-header-bg`,
                type: "rect",
                x: 0,
                y: 0,
                width: 900,
                height: 100,
                fill: "#ffffff"
            },

            // Orange Gradient Content Area
            {
                id: `b${Date.now()}-content-bg`,
                type: "rect",
                x: 0,
                y: 100,
                width: 900,
                height: 350,
                fillLinearGradientStartPoint: { x: 0, y: 100 },
                fillLinearGradientEndPoint: { x: 900, y: 450 },
                fillLinearGradientColorStops: [0, "#fca76d", 1, "#fef3c7"],
                cornerRadius: 20
            },

            // Logo Text (Top Left)
            {
                id: `b${Date.now()}-logo-text`,
                type: "text",
                text: "Zola Bekker",
                x: 40,
                y: 35,
                fontSize: 22,
                fontStyle: "bold",
                fill: "#111827",
                fontFamily: "serif"
            },

            // Tagline (Top Right)
            {
                id: `b${Date.now()}-tagline`,
                type: "text",
                text: "DESIGN\nTHE FUTURE",
                x: 740,
                y: 35,
                fontSize: 14,
                align: "right",
                fill: "#111827",
                fontFamily: "serif"
            },

            // Main Heading (Creative Portfolio)
            {
                id: `b${Date.now()}-main-heading`,
                type: "text",
                text: "Creative\nPortfolio",
                x: 60,
                y: 180,
                fontSize: 72,
                fontStyle: "bold",
                lineHeight: 1.1,
                fill: "#111827",
                fontFamily: "serif"
            },

            // Person Image (Right Side)
            {
                id: `b${Date.now()}-photo`,
                type: "image",
                x: 560,
                y: 120,
                width: 300,
                height: 330,
                src: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=600"
            }
        ]
    },
    {
        name: "UX Design Portfolio Banner",
        preview: banner4,
        x: 100,
        y: 60,
        type: "banner",
        children: [
            // Gradient Background
            {
                id: `ux-${Date.now()}-bg`,
                type: "rect",
                x: 0,
                y: 0,
                width: 900,
                height: 450,
                fillLinearGradientStartPoint: { x: 0, y: 0 },
                fillLinearGradientEndPoint: { x: 0, y: 450 },
                fillLinearGradientColorStops: [0, "#bfdbfe", 1, "#ffffff"] // light blue to white
            },

            // Small Top Left Text (Rio Sterling)
            {
                id: `ux-${Date.now()}-author`,
                type: "text",
                text: "Rio Sterling",
                x: 40,
                y: 40,
                fontSize: 18,
                fill: "#111827",
                fontFamily: "sans-serif"
            },

            // Main Heading (UX Design Portfolio)
            {
                id: `ux-${Date.now()}-heading`,
                type: "text",
                text: "UX Design Portfolio",
                x: 40,
                y: 120,
                fontSize: 64,
                fontStyle: "bold",
                fill: "#111827",
                fontFamily: "sans-serif"
            },

            // Image of Laptop at Bottom
            {
                id: `ux-${Date.now()}-photo`,
                type: "image",
                x: 0,
                y: 200,
                width: 900,
                height: 500,
                src: "https://media-public.canva.com/uK8BI/MAGWaMuK8BI/1/s.jpg"
            }
        ]
    },
    {
        name: "Headset Product Banner",
        preview: banner3,
        x: 100,
        y: 60,
        type: "banner",
        children: [
            // Gradient Background
            {
                id: `hs-${Date.now()}-bg`,
                type: "rect",
                x: 0,
                y: 0,
                width: 900,
                height: 500,
                fillLinearGradientStartPoint: { x: 0, y: 0 },
                fillLinearGradientEndPoint: { x: 900, y: 500 },
                fillLinearGradientColorStops: [0, "#a7f3d0", 0.5, "#bfdbfe", 1, "#fde68a"] // teal → blue → peach
            },

            // Logo + Brand Text
            {
                id: `hs-${Date.now()}-brand`,
                type: "text",
                text: "Westmire Wired",
                x: 40,
                y: 40,
                fontSize: 20,
                fill: "#111827",
                fontFamily: "sans-serif",
                fontStyle: "bold"
            },

            // Main Title (line 1)
            {
                id: `hs-${Date.now()}-title1`,
                type: "text",
                text: "The Westmire",
                x: 40,
                y: 140,
                fontSize: 42,
                fill: "#111827",
                fontFamily: "sans-serif"
            },

            // Main Title (line 2 with bold A56 Headset)
            {
                id: `hs-${Date.now()}-title2`,
                type: "text",
                text: "A56 Headset",
                x: 40,
                y: 190,
                fontSize: 50,
                fontStyle: "bold",
                fill: "#111827",
                fontFamily: "sans-serif"
            },

            // Button 1: Buy Now
            {
                id: `hs-${Date.now()}-btn1`,
                type: "rect",
                x: 40,
                y: 280,
                width: 140,
                height: 50,
                cornerRadius: 25,
                fill: "#ffffff",
                shadowColor: "rgba(0,0,0,0.15)",
                shadowBlur: 8
            },
            {
                id: `hs-${Date.now()}-btn1-text`,
                type: "text",
                text: "Buy Now",
                x: 70,
                y: 295,
                fontSize: 20,
                fontStyle: "bold",
                fill: "#111827",
                fontFamily: "sans-serif"
            },

            // Button 2: Shop All
            {
                id: `hs-${Date.now()}-btn2`,
                type: "rect",
                x: 200,
                y: 280,
                width: 140,
                height: 50,
                cornerRadius: 25,
                fillLinearGradientStartPoint: { x: 0, y: 0 },
                fillLinearGradientEndPoint: { x: 140, y: 50 },
                fillLinearGradientColorStops: [0, "#e0f2fe", 1, "#bae6fd"]
            },
            {
                id: `hs-${Date.now()}-btn2-text`,
                type: "text",
                text: "Shop All",
                x: 230,
                y: 295,
                fontSize: 20,
                fill: "#374151",
                fontFamily: "sans-serif"
            },

            // Headset Image
            {
                id: `hs-${Date.now()}-image`,
                type: "image",
                x: 500,
                y: 100,
                width: 350,
                height: 350,
                src: "https://media-public.canva.com/MADGyO4tBbI/4/thumbnail.png"
            }
        ]
    },
    {
        name: "Street Vibe Banner",
        preview: "https://i.ibb.co/hfL2gtN/streetwear-preview.png",
        x: 100,
        y: 60,
        type: "banner",
        children: [
            // Background
            {
                id: `sv-${Date.now()}-bg`,
                type: "rect",
                x: 0,
                y: 0,
                width: 600,
                height: 1200,
                fill: "#000000"
            },

            // Logo top-left
            {
                id: `sv-${Date.now()}-logo`,
                type: "text",
                text: "street.style & co.",
                x: 20,
                y: 20,
                fontSize: 14,
                fill: "#ffffff",
                fontFamily: "sans-serif"
            },

            // Hero Section Title
            {
                id: `sv-${Date.now()}-title1`,
                type: "text",
                text: "FIND",
                x: 20,
                y: 80,
                fontSize: 48,
                fontStyle: "bold",
                fill: "#ffffff",
                fontFamily: "sans-serif"
            },
            {
                id: `sv-${Date.now()}-title2`,
                type: "text",
                text: "YOUR",
                x: 20,
                y: 140,
                fontSize: 48,
                fontStyle: "bold",
                fill: "#ffffff",
                fontFamily: "sans-serif"
            },
            {
                id: `sv-${Date.now()}-title3`,
                type: "text",
                text: "VIBE",
                x: 20,
                y: 200,
                fontSize: 48,
                fontStyle: "bold",
                fill: "#ffffff",
                fontFamily: "sans-serif"
            },

            // Hero Shirt Image
            {
                id: `sv-${Date.now()}-shirt`,
                type: "image",
                x: 300,
                y: 80,
                width: 180,
                height: 180,
                src: "https://i.ibb.co/5c7RrJj/shirt-mock.png"
            },

            // Hero CTA Button
            {
                id: `sv-${Date.now()}-cta`,
                type: "text",
                text: "Check out our Capsule drop \nClick & order collection",
                x: 20,
                y: 260,
                fontSize: 14,
                fill: "#ffffff",
                fontFamily: "sans-serif"
            },

            // Section 2 Image (Models)
            {
                id: `sv-${Date.now()}-models`,
                type: "image",
                x: 0,
                y: 320,
                width: 600,
                height: 250,
                src: "https://i.ibb.co/q7jWg7H/models.png"
            },

            // Section 2 Text
            {
                id: `sv-${Date.now()}-roots-title`,
                type: "text",
                text: "WE’RE PROUD OF OUR ROOTS",
                x: 20,
                y: 580,
                fontSize: 28,
                fontStyle: "bold",
                fill: "#ffffff",
                fontFamily: "sans-serif"
            },
            {
                id: `sv-${Date.now()}-roots-desc`,
                type: "text",
                text: "Our products are inspired by the rich culture of our city. Designed and made locally with authenticity at the core.",
                x: 20,
                y: 620,
                fontSize: 14,
                fill: "#d1d5db",
                fontFamily: "sans-serif",
                width: 560
            },

            // Section 3 Text
            {
                id: `sv-${Date.now()}-clothes-title`,
                type: "text",
                text: "WE’RE PROUD OF OUR CLOTHES",
                x: 20,
                y: 700,
                fontSize: 28,
                fontStyle: "bold",
                fill: "#ffffff",
                fontFamily: "sans-serif"
            },

            // Section 3 Features
            {
                id: `sv-${Date.now()}-feat1`,
                type: "text",
                text: "✦ DESIGNED BY LOCALS",
                x: 20,
                y: 740,
                fontSize: 14,
                fill: "#ffffff",
                fontFamily: "sans-serif"
            },
            {
                id: `sv-${Date.now()}-feat2`,
                type: "text",
                text: "✦ INCLUSIVE SIZES",
                x: 220,
                y: 740,
                fontSize: 14,
                fill: "#ffffff",
                fontFamily: "sans-serif"
            },
            {
                id: `sv-${Date.now()}-feat3`,
                type: "text",
                text: "✦ ECO-FRIENDLY PACKAGING",
                x: 400,
                y: 740,
                fontSize: 14,
                fill: "#ffffff",
                fontFamily: "sans-serif"
            },

            // Section 4: New Arrivals Title
            {
                id: `sv-${Date.now()}-new-title`,
                type: "text",
                text: "NEW ARRIVALS",
                x: 20,
                y: 800,
                fontSize: 28,
                fontStyle: "bold",
                fill: "#ffffff",
                fontFamily: "sans-serif"
            },

            // Product 1
            {
                id: `sv-${Date.now()}-prod1`,
                type: "image",
                x: 20,
                y: 850,
                width: 150,
                height: 150,
                src: "https://i.ibb.co/5c7RrJj/shirt-mock.png"
            },
            {
                id: `sv-${Date.now()}-prod1-text`,
                type: "text",
                text: "City of Birds\n$55.00",
                x: 20,
                y: 1010,
                fontSize: 14,
                fill: "#ffffff",
                fontFamily: "sans-serif"
            },

            // Product 2
            {
                id: `sv-${Date.now()}-prod2`,
                type: "image",
                x: 220,
                y: 850,
                width: 150,
                height: 150,
                src: "https://i.ibb.co/5c7RrJj/shirt-mock.png"
            },
            {
                id: `sv-${Date.now()}-prod2-text`,
                type: "text",
                text: "Street Hood Sweat\n$65.00",
                x: 220,
                y: 1010,
                fontSize: 14,
                fill: "#ffffff",
                fontFamily: "sans-serif"
            },

            // Product 3
            {
                id: `sv-${Date.now()}-prod3`,
                type: "image",
                x: 420,
                y: 850,
                width: 150,
                height: 150,
                src: "https://i.ibb.co/5c7RrJj/shirt-mock.png"
            },
            {
                id: `sv-${Date.now()}-prod3-text`,
                type: "text",
                text: "Urban Local Sweat\n$60.00",
                x: 420,
                y: 1010,
                fontSize: 14,
                fill: "#ffffff",
                fontFamily: "sans-serif"
            },

            // Footer Quote
            {
                id: `sv-${Date.now()}-footer-quote`,
                type: "text",
                text: "Boost your creativity by adding quotes from YOUTH CULTURE MAGAZINE",
                x: 20,
                y: 1080,
                fontSize: 12,
                fill: "#9ca3af",
                fontFamily: "sans-serif",
                width: 560
            }
        ]
    },
    {
        name: "Streetwear Hero Banner",
        preview: banner2,
        type: "banner",
        x: 100,
        y: 60,
        children: [
            // Background
            {
                id: `sw-${Date.now()}-bg`,
                type: "rect",
                x: 0,
                y: 0,
                width: 500,
                height: 280,
                fill: "#000000"
            },

            // Small logo top left
            {
                id: `sw-${Date.now()}-logo`,
                type: "text",
                text: "street style & co.",
                x: 20,
                y: 15,
                fontSize: 12,
                fill: "#ffffff",
                fontFamily: "sans-serif"
            },

            // Main Title Line 1: FIND
            {
                id: `sw-${Date.now()}-title1`,
                type: "text",
                text: "FIND",
                x: 20,
                y: 60,
                fontSize: 40,
                fontStyle: "bold",
                fill: "#ffffff",
                fontFamily: "sans-serif"
            },

            // Main Title Line 2: YOUR
            {
                id: `sw-${Date.now()}-title2`,
                type: "text",
                text: "YOUR",
                x: 20,
                y: 110,
                fontSize: 40,
                fontStyle: "bold",
                fill: "#ffffff",
                fontFamily: "sans-serif"
            },

            // Main Title Line 3: VIBE
            {
                id: `sw-${Date.now()}-title3`,
                type: "text",
                text: "VIBE",
                x: 20,
                y: 160,
                fontSize: 40,
                fontStyle: "bold",
                fill: "#ffffff",
                fontFamily: "sans-serif"
            },

            // T-shirt product image
            {
                id: `sw-${Date.now()}-image`,
                type: "image",
                x: 320,
                y: 60,
                width: 140,
                height: 160,
                src: "https://i.ibb.co/6sy9nMX/tshirt-mock.png" // replace with your product img
            },

            // Subtitle text
            {
                id: `sw-${Date.now()}-subtitle`,
                type: "text",
                text: "Check out our Capsule drop. Clean cuts & authentic vibes.",
                x: 20,
                y: 220,
                fontSize: 14,
                fill: "#d1d5db",
                fontFamily: "sans-serif",
                width: 300
            },

            // CTA Button (Shop Now)
            {
                id: `sw-${Date.now()}-cta-rect`,
                type: "rect",
                x: 380,
                y: 220,
                width: 80,
                height: 30,
                cornerRadius: 15,
                stroke: "#ffffff",
                strokeWidth: 1,
                fill: "transparent"
            },
            {
                id: `sw-${Date.now()}-cta-text`,
                type: "text",
                text: "SHOP",
                x: 400,
                y: 227,
                fontSize: 12,
                fontStyle: "bold",
                fill: "#ffffff",
                fontFamily: "sans-serif"
            }
        ]
    }
];



export const Banner = ({ setPagesWithHistory }) => {
    const dispatch = useDispatch();
    const { activeIndex } = useSelector((state) => state.editor);

    const applyTemplate = (template) => {
        if (!template) return;
        setPagesWithHistory((prev) => {
            const cp = JSON.parse(JSON.stringify(prev));
            const children = (template.children || []).map((el) => ({ ...el, id: `${el.id}-${Date.now()}` }));
            cp[activeIndex] = { ...(cp[activeIndex] || {}), children, background: template.background };
            return cp;
        });
        dispatch(setSelectedUniqueId(null));
        dispatch(setPopUp(false));
    };

    return (
        <>
            <Row gutter={[0, 20]}>
                {banners.map((bnr, idx) => (
                    <>
                        <Col key={idx} onClick={() => applyTemplate(bnr)}>
                            <Image src={bnr?.preview} alt={bnr?.name} preview={false} width={"100%"} height={125} style={{ objectFit: "cover" }} />
                        </Col>
                    </>
                ))}
            </Row>
        </>
    );
};