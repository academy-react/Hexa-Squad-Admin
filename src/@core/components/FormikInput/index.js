import { Field } from "formik";

const FormikInput = ({ addClass, name, label, placeholder, type, as, dir }) => {
  return (
    <div className={"d-flex flex-column gap-1 " + addClass}>
      <label htmlFor={name}>{label}</label>
      <Field
        dir={dir}
        as={as}
        name={name}
        id={name}
        type={type}
        className="form-control"
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormikInput;
