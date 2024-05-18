import React, { useState } from "react";
import Message from "./Message";
// import Svg from "../components/Svg";
import "./Chat.css";

function Chat() {
  // this function opens the chat
  function openChart() {
    document.getElementById("assistant-chat").classList.add("show");
    document.getElementById("assistant-chat").classList.remove("hide");
  }

  // this function opens the chat
  function closeChart() {
    document.getElementById("assistant-chat").classList.add("hide");
    document.getElementById("assistant-chat").classList.remove("show");
  }

  function chat_scroll_up() {
    let elem = document.querySelector(".start-chat");
    setTimeout(() => {
      elem.scrollTo({
        top: elem.scrollHeight,
        behavior: "smooth",
      });
    }, 200);
  }

  const [chatMessages, setchatMessages] = useState([
    {
      position: "left_bubble",
      message: "Hello there,I am your assistant. How can i help you today? ",
    },
  ]);

  function askAI() {
    var prompt_input = document.getElementById("chat-input");
    var prompt = prompt_input.value;
    if (prompt.replaceAll(" ", "") === "") {
      return;
    }
    prompt_input.value = "";

    const data = {
      chatHistory: JSON.stringify(chatMessages),
      prompt: prompt,
    };

    fetch("/ask_ai", {
      method: "POST",
      body: JSON.stringify(data), // Convert data to JSON
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
    })
      .then((response) => response.json())
      .then((resData) => {
        const messages = [
          ...chatMessages,
          {
            position: "right_bubble",
            message: prompt,
          },
          {
            position: "left_bubble",
            message: resData.result,
          },
        ];
        setchatMessages(messages);
        chat_scroll_up()
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <div>
        <div id="assistant-chat" className="hide ai_chart">
          <div className="header-chat">
            <div className="head-home">
              <div className="info-avatar">
                {/* <Svg /> */}
              </div>
              <p>
                <span className="assistant-name"> Assistant</span>
                <br />
                <small>Online</small>
              </p>
            </div>
          </div>

          <div className="start-chat">
            <div className="assistant-chat-body">
              {chatMessages.map((chatMessage, key) => (
                <Message
                  key={key}
                  position={chatMessage.position}
                  message={chatMessage.message}
                />
              ))}
            </div>
            <div className="ui focus input large fluid">
              <input
                type="text"
                // id="chat-input"
                placeholder="What can I help you with..."
                maxLength="400"
              />
              <button
                onClick={askAI}
                href="#send_message"
                id="send-it"
                className="ui icon blue large button"
              >
                <i className="send icon"></i>
              </button>
            </div>
          </div>
          <button 
          className="ui inverted circular icon button" 
          style={{position: "absolute", top: "5px", right: "5px"}}
          href="#close" onClick={closeChart}>
            <i className="close icon"></i>
          </button>
        </div>
        <button
          onClick={openChart}
          className="ui green button"
          style={{position: "fixed", right: "20px", bottom: "20px"}}
          href="#load_chart"
          title="Show Chat"
        >
          {/* <Svg /> */}
          Chat with Us
        </button>
      </div>
    </div>
  );
}

export default Chat;
