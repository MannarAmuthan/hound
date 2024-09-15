import React, { useState } from 'react';
import { Button, Input , Typography} from 'antd';
import { GlobalContext } from '../../AppState';


const { TextArea } = Input;
const { Title } = Typography;

const ChatWindow: React.FC = () => {


    const { chatWindowcontent, 
        setChatWindowcontent, 
        chatWindowquery, 
        setChatWindowquery, 
        chatWindowisLoading, 
        setChatWindowisLoading} : any = React.useContext(GlobalContext);



    const [content, setContent] = [chatWindowcontent, setChatWindowcontent]
    const [query, setQuery] =  [chatWindowquery, setChatWindowquery]
    const [isLoading, setIsLoading] = [chatWindowisLoading, setChatWindowisLoading]


    function constructComponent(item){
        return (
            <div>
                <h5>{item}</h5>
            </div>
        )
    }

    async function fetchResponse() {
        setIsLoading(true);
        window.electron.ipcRenderer.invoke("CHAT", [query]).then((result) => {
            const response = result.response;
            setContent(constructComponent(response));
            setIsLoading(false);

        });
    }


    return (
        <div>
            <div className='input-button-group'>
                <Title level={1}>Chat with your content !</Title>
                <TextArea rows={3} onChange={(e)=>setQuery(e.target.value)} placeholder="Type anything"  value={query}/>
                <Button type="primary" onClick={fetchResponse} loading={isLoading}>
                    chat !
                </Button>
            </div>

            {content}
        </div>
    )
};

export default ChatWindow;