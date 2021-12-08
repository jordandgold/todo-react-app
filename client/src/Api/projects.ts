import axios, { AxiosResponse } from "axios";

export const getProjects = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const projects: AxiosResponse<ApiDataType> = await axios.get(
      process.env.BASE_API_URL + "/projects"
    );
    return projects;
  } catch (error) {
    throw new Error(error as string);
  }
};
