/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import { FastField, Form, Formik } from 'formik';
import * as yup from 'yup';
import { Button } from 'reactstrap';
import InputField from 'custom-fields/InputField';
import PropTypes from 'prop-types';
import SelectField from 'custom-fields/SelectField';
// import Input from 'react-select/src/components/input';

const NguoiDungCTForm = ({ initialValues }) => (
  // const validationSchema = yup.object().shape({
  //   search: yup.string().required('Bạn phải nhập tên cần tìm...'),
  // });

  <Formik initialValues={initialValues}>
    {(formikProps) => (
      // const { values, errors, touched, isSubmitting } = formikProps;
      <Form>
        <FastField
          name="username"
          label="Tên đăng nhập"
          disabled
          component={InputField}
        />

        <FastField
          name="fullName"
          label="Họ tên"
          disabled
          component={InputField}
        />

        <FastField name="email" label="Email" disabled component={InputField} />

        <FastField
          name="ngaySinh"
          label="Ngày sinh"
          disabled
          component={InputField}
        />

        <FastField
          name="CMND"
          label="Chứng minh thư"
          disabled
          component={InputField}
        />

        <FastField
          name="gioiTinh"
          label="Phái"
          disabled
          component={InputField}
        />

        <FastField
          name="sdt"
          label="Số điện thoại"
          disabled
          component={InputField}
        />

        <FastField
          name="diaChi"
          label="Địa chỉ"
          disabled
          component={InputField}
        />

        {/* <Button className="mb-3 ml-2" type="submit" outline color="success">
            Tìm kiếm
          </Button> */}
      </Form>
    )}
  </Formik>
);
NguoiDungCTForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  // onSearch: PropTypes.func.isRequired,
  // options: PropTypes.array.isRequired,
};

// NguoiDungCTForm.defaultProps = {
//   initialValues: { name: '', password: '' },
// };

export default NguoiDungCTForm;
