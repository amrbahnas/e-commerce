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
      <div className="theContainer w-full h-full flex justify-center items-center">
        <div className="ConfettiWrapper -mt-14 text-center ">
          <span className=" text-5xl font-bold">
            Thank you! you`re all set.
          </span>{" "}
          <br />
          <button
            onClick={(e) => navigate("/user/login", { replace: true })}
            className="bg-amr text-white py-3 px-4 rounded-md w-2/3 mt-10"
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
