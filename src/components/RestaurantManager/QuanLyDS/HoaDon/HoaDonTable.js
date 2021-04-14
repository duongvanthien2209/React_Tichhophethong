/* eslint-disable no-empty */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal,
  Input,
} from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  getCTBillApi,
  deleteCTBillApi,
  updateBillApi,
} from 'api/RestaurantManger/billApi';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const HoaDonTable = ({
  bills,
  counter,
  changePage,
  onUpdateCTBill,
  updateStatusBill,
}) => {
  const [modal, setModal] = useState(false);
  const [ctBills, setctBills] = useState([]);

  const [text, setText] = useState('');

  // Tổng tiền của từng hóa đơn
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // console.log(total);
    setTotal(() =>
      ctBills.reduce(
        (item1, item2) => item1 + item2.monAn.gia * item2.soLuong,
        0,
      ),
    );
  }, [ctBills]);

  const toggle = () => setModal(!modal);

  const n = parseInt(counter.total / 20 + 1, 10);

  const handleClick = async (id) => {
    // debugger;
    try {
      const { status, error, data } = await getCTBillApi(id);

      // debugger;

      if (status === 'failed' && error) throw new Error(error.message);

      if (status === 'success' && data) {
        const { CTBills } = data;
        setctBills(() => [...CTBills.map((item) => ({ ...item }))]);
        toggle();
      }

      return true;
    } catch (error) {
      return console.log(error.message);
    }
  };

  const handleChangeInput = (value, ctBillId) => {
    // console.log(typeof evt.target.value);
    if (!value) {
      // console.log(ctBillId);
      setText(() => ctBillId);
    } else {
      const item = ctBills.find((currentItem) => currentItem._id === ctBillId);
      const index = ctBills.indexOf(item);

      setctBills(() => [
        ...ctBills.slice(0, index),
        { ...item, soLuong: parseInt(value, 10) },
        ...ctBills.slice(index + 1),
      ]);

      setText(() => '');
    }
  };

  const handleDelete = async (ctBill) => {
    try {
      const { status, error, data } = await deleteCTBillApi(ctBill._id);

      // debugger;

      if (status === 'failed' && error) throw new Error(error.message);

      if (status === 'success' && data) {
        const index = ctBills.indexOf(ctBill);

        setctBills(() => [...ctBills.splice(index, 1)]);
      }

      return true;
    } catch (error) {
      return console.log(error.message);
    }
  };

  const handleUpdateClick = async (billId) => {
    await onUpdateCTBill(billId, [
      ...ctBills.map((item) => ({ id: item._id, soLuong: item.soLuong })),
    ]);
    toggle();
  };

  const arr = [];
  for (let i = 1; i <= n; i++) arr.push(i);

  // console.log('Render');

  return (
    <Card className="shadow mb-4">
      <CardHeader className="py-3 d-flex flex-column">
        <h6 className="m-0 font-weight-bold text-primary mb-3">
          Quản lý hóa đơn
        </h6>
      </CardHeader>

      {ctBills && (
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Chi tiết hóa đơn</ModalHeader>
          <ModalBody>
            <Table responsive bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Món ăn</th>
                  <th>Số lượng</th>
                  <th>Xóa</th>
                </tr>
              </thead>
              <tbody>
                {ctBills.map((currentCtBill, index) => (
                  // console.log(curentBill.khachHang);
                  <tr>
                    <td>{index + 1}</td>
                    <td>{currentCtBill.monAn.tenMon}</td>
                    <td>
                      <Input
                        type="number"
                        name="soLuong"
                        value={
                          text
                            ? currentCtBill._id === text
                              ? ''
                              : currentCtBill.soLuong
                            : currentCtBill.soLuong
                        }
                        onChange={(evt) =>
                          handleChangeInput(evt.target.value, currentCtBill._id)
                        }
                      />
                    </td>
                    <td>
                      <Button
                        block
                        color="danger"
                        onClick={() => handleDelete(currentCtBill)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <p>
              Tổng tiền: <span className="text-success">{`${total} VNĐ`}</span>
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => handleUpdateClick(ctBills[0].hoaDon)}
            >
              Cập nhật
            </Button>
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
              <th>Khách hàng</th>
              <th>Trạng thái</th>
              <th>Ngày giờ</th>
              <th>Tổng tiền</th>
              <th>Xác nhận</th>
              <th>Hủy</th>
              <th>Thanh toán</th>
              <th>Xem</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((curentBill, index) => (
              // console.log(curentBill.khachHang);
              <tr>
                <td>{index + 1}</td>
                <td>{curentBill.khachHang.fullName}</td>
                <td className="text-danger font-weight-bold">
                  {curentBill.isCompleted}
                </td>
                <td>
                  {moment(curentBill.dateCreate).format(
                    'DD-MM-YYYY, h:mm:ss a',
                  )}
                </td>
                <td>{`${curentBill.total} VNĐ`}</td>
                <td>
                  <Button
                    disabled={curentBill.isCompleted === 'đã xác nhận'}
                    block
                    color="primary"
                    onClick={() =>
                      updateStatusBill(curentBill._id, 'đã xác nhận')
                    }
                  >
                    Xác nhận
                  </Button>
                </td>
                <td>
                  <Button
                    disabled={curentBill.isCompleted === 'đã hủy'}
                    block
                    color="danger"
                    onClick={() => updateStatusBill(curentBill._id, 'đã hủy')}
                  >
                    Hủy
                  </Button>
                </td>
                <td>
                  <Button
                    disabled={curentBill.isCompleted === 'đã thanh toán'}
                    block
                    color="success"
                    onClick={() =>
                      updateStatusBill(curentBill._id, 'đã thanh toán')
                    }
                  >
                    Thanh toán
                  </Button>
                </td>
                <td>
                  <Button
                    block
                    color="primary"
                    onClick={() => {
                      handleClick(curentBill._id);
                    }}
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

HoaDonTable.propTypes = {
  bills: PropTypes.array.isRequired,
  counter: PropTypes.object.isRequired,
  changePage: PropTypes.func.isRequired,
  onUpdateCTBill: PropTypes.func.isRequired,
  updateStatusBill: PropTypes.func.isRequired,
  // onDeleteClick: PropTypes.func.isRequired,
};

export default HoaDonTable;
