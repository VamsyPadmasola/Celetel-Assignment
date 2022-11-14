import React from "react";
import { Link, NavLink, Route, Router, useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { MdPeople } from "react-icons/md";
import { BsCalendar4 } from "react-icons/bs";
import { FaUserNinja } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../hooks";
import Logo from "../Logo";

export default function Navbar() {
  const { handleLogout } = useAuth();
  const { pathname } = useLocation();

  return (
    <nav className="relative w-72 min-h-screen bg-primary">
      <div className="flex flex-col justify-between h-screen sticky top-0">
        <ul>
          <li className="mb-8">
            <Link to="/" className="flex items-center justify-center mt-5">
              <Logo />
            </Link>
          </li>
          <li>
            <NavItem to="/dashboard">
              <AiFillHome color={pathname == '/dashboard' ? "#ffffff" : "#757575"} size={20} />
              <span className={pathname == '/dashboard' ? "text-white" : "text-ternary"} >Home</span>
            </NavItem>
          </li>
          <li>
            <NavItem to="/matches">
              <MdPeople color={pathname == '/matches' ? "#ffffff" : "#757575"} size={20} />
              <span className="text-ternary" >Matches</span>
            </NavItem>
          </li>
          <li>
            <NavItem to="/managesources">
              <BsCalendar4 color={pathname == '/managesources' ? "#ffffff" : "#757575"} size={20} />
              <span className="text-ternary" >Manage Sources</span>
            </NavItem>
          </li>
          <li>
            <NavItem to="/integration">
              <BsCalendar4 color={pathname == '/integration' ? "#ffffff" : "#757575"} size={20} />
              <span className="text-ternary" >Integration</span>
            </NavItem>
          </li>
          <li>
            <NavItem to="/alerts">
              <BsCalendar4 color={pathname == '/alerts' ? "#ffffff" : "#757575"} size={20} />
              <span className="text-ternary" >Alerts</span>
            </NavItem>
          </li>
          {/* <li>
            <NavItem to="/actors">
              <img className="h-6" src="chef.png" />
              <span className="text-white">Chefs</span>
            </NavItem>
          </li>
          <li>
            <NavItem to="/actors">
              <img className="h-6" src="deliveryagent.png" />
              <span className="text-white">Delivery Agents</span>
            </NavItem>
          </li> */}
        </ul>

        <div className="flex flex-col items-start pb-5 pl-5">
          <button
            onClick={handleLogout}
            className="flex items-center text-ternary text-lg hover:text-highlight transition space-x-1"
          >
            <FiLogOut />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

const NavItem = ({ children, to }) => {
  const commonClasses =
    " flex items-center text-lg space-x-5 p-4 pl-5 ";
  return (
    <NavLink
      className={({ isActive }) =>
        (isActive ? " text-white bg-highlight " : "text-ternary bg-transparent") + commonClasses
      }
      to={to}
    >
      {children}
    </NavLink>
  );
};
