import React, { FormEvent, useState } from "react";
import { VStack, Box, Input, Button } from "@chakra-ui/react";
import { createTodoDTO } from "../Api/utils/ApiUtils";

interface IAddToDoProps {
  saveTodo: (event: FormEvent, formData: ITodo | any) => void;
  projectId: string;
}

const AddTodo: React.FC<IAddToDoProps> = ({ saveTodo, projectId }) => {
  const [formData, setFormData] = useState<ITodo>(createTodoDTO({ projectId }));

  const handleInputChange = (
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    setFormData({
      ...formData,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    try {
      saveTodo(event, formData);
      setFormData(createTodoDTO({}));
    } catch (error) {
      // do something
      alert(error);
    }
  };

  return (
    <form className="Form" onSubmit={(event) => handleSubmit(event)}>
      <VStack spacing={4} align="stretch">
        <Box>
          <label htmlFor="name">Name</label>
          <Input
            onChange={handleInputChange}
            value={formData.name}
            type="text"
            id="name"
          />
        </Box>
        <Box>
          <label htmlFor="description">Description</label>
          <Input
            onChange={handleInputChange}
            value={formData.description}
            type="text"
            id="description"
          />
        </Box>
        <Box>
          <Button
            type="submit"
            colorScheme="blue"
            disabled={formData.name === "" || formData.description === ""}
            loadingText="Adding"
          >
            Add Todo
          </Button>
        </Box>
      </VStack>
    </form>
  );
};

export default AddTodo;
