import axios, { AxiosResponse } from "axios";

export const getProjects = async (): Promise<
  AxiosResponse<ProjectApiDataType>
> => {
  try {
    const projects: AxiosResponse<ProjectApiDataType> = await axios.get(
      process.env.REACT_APP_API_BASE_URL + "/projects/get"
    );
    return projects;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const addProject = async (
  formData: IProject
): Promise<AxiosResponse<ProjectApiDataType>> => {
  try {
    const project: Omit<IProject, "_id"> = {
      name: formData.name,
    };
    const saveProject: AxiosResponse<ProjectApiDataType> = await axios.post(
      process.env.REACT_APP_API_BASE_URL + "/projects/add",
      project
    );
    return saveProject;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const deleteProject = async (
  _id: string
): Promise<AxiosResponse<ProjectApiDataType>> => {
  try {
    const deletedProject: AxiosResponse<ProjectApiDataType> =
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/projects/delete/${_id}`
      );
    return deletedProject;
  } catch (error) {
    throw new Error(error as string);
  }
};
