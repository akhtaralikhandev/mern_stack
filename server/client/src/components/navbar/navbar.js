import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import "./navbar.css";
import { useState } from "react";
import { logout } from "../../redux/features/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const ToggleDisplay = () => {
    setDisplay("block");
  };
  const [display, setDisplay] = useState("none");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Logout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className="navbar">
      <div className="navbarwrapper">
        <div className="leftnavbar">
          <div className="leftnavbarwrapper">
            <span className="brandname">Family Time</span>
            <span className="navbarhome">Home</span>
          </div>
        </div>
        <div className="centernavbar">
          <div className="centernavbarwrapper">
            <div className="navbarinputdiv">
              <div className="navbarinputdivwrapper">
                <input
                  type="text"
                  placeholder="Search here"
                  className="navbarinput"
                />
                <div className="navbarsearchicon">
                  <SearchIcon className="navbarsearchIcon" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="navbarright">
          <div className="navbarrightwrapper">
            <ul className="ulnavbar">
              <li className="linavbar">
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </li>
              <li className="linavbar">
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </li>
              <li className="linavbar navbaraccount">
                <div className="accountCircle" onClick={() => ToggleDisplay()}>
                  <img
                    src="https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                    alt=""
                    className="navbaraccountimg"
                  />
                  <div
                    className="profileinfo"
                    style={{ display: display }}
                    onMouseLeave={() => setDisplay("none")}
                  >
                    <ul className="ulprofileinfo">
                      <li className="liprofileinfo">Profile</li>
                      <li className="liprofileinfo" onClick={() => Logout()}>
                        Logout
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
