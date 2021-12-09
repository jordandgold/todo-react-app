import axios, { AxiosResponse } from "axios";

export const getTodos = async (): Promise<AxiosResponse<TodoApiDataType>> => {
  try {
    const todos: AxiosResponse<TodoApiDataType> = await axios.get(
      process.env.REACT_APP_API_BASE_URL + "/todos/get"
    );
    return todos;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const addTodo = async (
  formData: ITodo
): Promise<AxiosResponse<TodoApiDataType>> => {
  try {
    const todo: Omit<ITodo, "_id"> = {
      name: formData.name,
      description: formData.description,
      status: false,
    };
    const saveTodo: AxiosResponse<TodoApiDataType> = await axios.post(
      process.env.REACT_APP_API_BASE_URL + "/todos/add",
      todo
    );
    return saveTodo;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const updateTodo = async (
  todo: ITodo
): Promise<AxiosResponse<TodoApiDataType>> => {
  try {
    const todoUpdate: Pick<ITodo, "status"> = {
      status: !todo.status,
    };
    const updatedTodo: AxiosResponse<TodoApiDataType> = await axios.put(
      `${process.env.REACT_APP_API_BASE_URL}/todos/edit/${todo._id}`,
      todoUpdate
    );
    return updatedTodo;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const deleteTodo = async (
  _id: string
): Promise<AxiosResponse<TodoApiDataType>> => {
  try {
    const deletedTodo: AxiosResponse<TodoApiDataType> = await axios.delete(
      `${process.env.REACT_APP_API_BASE_URL}/todos/delete/${_id}`
    );
    return deletedTodo;
  } catch (error) {
    throw new Error(error as string);
  }
};
