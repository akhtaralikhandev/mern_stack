import "./signup.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const url = "http://localhost:5001/user/signup";
const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Submit = async (e) => {
    e.preventDefault();
    if (firstName && lastName && password && email) {
      await axios.post(url, {
        firstName: firstName,
        lastName: lastName,
        password: password,
        email: email,
      });
      let data = [firstName, lastName, password, email];
      console.log(data);
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
    } else {
      alert("plz enter all values");
    }
  };
  return (
    <div className="signup">
      <div className="wrapper_signup">
        <div className="top_signup">
          <button className="button_signup">Sign Up</button>
          <button className="button_login">
            <Link className="link2" to={"/login"}>
              Login
            </Link>
          </button>
        </div>
        <div className="span_signup">Sign Up For Free</div>
        <form className="form_signup">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="firstName"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="lastName"
          />
          <input
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            placeholder="Set A Password"
            className="password"
          />
        </form>
        <button className="button_submit" onClick={(e) => Submit(e)}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Signup;
