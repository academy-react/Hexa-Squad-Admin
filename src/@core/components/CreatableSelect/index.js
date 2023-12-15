import { Fragment } from "react";
import CreatableSelect from "react-select/creatable";
import { Label } from "reactstrap";

const CreatableSelectComponent = ({
  onChange,
  options,
  children,
  defaultValue,
}) => {
  return (
    <Fragment>
      <Label className="form-label m-0 my-1">{children} </Label>
      <CreatableSelect
        // defaultValue={defaultValue}
        defaultInputValue={defaultValue}
        options={options}
        placeholder="لطفا انتخاب کنید"
        className="react-select "
        classNamePrefix="select"
        onChange={(e) => {
          onChange(e.value);
        }}
      />
    </Fragment>
  );
};

export default CreatableSelectComponent;
