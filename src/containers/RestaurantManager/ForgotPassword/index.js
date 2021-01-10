/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-debugger */
/* eslint-disable import/no-unresolved */
import React from 'react';

import { Card, CardBody, Col, Container, Row } from 'reactstrap';

// import { forgotPassword } from 'redux/Slices/Admin/Auth/authSlide';
import { forgotPassword } from 'redux/Slices/RestaurantManager/Auth/authSlide';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import ResetPasswordForm from 'components/Admin/ForgotPassword/ResetPasswordForm';
import cls from './index.module.scss';

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
  };

  const handleSubmit = async (values) => {
    // console.log(values);
    try {
      // debugger;
      const actionResult = await dispatch(forgotPassword(values));
      unwrapResult(actionResult); // Có unwrapResult mới bắt lỗi được
    } catch (error) {
      console.log(error.message);
    }
  };

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
                      Forgot Your Password?
                    </h1>
                    <p className="mb-4">
                      We get it, stuff happens. Just enter your email address
                      below and we'll send you a link to reset your password!
                    </p>
                  </div>
                  <ResetPasswordForm
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
export default ForgotPassword;
