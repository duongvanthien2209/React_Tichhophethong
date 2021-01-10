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

const ResetPasswordForm = ({ initialValues, onSubmit }) => {
  const validationSchema = yup.object().shape({
    email: yup.string().email('Bạn phải nhập đúng định dạng email.'),
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
              name="email"
              component={InputField}
              className="form-control-user"
              placeholder="Enter Email Address..."
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

ResetPasswordForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

// LoginForm.defaultProps = {
//   initialValues: { name: '', password: '' },
// };

export default ResetPasswordForm;
