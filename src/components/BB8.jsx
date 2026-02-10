import React, { useState, useEffect, useCallback } from "react";

const BB8 = ({ onClick }) => {
  const [droidX, setDroidX] = useState(0);
  const [mouseX, setMouseX] = useState(300);
  const [toTheRight, setToTheRight] = useState(true);
  const [speed] = useState(1.8);
  const [accelMod] = useState(0.6);

  const handleMouseMove = useCallback((event) => {
    setMouseX(event.pageX);
  }, []);

  const movement = useCallback(() => {
    if (Math.abs(Math.round(droidX) - mouseX) !== 1) {
      const distance = mouseX - droidX;
      const acceleration = Math.abs(distance * accelMod) / 100;

      if (droidX < mouseX) {
        setDroidX((prev) => prev + speed * acceleration);
        setToTheRight(true);
      } else {
        setDroidX((prev) => prev - speed * acceleration);
        setToTheRight(false);
      }
    }
  }, [droidX, mouseX, speed, accelMod]);

  useEffect(() => {
    const mouseMoveHandler = (e) => handleMouseMove(e);
    document.addEventListener("mousemove", mouseMoveHandler);

    const interval = setInterval(() => {
      movement();
    }, 1);

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      clearInterval(interval);
    };
  }, [handleMouseMove, movement]);

  const d = 100;

  const styles = {
    bb8: {
      position: "fixed",
      marginLeft: -d / 2,
      marginRight: -d / 2,
      width: d,
      bottom: "10%",
      left: 0,
      transform: `translateX(${droidX}px)`,
      WebkitTransform: `translateX(${droidX}px)`,
      zIndex: 40,
      pointerEvents: onClick ? "auto" : "none",
      cursor: onClick ? "pointer" : "default",
      display: window.innerWidth >= 768 ? "block" : "none",
    },
    antennas: {
      position: "absolute",
      transition: "left 0.6s",
      left: toTheRight ? "6%" : "28%",
      transform: `translateX(${(mouseX - droidX) / 25}px) rotateZ(${(mouseX - droidX) / 80}deg)`,
      WebkitTransform: `translateX(${(mouseX - droidX) / 25}px) rotateZ(${(mouseX - droidX) / 80}deg)`,
    },
    antennaShort: {
      background: "#e0d2be",
      position: "absolute",
      width: "2px",
      height: "15px",
      top: "-50px",
      left: "36px",
    },
    antennaLong: {
      background: "#e0d2be",
      position: "absolute",
      width: "2px",
      borderTop: "4px solid #020204",
      borderBottom: "4px solid #020204",
      height: "26px",
      top: "-60px",
      left: "40px",
    },
    head: {
      backgroundColor: "ghostwhite",
      borderRadius: "65px 65px 18px 18px",
      height: "45px",
      marginLeft: "-32px",
      overflow: "hidden",
      position: "absolute",
      width: "74px",
      zIndex: 1,
      top: "-40px",
      left: "53%",
      transform: `translateX(${(mouseX - droidX) / 15}px) rotateZ(${(mouseX - droidX) / 25}deg)`,
      WebkitTransform: `translateX(${(mouseX - droidX) / 15}px) rotateZ(${(mouseX - droidX) / 25}deg)`,
    },
    stripeOne: {
      position: "absolute",
      width: "100%",
      background: "#7699B7",
      height: "5px",
      opacity: 0.8,
      zIndex: 1,
      top: "2px",
    },
    stripeTwo: {
      position: "absolute",
      width: "100%",
      background: "#CD7640",
      height: "3px",
      top: "10px",
    },
    stripeThree: {
      position: "absolute",
      width: "100%",
      background: "#999",
      height: "3px",
      opacity: 0.5,
      bottom: "2px",
    },
    stripeDetail: {
      display: "flex",
      width: "140px",
      bottom: "5px",
      left: toTheRight ? "0" : "-38%",
      transition: "left 0.6s",
      position: "absolute",
    },
    eyes: {
      display: "block",
      height: "100%",
      position: "absolute",
      width: "100%",
      transition: "left 0.6s",
      left: toTheRight ? "36%" : "0",
    },
    eyeOne: {
      borderRadius: "50%",
      display: "block",
      position: "absolute",
      background: "#020204",
      border: "3px solid lightgray",
      height: "21px",
      width: "21px",
      top: "8px",
      left: "12%",
    },
    eyeOneAfter: {
      background: "white",
      borderRadius: "50%",
      height: "2px",
      position: "absolute",
      width: "2px",
      top: "3px",
      right: "3px",
    },
    eyeTwo: {
      borderRadius: "50%",
      display: "block",
      position: "absolute",
      backgroundColor: "lightgrey",
      border: "1px solid #020204",
      height: "11px",
      width: "11px",
      top: "21px",
      left: "40%",
    },
    eyeTwoAfter: {
      background: "#020204",
      borderRadius: "50%",
      height: "7px",
      position: "absolute",
      width: "7px",
      top: "1px",
      left: "1px",
    },
    ball: {
      backgroundColor: "ghostwhite",
      borderRadius: "50%",
      height: d + 18,
      overflow: "hidden",
      position: "relative",
      width: d + 18,
      transform: `rotateZ(${droidX / 2}deg)`,
      WebkitTransform: `rotateZ(${droidX / 2}deg)`,
    },
    linesOne: {
      border: "2px solid #B19669",
      borderRadius: "50%",
      height: "280px",
      opacity: 0.6,
      position: "absolute",
      width: "280px",
    },
    linesTwo: {
      border: "2px solid #B19669",
      borderRadius: "50%",
      height: "280px",
      opacity: 0.6,
      position: "absolute",
      width: "280px",
      top: "-7px",
      left: "-175px",
    },
    ringBase: {
      background: "#CD7640",
      borderRadius: "50%",
      position: "absolute",
    },
    ringOne: {
      marginLeft: "-28px",
      height: "63px",
      width: "70px",
      top: "2%",
      left: "42%",
    },
    ringTwo: {
      height: "28px",
      width: "56px",
      transform: "rotate(50deg)",
      WebkitTransform: "rotate(50deg)",
      top: "65%",
      left: "8%",
      marginLeft: "-25px",
    },
    ringThree: {
      height: "26px",
      width: "56px",
      transform: "rotate(-50deg)",
      WebkitTransform: "rotate(-50deg)",
      top: "68%",
      left: "84%",
      marginLeft: "-25px",
    },
    ringAfter: {
      backgroundColor: "ghostwhite",
      borderRadius: "50%",
      height: "73%",
      marginTop: "-36%",
      marginLeft: "-36%",
      position: "absolute",
      width: "73%",
      top: "50%",
      left: "50%",
    },
    ringTwoAfter: {
      backgroundColor: "ghostwhite",
      borderRadius: "50%",
      height: "73%",
      marginTop: "-36%",
      marginLeft: "-36%",
      position: "absolute",
      width: "73%",
      top: "100%",
      left: "50%",
    },
    ringThreeAfter: {
      backgroundColor: "ghostwhite",
      borderRadius: "50%",
      height: "73%",
      marginTop: "-36%",
      marginLeft: "-36%",
      position: "absolute",
      width: "73%",
      top: "110%",
      left: "50%",
    },
    shadow: {
      background: "#3A271C",
      boxShadow: "3px 0 35px #3A271C",
      borderRadius: "50%",
      height: d / 6,
      opacity: 0.25,
      position: "absolute",
      width: d,
      zIndex: -1,
      left: "7px",
      bottom: "-6px",
    },
  };

  const detailStyles = [
    { backgroundColor: "#CD7640", width: "2%", marginLeft: "2px", height: "5px" },
    { backgroundColor: "#CD7640", width: "2%", marginLeft: "2px", height: "5px" },
    { backgroundColor: "#CD7640", width: "8%", marginLeft: "2px", height: "5px" },
    { backgroundColor: "#CD7640", width: "6%", marginLeft: "4px", height: "5px" },
    { backgroundColor: "#CD7640", width: "4%", marginLeft: "32px", height: "4px", marginTop: "1px" },
    { backgroundColor: "#CD7640", width: "10%", marginLeft: "3px", height: "5px" },
    { backgroundColor: "#CD7640", width: "2%", marginLeft: "2px", height: "5px" },
    { backgroundColor: "#CD7640", width: "2%", marginLeft: "2px", height: "5px" },
  ];

  return (
    <div style={styles.bb8} onClick={onClick}>
      <div style={styles.antennas}>
        <div style={styles.antennaShort}></div>
        <div style={styles.antennaLong}></div>
      </div>
      <div style={styles.head}>
        <div style={styles.stripeOne}></div>
        <div style={styles.stripeTwo}></div>
        <div style={styles.eyes}>
          <div style={styles.eyeOne}>
            <div style={styles.eyeOneAfter}></div>
          </div>
          <div style={styles.eyeTwo}>
            <div style={styles.eyeTwoAfter}></div>
          </div>
        </div>
        <div style={styles.stripeDetail}>
          {detailStyles.map((detailStyle, index) => (
            <div key={index} style={detailStyle}></div>
          ))}
        </div>
        <div style={styles.stripeThree}></div>
      </div>
      <div style={styles.ball}>
        <div style={styles.linesOne}></div>
        <div style={styles.linesTwo}></div>
        <div style={{ ...styles.ringBase, ...styles.ringOne }}>
          <div style={styles.ringAfter}></div>
        </div>
        <div style={{ ...styles.ringBase, ...styles.ringTwo }}>
          <div style={styles.ringTwoAfter}></div>
        </div>
        <div style={{ ...styles.ringBase, ...styles.ringThree }}>
          <div style={styles.ringThreeAfter}></div>
        </div>
      </div>
      <div style={styles.shadow}></div>
    </div>
  );
};

export default BB8;
