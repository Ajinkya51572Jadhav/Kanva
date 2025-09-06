import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ProLayout } from '@ant-design/pro-components';
import { Image, message } from 'antd';

import { setCollapsed, setPath } from '../redux/editorReducer';

import { RxText } from "react-icons/rx";
import { BsWindowSidebar } from "react-icons/bs";
import { HiOutlinePhoto } from "react-icons/hi2";
import { PiShapesThin } from "react-icons/pi";
import { IoCloudUploadOutline, IoShapesOutline } from "react-icons/io5";
import { SlSizeFullscreen, SlLayers } from "react-icons/sl";
import { FaRegUser } from "react-icons/fa";
import { RiMenu2Line, RiMenu3Fill } from "react-icons/ri";

import canva from "../assets/logo.png";

import NetworkStatus from '../components/NetworkStatus';
import Editor from './Editor';


const routes = [
  {
    path: 'banner',
    name: 'banner',
    icon: <BsWindowSidebar size={20} />,
  },
  {
    path: 'text',
    name: 'Text',
    icon: <RxText size={20} />,
  },
  {
    path: 'photo',
    name: 'Photo',
    icon: <HiOutlinePhoto size={22} />,
  },
  {
    path: 'shape',
    name: 'Shape',
    icon: <IoShapesOutline size={20} />,
  },
  {
    path: 'element',
    name: 'Element',
    icon: <PiShapesThin size={21} />,
  },
  {
    path: 'upload',
    name: 'Upload',
    icon: <IoCloudUploadOutline size={22} />,
  },
  {
    path: 'layer',
    name: 'Layer',
    icon: <SlLayers size={19} />,
  },
  {
    path: 'resize',
    name: 'Resize',
    icon: <SlSizeFullscreen size={17} />,
  },
];


export default () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { path, collapsed } = useSelector((state) => state?.editor ?? {});
  const [messageApi, contextHolder] = message.useMessage();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 1000)
    };

    window.addEventListener("resize", handleResize);
    return () => removeEventListener("resize", handleResize);
  }, []);

  function handleMenuClick(path) {
    dispatch(setCollapsed({ parent: true, child: false }));
    dispatch(setPath(path));
  }


  function handleMenuBar() {
    dispatch(setCollapsed({ parent: !collapsed.parent, child: true }));
    dispatch(setPath("menubar"));
  };


  const props = {
    route: {
      routes
    },
    location: {
      pathname: `/${path}`,
    },
    collapsed: collapsed?.parent,
    fixSiderbar: true,
    collapsedButtonRender: false,
    menuItemRender: (item, dom) => (
      <div onClick={() => handleMenuClick(item?.name?.toLowerCase())}>
        {dom}
      </div>
    ),
    logo: <Image src={canva || k} preview={false} width={120} style={{ marginLeft: "-20px" }} onClick={() => navigate("/")} />,
    title: '',
    avatarProps: {
      icon: <FaRegUser />,
      title: '',
    }
  };



  return (
    <>
      <ProLayout
        {...props}
        layout={isMobile ? 'top' : "mix"}
        onCollapse={(val) => dispatch(setCollapsed({ parent: val, child: true }))}
        postMenuData={(menuData) => {
          return [
            {
              icon: collapsed?.parent ? <RiMenu3Fill /> : <RiMenu2Line />,
              name: '',
              onTitleClick: handleMenuBar,
            },
            ...(menuData || []),
          ];
        }}
        headerRender={true}
      >
        {contextHolder}
        <NetworkStatus messageApi={messageApi} />
        <Editor />
      </ProLayout>
    </>
  )
};