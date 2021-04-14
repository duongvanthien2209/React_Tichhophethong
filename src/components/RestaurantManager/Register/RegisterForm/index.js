/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import { FastField, Form, Formik } from 'formik';
import * as yup from 'yup';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import InputField from 'custom-fields/InputField';
import SelectField from 'custom-fields/SelectField';
import PropTypes from 'prop-types';

const RegisterForm = ({ initialValues, onSubmit, options }) => {
  const validationSchema = yup.object().shape({
    tenNhaHang: yup
      .string()
      .required('Bạn phải nhập tên cửa hàng.')
      .max(50, 'Tên cửa hàng không nhiều hơn 50 ký tự.'),
    email: yup
      .string()
      .required('Bạn phải nhập email.')
      .email('Bạn phải nhập đúng định dạng email.'),
    name: yup
      .string()
      .required('Bạn phải nhập tên chủ cửa hàng...')
      .min(3, 'Tên không được ít hơn 3 ký tự.')
      .max(30, 'Tên không được nhiều hơn 30 ký tự.'),
    password: yup
      .string()
      .required('Bạn phải nhập mật khẩu.')
      .min(8, 'Mật khẩu không được ít hơn 8 ký tự.'),
    sdt: yup
      .string()
      .required('Bạn phải nhập số điện thoại.')
      .min(9, 'Số điện thoại không ít hơn 9 chữ số.'),
    diaChi: yup.string().required('Bạn phải nhập địa chỉ.'),
    loaiHinh: yup.string().required('Bạn phải chọn loại hình cửa hàng.'),
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
              name="tenNhaHang"
              component={InputField}
              className="form-control-user"
              placeholder="Tên cửa hàng"
            />

            <FastField
              name="name"
              component={InputField}
              className="form-control-user"
              placeholder="Tên chủ cửa hàng"
            />

            {options.length !== 0 && (
              <FastField
                name="loaiHinh"
                component={SelectField}
                options={options}
                placeholder="Loại cửa hàng"
              />
            )}

            <FastField
              name="email"
              type="email"
              component={InputField}
              className="form-control-user"
              placeholder="Địa chỉ Email"
            />

            <FastField
              name="password"
              type="password"
              component={InputField}
              className="form-control-user"
              placeholder="Mật khẩu"
            />

            <FastField
              name="sdt"
              component={InputField}
              className="form-control-user"
              placeholder="Số điện thoại"
            />

            <FastField
              name="diaChi"
              component={InputField}
              className="form-control-user"
              placeholder="Địa chỉ"
            />

            <Button className="btn-user" type="submit" color="primary" block>
              Register
            </Button>
            {/* <hr />
            <Button className="btn-google btn-user" block>
              Register with Google
            </Button>
            <Button className="btn-facebook btn-user" block>
              Register with Facebook
            </Button> */}
          </Form>
          {/* <hr />
          <div className="text-center">
            <Link className="small" to="/">
              Forgot Password?
            </Link>
          </div>
          <div className="text-center">
            <Link className="small" to="/">
              Create an Account!
            </Link>
          </div> */}
        </div>
      )}
    </Formik>
  );
};

RegisterForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

// RegisterForm.defaultProps = {
//   initialValues: { name: '', password: '' },
// };

export default RegisterForm;
