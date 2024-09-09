import React, { useEffect, useState } from 'react';
import { Button, Input , Typography} from 'antd';
import './text_window.css'

const { TextArea } = Input;
const { Title } = Typography;

const TextWindow: React.FC = () => {

    const [content, setContent] =  useState("");
    const [isDumping, setIsDumping] = useState(false);

    const [contentsProcessed, setContentsProcessed] = useState(0);
    const [urlsProcessed, setUrlProcessed] = useState(0);


    async function fetchStatus() {
        window.electron.ipcRenderer.invoke("TEXT_STATUS", []).then((result) => {
            setUrlProcessed(result['count']);
        });
    }

    async function dump() {
        setIsDumping(true);
        
        window.electron.ipcRenderer.invoke("TEXT_DUMP", [content]).then((result) => {
            setIsDumping(false);
            setContent("");
            fetchStatus();
        });
    }

    return (
        <div>

            <div className='input-button-group'>
                <Title level={1}>Your Contents !</Title>
                <TextArea rows={3} onChange={(e)=>setContent(e.target.value)} placeholder="Paste Any content , URLs, etc"  value={content}/>
                <Button type="primary" onClick={dump} loading={isDumping}>
                    Dump !
                </Button>
            </div>

            <Title level={5}>Documents processed: {contentsProcessed}</Title>
            <Title level={5}>URLs processed for smart bookmarking: {urlsProcessed}</Title>

        </div>
    )
};

export default TextWindow;