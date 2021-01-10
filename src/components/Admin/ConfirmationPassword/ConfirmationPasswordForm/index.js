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

const ConfirmationPasswordForm = ({ initialValues, onSubmit }) => {
  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .required('Bạn bắt buộc phải nhập mật khẩu.')
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự.'),
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
              name="password"
              type="password"
              component={InputField}
              className="form-control-user"
              placeholder="Enter Confirm Password..."
            />

            <Button className="btn-user" type="submit" color="primary" block>
              Reset Password
            </Button>
            <hr />
          </Form>
          <div className="text-center">
            <Link className="small" to="/">
              Login!
            </Link>
          </div>
        </div>
      )}
    </Formik>
  );
};

ConfirmationPasswordForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ConfirmationPasswordForm;
