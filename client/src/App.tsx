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
  VStack,
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

  const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
    e.preventDefault();
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
          <SimpleGrid columns={2} spacing={10}>
            <Box flex="1">
              <AddTodo saveTodo={handleSaveTodo} />
            </Box>
            <Box flex="1">
              <VStack spacing={6} alignItems="start">
                {todos.map((todo: ITodo) => (
                  <TodoItem
                    key={todo._id}
                    updateTodo={handleUpdateTodo}
                    deleteTodo={handleDeleteTodo}
                    todo={todo}
                  />
                ))}
              </VStack>
            </Box>
          </SimpleGrid>
        </Container>
      </main>
    </ChakraProvider>
  );
};

export default App;
