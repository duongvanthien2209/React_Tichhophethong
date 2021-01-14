/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import { FastField, Form, Formik } from 'formik';
import * as yup from 'yup';
import { Button, Input, Label, FormGroup } from 'reactstrap';
import InputField from 'custom-fields/InputField';
import PropTypes from 'prop-types';
import SelectField from 'custom-fields/SelectField';

const ThemMonForm = ({
  initialValues,
  onSearch,
  options,
  onSubmit,
  file,
  setFile,
}) => {
  const validationSchema = yup.object().shape({
    tenMon: yup.string().required('Bạn phải nhập tên món'),
    moTa: yup.string().required('Bạn phải nhập mô tả'),
    gia: yup.number().min(1, 'Bạn phải nhập giá'),
    loai: yup.string().required('Bạn phải chọn loại món ăn'),
    // hinhAnh: yup.object().nullable(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formikProps) => (
        <Form>
          <FastField
            name="tenMon"
            label="Tên món"
            component={InputField}
            // className="form-control-user"
            placeholder="Nhập tên món"
          />

          <FastField
            name="moTa"
            label="Mô tả"
            type="textarea"
            component={InputField}
            // className="form-control-user"
            placeholder="Nhập mô tả"
          />

          <FastField
            name="gia"
            label="Giá"
            type="number"
            component={InputField}
            // className="form-control-user"
            placeholder="Nhập giá"
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

          <FastField
            name="loai"
            label="Loại món ăn"
            options={options}
            component={SelectField}
            placeholder="Chọn loại thức ăn"
          />

          <div className="d-flex justify-content-end">
            <Button className="mb-3" type="reset" color="danger">
              Hủy
            </Button>
            <Button className="mb-3 ml-2" type="submit" color="success">
              Thêm món
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

ThemMonForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  file: PropTypes.object.isRequired,
  setFile: PropTypes.func.isRequired,
};

// ThemMonForm.defaultProps = {
//   initialValues: { name: '', password: '' },
// };

export default ThemMonForm;
