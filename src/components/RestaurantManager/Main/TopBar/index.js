/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  // faBell,
  // faEnvelope,
  faUser,
  faCogs,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

import {
  // Button,
  Navbar,
  NavbarToggler,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  // Badge,
  // Button,
} from 'reactstrap';

// import { IMG_PROFILE, IMG_PROFILE1 } from 'constants/images';
// import imgProfile1 from 'assets/img/undraw_profile_1.svg';
// import imgProfile from 'assets/img/undraw_profile.svg';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getAllNotRead,
  updateReaded,
} from 'redux/Slices/RestaurantManager/mailSlide';
import { unwrapResult } from '@reduxjs/toolkit';
import MailMessage from './MailMessage';

const TopBar = () => {
  const dispatch = useDispatch();
  const { restaurantManager } = useSelector(
    (state) => state.restaurantManager_auth,
  );
  const { mailsNotRead } = useSelector(
    (state) => state['restaurantManager/mail'],
  );

  const fetchData = async () => {
    try {
      // console.log(counter);
      const actionResult = await dispatch(getAllNotRead());
      unwrapResult(actionResult); // Có unwrapResult mới bắt lỗi được
      // setTotal(() => currentTotal);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReaded = async (mailId) => {
    try {
      // console.log(counter);
      const actionResult = await dispatch(updateReaded(mailId));
      unwrapResult(actionResult); // Có unwrapResult mới bắt lỗi được
      // setTotal(() => currentTotal);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Navbar className="navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <NavbarToggler
        id="sidebarToggleTop"
        className="btn-link d-md-none rounded-circle mr-3"
      />

      <Nav className="ml-auto" navbar>
        {/* <!-- Nav Item - Alerts --> */}
        <MailMessage onRead={handleReaded} mailsNotRead={mailsNotRead} />

        {/* <!-- Nav Item - User Information --> */}
        <UncontrolledDropdown className="no-arrow mx-1" nav inNavbar>
          <DropdownToggle nav caret>
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              {restaurantManager.name}
            </span>
            <img
              className="img-profile rounded-circle"
              src={restaurantManager.hinh}
              alt=""
            />
          </DropdownToggle>
          <DropdownMenu
            className="dropdown-menu-right shadow animated--grow-in"
            right
          >
            <DropdownItem>
              <Link to="/restaurantManager/main/qlThongTin">
                <FontAwesomeIcon
                  className="fa-sm fa-fw mr-2 text-gray-400"
                  icon={faUser}
                />
                Thông tin
              </Link>
            </DropdownItem>

            <DropdownItem>
              <FontAwesomeIcon
                className="fa-sm fa-fw mr-2 text-gray-400"
                icon={faCogs}
              />
              Cài đặt
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              <FontAwesomeIcon
                className="fa-sm fa-fw mr-2 text-gray-400"
                icon={faSignOutAlt}
              />
              Đăng xuất
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </Navbar>
  );
};

export default TopBar;
