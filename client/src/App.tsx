import React, { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";
import AddTodo from "./components/AddTodo";
import Api from "./Api";
import {
  ChakraProvider,
  Heading,
  Box,
  Flex,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import AddProject from "./components/AddProject";
import ProjectsList from "./components/ProjectsList";
import ProjectItem from "./components/ProjectItem";
import TodosList from "./components/TodosList";

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [currentProject, setCurrentProject] = useState<IProject | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const response = await Api.getProjects();

    setProjects(response.data.projects);
    setCurrentProject(response.data.projects[0]);
    // Api.getProjects()
    //   .then(({ data: { projects } }: IProject[] | any) => setProjects(projects))
    //   .catch((err: Error) => console.log(err));
  };

  const handleChangeProject = async (project: IProject) => {
    // set selected project
    setCurrentProject(project);

    // fetch todos
    const response = await Api.getTodosByProjectId(project._id);
    setTodos(response.data.todos);
  };

  const handleSaveProject = (
    event: React.FormEvent,
    formData: IProject
  ): void => {
    event.preventDefault();

    Api.addProject(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error("Error! Project not saved");
        }
        setProjects(data.projects);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteProject = (_id: string): void => {
    Api.deleteProject(_id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Project not deleted");
        }
        setProjects(data.projects);
      })
      .catch((err) => console.log(err));
  };

  const fetchTodos = (): void => {
    Api.getTodos()
      .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
      .catch((err: Error) => console.log(err));
  };

  return (
    <ChakraProvider>
      <main className="App">
        <Flex minHeight="100%">
          <Box
            w="400px"
            borderEnd="1px"
            borderColor="gray.200"
            height="100vh"
            padding={4}
          >
            <AddProject saveProject={handleSaveProject} />
            {projects.map((project: IProject) => (
              <ProjectItem
                key={project._id}
                project={project}
                deleteProject={handleDeleteProject}
                changeProject={handleChangeProject}
              />
            ))}
          </Box>
          <Box flex="1" padding={6}>
            <Heading as="h1" marginBottom={6}>
              My Todos
            </Heading>
            <Stack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
            >
              {currentProject && (
                <TodosList
                  project={currentProject}
                  todos={todos}
                  setTodos={setTodos}
                />
              )}
            </Stack>
          </Box>
        </Flex>
      </main>
    </ChakraProvider>
  );
};

export default App;
