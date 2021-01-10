/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import { FastField, Form, Formik } from 'formik';
import * as yup from 'yup';
import { Button } from 'reactstrap';
import InputField from 'custom-fields/InputField';
import PropTypes from 'prop-types';

const CuaHangForm = ({ initialValues, onSearch }) => {
  const validationSchema = yup.object().shape({
    search: yup.string().required('Bạn phải nhập tên cần tìm...'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSearch}
    >
      {(formikProps) => (
        // const { values, errors, touched, isSubmitting } = formikProps;
        <Form className="d-flex align-items-center mt-2">
          <FastField
            name="search"
            component={InputField}
            // className="form-control-user"
            placeholder="Nhập tên cần tìm"
          />

          <Button className="mb-3 ml-2" type="submit" outline color="success">
            Tìm kiếm
          </Button>
        </Form>
      )}
    </Formik>
  );
};

CuaHangForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
};

// CuaHangForm.defaultProps = {
//   initialValues: { name: '', password: '' },
// };

export default CuaHangForm;
