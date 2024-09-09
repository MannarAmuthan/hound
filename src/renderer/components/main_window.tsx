import React, { useState } from 'react';
import {
  UploadOutlined,
  SortAscendingOutlined,
  WechatOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import TextWindow from './text_window/text_window';
import RetrieveWindow from './retrieve_window/retrieve_window';
import ChatWindow from './chat_window/chat_window';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];


function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem;
}



const items: MenuItem[] = [
  getItem('Text', '1', <UploadOutlined /> ),
  getItem('Retrieve', '2',  <SortAscendingOutlined />),
  getItem('Chat', '3', <WechatOutlined/>)
];

const MainWindow: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("0");
  const [currentWindow, setCurrentWindow] = useState(<TextWindow/>);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  function switchWindow(key){
    if(key=='1'){
      setCurrentWindow(<TextWindow/>);
    }
    if(key == '2'){
      setCurrentWindow(<RetrieveWindow/>);
    }

    if(key == '3'){
      setCurrentWindow(<ChatWindow/>);
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onSelect={
                    (item: any, key: any, keyPath: any) => {
                      setCurrent(item.key);
                      switchWindow(item.key);
                    }
            }/>
      </Sider>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          {currentWindow}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Footer
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainWindow;