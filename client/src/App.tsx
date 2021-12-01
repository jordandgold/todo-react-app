import React, { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";
import AddTodo from "./components/AddTodo";
import { getTodos, addTodo, updateTodo, deleteTodo } from "./Api";
import {
  ChakraProvider,
  Heading,
  SimpleGrid,
  Box,
  Container,
  Stack,
  StackDivider,
} from "@chakra-ui/react";

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = (): void => {
    getTodos()
      .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
      .catch((err: Error) => console.log(err));
  };

  const handleSaveTodo = (event: React.FormEvent, formData: ITodo): void => {
    event.preventDefault();

    addTodo(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error("Error! Todo not saved");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateTodo = (todo: ITodo): void => {
    updateTodo(todo)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not updated");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteTodo = (_id: string): void => {
    deleteTodo(_id)
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
        <Container maxW="container.xl" paddingTop={10}>
          <Heading as="h1" marginBottom={6}>
            My Todos
          </Heading>
          <Stack divider={<StackDivider borderColor="gray.200" />} spacing={6}>
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
        </Container>
      </main>
    </ChakraProvider>
  );
};

export default App;
