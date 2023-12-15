import { Field } from "formik";

const FormikInput = ({
  addClass,
  name,
  children,
  placeholder,
  type,
  as,
  dir,
  defaultValue,
  labelClassName,
  inputClassName,
}) => {
  return (
    <div className={"d-flex flex-column gap-1 " + addClass}>
      <label htmlFor={name} className={labelClassName}>
        {children}
      </label>
      <Field
        dir={dir}
        as={as}
        name={name}
        id={name}
        type={type}
        defaultValue={defaultValue}
        className={"form-control " + inputClassName}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormikInput;
