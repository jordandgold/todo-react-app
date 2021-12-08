import axios, { AxiosResponse } from "axios";

const baseUrl: string = "http://localhost:4000";

export const getProjects = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const projects: AxiosResponse<ApiDataType> = await axios.get(
      baseUrl + "/projects"
    );
    return projects;
  } catch (error) {
    throw new Error(error as string);
  }
};
