import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth.js";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import BTsvg from "./bluetooth.png";
import Logo from "./Logo.png";
import { useEffect } from "react";

const Navigation = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  var connection = undefined;
  const bangleConnect = () => {
    var Puck = window.Puck;
    // Connect
    if (connection) {
      connection.close();
      alert("Disconnect!");
      connection = undefined;
    }
    Puck.connect(function (c) {
      if (!c) {
        alert("Couldn't connect!");
        return;
      }

      connection = c;
      setIsConnected(true)
      console.log(connection);
    });
  };
  var notification = undefined;
  const checkNotification = () => {
    fetch("https://api.joshuacattaruzza.com/api/notification/" + currentUser.username, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    }).then((res) => {
      return res.json();
    })
    .then((data) => {
      
      console.log(data)
      notification = data;
    }).finally(()=> {
      if(connection)
        sendNotification();
      });
  };
  var sendOnce = true;
  const sendNotification = () => { 
    
    console.log(notification)
    if(notification !== undefined && notification.notification.hasNotification === true)
    {
    var BANGLE_CODE = `  g.clear();
    g.setFontAlign(0,0); // center font
    g.setFont("Vector",20); // vector font, 80px  
    // draw the current counter value
    E.showMessage("${notification.notification.text}", "${currentUser.username}");

    // optional - this keeps the watch LCD lit up
    Bangle.setLCDPower(1);
    })`;
    console.log(connection);
    if(sendOnce){
      setTimeout(function () {
    connection.write("reset();\n", function () {
      // Wait for it to reset itself
      setTimeout(function () {
        // Now upload our code to it
        connection.write("\x03\x10if(1){" + BANGLE_CODE + "}\n", function () {
          console.log("Ready...");
          sendOnce=false;
        });
      }, 1500);
    }, 2000);
    });
  }
    
    }
  };

  useEffect(()=>{
    const intervalId = setInterval(() => {
        checkNotification();
        
    }, 10000);
    return  () => clearInterval(intervalId); 
  },[checkNotification])


  // const bangleDisconnect = () => {
  //   console.log(connection);
  //     connection.close();
  //     setIsConnected(false)
    
  // };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      <Navbar
        fixed="top"
        bg="white"
        expand="true"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Navbar.Brand>
          <img
            // style={{ width: "50px", height: "50px" }}
            src={Logo}
            className="d-inline-block align-top"
            alt="Company Logo"
          />
        </Navbar.Brand>
        {/* {!isConnected ? ( */}
          <Button id="btnConnect" onClick={bangleConnect}>
            <img
              src={BTsvg}
              style={{ width: "20px", height: "20px" }}
              alt="bluetooth icon"
            ></img>
          </Button>
        {/* ) : ( */}
          {/* <Button id="btnDisconnect" onClick={bangleDisconnect}>
            <span style={{ width: "20px", height: "20px" }}>X</span>
          </Button>
        )} */}
        <Button
          style={{ backgroundColor: "#0dcaf0", marginRight: "30px" }}
          onClick={handleShow}
        >
          Menu
        </Button>
      </Navbar>
        <Offcanvas show={show}>
          <Offcanvas.Header onHide={handleClose} closeButton>
            <Offcanvas.Title>
              {/* <Logo /> */}
              Dashboard Operatore
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Row>
              <Button
                onClick={handleClose}
                variant="dark"
                as={Link}
                to="/home"
                style={{ marginTop: "20px" }}
              >
                Manutenzioni Attive
              </Button>
              <Button
                onClick={handleClose}
                variant="dark"
                as={Link}
                to="/oldtask"
                style={{ marginTop: "20px" }}
              >
                Storico Manutenzioni
              </Button>
              {!isLoggedIn ? (
                <Button
                  onClick={handleClose}
                  variant="dark"
                  as={Link}
                  to="/login"
                  style={{ marginTop: "20px" }}
                >
                  Login
                </Button>
              ) : (
                <Button
                  variant="outline-info"
                  style={{ marginTop: "20px" }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              )}
              {!isLoggedIn ? (
                <Button
                  variant="dark"
                  as={Link}
                  to="/signup"
                  style={{ marginTop: "20px" }}
                >
                  Registrati
                </Button>
              ) : null}
            </Row>
          </Offcanvas.Body>
        </Offcanvas>
    </>
  );
};
export default Navigation;
