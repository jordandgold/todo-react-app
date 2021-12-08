import axios, { AxiosResponse } from "axios";

export const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todos: AxiosResponse<ApiDataType> = await axios.get(
      process.env.BASE_API_URL + "/todos/get"
    );
    return todos;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const addTodo = async (
  formData: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todo: Omit<ITodo, "_id"> = {
      name: formData.name,
      description: formData.description,
      status: false,
    };
    const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
      process.env.BASE_API_URL + "/todos/add",
      todo
    );
    return saveTodo;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const updateTodo = async (
  todo: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todoUpdate: Pick<ITodo, "status"> = {
      status: !todo.status,
    };
    const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(
      `${process.env.BASE_API_URL}/todos/edit/${todo._id}`,
      todoUpdate
    );
    return updatedTodo;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const deleteTodo = async (
  _id: string
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
      `${process.env.BASE_API_URL}/todos/delete/${_id}`
    );
    return deletedTodo;
  } catch (error) {
    throw new Error(error as string);
  }
};
