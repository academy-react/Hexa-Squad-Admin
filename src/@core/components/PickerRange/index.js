// ** React Imports
import { Fragment, useState } from "react";
import DatePicker, { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

// ** Reactstrap Imports
import { Label } from "reactstrap";

// ** Third Party Components
// import Flatpickr from "react-flatpickr";
// console.log(getStyle);
const PickerRange = ({ picker, setDateRange }) => {
  // ** State
  return (
    <Fragment>
      <DatePicker
        value={picker}
        locale={persian_fa}
        onChange={setDateRange}
        style={{
          width: "100%",
          background: "transparent",
          color: "#888",
          padding: "0.571rem 1rem",
          height: "40px",
        }}
        // containerStyle={{width:"100%"}}
        calendarPosition="bottom-center"
        format="YYYY/MM/DD"
        calendar={persian}
        range
        dateSeparator=" تا "
      />
    </Fragment>
  );
};

export default PickerRange;
