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

export const DEFAULT_PROJECT_DTO: IProject = {
  _id: "",
  name: "",
};

export function createProjectDTO(partial: Partial<IProject>): IProject {
  return {
    ...DEFAULT_PROJECT_DTO,
    ...partial,
  };
}
