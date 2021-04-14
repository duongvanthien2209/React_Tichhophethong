/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-plusplus */
import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';

const DanhGiaTable = ({ stars, counter, changePage, onDeleteClick }) => {
  const n = parseInt(counter.total / 20 + 1, 10);

  const arr = [];
  for (let i = 1; i <= n; i++) arr.push(i);

  return (
    <Card className="shadow mb-4">
      <CardHeader className="py-3 d-flex flex-column">
        <h6 className="m-0 font-weight-bold text-primary mb-3">
          Quản lý đánh giá
        </h6>
      </CardHeader>

      <CardBody>
        <Table responsive bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Người đánh giá</th>
              <th>Món ăn</th>
              <th>Số lượng</th>
              <th>Ngày giờ</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {stars.map((currentStar, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{currentStar.khachHang.fullName}</td>
                <td>{currentStar.monAn.tenMon}</td>
                <td>{currentStar.soLuong}</td>
                <td>
                  {moment(currentStar.dateCreate).format(
                    'DD-MM-YYYY, h:mm:ss a',
                  )}
                </td>
                <td>
                  <Button
                    block
                    color="danger"
                    onClick={() => onDeleteClick(currentStar._id)}
                  >
                    Xóa
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

DanhGiaTable.propTypes = {
  stars: PropTypes.array.isRequired,
  counter: PropTypes.object.isRequired,
  changePage: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default DanhGiaTable;
