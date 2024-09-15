import React, { useState } from 'react';
import { Button, Input , Typography} from 'antd';
import { GlobalContext } from '../../AppState';

const { TextArea } = Input;
const { Title } = Typography;

const RetrieveWindow: React.FC = () => {


    const { retreiveWindowcontent, 
            setRetreiveWindowcontent, 
            retreiveWindowquery, 
            setRetreiveWindowquery, 
            retreiveWindowisLoading, 
            setRetreiveWindowisLoading} : any = React.useContext(GlobalContext);


    const [content, setContent] =  [retreiveWindowcontent, setRetreiveWindowcontent]
    const [query, setQuery] =  [retreiveWindowquery, setRetreiveWindowquery]
    const [isLoading, setIsLoading] = [retreiveWindowisLoading, setRetreiveWindowisLoading ]


    function constructComponent(item){
        return (
            <div>
                <br/>
                <a href={item.metadata.url}>{item.metadata.url} </a>
                <br/>
                <blockquote>{item.document}</blockquote>
            </div>
        )
    }

    async function fetchResponse() {
        setIsLoading(true);
        window.electron.ipcRenderer.invoke("TEXT_QUERY", [query]).then((result) => {
            var comp = (<div>
                {
                        result.map((item) => constructComponent(item))
                } </div>);

            setContent(comp);
            setIsLoading(false);

        });
    }


    return (
        <div>
            <div className='input-button-group'>
                <Title level={1}>Retreive content !</Title>
                <TextArea rows={3} onChange={(e)=>setQuery(e.target.value)} placeholder="Type anything"  value={query}/>
                <Button type="primary" onClick={fetchResponse} loading={isLoading}>
                    retreive !
                </Button>
            </div>

            {content}
        </div>
    )
};

export default RetrieveWindow;