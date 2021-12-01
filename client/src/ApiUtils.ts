export const DEFAULT_TODO_DTO: ITodo = {
  _id: "",
  name: "",
  description: "",
  status: false,
  createdAt: "",
  updatedAt: "",
};

export function createTodoDTO(partial: Partial<ITodo>): ITodo {
  return {
    ...DEFAULT_TODO_DTO,
    ...partial,
  };
}
