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

  const fetchProjects = async (): Promise<void> => {
    const response = await Api.getProjects();

    setProjects(response.data.projects);

    // Loads the first project and sets as the inital in state
    // not sure we want this
    // setCurrentProject(response.data.projects[0]);

    if (projects.length > 0) {
      await Api.getTodosByProjectId(response.data.projects[0]._id);
    }
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
  ): Promise<void> => {
    event.preventDefault();
    const response = await Api.addProject(formData);

    setProjects(response.data.projects);
  };

  const handleSaveTodo = async (
    event: React.FormEvent,
    formData: ITodo
  ): Promise<void> => {
    event.preventDefault();

    const response = await Api.addTodo(formData);
    setTodos(response.data.todos);
  };

  const handleDeleteProject = async (_id: string): Promise<void> => {
    const response = await Api.deleteProject(_id);

    setProjects(response.data.projects);
  };

  return (
    <ChakraProvider>
      <main className="App">
        <Flex minHeight="100%">
          <Box w="400px" borderEnd="1px" borderColor="gray.200" height="100vh">
            <Box borderBottom="1px" borderColor="gray.200" padding={4}>
              <AddProject saveProject={handleSaveProject} />
            </Box>
            <Stack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={0}
              height="100%"
            >
              {projects.map((project: IProject) => (
                <ProjectItem
                  key={project._id}
                  project={project}
                  deleteProject={handleDeleteProject}
                  changeProject={handleChangeProject}
                />
              ))}
            </Stack>
          </Box>
          <Box flex="1" minHeight="100%">
            <Stack
              divider={<StackDivider borderColor="gray.200" />}
              height="100%"
            >
              {currentProject && !isLoading ? (
                <>
                  <Box borderBottom="1px" borderColor="gray.200" padding={6}>
                    <AddTodo
                      saveTodo={handleSaveTodo}
                      projectId={currentProject._id}
                    />
                  </Box>
                  <Box>
                    <TodosList
                      project={currentProject}
                      todos={todos}
                      setTodos={setTodos}
                    />
                  </Box>
                </>
              ) : (
                <Flex
                  flexDirection="column"
                  flex={1}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Box>Select a project</Box>
                </Flex>
              )}
            </Stack>
          </Box>
        </Flex>
      </main>
    </ChakraProvider>
  );
};

export default App;
