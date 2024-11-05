import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../custom/axios";

export const getActivityLog = createAsyncThunk(
  "movies/getActivityLog",
  async (userId: string) => {
    try {
      const response: any = await axios.get(
        `${process.env.REACT_APP_API}/activity-log/get-activity-log/${userId}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addActivityLog = createAsyncThunk(
  "movies/addActivityLog",
  async (rawData: any) => {
    try {
      const response: any = await axios.post(
        `${process.env.REACT_APP_API}/activity-log/add-activity-log`,
        rawData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleleActivityLog = createAsyncThunk(
  "movies/deleleComment",
  async () => {
    try {
      const response: any = await axios.delete(
        `${process.env.REACT_APP_API}/activity-log/delete-activity-log`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
