/* eslint-disable no-undef */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import PropTypes from 'prop-types';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { ErrorMessage } from 'formik';

const InputField = (props) => {
  const { field, form, type, label, placeholder, disabled, className } = props;
  const { name } = field; // field: { name, value, onChange, onBlur }
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  // console.log(value);

  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}

      <Input
        className={className}
        type={type}
        id={name}
        {...field}
        placeholder={placeholder}
        disabled={disabled}
        invalid={showError}
      />

      {/* { showError && <FormFeedback>{errors[name]}</FormFeedback> } */}
      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
};

InputField.propTypes = {
  // Custom field phải có field và form
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  className: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

InputField.defaultProps = {
  className: '',
  type: 'text',
  label: '',
  placeholder: '',
  disabled: false,
};

export default InputField;
