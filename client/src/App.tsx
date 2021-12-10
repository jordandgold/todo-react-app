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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const response = await Api.getProjects();

    setProjects(response.data.projects);
    // setCurrentProject(response.data.projects[0]);

    await Api.getTodosByProjectId(response.data.projects[0]._id);
  };

  const handleChangeProject = async (project: IProject) => {
    setIsLoading(true);
    setCurrentProject(project);

    // fetch todos
    const response = await Api.getTodosByProjectId(project._id);
    setTodos(response.data.todos);
    setIsLoading(false);
  };

  const handleSaveProject = async (
    event: React.FormEvent,
    formData: IProject
  ) => {
    event.preventDefault();
    const response = await Api.addProject(formData);

    setProjects(response.data.projects);
  };

  const handleDeleteProject = async (_id: string) => {
    const response = await Api.deleteProject(_id);

    setProjects(response.data.projects);
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
            <Stack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
            >
              {currentProject && !isLoading ? (
                <TodosList
                  project={currentProject}
                  todos={todos}
                  setTodos={setTodos}
                />
              ) : (
                <div>Select a project</div>
              )}
            </Stack>
          </Box>
        </Flex>
      </main>
    </ChakraProvider>
  );
};

export default App;
