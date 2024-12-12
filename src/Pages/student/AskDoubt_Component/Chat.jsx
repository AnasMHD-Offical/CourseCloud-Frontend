"use client";

import { useEffect, useState, useRef } from "react";
import { ChatInput } from "./Components/ChatInputs";
import { MessageBubble } from "./Components/MessageBubble";
import { useSocket } from "@/Config/SocketConfig";
import { useSelector } from "react-redux";
import { axios_instance } from "@/Config/axios_instance";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [currentCourseData, setCurrentCourseData] = useState();
  const { socket } = useSocket();
  const student_id = useSelector(
    (state) => state?.student?.student_data?.student?._id
  );

  const { current_course_id } = useSelector(
    (state) => state?.current_course_data
  );

  const chatboxRef = useRef(null);

  const get_course_data = async (req, res) => {
    try {
      const response = await axios_instance.get(
        `api/get_course_data/${current_course_id}`
      );
      const { success, course } = response?.data;
      if (success) {
        setCurrentCourseData(course);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    chatboxRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    get_course_data();
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleResponse = (response) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          doubt: response,
          type: "ai",
        },
      ]);
    };

    socket.on("response", handleResponse);

    return () => {
      socket.off("response", handleResponse);
    };
  }, [socket]);

  const handleSendMessage = (content) => {
    if (!socket) return;

    const message = {
      id: student_id,
      doubt: content,
      course_content: currentCourseData ? currentCourseData?.title : "",
      type: "user",
    };

    setMessages((prev) => [...prev, message]);
    socket.emit("message", message);
  };

  return (
    <div className="flex flex-col mx-auto gap-4">
      <div className="flex flex-col h-[540px] sm:h-[600px] max-w-5xl  rounded-lg shadow-sm shadow-gray-00 bg-gradient-to-r from-purple-50 to-blue-50">
        <h2 className="border p-2 rounded-lg rounded-b-none text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          Ask your Doubt with AI
        </h2>
        <div
          ref={chatboxRef}
          className="flex-1 overflow-y-auto p-4 hide-scroll-bar space-y-4"
        >
          {messages.map((message,index) => (
            <MessageBubble
              key={message.id+index}
              content={message.doubt}
              type={message.type}
            />
          ))}
        </div>
        <ChatInput onSend={handleSendMessage} />
      </div>
    </div>
  );
}
