import react, { useState, useEffect } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import styles from "./HelpChat.module.css";
export const HelpChat = () => {
  const [chat, setChat] = useState(false);
  const [helper, setHelper] = useState(false);
  const [message, setMessage] = useState(true);
  const [sendMSg, setSendMSG] = useState(false);
  useEffect(() => {
    const time = setTimeout(() => {
      setHelper(true);
    }, 1000);

    return () => {
      clearInterval(time);
    };
  }, []);
  const ChatIconHandler = () => {
    setChat((prev) => !prev);
    setMessage(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setSendMSG(true);
    setTimeout(() => {
      setChat(false);
      setSendMSG(false);
    }, 2000);
  };
  return (
    helper && (
      <div className={`${styles.help}`}>
        {chat && (
          <div className={`${styles.chat}`}>
            <div className="chatHeader bg-amr px-4 py-2 text-white flex items-center justify-between gap-1  ">
              <div>
                <HeadsetMicIcon /> store
              </div>
              <div className=" cursor-pointer" onClick={(e) => setChat(false)}>
                <CloseIcon />
              </div>
            </div>
            <div className={`${styles.chatBody}`}>
              <form
                className={`${styles.form}`}
                onSubmit={(e) => submitHandler(e)}
              >
                <div>
                  <label htmlFor="email" className=" capitalize">
                    email
                  </label>
                  <input type="email" id="email" />
                </div>
                <div>
                  <label htmlFor="subject" className=" capitalize">
                    subject
                  </label>
                  <textarea name="subject" id="subject"></textarea>
                </div>
                {sendMSg && (
                  <span className="text-green-500 flex items-center">
                    {" "}
                    <CheckCircleIcon /> Message send successfuly
                  </span>
                )}
                <button
                  type="submit"
                  className="bg-amr px-3 py-2 rounded-md text-white"
                >
                  send mail
                </button>
              </form>
            </div>
          </div>
        )}
        <div className={`${styles.chatControl}`}>
          {message && (
            <div className={`${styles.helpMessage}`}>
              <div
                onClick={(e) => setMessage(false)}
                className="closeIcon absolute top-0 -left-7 text-black flex justify-center items-center cursor-pointer w-6 h-6 rounded-full bg-img"
              >
                <CloseIcon />
              </div>
              <p>Hey there! Can I help you find something? 🔎</p>
            </div>
          )}
          <button
            onClick={(e) => ChatIconHandler()}
            className=" bg-amr text-white rounded-md w-30 h-14 py-2 px-4 "
          >
            {chat ? <CloseIcon /> : <ChatIcon />}
          </button>
        </div>
      </div>
    )
  );
};

export default HelpChat;
