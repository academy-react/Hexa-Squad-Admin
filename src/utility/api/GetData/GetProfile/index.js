import instance from "../../../interceptor";

export const getProfile = async () => {
  try {
    const response = await instance.get("/SharePanel/GetProfileInfo");
    return response;
  } catch (error) {
    return false;
  }
};
