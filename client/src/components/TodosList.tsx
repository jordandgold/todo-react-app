import { Box, Heading, Stack, StackDivider } from "@chakra-ui/layout";
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
    <Box width="100%">
      <Box
        paddingTop={6}
        paddingStart={6}
        paddingEnd={6}
        paddingBottom={4}
        marginBottom={6}
        borderBottom="1px"
        borderColor="gray.200"
      >
        <Heading as="h1">{project.name}</Heading>
      </Box>
      <Stack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        height="100%"
      >
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
  );
};

export default TodosList;
