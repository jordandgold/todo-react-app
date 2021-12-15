import React, { FormEvent, useState } from "react";
import { VStack, Box, Input, Button } from "@chakra-ui/react";
import { createTodoDTO } from "../Api/utils/ApiUtils";

interface IAddProjectProps {
  saveProject: (event: FormEvent, formData: IProject | any) => void;
}

const AddProject: React.FC<IAddProjectProps> = ({ saveProject }) => {
  const [formData, setFormData] = useState<ITodo>(createTodoDTO({}));

  const handleInputChange = (
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    setFormData({
      ...formData,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      saveProject(event, formData);
      setFormData(createTodoDTO({}));
    } catch (error) {
      // do something
      alert(error);
    }
  };

  return (
    <form
      className="Form"
      onSubmit={(event) => handleSubmit(event)}
      autoComplete="off"
    >
      <VStack spacing={4} align="stretch">
        <Box>
          <label htmlFor="name">Project Name</label>
          <Input
            onChange={handleInputChange}
            value={formData.name}
            type="text"
            id="name"
          />
        </Box>
        <Box>
          <Button
            type="submit"
            colorScheme="blue"
            disabled={formData.name === ""}
            loadingText="Adding"
          >
            Add Project
          </Button>
        </Box>
      </VStack>
    </form>
  );
};

export default AddProject;
