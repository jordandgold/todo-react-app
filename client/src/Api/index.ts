import * as todosApi from "./todos";
import * as projectsApi from "./projects";

const Api = {
  ...todosApi,
  ...projectsApi,
};

export default Api;
