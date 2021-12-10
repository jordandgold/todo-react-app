interface ITodo {
  _id: string;
  name: string;
  description: string;
  status: boolean;
  projectId: string;
  createdAt?: string;
  updatedAt?: string;
}

interface TodoProps {
  todo: ITodo;
}

type TodoApiDataType = {
  message: string;
  status: string;
  todos: ITodo[];
  todo?: ITodo;
};

interface IProject {
  _id: string;
  name: string;
}

interface ProjectProps {
  project: IProject;
}

type ProjectApiDataType = {
  message: string;
  status: string;
  projects: IProject[];
  project?: IProject;
};
