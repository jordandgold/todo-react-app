import * as todosApi from "./todos/todos";
import * as projectsApi from "./projects/projects";

const Api = {
  ...todosApi,
  ...projectsApi,
};

export default Api;
