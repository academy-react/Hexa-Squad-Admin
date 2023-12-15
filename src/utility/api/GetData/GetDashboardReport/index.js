import instance from "../../../interceptor";

const GetDashboardReport = async () => {
  try {
    const result = await instance.get('Report/DashboardReport');
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export default GetDashboardReport;
