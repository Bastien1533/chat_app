import React from "react";

let selected_iframe = null
let selected_tab = null

function ChangeTabSelection(tab, iframe) {
    if (tab !== selected_tab) {
        tab.selected = !tab.selected
        if (selected_iframe != null) {
            console.log(selected_tab)
            selected_iframe.hidden = true
            selected_tab.unselect()
        }
        selected_iframe = iframe
        selected_tab = tab
    }
}

function MenuIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
             className="bi bi-three-dots"
             viewBox="0 0 16 16">
            <path
                d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
        </svg>
    )
}

function ChatIframe({idx}) {
    return (<iframe id={`iframe-${idx}`} hidden={true}
                    src="https://microsoft.github.io/BotFramework-WebChat/02.branding-styling-and-customization/a.branding-web-chat/"
                    height="100%" width="100%"/>)
}

class Tab extends React.Component {
    constructor(props) {
        super(props);
        this.parent_container = props.parent_container
        this.text = props.text
        this.idx = props.idx
        this.selected = props.selected
        this.handleClick = this.handleClick.bind(this);
        this.unselect = this.unselect.bind(this);
    }

    handleClick() {
        let iframe = document.getElementById(`iframe-${this.idx.toString()}`)
        ChangeTabSelection(this, iframe)
        this.forceUpdate()
    }

    unselect() {
        this.selected = false
        this.forceUpdate()
    }


    render() {
        let three_dots;
        if (this.selected) {
            three_dots = MenuIcon()
            document.getElementById(`iframe-${this.idx.toString()}`).hidden = false
        } else {
            three_dots = <></>
        }

        return (
            <button onClick={this.handleClick}>
                <div
                    className="flex flex-row justify-between items-center overflow-hidden bg-white rounded-lg py-2 px-4 text-nowrap ">

                    <span>{this.text}</span>
                    <span>{three_dots}</span>
                </div>
            </button>

        )
    }
}

class TabContainer extends React.Component {
    state = {
        tabs_list: [],
        iframe_list: [],
        idx: 0
    }
    appendData = () => {
        const newData = {text: `Tab  ${this.state.idx + 1}`, idx: this.state.idx}
        const newDataFrame = {id: `${this.state.idx}`}
        this.setState({idx : this.state.idx + 1})
        this.setState(prevState => ({tabs_list: [...prevState.tabs_list, newData]}))
        this.setState(prevState => ({iframe_list: [...prevState.iframe_list, newDataFrame]}))
    }

    render() {
        return (
            <div className="grid grid-cols-3 h-full">
                <div className="flex flex-col py-14 gap-5 items-center bg-[#004976] text-center px-4">
                    <span className="text-white text-5xl font-bold">
                        Welcome to the Chatbot! 
                    </span>
                    <span className="text-white text-4xl font-medium">
                        Ask anything related to staff rules and regulations
                    </span>
                </div>
                <div>
                    {this.state.iframe_list.map(iframe => <ChatIframe key={iframe['id']} idx={iframe['id']}/>)}
                </div>
                <div className="flex flex-col gap-5 items-center bg-[#004976] text-center p-7 m">
                    <div className="flex flex-col h-full w-full justify-start gap-10 bg-[#00905C] my-7 p-7 rounded-lg">
                            <span
                                className="flex gap-10 w-full justify-between text-center text-white text-2xl font-medium">
                                Discussions
                                <button onClick={this.appendData}>
                                    +
                                </button>
                            </span>

                        <div id="" className="flex flex-col gap-10 h-full overflow-y-hidden justify-start">
                            {this.state.tabs_list.map(tab => <Tab text={tab['text']}
                                                                  key={tab['idx']}
                                                                  parent_container={this}
                                                                  idx={tab['idx']}/>)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default function App() {
    return (
        <div className="flex flex-col h-screen w-screen">
            <div id="title" className="flex justify-center bg-black">
                <span className="text-white text-2xl font-medium py-2">Chatbot App</span>
            </div>
            <div className="h-full">
                <TabContainer/>
            </div>
        </div>
    )
}