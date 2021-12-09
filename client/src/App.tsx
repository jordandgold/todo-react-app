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

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);
  // const [currentProject, setCurrentProject] = useState<IProject | null>(null);

  useEffect(() => {
    fetchProjects();
    fetchTodos();
  }, []);

  const fetchProjects = (): void => {
    Api.getProjects()
      .then(({ data: { projects } }: IProject[] | any) => setProjects(projects))
      .catch((err: Error) => console.log(err));
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

  const handleSaveTodo = (event: React.FormEvent, formData: ITodo): void => {
    event.preventDefault();

    Api.addTodo(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error("Error! Todo not saved");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateTodo = (todo: ITodo): void => {
    Api.updateTodo(todo)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not updated");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteTodo = (_id: string): void => {
    Api.deleteTodo(_id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not deleted");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
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
              <AddTodo saveTodo={handleSaveTodo} />
              {todos.map((todo: ITodo) => (
                <TodoItem
                  key={todo._id}
                  updateTodo={handleUpdateTodo}
                  deleteTodo={handleDeleteTodo}
                  todo={todo}
                />
              ))}
            </Stack>
          </Box>
        </Flex>
      </main>
    </ChakraProvider>
  );
};

export default App;
