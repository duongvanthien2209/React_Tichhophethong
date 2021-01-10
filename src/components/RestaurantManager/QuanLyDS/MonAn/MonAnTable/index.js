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

const MonAnTable = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <Card className="shadow mb-4">
      <CardHeader className="py-3 d-flex flex-column">
        <h6 className="m-0 font-weight-bold text-primary mb-3">
          Quản lý món ăn
        </h6>
        <div className="dataTables-filter w-50">
          <Input type="search" size="sm" placeholder="Tìm kiếm" />
          {/* <CuaHangForm initialValues={initialValues} onSearch={onSearch} /> */}
        </div>
      </CardHeader>

      {restaurant && (
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Chi tiết cửa hàng</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Tên nhà hàng</Label>
                <Input type="text" value={restaurant.tenNhaHang} disabled />
              </FormGroup>

              <FormGroup>
                <Label>Email</Label>
                <Input type="text" value={restaurant.email} disabled />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => handleClick(restaurant._id)}>
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
                <td>{currentRestaurant.tenNhaHang}</td>
                <td>{currentRestaurant.email}</td>
                <td>{currentRestaurant.SDT}</td>
                <td>
                  {moment(currentRestaurant.ngayLap).format('DD-MM-YYYY')}
                </td>
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

export default MonAnTable;
