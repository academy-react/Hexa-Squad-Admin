// ** React Imports
import { Fragment } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const PersianDatePicker = ({ setDatePicker, userInfo }) => {
  console.log("userInfo",userInfo.birthDay)
 // show Default Date
  // const defaultDate = userInfo.birthDay
  // const year = defaultDate && defaultDate.slice(0, 4)
  // const month = defaultDate && defaultDate.slice(5, 7)
  // const day = defaultDate && defaultDate.slice(8, 10)

  // console.log(`year=${year} month=${month} day=${day}`)

  return (
    <Fragment>
      <DatePicker
        // value={userInfo.birthDay}
        locale={persian_fa}
        onChange={setDatePicker}
        style={{
          width: "100%",
          background: "transparent",
          color: "#888",
          padding: "0.571rem 1rem",
          height: "40px",
        }}
        calendarPosition="bottom-center"
        format="YYYY/MM/DD"
        calendar={persian}
      />
    </Fragment>
  );
};

export default PersianDatePicker;