/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-plusplus */
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
import MonAnForm from '../MonAnForm';
import ThemMonForm from '../ThemMonForm';

const MonAnTable = ({
  foods,
  onSearch,
  counter,
  changePage,
  options,
  onSubmit,
  onUpdate,
  onDelete,
  file,
  setFile,
}) => {
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [isUpdateMode, setUpdateMode] = useState(false);
  const [food, setFood] = useState(null);

  const toggle = () => setModal(!modal);
  const toggle1 = () => setModal1(!modal1);

  const initialValues = {
    search: '',
  };

  const initialValues1 = {
    tenMon: '',
    moTa: '',
    // hinhAnh: null,
    gia: 0,
    loai: '',
  };

  // console.log(food);

  const handleSubmit = async (values) => {
    await onSubmit(values);
    toggle1();
  };

  const handleUpdate = async (values) => {
    // console.log(values);
    // debugger;
    try {
      if (!food) throw new Error('Có lỗi xảy ra');
      await onUpdate(food._id, values);
      return toggle1();
    } catch (error) {
      return console.log(error);
    }
  };

  const handleClick = (id) => {
    // debugger;
    const currentFood = foods.find((item) => item._id === id);
    if (!currentFood) return console.log('Có lỗi xảy ra');
    // console.log(currentFood);
    setFood(() => ({ ...currentFood }));
    toggle1();
    return true;
  };

  const n = parseInt(counter.total / 20 + 1, 10);

  const arr = [];
  for (let i = 1; i <= n; i++) arr.push(i);

  return (
    <Card className="shadow mb-4">
      <CardHeader className="py-3 d-flex flex-column">
        <h6 className="m-0 font-weight-bold text-primary mb-3">
          Quản lý món ăn
        </h6>
        <div className="dataTables-filter d-flex justify-content-between align-items-center">
          {/* <Input type="search" size="sm" placeholder="Tìm kiếm" /> */}
          <MonAnForm initialValues={initialValues} onSearch={onSearch} />
          <Button
            outline
            color="primary"
            onClick={() => {
              setUpdateMode(() => false);
              toggle1();
            }}
          >
            Thêm món
          </Button>

          <Modal isOpen={modal1} toggle={toggle1}>
            <ModalHeader toggle={toggle1}>
              {isUpdateMode ? 'Xem chi tiết' : 'Thêm món'}
            </ModalHeader>
            <ModalBody>
              <ThemMonForm
                onSubmit={isUpdateMode ? handleUpdate : handleSubmit}
                initialValues={
                  isUpdateMode && food
                    ? {
                        tenMon: food.tenMon,
                        moTa: food.moTa,
                        gia: food.gia,
                        loai: food.loai._id,
                      }
                    : initialValues1
                }
                options={options}
                file={file}
                setFile={setFile}
              />
            </ModalBody>
          </Modal>
        </div>
      </CardHeader>

      {food && (
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Chi tiết cửa hàng</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Tên nhà hàng</Label>
                <Input type="text" value={food.tenNhaHang} disabled />
              </FormGroup>

              <FormGroup>
                <Label>Email</Label>
                <Input type="text" value={food.email} disabled />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => handleClick(food._id)}>
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
              <th>Tên món</th>
              <th>Mô tả</th>
              <th>Giá</th>
              <th>Loại</th>
              <th>Ngày tạo</th>
              <th>Xóa</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((currentFood, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{currentFood.tenMon}</td>
                <td
                  className="text-truncate"
                  style={{ 'max-width': `${200}px` }}
                >
                  {currentFood.moTa}
                </td>
                <td>{currentFood.gia}</td>
                <td>{currentFood.loai.tenLoai}</td>
                <td>{moment(currentFood.dateCreate).format('DD-MM-YYYY')}</td>
                <td>
                  <Button
                    block
                    color="danger"
                    onClick={() => onDelete(currentFood._id)}
                  >
                    Xóa
                  </Button>
                </td>
                <td>
                  <Button
                    block
                    color="primary"
                    onClick={() => {
                      handleClick(currentFood._id);
                      setUpdateMode(() => true);
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

MonAnTable.propTypes = {
  foods: PropTypes.array.isRequired,
  onSearch: PropTypes.func.isRequired,
  counter: PropTypes.object.isRequired,
  changePage: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  file: PropTypes.object.isRequired,
  setFile: PropTypes.func.isRequired,
};

export default MonAnTable;
