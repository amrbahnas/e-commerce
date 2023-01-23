import React from "react";

const Offers = () => {
  return (
    <div className="offers h-fit my-8">
      <div className="theContainer">
        <div className="offersWrapper flex gap-2">
          <div className="img flex-1 rounded-md overflow-hidden">
            <img
              src="https://eg.jumia.is/cms/Jan-23/UN-Deals/Stay-Warm/Kids-Warmer-Sets/iuiuiu.png"
              alt=""
              className="w-full h-full"
            />
          </div>
          <div className="img flex-1 rounded-md overflow-hidden">
            <img
              src="https://eg.jumia.is/cms/Jan-23/OPT-12th/Air-Fryer/perfumeFloorDesktopAR.jpg"
              alt=""
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
