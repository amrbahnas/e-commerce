import { useState, useEffect } from "react";
import ReactConfetti from "react-confetti";
import { useNavigate } from "react-router-dom";
const Confetti = () => {
  const navigate = useNavigate();
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const detectSize = () => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, []);
  return (
    <div className="w-screen h-screen">
      <div className="flex items-center justify-center w-full h-full theContainer">
        <div className="text-center ConfettiWrapper -mt-14 ">
          <span className="text-5xl font-bold ">
            Thank you! you`re all set.
          </span>{" "}
          <br />
          <button
            onClick={(e) => navigate("/", { replace: true })}
            className="w-2/4 px-4 py-3 mt-10 text-white rounded-md bg-amr"
          >
            Login
          </button>
        </div>
      </div>
      <ReactConfetti
        width={windowDimension.width}
        height={windowDimension.height}
        tweenDuration={1000}
      />
    </div>
  );
};

export default Confetti;
