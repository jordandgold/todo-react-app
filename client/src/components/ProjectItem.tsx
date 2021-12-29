import { Button } from "@chakra-ui/button";
import { Flex, Link } from "@chakra-ui/layout";
import React from "react";
import "./ProjectItem.scss";

type Props = ProjectProps & {
  deleteProject: (_id: string) => void;
  changeProject: (project: IProject) => void;
};

const ProjectItem: React.FC<Props> = ({
  project,
  changeProject,
  deleteProject,
}) => {
  const projectItemLinkStyles = {
    textAlign: "left",
    background: "transparent",
    flex: "1",
  };

  return (
    <Flex width="100%" padding={4} className="project-item">
      <Link
        variant="ghost"
        onClick={() => changeProject(project)}
        sx={{ ...projectItemLinkStyles }}
        className="project-item__link"
      >
        {project.name}
      </Link>
      <div className="project-item__delete">
        <Button
          onClick={() => deleteProject(project._id)}
          colorScheme="red"
          size="xs"
        >
          Delete
        </Button>
      </div>
    </Flex>
  );
};

export default ProjectItem;
