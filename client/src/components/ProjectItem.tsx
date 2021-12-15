import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { Box, Text, Flex, Link } from "@chakra-ui/layout";
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
    <Flex width="100%" padding={4}>
      <Link
        bg="transparent"
        variant="ghost"
        onClick={() => changeProject(project)}
        flex={1}
        sx={{
          textAlign: "left",
        }}
      >
        {project.name}
      </Link>
      <Button
        onClick={() => deleteProject(project._id)}
        colorScheme="red"
        size="sm"
      >
        Delete
      </Button>
    </Flex>
  );
};

export default ProjectItem;
