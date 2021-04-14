/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as yup from 'yup';
import { FastField, Form, Formik } from 'formik';
import InputField from 'custom-fields/InputField';
import SelectField from 'custom-fields/SelectField';

const ThongTinForm = ({ initialValues, onSubmit, options, file, setFile }) => {
  console.log('options1', options);
  // const [modal, setModal] = useState(false);
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required('Bạn phải nhập email.')
      .email('Bạn phải nhập đúng định dạng email.'),
    name: yup
      .string()
      .required('Bạn phải nhập tên chủ cửa hàng...')
      .min(3, 'Tên không được ít hơn 3 ký tự.')
      .max(50, 'Tên không được nhiều hơn 30 ký tự.'),
    // password: yup
    //   .string()
    //   .required('Bạn phải nhập mật khẩu.')
    //   .min(8, 'Mật khẩu không được ít hơn 8 ký tự.'),
    sdt: yup
      .string()
      .required('Bạn phải nhập số điện thoại.')
      .min(9, 'Số điện thoại không ít hơn 9 chữ số.'),
    diaChi: yup.string().required('Bạn phải nhập địa chỉ.'),
    loaiHinh: yup.string().required('Bạn phải chọn loại hình cửa hàng.'),
  });

  return (
    <Card className="shadow mb-4">
      <CardHeader className="py-3 d-flex flex-column">
        <h6 className="m-0 font-weight-bold text-primary mb-3">
          Quản lý thông tin
        </h6>
      </CardHeader>

      <CardBody>
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
                  label="Tên nhà hàng"
                  component={InputField}
                  className="form-control"
                  placeholder="Tên nhà hàng"
                />

                <FastField
                  name="email"
                  label="Email"
                  component={InputField}
                  className="form-control"
                  placeholder="Địa chỉ email"
                />

                {options.length !== 0 && (
                  <FastField
                    name="loaiHinh"
                    label="Loại nhà hàng"
                    component={SelectField}
                    options={options}
                    // options={[
                    //   { label: 'Nhà hàng', value: '60090e69acf4630017750a5a' },
                    //   { label: 'Quán ăn', value: '60090e6cacf4630017750a5b' },
                    //   {
                    //     label: 'Quán Coffee',
                    //     value: '60090e6dacf4630017750a5c',
                    //   },
                    //   {
                    //     label: 'Shop Online',
                    //     value: '60090e6dacf4630017750a5d',
                    //   },
                    //   { label: 'Bakery', value: '60090e6dacf4630017750a5e' },
                    // ]}
                    placeholder="Loại cửa hàng"
                  />
                )}

                <FastField
                  name="sdt"
                  label="Số điện thoại"
                  component={InputField}
                  className="form-control"
                  placeholder="Số điện thoại"
                />

                <FastField
                  name="diaChi"
                  label="Địa chỉ"
                  component={InputField}
                  className="form-control"
                  placeholder="Địa chỉ"
                />

                <FormGroup>
                  <Label for="file">Hình ảnh</Label>
                  <Input
                    id="file"
                    type="file"
                    // value={file}
                    onChange={(evt) => setFile(evt.target.files[0])}
                    placeholder="Chọn ảnh"
                  />
                </FormGroup>

                <Button
                  className="btn-user"
                  type="submit"
                  color="primary"
                  block
                >
                  Cập nhật
                </Button>
              </Form>
            </div>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};

ThongTinForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  options: PropTypes.array,
  file: PropTypes.object.isRequired,
  setFile: PropTypes.func.isRequired,
};

ThongTinForm.defaultProps = {
  options: [],
};

export default ThongTinForm;
