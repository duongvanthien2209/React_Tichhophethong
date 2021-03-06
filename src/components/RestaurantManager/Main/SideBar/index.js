import React from 'react';

// import { Navbar } from 'reactstrap';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLaughWink,
  faTachometerAlt,
  faPizzaSlice,
  faComments,
  faStar,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const SideBar = () => (
  <ul
    className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    id="accordionSidebar"
  >
    <a
      className="sidebar-brand d-flex align-items-center justify-content-center"
      href="index.html"
    >
      <div className="sidebar-brand-icon rotate-n-15">
        {/* <i className="fas fa-laugh-wink" /> */}
        <FontAwesomeIcon className="fa-2x" icon={faLaughWink} />
      </div>
      <div className="sidebar-brand-text mx-3">SB Admin</div>
    </a>

    <hr className="sidebar-divider my-0" />

    <li className="nav-item">
      <Link className="nav-link" to="/restaurantManager/main/dashboard">
        <FontAwesomeIcon className="fa-fw mr-2" icon={faTachometerAlt} />
        <span>Dashboard</span>
      </Link>
    </li>

    <hr className="sidebar-divider" />

    <div className="sidebar-heading">Quản lý</div>

    <li className="nav-item">
      <Link className="nav-link" to="/restaurantManager/main/qlMonAn">
        <FontAwesomeIcon className="mr-2" icon={faPizzaSlice} />
        <span>Món ăn</span>
      </Link>
    </li>

    <li className="nav-item">
      <Link className="nav-link" to="/restaurantManager/main/qlBinhLuan">
        <FontAwesomeIcon className="mr-2" icon={faComments} />
        <span>Bình luận</span>
      </Link>
    </li>

    <li className="nav-item">
      <Link className="nav-link" to="/restaurantManager/main/qlDanhGia">
        <FontAwesomeIcon className="mr-2" icon={faStar} />
        <span>Đánh giá</span>
      </Link>
    </li>

    <li className="nav-item">
      <Link className="nav-link" to="/restaurantManager/main/qlHoaDon">
        <FontAwesomeIcon className="mr-2" icon={faWallet} />
        <span>Hóa đơn</span>
      </Link>
    </li>

    <hr className="sidebar-divider" />

    <div className="sidebar-heading">Thống kê</div>

    <li className="nav-item">
      <Link className="nav-link" to="/restaurantManager/main/thongKe">
        <FontAwesomeIcon className="mr-2" icon={faWallet} />
        <span>Hóa đơn</span>
      </Link>
    </li>

    {/* <li className="nav-item">
      <a
        className="nav-link collapsed"
        href="/"
        data-toggle="collapse"
        data-target="#collapseUtilities"
        aria-expanded="true"
        aria-controls="collapseUtilities"
      >
        <i className="fas fa-fw fa-wrench" />
        <span>Utilities</span>
      </a>
      <div
        id="collapseUtilities"
        className="collapse"
        aria-labelledby="headingUtilities"
        data-parent="#accordionSidebar"
      >
        <div className="bg-white py-2 collapse-inner rounded">
          <h6 className="collapse-header">Custom Utilities:</h6>
          <a className="collapse-item" href="utilities-color.html">
            Colors
          </a>
          <a className="collapse-item" href="utilities-border.html">
            Borders
          </a>
          <a className="collapse-item" href="utilities-animation.html">
            Animations
          </a>
          <a className="collapse-item" href="utilities-other.html">
            Other
          </a>
        </div>
      </div>
    </li>

    <hr className="sidebar-divider" />

    <div className="sidebar-heading">Addons</div>

    <li className="nav-item active">
      <a
        className="nav-link"
        href="/"
        data-toggle="collapse"
        data-target="#collapsePages"
        aria-expanded="true"
        aria-controls="collapsePages"
      >
        <i className="fas fa-fw fa-folder" />
        <span>Pages</span>
      </a>
      <div
        id="collapsePages"
        className="collapse show"
        aria-labelledby="headingPages"
        data-parent="#accordionSidebar"
      >
        <div className="bg-white py-2 collapse-inner rounded">
          <h6 className="collapse-header">Login Screens:</h6>
          <a className="collapse-item" href="login.html">
            Login
          </a>
          <a className="collapse-item" href="register.html">
            Register
          </a>
          <a className="collapse-item" href="forgot-password.html">
            Forgot Password
          </a>
          <div className="collapse-divider" />
          <h6 className="collapse-header">Other Pages:</h6>
          <a className="collapse-item" href="404.html">
            404 Page
          </a>
          <a className="collapse-item active" href="blank.html">
            Blank Page
          </a>
        </div>
      </div>
    </li>

    <li className="nav-item">
      <a className="nav-link" href="charts.html">
        <i className="fas fa-fw fa-chart-area" />
        <span>Charts</span>
      </a>
    </li>

    <li className="nav-item">
      <a className="nav-link" href="tables.html">
        <i className="fas fa-fw fa-table" />
        <span>Tables</span>
      </a>
    </li> 

    <hr className="sidebar-divider d-none d-md-block" />

    <div className="text-center d-none d-md-inline">
      <button
        className="rounded-circle border-0"
        id="sidebarToggle"
        type="button"
      >
        0
      </button>
    </div> */}
  </ul>
);

export default SideBar;
