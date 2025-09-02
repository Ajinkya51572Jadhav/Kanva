import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProLayout } from '@ant-design/pro-components';
import { Image, message, Typography } from 'antd';

import { setCollapsed, setPath } from '../redux/editorReducer';
import NetworkStatus from '../components/NetworkStatus';
import { Editor } from './Editor';

import { UserOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import { RxText } from "react-icons/rx";
import { BsWindowSidebar } from "react-icons/bs";
import { HiOutlinePhoto } from "react-icons/hi2";
import { PiShapesThin } from "react-icons/pi";
import { IoCloudUploadOutline } from "react-icons/io5";
import { SlSizeFullscreen } from "react-icons/sl";
import { SlLayers } from "react-icons/sl";

import k from "../assets/k.png";
import canva from "../assets/canva.png";


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
  const dispatch = useDispatch();
  const { path, collapsed } = useSelector((state) => state.editor);
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
    collapsed: collapsed.parent,
    fixSiderbar: true,
    collapsedButtonRender: false,
    menuItemRender: (item, dom) => (
      <div onClick={() => handleMenuClick(item.name.toLowerCase())}>
        {dom}
      </div>
    ),
    logo: <Image src={canva || k} preview={false} width={120} style={{ marginLeft: "-20px" }} />,
    title: '',
    avatarProps: {
      icon: <UserOutlined />,
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
              icon: collapsed.parent ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />,
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