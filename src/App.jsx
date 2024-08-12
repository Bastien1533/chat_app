import { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";


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
    const loadingMessage = "The Chat is currently loading..."

    const svgItem = <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100% 100%">
        <text fill="%23000000" x="50%" y="50%" fontFamily="'Lucida Grande', sans-serif" fontSize="24"
              textAnchor="middle">${loadingMessage}</text>
    </svg>

    return (

        <iframe
            style={{background: `url('data:image/svg+xml;charset=utf-8,${svgItem}`}}
            id={`iframe-${id}`}
            hidden={true}
            src="https://bastien-chatbot-webchat.azurewebsites.net/"
            height="100%"
            width="100%"
        >
        </iframe>
    );
}

function Tab({tab, deleteTab, toggleTabSelection, selectedTab}) {
    const [selected, setSelected] = useState(selectedTab === this);
    const [hovered, setHovered] = useState(false)

    const handleClick = () => {
        let iframe = document.getElementById(`iframe-${tab.id}`);
        //changeTabSelection({ selected, unselect }, iframe);
        toggleTabSelection(tab, iframe, unselect)
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
                <button className={`w-11/12 text-start`} onMouseOut={() => setHovered(false)} onMouseOver={() => setHovered(true)} onClick={handleClick}>
                    <span className={`px-2 rounded-lg text-center ${hovered && "bg-gray-300"}`}>{tab.text}</span>
                </button>
                {selected && <button className={"hover:bg-gray-300 rounded-lg p-1"} onClick={() => deleteTab(tab.id)}>{MenuIcon()}</button>}
            </div>
        </div>
    );
}

function TabContainer() {
    const [tabsList, setTabsList] = useState([]);
    const [idx, setIdx] = useState(0)
    const [selectedTab, setSelectedTab] = useState({tab: null, iframe : null, unselect : null})
    const [firstRun, setFirstRun] = useState(true)


    const appendData = (first) => {
        let id = (Math.random() + 1).toString(36).substring(7);
        const newTab = { text: `Tab ${idx+1}`, id, idx, first};
        setTabsList((prevTabs) => [...prevTabs, newTab]);
        setIdx(idx + 1);
        return [newTab, id]
    };
    
    const toggleTabSelection = (tab, iframe, unselect) => {
        if (selectedTab.tab === tab){
            setSelectedTab({tab:null, iframe: null})
            return
        }
        if (selectedTab.iframe != null){
            selectedTab.iframe.hidden = true
            selectedTab.unselect()
        }
        setSelectedTab({tab: tab, iframe: iframe, unselect: unselect})
    }

    const deleteTab = (id) => {
        setTabsList((prevTabs) => prevTabs.filter((tab) => tab.id !== id));
    };
    
    if (firstRun) {
        let res = appendData(true)
        setFirstRun(false)
    }

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
                            <Tab key={tab.id} tab={tab} deleteTab={deleteTab} toggleTabSelection={toggleTabSelection} selectedTab={selectedTab} parentContainer={null} />
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
                    <TabContainer />
                </div>
            </div>
        </div>

    );
}
