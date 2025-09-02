import { useSelector } from "react-redux";
import { Button, Space, Popover, Tooltip } from "antd";
import { DownloadOutlined, FilePdfOutlined, PictureOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";

export const Share = ({ stageRef }) => {
  const { editorPages, activeIndex } = useSelector((state) => state.editor);

  const getFileName = (ext) =>
    `page-${(editorPages[activeIndex] || {}).id || activeIndex}.${ext}`;

  const downloadURI = (uri, name) => {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportPNG = () => {
    const uri = stageRef.current.toDataURL({
      pixelRatio: 2,
      mimeType: "image/png",
    });
    downloadURI(uri, getFileName("png"));
  };

  const exportJPG = () => {
    const uri = stageRef.current.toDataURL({
      pixelRatio: 2,
      mimeType: "image/jpeg",
    });
    downloadURI(uri, getFileName("jpg"));
  };

  const exportPDF = () => {
    const uri = stageRef.current.toDataURL({
      pixelRatio: 2,
      mimeType: "image/png",
    });
    const pdf = new jsPDF(
      "l",
      "pt",
      [stageRef.current.width(), stageRef.current.height()]
    );
    pdf.addImage(
      uri,
      "PNG",
      0,
      0,
      stageRef.current.width(),
      stageRef.current.height()
    );
    pdf.save(getFileName("pdf"));
  };


  return (
    <Tooltip title="Download" color="blue">
      <Popover
        content={
          <Space direction="vertical">
            <Button icon={<PictureOutlined />} onClick={exportPNG} block>
              Download PNG
            </Button>
            <Button icon={<PictureOutlined />} onClick={exportJPG} block>
              Download JPG
            </Button>
            <Button icon={<FilePdfOutlined />} onClick={exportPDF} block>
              Download PDF
            </Button>
          </Space>
        }
        title="Export Options"
        trigger="click"
      >
        <Button icon={<DownloadOutlined />} type="link" />
      </Popover>
    </Tooltip>
  );
};





// import { DownloadOutlined } from "@ant-design/icons";
// import { Button } from "antd";
// import { useSelector } from "react-redux";

// export const Share = ({ stageRef }) => {
//     const { editorPages, activeIndex } = useSelector((state) => state.editor);

//     const exportPNG = () => {
//         const uri = stageRef.current.toDataURL({ pixelRatio: 2, mimeType: "image/png" });
//         const a = document.createElement("a");
//         a.href = uri;
//         a.download = `page-${(editorPages[activeIndex] || {}).id || activeIndex}.png`;
//         a.click();
//     };

//     return (
//         <>
//             <Button type="link" onClick={exportPNG}><DownloadOutlined style={{ fontSize: 19 }} /></Button>
//         </>
//     )
// }
