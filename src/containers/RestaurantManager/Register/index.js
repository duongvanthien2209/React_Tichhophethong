/* eslint-disable no-underscore-dangle */
/* eslint-disable no-debugger */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';

import { Card, CardBody, Col, Container, Row } from 'reactstrap';

import { getAll } from 'redux/Slices/restaurantTypeSlide';
import { register } from 'redux/Slices/RestaurantManager/Auth/authSlide';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import RegisterForm from 'components/RestaurantManager/Register/RegisterForm';
import { Redirect } from 'react-router-dom';
import cls from './index.module.scss';

const Register = () => {
  const dispatch = useDispatch();
  const { restaurantTypes } = useSelector((state) => state.restaurantType);
  // console.log(restaurantTypes);

  const [isRegisted, setIsRegisted] = useState(false);

  const fetchData = async () => {
    try {
      const actionResult = await dispatch(getAll());
      unwrapResult(actionResult); // Có unwrapResult mới bắt lỗi được
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const initialValues = {
    tenNhaHang: '',
    email: '',
    name: '',
    password: '',
    sdt: '',
    diaChi: '',
    loaiHinh: '',
  };

  const handleSubmit = async (values) => {
    // console.log(values);
    try {
      // debugger;
      const actionResult = await dispatch(register(values));
      unwrapResult(actionResult); // Có unwrapResult mới bắt lỗi được
      setIsRegisted(() => true);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (isRegisted)
    return <Redirect to={{ pathname: '/restaurantManager/login' }} />;

  return (
    // const [text, setText] = useState('');
    <div className={cls['container-wrap']}>
      <Container>
        <Card className="o-hidden border-0 shadow-lg my-5">
          <CardBody className="p-0">
            <Row>
              <Col lg="5" className="d-none d-lg-block bg-register-image" />
              <Col lg="7">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">
                      Create an Account!
                    </h1>
                  </div>
                  <RegisterForm
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    options={restaurantTypes.map((item) => ({
                      label: item.name,
                      value: item._id,
                    }))}
                  />
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};
export default Register;
