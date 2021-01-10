/* eslint-disable no-debugger */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';

import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import LoginForm from 'components/Admin/Login/LoginForm';

import { login } from 'redux/Slices/Admin/Auth/authSlide';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { Redirect } from 'react-router-dom';
import cls from './index.module.scss';

const Login = () => {
  const dispatch = useDispatch();
  const [isLogined, setIsLogined] = useState(false);

  const initialValues = {
    name: '',
    password: '',
  };

  const handleSubmit = async (values) => {
    // console.log(values);
    try {
      // debugger;
      const actionResult = await dispatch(login(values));
      unwrapResult(actionResult); // Có unwrapResult mới bắt lỗi được
      setIsLogined(() => true);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (isLogined) return <Redirect to={{ pathname: '/admin/main' }} />;

  return (
    // const [text, setText] = useState('');
    <div className={cls['container-wrap']}>
      <Container>
        <Card className="o-hidden border-0 shadow-lg my-5">
          <CardBody className="p-0">
            <Row>
              <Col lg="6" className="d-none d-lg-block bg-login-image" />
              <Col lg="6">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                  </div>
                  <LoginForm
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
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
export default Login;
