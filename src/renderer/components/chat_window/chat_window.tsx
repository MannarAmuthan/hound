import React, { useState } from 'react';
import { Button, Input , Typography} from 'antd';

const { TextArea } = Input;
const { Title } = Typography;

const ChatWindow: React.FC = () => {

    const [content, setContent] =  useState("");
    const [query, setQuery] =  useState("");
    const [isLoading, setIsLoading] = useState(false);


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