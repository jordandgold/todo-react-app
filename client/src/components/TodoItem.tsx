import { Button } from "@chakra-ui/button";
import { Box, Text, Stack, VStack } from "@chakra-ui/layout";
import React from "react";

type Props = TodoProps & {
  updateTodo: (todo: ITodo) => void;
  deleteTodo: (_id: string) => void;
};

const Todo: React.FC<Props> = ({ todo, updateTodo, deleteTodo }) => {
  const checkTodo: string = todo.status ? `line-through` : "";
  return (
    <Box width="100%" borderWidth="1px" borderRadius="lg" padding={6}>
      <VStack>
        <Text>{todo.name}</Text>
        <Text>{todo.description}</Text>
        <Stack direction="row" spacing={4} align="center">
          <Button onClick={() => updateTodo(todo)} colorScheme="blue" size="sm">
            Complete
          </Button>
          <Button
            onClick={() => deleteTodo(todo._id)}
            colorScheme="red"
            size="sm"
          >
            Delete
          </Button>
        </Stack>
      </VStack>
    </Box>
  );
};

export default Todo;
