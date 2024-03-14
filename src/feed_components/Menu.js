import "./Menu.css";
import { useNavigate } from "react-router-dom";


function Menu() {
  const navigate = useNavigate();

const friendsPageTaker = () => {
  navigate("/FriendsPage");
};

  return (
    <div className="menu">
      <a href="#" className="menu-item" onClick={friendsPageTaker}>
        <i className="bi bi-person-circle"></i>
        <span>Friends</span>
      </a>
      <a href="#" className="menu-item">
        <i className="bi bi-clock-history"></i>
        <span>Memories</span>
      </a>
      <a href="#" className="menu-item">
        <i className="bi bi-bookmark-fill"></i>
        <span>Saved</span>
      </a>
      <a href="#" className="menu-item">
        <i className="bi bi-person-video"></i>
        <span>Groups</span>
      </a>
      <a href="#" className="menu-item">
        <i className="bi bi-shop-window"></i>
        <span>Marketplace</span>
      </a>
      <a href="#" className="menu-item">
        <i className="bi bi-clipboard-data"></i>
        <span>Ads Manager</span>
      </a>
    </div>
  );
}

export default Menu;
