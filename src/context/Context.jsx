import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    function delayPara(index, nextWord) {
        setTimeout(() => setResultData(prev => prev + nextWord), 75 * index);
    }

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        
        const currentPrompt = prompt || input;
        if (prompt === undefined) {
            setPrevPrompts(prev => [...prev, input]);
        }
        setRecentPrompt(currentPrompt);
        
        const response = await runChat(currentPrompt);
        const responseArray = response.split('**');
        let newArray = "";
        
        for (let i = 0; i < responseArray.length; i++) {
            newArray += i % 2 === 1 ? `<b>${responseArray[i]}</b>` : responseArray[i];
        }
        
        const finalArray = newArray.split('*').join("</br>").split(" ");
        for (let i = 0; i < finalArray.length; i++) {
            delayPara(i, finalArray[i] + " ");
        }
        
        setLoading(false);
        setInput("");
    };

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;