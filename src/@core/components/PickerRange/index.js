// ** React Imports
import { Fragment } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const PickerRange = ({ picker, setDateRange }) => {
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
