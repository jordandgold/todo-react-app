import React, { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import Api from "./Api";
import {
  ChakraProvider,
  Box,
  Flex,
  Stack,
  StackDivider,
  Heading,
} from "@chakra-ui/react";
import AddProject from "./components/AddProject";
import ProjectItem from "./components/ProjectItem";
import TodosList from "./components/TodosList";
import { createTodoDTO } from "./Api/utils/ApiUtils";

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
    handleChangeProject(response.data.project);
  };

  const handleSaveTodo = async (
    event: React.FormEvent,
    formData: ITodo
  ): Promise<void> => {
    event.preventDefault();

    const response = await Api.addTodo(
      createTodoDTO({
        ...formData,
        projectId: currentProject?._id,
      })
    );
    setTodos(response.data.todos);
  };

  const handleDeleteProject = async (_id: string): Promise<void> => {
    const response = await Api.deleteProject(_id);

    setProjects(response.data.projects);

    console.log("currentProject: " + JSON.stringify(currentProject));
    console.log(
      "response.data.project: " + JSON.stringify(response.data.project)
    );

    if (currentProject?._id === response.data.project?._id) {
      setCurrentProject(null);
    }
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
              {projects.length > 0 ? (
                projects.map((project: IProject) => (
                  <ProjectItem
                    key={project._id}
                    project={project}
                    deleteProject={handleDeleteProject}
                    changeProject={handleChangeProject}
                  />
                ))
              ) : (
                <Flex
                  flexDirection="column"
                  flex={1}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Box>Add a project</Box>
                </Flex>
              )}
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
                    <Heading as="h1" marginBottom={6}>
                      {currentProject.name}
                    </Heading>
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
