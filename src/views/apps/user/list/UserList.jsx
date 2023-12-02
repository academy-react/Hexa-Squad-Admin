import React, {useEffect, useState} from "react";
import Select from "react-select";
import UserTable from "./UserTable";
import instance from "../../../../utility/interceptor";

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

  // get User List
  const [userList, setUserList] = useState([])

  const getUserList = async () => {
    try{
      const result = await instance.get("User/UserMannage?PageNumber=0&RowsOfPage=0&SortingCol=DESC&SortType=InsertDate&Query=&IsActiveUser=true&IsDeletedUser=true&roleId=3")
      console.log("result=",result)
      setUserList(result.listUser);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserList()
  }, []);
  console.log("userList=",userList)

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
            className=""
          />
        </div>
        <div className=" col-md-4" dir="rtl">
          <Select
            value={selectedOptions}
            placeholder={6}
            options={options}
            className=""
            onChange={handleChange}
          />
        </div>
      </div>
      
      <UserTable userList={userList} />
    </>
  );
}
export default UserList;