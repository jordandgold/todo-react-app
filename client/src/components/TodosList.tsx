import { Box, Heading, Stack, StackDivider, Flex } from "@chakra-ui/layout";
import React from "react";
import Api from "../Api";
import TodoItem from "./TodoItem";

type Props = {
  project: IProject;
  todos: ITodo[];
  setTodos: (todos: ITodo[]) => void;
};

const TodosList: React.FC<Props> = ({ project, todos, setTodos }) => {
  const handleUpdateTodo = async (todo: ITodo) => {
    const response = await Api.updateTodo(todo);

    setTodos(response.data.todos);
  };

  const handleDeleteTodo = async (_id: string) => {
    const response = await Api.deleteTodo(_id);

    setTodos(response.data.todos);
  };

  return (
    <Box width="100%" paddingTop={6}>
      <Stack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        height="100%"
      >
        {todos.length > 0 ? (
          todos.map((todo: ITodo) => (
            <TodoItem
              key={todo._id}
              updateTodo={handleUpdateTodo}
              deleteTodo={handleDeleteTodo}
              todo={todo}
            />
          ))
        ) : (
          <Flex
            flexDirection="column"
            flex={1}
            alignItems="center"
            justifyContent="center"
          >
            <Box padding={16}>No todos yet</Box>
          </Flex>
        )}
      </Stack>
    </Box>
  );
};

export default TodosList;
