import  { useState, useEffect } from "react";
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
            <div className="flex items-center justify-between gap-1 px-4 py-2 text-white chatHeader bg-amr ">
              <div>
                <HeadsetMicIcon /> store
              </div>
              <div className="cursor-pointer " onClick={(e) => setChat(false)}>
                <CloseIcon />
              </div>
            </div>
            <div className={`${styles.chatBody}`}>
              <form
                className={`${styles.form}`}
                onSubmit={(e) => submitHandler(e)}
              >
                <div>
                  <label htmlFor="email" className="capitalize ">
                    email
                  </label>
                  <input type="email" id="email" />
                </div>
                <div>
                  <label htmlFor="subject" className="capitalize ">
                    subject
                  </label>
                  <textarea name="subject" id="subject"></textarea>
                </div>
                {sendMSg && (
                  <span className="flex items-center text-green-500">
                    {" "}
                    <CheckCircleIcon /> Message send successfuly
                  </span>
                )}
                <button
                  type="submit"
                  className="px-3 py-2 text-white rounded-md bg-amr"
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
                className="absolute top-0 flex items-center justify-center w-6 h-6 text-black rounded-full cursor-pointer closeIcon -left-7 bg-img"
              >
                <CloseIcon />
              </div>
              <p>Hey there! Can I help you find something? 🔎</p>
            </div>
          )}
          <button
            onClick={(e) => ChatIconHandler()}
            className="px-4 py-2 text-white rounded-md bg-amr w-30 h-14"
          >
            {chat ? <CloseIcon /> : <ChatIcon />}
          </button>
        </div>
      </div>
    )
  );
};

export default HelpChat;
