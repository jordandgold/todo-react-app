import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { Box, Text, Flex } from "@chakra-ui/layout";
import React from "react";

type Props = {
  projects: IProject[];
};

const ProjectsList: React.FC<Props> = ({ projects }) => {
  return (
    <Box width="100%">
      {projects.map((project: IProject) => (
        <li>{project.name}</li>
      ))}
    </Box>
  );
};

export default ProjectsList;
