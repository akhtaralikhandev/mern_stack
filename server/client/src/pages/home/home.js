import { useSelector } from "react-redux";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { Postform2 } from "../../components/postForm/postForm.js";
import Navbar from "../../components/navbar/navbar";
import Posts from "../../components/post/post";
import Login from "../../components/login/login";

// import { Postform } from "../../components/postForm/postForm.js";
const Home = () => {
  const user = useSelector((state) => state.user.profile);
  const user2 = JSON.parse(localStorage.getItem("profile"));

  const navigate = useNavigate();
  
  if (user2) {
    return (
      <div className="home">
        <div className="homewrapper">
          <div className="homenavbar">
            <Navbar />
          </div>
          <div className="homePostForm">
            <Postform2 />
          </div>
          <div className="homePost">
            <Posts />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <Login />
      </>
    );
  }
};
export default Home;
