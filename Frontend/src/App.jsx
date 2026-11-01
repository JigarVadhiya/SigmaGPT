import './App.css';
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { MyContext } from "./MyContext.jsx";
import { useState } from 'react';
import { v1 as uuidv1 } from "uuid";

function App() {
  const [prompt, setPrompt] = useState("");
  const [replay, setReplay] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]); //stores all chats of curr thread
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  const providervalues = {
    prompt, setPrompt,
    replay, setReplay,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads,
  }; //passing values

  return (
    <div className='app'>
      <MyContext.Provider value={providervalues}>
        <Sidebar />
        <ChatWindow />
      </MyContext.Provider>
    </div>
  )
}

export default App;
