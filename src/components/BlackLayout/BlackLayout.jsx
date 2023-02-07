import React from "react";
import styles from "./BlackLayout.module.css"
const BlackLayout = ({children}) => {
  return (
    <div className={styles.wrapper}>
      {React.cloneElement(children)}
    </div>
  );
};

export default BlackLayout;
