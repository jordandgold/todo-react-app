import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { Box, Text, Flex } from "@chakra-ui/layout";
import React from "react";

import "./TodoItem.scss";

type Props = TodoProps & {
  updateTodo: (todo: ITodo) => void;
  deleteTodo: (_id: string) => void;
};

const TodoItem: React.FC<Props> = ({ todo, updateTodo, deleteTodo }) => {
  const isCompleted = todo.status;

  return (
    <Box width="100%" paddng={6} className="todo-item">
      <Flex
        direction="row"
        alignItems="start"
        className={isCompleted ? "is-completed" : ""}
        paddingX={6}
      >
        <Checkbox
          size="lg"
          colorScheme="gray"
          defaultIsChecked={isCompleted}
          onChange={() => updateTodo(todo)}
        />
        <Box flex={1} paddingX={4}>
          <Text fontWeight="bold" marginTop="-0.3em" marginBottom={1}>
            {todo.name}
          </Text>
          <Text>{todo.description}</Text>
        </Box>
        <div className="todo-item__delete">
          <Button
            onClick={() => deleteTodo(todo._id)}
            colorScheme="red"
            size="xs"
          >
            Delete
          </Button>
        </div>
      </Flex>
    </Box>
  );
};

export default TodoItem;
