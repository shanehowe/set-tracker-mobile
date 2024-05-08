import { Exercise } from "../types";
import axios from "axios";
import { token } from "./auth";
import { API_URL } from "./common";

const exerciseClient = axios.create({
  baseURL: `${API_URL}/exercises`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

exerciseClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const getAll = async () => {
  const response = await exerciseClient.get<Exercise[]>("/");
  return response.data;
};

const createCustom = async (exerciseName: string): Promise<Exercise> => {
  const response = await exerciseClient.post<Exercise>("/", {
    name: exerciseName,
  });
  return response.data;
};

const exerciseService = {
  getAll,
  createCustom,
};

export default exerciseService;
