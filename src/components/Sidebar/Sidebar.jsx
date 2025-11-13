import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context';

const Sidebar = () => {

    const {onSent,prevPrompts,setRecentPrompt,newChat} = useContext(Context);

    const loadPrompt = async (prompt) => {
        await onSent(prompt);
        setRecentPrompt(prompt);
    } 

    return (
        <div className='sidebar'>
            <div className="top">
                <h2 className="sidebar-title">MindMate</h2>
                <div onClick={newChat} className="new-chat">
                    <img src={assets.plus_icon} alt="" />
                    <p>New Chat</p>
                </div>
                <div className="recent">
                    <p className='recent-title'>Recents:-</p>
                    {prevPrompts.map((item,index)=>(
                        <div key={index} onClick={()=>loadPrompt(item)} className="recent-entry">
                            <img src={assets.message_icon} alt="" />
                            <p>{item.slice(0,18)} {"..."}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    <p>Help</p>
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    <p>Settings</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
