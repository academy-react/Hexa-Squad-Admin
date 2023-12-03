import { Fragment } from "react";
import CreatableSelect from "react-select/creatable";
import { Label } from "reactstrap";

const CreatableSelectComponent = ({onChange,options,children}) => {
    
  return (
    <Fragment>
      <Label className="form-label m-0">{children} </Label>
      <CreatableSelect
        options={options}
        placeholder='لطفا انتخاب کنید'
        className="react-select z-3 position-relative"
        classNamePrefix="select"
        onChange={(e) => {
            onChange(e.value);
        }}
      />
    </Fragment>
  );
};

export default CreatableSelectComponent;
