/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import { FastField, Form, Formik } from 'formik';
import * as yup from 'yup';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import InputField from 'custom-fields/InputField';
import Login from 'containers/Admin/Login';
import PropTypes from 'prop-types';

const LoginForm = ({ initialValues, onSubmit }) => {
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Bạn phải nhập tên...')
      .min(3, 'Tên không được ít hơn 3 ký tự.')
      .max(30, 'Tên không được nhiều hơn 30 ký tự.'),
    password: yup
      .string()
      .required('Bạn phải nhập mật khẩu.')
      .min(8, 'Mật khẩu không được ít hơn 8 ký tự.'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formikProps) => (
        // const { values, errors, touched, isSubmitting } = formikProps;
        <div>
          <Form className="user">
            <FastField
              name="name"
              component={InputField}
              className="form-control-user"
              placeholder="Enter name..."
            />

            <FastField
              name="password"
              type="password"
              component={InputField}
              className="form-control-user"
              placeholder="Password"
            />

            <Button className="btn-user" type="submit" color="primary" block>
              Login
            </Button>
            <hr />
            <Button className="btn-google btn-user" block>
              Login with Google
            </Button>
            <Button className="btn-facebook btn-user" block>
              Login with Facebook
            </Button>
          </Form>
          <hr />
          <div className="text-center">
            <Link className="small" to="/">
              Forgot Password?
            </Link>
          </div>
          <div className="text-center">
            <Link className="small" to="/">
              Create an Account!
            </Link>
          </div>
        </div>
      )}
    </Formik>
  );
};

LoginForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

// LoginForm.defaultProps = {
//   initialValues: { name: '', password: '' },
// };

export default LoginForm;
