import React, { useState } from "react";
import { VStack, Box, Input, Button } from "@chakra-ui/react";

type Props = {
  saveTodo: (e: React.FormEvent, formData: ITodo | any) => void;
};

const AddTodo: React.FC<Props> = ({ saveTodo }) => {
  const [formData, setFormData] = useState<ITodo | {}>();

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  return (
    <form className="Form">
      <VStack spacing={4} align="stretch">
        <Box>
          <label htmlFor="name">Name</label>
          <Input onChange={handleForm} type="text" id="name" />
        </Box>
        <Box>
          <label htmlFor="description">Description</label>
          <Input onChange={handleForm} type="text" id="description" />
        </Box>
        <Box>
          <Button
            colorScheme="blue"
            disabled={formData === undefined ? true : false}
            onClick={(e) => saveTodo(e, formData)}
          >
            Add Todo
          </Button>
        </Box>
      </VStack>
    </form>
  );
};

export default AddTodo;
