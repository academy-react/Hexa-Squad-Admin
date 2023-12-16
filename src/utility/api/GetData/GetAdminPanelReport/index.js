import { useState } from "react";
import instance from "../../../interceptor";

export const getAdminPanelReport = async (setData) => {
    try {
    const response = await instance.get("/Report/DashboardReport");
    setData(response);
  } catch (error) {
    return false;
  }
};