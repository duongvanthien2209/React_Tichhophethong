/* eslint-disable no-plusplus */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
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
import { useSelector } from 'react-redux';
import CuaHangForm from '../CuaHangForm';
import CuaHangCTForm from '../CuaHangCTForm';

const CuaHangTable = ({ restaurants, onSearch, counter, changePage }) => {
  const [modal, setModal] = useState(false);
  const [restaurant, setRestaurant] = useState(null);
  const { restaurantTypes } = useSelector((state) => state.restaurantType);

  const toggle = () => setModal(!modal);

  const initialValues = {
    search: '',
  };

  const handleClick = (id) => {
    // debugger;
    const currentRestaurant = restaurants.find((item) => item._id === id);
    if (!currentRestaurant) return console.log('Có lỗi xảy ra');
    setRestaurant(() => ({ ...currentRestaurant }));
    toggle();
    return true;
  };

  const n = parseInt(counter.total / 20 + 1, 10);

  const arr = [];
  for (let i = 1; i <= n; i++) arr.push(i);

  // console.log(restaurant);

  return (
    <Card className="shadow mb-4">
      <CardHeader className="py-3 d-flex flex-column">
        <h6 className="m-0 font-weight-bold text-primary mb-3">
          Quản lý cửa hàng
        </h6>
        <div className="dataTables-filter w-50">
          {/* <Input type="search" size="sm" placeholder="Tìm kiếm" /> */}
          <CuaHangForm initialValues={initialValues} onSearch={onSearch} />
        </div>
      </CardHeader>

      {restaurant && (
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Chi tiết cửa hàng</ModalHeader>
          <ModalBody>
            {/* <Form>
              <FormGroup>
                <Label>Tên nhà hàng</Label>
                <Input type="text" value={restaurant.tenNhaHang} disabled />
              </FormGroup>

              <FormGroup>
                <Label>Email</Label>
                <Input type="text" value={restaurant.email} disabled />
              </FormGroup>
            </Form> */}
            <CuaHangCTForm
              initialValues={{
                name: restaurant.name,
                email: restaurant.email,
                sdt: restaurant.SDT,
                diaChi: restaurant.diaChi,
                loaiHinh: restaurant.loaiHinh,
              }}
              options={restaurantTypes.map((item) => ({
                label: item.name,
                value: item._id,
              }))}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={toggle}>
              Hủy
            </Button>
          </ModalFooter>
        </Modal>
      )}

      <CardBody>
        <Table responsive bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Tên Nhà Hàng</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Ngày Lập</th>
              <th>Vi Phạm</th>
              <th>Khóa</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((currentRestaurant, index) => (
              <tr>
                <td>{index + 1}</td>
                <td
                  className="text-truncate"
                  style={{ 'max-width': `${200}px` }}
                >
                  {currentRestaurant.name}
                </td>
                <td>{currentRestaurant.email}</td>
                <td>{currentRestaurant.SDT}</td>
                <td className="text-nowrap">
                  {moment(currentRestaurant.ngayLap).format('DD-MM-YYYY')}
                </td>
                <td>
                  <Button color="success">Báo cáo</Button>
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
                    onClick={() => handleClick(currentRestaurant._id)}
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

CuaHangTable.propTypes = {
  restaurants: PropTypes.array.isRequired,
  onSearch: PropTypes.func.isRequired,
  counter: PropTypes.object.isRequired,
  changePage: PropTypes.func.isRequired,
};

export default CuaHangTable;
