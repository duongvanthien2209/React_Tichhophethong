/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-unresolved */
import React from 'react';

import {
  // Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  // Button,
} from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// import imgProfile1 from 'assets/img/undraw_profile_1.svg';

const MailMessage = ({ mailsNotRead, onRead }) => (
  <UncontrolledDropdown className="no-arrow mx-1" nav inNavbar>
    <DropdownToggle nav caret>
      <FontAwesomeIcon id="alertsDropdown" className="fa-lg" icon={faBell} />
      {/* <span className="badge badge-danger badge-counter">3+</span> */}
      <Badge color="danger" className="badge-counter">
        {mailsNotRead.length}
      </Badge>
    </DropdownToggle>
    <DropdownMenu
      className="dropdown-list dropdown-menu-right shadow animated--grow-in"
      right
    >
      <DropdownItem header>Alerts Center</DropdownItem>
      {mailsNotRead.map((mail) => (
        <DropdownItem className="d-flex align-items-center">
          <div className="mr-3">
            <div className="icon-circle bg-primary">
              <i className="fas fa-file-alt text-white" />
            </div>
          </div>
          <div className="d-flex align-items-center">
            <div>
              <div className="small text-gray-500">
                {moment(mail.dateCreate).fromNow()}
              </div>
              <span className="font-weight-bold">{mail.text}</span>
            </div>
            <a
              href="/"
              onClick={(evt) => {
                evt.preventDefault();
                onRead(mail._id);
              }}
            >
              <FontAwesomeIcon
                // color="danger"
                className="fa-2x"
                icon={faTrashAlt}
              />
            </a>
          </div>
        </DropdownItem>
      ))}
      <DropdownItem className="text-center small text-gray-500">
        Show All Alerts
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
);

MailMessage.propTypes = {
  mailsNotRead: PropTypes.array.isRequired,
  onRead: PropTypes.func.isRequired,
};

export default MailMessage;
