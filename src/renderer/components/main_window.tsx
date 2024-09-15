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
import { GlobalContext } from '../AppState';

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

  const [retreiveWindowcontent, setRetreiveWindowcontent] =  useState("");
  const [retreiveWindowquery, setRetreiveWindowquery] =  useState("");
  const [retreiveWindowisLoading, setRetreiveWindowisLoading] = useState(false);

  const [textWindowcontent, setTextWindowcontent] =  useState("");
  const [textWindowcontentIsDumping, setTextWindowcontentIsDumping] = useState(false);
  const [textWindowContentsProcessed, setTextWindowContentsProcessed] = useState(0);
  const [textWindowUrlsProcessed, setTextWindowUrlsProcessed] = useState(0);

  const [chatWindowcontent, setChatWindowcontent] =  useState("");
  const [chatWindowquery, setChatWindowquery] =  useState("");
  const [chatWindowisLoading, setChatWindowisLoading] = useState(false);


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

  const globalState = { 
     retreiveWindowcontent: retreiveWindowcontent, 
     setRetreiveWindowcontent: setRetreiveWindowcontent , 
     retreiveWindowquery:retreiveWindowquery ,
     setRetreiveWindowquery:setRetreiveWindowquery,
     retreiveWindowisLoading:retreiveWindowisLoading, 
     setRetreiveWindowisLoading:setRetreiveWindowisLoading,

     textWindowcontent: textWindowcontent,
     setTextWindowcontent: setTextWindowcontent,
     textWindowcontentIsDumping:textWindowcontentIsDumping,
     setTextWindowcontentIsDumping:setTextWindowcontentIsDumping,
     textWindowContentsProcessed:textWindowContentsProcessed,
     setTextWindowContentsProcessed:setTextWindowContentsProcessed,
     textWindowUrlsProcessed:textWindowUrlsProcessed,
     setTextWindowUrlsProcessed:setTextWindowUrlsProcessed,

     chatWindowcontent:chatWindowcontent,
     setChatWindowcontent:setChatWindowcontent,
     chatWindowquery:chatWindowquery,
     setChatWindowquery:setChatWindowquery,
     chatWindowisLoading:chatWindowisLoading,
     setChatWindowisLoading:setChatWindowisLoading
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
        <GlobalContext.Provider 
          value={globalState}>
          <Content style={{ margin: '0 16px' }}>
            {currentWindow}
          </Content>
        </GlobalContext.Provider>
        <Footer style={{ textAlign: 'center' }}>
          Footer
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainWindow;