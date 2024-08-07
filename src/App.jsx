import { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";

let selectedIframe = null;
let selectedTab = null;

function changeTabSelection(tab, iframe) {
    if (tab !== selectedTab) {
        tab.selected = !tab.selected;
        if (selectedIframe !== null) {
            selectedIframe.hidden = true;
            selectedTab.unselect();
        }
        selectedIframe = iframe;
        selectedTab = tab;
    }
}

function MenuIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash"
             viewBox="0 0 16 16">
            <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
        </svg>
    );
}

function ChatIframe({id}) {
    return (
        <iframe
            id={`iframe-${id}`}
            hidden={true}
            src="https://bastien-chatbot-webapp.azurewebsites.net/"
            height="100%"
            width="100%"
        />
    );
}

function Tab({tab, deleteTab}) {
    const [selected, setSelected] = useState(false);

    const handleClick = () => {
        let iframe = document.getElementById(`iframe-${tab.id}`);
        changeTabSelection({ selected, unselect }, iframe);
        setSelected(!selected);
    };

    const unselect = () => {
        setSelected(false);
    };

    useEffect(() => {
        if (selected) {
            document.getElementById(`iframe-${tab.id}`).hidden = false;
        }
    }, [selected, tab.id]);

    return (
        <div>
            <div className="flex flex-row justify-between items-center overflow-hidden bg-white rounded-lg py-2 px-4 text-nowrap ">
                <button onClick={handleClick}>{tab.text}</button>
                {selected && <button className={"hover:bg-gray-300 rounded-lg p-1"} onClick={() => deleteTab(tab.id)}>{MenuIcon()}</button>}
            </div>
        </div>
    );
}

function TabContainer() {
    const [tabsList, setTabsList] = useState([]);
    const [idx, setIdx] = useState(0)

    const appendData = () => {
        let id = (Math.random() + 1).toString(36).substring(7);
        const newTab = { text: `Tab ${idx+1}`, id, idx };
        setTabsList((prevTabs) => [...prevTabs, newTab]);
        setIdx(idx + 1);
    };

    const deleteTab = (id) => {
        setTabsList((prevTabs) => prevTabs.filter((tab) => tab.id !== id));
    };

    return (
        <div className="grid grid-cols-3 h-full">
            <div className="flex flex-col py-14 gap-5 items-center bg-[#004976] text-center px-4">
                <span className="text-white text-5xl font-bold">Welcome to the Chatbot!</span>
                <span className="text-white text-4xl font-medium">Ask anything related to staff rules and regulations</span>
            </div>
            <div>
                {tabsList.map((tab) => (
                    <ChatIframe key={tab.id} id={tab.id} />
                ))}
            </div>
            <div className="flex flex-col gap-5 items-center bg-[#004976] text-center p-7 m">
                <div className="flex flex-col h-full w-full justify-start gap-10 bg-[#00905C] my-7 p-7 rounded-lg">
          <span className="flex gap-10 w-full justify-between text-center text-white text-2xl font-medium">
            Discussions
            <button className={"text-[#004976] bg-white px-2 pb-1 rounded-lg"} onClick={appendData}>+</button>
          </span>
                    <div className="flex flex-col gap-10 h-full overflow-y-hidden justify-start">
                        {tabsList.map((tab) => (
                            <Tab key={tab.id} tab={tab} deleteTab={deleteTab} parentContainer={null} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <div className="application">
            <Helmet>
                <title>ChatBot App</title>
            </Helmet>
            <div className="flex flex-col h-screen w-screen">
                <div id="title" className="flex justify-center bg-black">
                    <span className="text-white text-2xl font-medium py-2">Chatbot App</span>
                </div>
                <div className="h-full">
                    <TabContainer/>
                </div>
            </div>
        </div>

    );
}
