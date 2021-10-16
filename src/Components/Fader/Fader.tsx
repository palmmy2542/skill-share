import React, { ReactElement, useEffect, useState } from "react";
import "./index.css";

const Fader = ({
  isFade,
  setIsFade,
  children,
}: {
  isFade: boolean;
  setIsFade: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactElement<any, any>;
}) => {
  //   useEffect(() => {
  //     if (isFade) {
  //       const timeOut = setTimeout(() => {
  //         if (isFade) setIsFade(false);
  //       }, 6000);

  //       return () => clearTimeout(timeOut);
  //     }
  //   }, [isFade]);
  return <div className={isFade ? "fade-in" : "fade-out"}>{children}</div>;
};

export default Fader;
