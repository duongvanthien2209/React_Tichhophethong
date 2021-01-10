/* eslint-disable no-plusplus */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import CuaHangForm from '../../CuaHang/CuaHangForm';

const NguoiDungTable = ({ users, onSearch, counter, changePage }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [user, setUser] = useState(null);

  const initialValues = {
    search: '',
  };

  const handleClick = (id) => {
    // debugger;
    const currentUsers = users.find((item) => item._id === id);
    if (!currentUsers) return console.log('Có lỗi xảy ra');
    setUser(() => ({ ...currentUsers }));
    toggle();
    return true;
  };

  const n = parseInt(counter.total / 20 + 1, 10);

  const arr = [];
  for (let i = 1; i <= n; i++) arr.push(i);

  return (
    <Card className="shadow mb-4">
      <CardHeader className="py-3 d-flex flex-column">
        <h6 className="m-0 font-weight-bold text-primary mb-3">
          Quản lý người dùng
        </h6>
        <div className="dataTables-filter w-50">
          {/* <Input type="search" size="sm" placeholder="Tìm kiếm" /> */}
          <CuaHangForm initialValues={initialValues} onSearch={onSearch} />
        </div>
      </CardHeader>

      {user && (
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Chi tiết người dùng</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Họ tên</Label>
                <Input type="text" value={user.fullName} disabled />
              </FormGroup>

              <FormGroup>
                <Label>Email</Label>
                <Input type="text" value={user.email} disabled />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => handleClick(user._id)}>
              Do Something
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      )}

      <CardBody>
        <Table responsive bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Ngày lập</th>
              <th>Cảnh cáo</th>
              <th>Khóa</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {users.map((currentUser, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{currentUser.fullName}</td>
                <td>{currentUser.email}</td>
                <td>{currentUser.SDT}</td>
                <td>{moment(currentUser.date).format('DD-MM-YYYY')}</td>
                <td>
                  <Button block color="success">
                    Báo cáo
                  </Button>
                </td>
                <td>
                  <Button block color="danger">
                    Khóa
                  </Button>
                </td>
                <td>
                  <Button
                    block
                    color="primary"
                    onClick={() => handleClick(currentUser._id)}
                  >
                    Xem
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Pagination className="d-flex justify-content-end">
          <PaginationItem disabled={counter.currentPage === 1}>
            <PaginationLink
              first
              href="#"
              onClick={(evt) => {
                evt.preventDefault();
                changePage(1);
              }}
            />
          </PaginationItem>
          <PaginationItem disabled={counter.currentPage === 1}>
            <PaginationLink
              previous
              href="#"
              onClick={(evt) => {
                evt.preventDefault();
                changePage(counter.currentPage - 1);
              }}
            />
          </PaginationItem>
          {arr.map((index) => (
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(evt) => {
                  evt.preventDefault();
                  changePage(index);
                }}
              >
                {index}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem disabled={counter.currentPage === n}>
            <PaginationLink
              next
              href="#"
              onClick={(evt) => {
                evt.preventDefault();
                changePage(counter.currentPage + 1);
              }}
            />
          </PaginationItem>
          <PaginationItem disabled={counter.currentPage === n}>
            <PaginationLink
              onClick={(evt) => {
                evt.preventDefault();
                changePage(n);
              }}
              last
              href="#"
            />
          </PaginationItem>
        </Pagination>
      </CardBody>
    </Card>
  );
};

NguoiDungTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSearch: PropTypes.func.isRequired,
  counter: PropTypes.object.isRequired,
  changePage: PropTypes.func.isRequired,
};

export default NguoiDungTable;
