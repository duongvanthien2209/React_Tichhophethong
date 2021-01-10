/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-debugger */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';

import { Card, CardBody, Col, Container, Row } from 'reactstrap';

// import { resetPassword } from 'redux/Slices/Admin/Auth/authSlide';
import { resetPassword } from 'redux/Slices/RestaurantManager/Auth/authSlide';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import ConfirmationPasswordForm from 'components/Admin/ConfirmationPassword/ConfirmationPasswordForm';
import { Redirect, useParams } from 'react-router-dom';
import cls from './index.module.scss';

const ConfirmationPassword = () => {
  const dispatch = useDispatch();
  const { resetToken } = useParams();

  const [isConfirmed, setIsConfirmed] = useState(false);

  const initialValues = {
    password: '',
  };

  const handleSubmit = async (values) => {
    // console.log(values);
    try {
      // debugger;
      const actionResult = await dispatch(
        resetPassword({ token: resetToken, data: values }),
      );
      unwrapResult(actionResult); // Có unwrapResult mới bắt lỗi được
      setIsConfirmed(() => true);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (isConfirmed)
    return <Redirect to={{ pathname: '/restaurantManager/login' }} />;

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
                    <h1 className="h4 text-gray-900 mb-2">
                      Confirmation Your Password?
                    </h1>
                    <p className="mb-4">
                      We get it, stuff happens. Just enter your email address
                      below and we'll send you a link to reset your password!
                    </p>
                  </div>
                  <ConfirmationPasswordForm
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
export default ConfirmationPassword;
