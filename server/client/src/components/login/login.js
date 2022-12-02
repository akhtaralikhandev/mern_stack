import axios from "axios";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import "./login.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/features/user/userSlice";
import { useNavigate } from "react-router-dom";
const url = "http://localhost:5001/user/login";
const googleUserUrl = "http://localhost:5001/user/googleUser";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleUser, setGoogleUser] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate("");
  const status = useSelector((state) => state.user.active);
  const user2 = localStorage.getItem("profile");
  const handleCallbackResponse = async (response) => {
    console.log(
      "Encoded JWT ID token: + response.credential" + response.credential
    );
    var object = jwt_decode(response.credential);
    setGoogleUser(object);
    const resp = await axios.post(googleUserUrl, {
      name: object.name,
      email: object.email,
    });
    console.log(resp);
    dispatch(login(resp.data));
  };
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "1068479808298-9587lpmlu3bddopa7fh8kqmk0f2vc5pf.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  }, []);

  const Submit = async (e) => {
    e.preventDefault();
    if (email && password) {
      const resp = await axios.post(url, {
        email: email,
        password: password,
      });
      console.log(resp.statusText);
      if (resp.statusText === "OK") {
        dispatch(login(resp.data));
        console.log(status);
        console.log("dispatch is called");
      }

      setPassword("");
      setEmail("");
    } else {
      alert("plz enter all values");
    }
  };
  console.log(status);
  return (
    <div className="login">
      <div className="loginwrapper">
        <div className="toplogin">
          <button className="logintopleft">
            <Link className="link" to={"/signup"}>
              Sign Up
            </Link>
          </button>
          <button className="logintopright">Login</button>
        </div>
        <form className="loginform" onSubmit={(e) => Submit(e)}>
          <input
            type="text"
            placeholder="write email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="inputlogin"
          />
          <input
            type="text"
            placeholder="write password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="inputlogin"
          />
          <button className="loginsubmit" onSubmit={(e) => Submit(e)}>
            Submit
          </button>
          <div id="signInDiv"></div>
        </form>
      </div>{" "}
      {user2 ? navigate("/") : ""}
    </div>
  );
};
export default Login;
