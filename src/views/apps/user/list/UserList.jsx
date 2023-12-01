import React, {useState} from "react";
import Select from "react-select";
import UserTable from "./UserTable";

const UserList = () => {
  const options = [
    { value: 3, label: 3 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
    { value: 8, label: 8 },
    { value: 10, label: 10 },
  ];
  const [selectedOptions, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  // const filterSearch = (value) => {
  //   let filteredData = allData.filter((item) => {
  //     return item.title.toLowerCase().indexOf(value.toLowerCase()) != -1;
  //   });
  //   setData(filteredData);
  // };

  return (
    <>
      <div className="row container">
        <div className="col-md-8" style={{height: "150px"}}>
          <i className="bi bi-search position-absolute right-4 top-3 "></i>
          <input
            type="search"
            // onKeyUp={(event) => {
            //   filterSearch(event.target.value);
            // }}
            placeholder="... جستجوی دوره"
            className="bg-transparentPurple text-right px-10 w-[105%] h-[107%] absolute top-[-2px] right-[-2px]"
          />
        </div>
        <div className=" col-md-4" dir="rtl">
          <Select
            value={selectedOptions}
            placeholder={6}
            options={options}
            className="text-primary"
            onChange={handleChange}
          />
        </div>
      </div>
      
      <UserTable/>


      {/* <PaginationTable
        data={data}
        addIcon={addIcon}
        whishList={whishList}
        reserveCourses={reserveCourses}
        itemsPerPage={countInPage}
      /> */}
    </>
  );
}
export default UserList;