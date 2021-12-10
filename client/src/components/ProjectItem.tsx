import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { Box, Text, Flex } from "@chakra-ui/layout";
import React from "react";

type Props = ProjectProps & {
  deleteProject: (_id: string) => void;
  changeProject: (project: IProject) => void;
};

const ProjectItem: React.FC<Props> = ({
  project,
  changeProject,
  deleteProject,
}) => {
  return (
    <Box width="100%">
      <Button bg="transparent" onClick={() => changeProject(project)}>
        {project.name}
      </Button>
      <Button
        onClick={() => deleteProject(project._id)}
        colorScheme="red"
        size="sm"
      >
        Delete
      </Button>
    </Box>
  );
};

export default ProjectItem;
