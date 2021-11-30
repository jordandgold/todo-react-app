import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { Box, Text, Flex } from "@chakra-ui/layout";
import React from "react";

type Props = TodoProps & {
  updateTodo: (todo: ITodo) => void;
  deleteTodo: (_id: string) => void;
};

const Todo: React.FC<Props> = ({ todo, updateTodo, deleteTodo }) => {
  const isCompleted = todo.status;

  return (
    <Box width="100%">
      <Flex direction="row" alignItems="start">
        <Checkbox
          size="lg"
          colorScheme="gray"
          defaultIsChecked={isCompleted}
          onChange={() => updateTodo(todo)}
        />
        <Box flex={1} paddingX={4}>
          <Text>{todo.name}</Text>
          <Text>{todo.description}</Text>
        </Box>
        <Button
          onClick={() => deleteTodo(todo._id)}
          colorScheme="red"
          size="sm"
        >
          Delete
        </Button>
      </Flex>
    </Box>
  );
};

export default Todo;