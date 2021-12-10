import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { Box, Text, Flex } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import Api from "../Api";
import { getTodosByProjectId } from "../Api/todos";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";

type Props = {
  project: IProject;
  todos: ITodo[];
  setTodos: (todos: ITodo[]) => void;
};

const TodosList: React.FC<Props> = ({ project, todos, setTodos }) => {
  //   useEffect(() => {
  //     async function fetchTodos() {
  //       const response = await Api.getTodosByProjectId(project._id);
  //       setTodos(response.data.todos);
  //     }

  //     fetchTodos();
  //   });

  //   const handleFetchTodos = async () => {
  //       const response = await Api.getTodosByProjectId(project._id);
  //       setTodos(response.data.todos);
  //   }

  const handleSaveTodo = async (event: React.FormEvent, formData: ITodo) => {
    event.preventDefault();

    try {
      const response = await Api.addTodo(formData);
      setTodos(response.data.todos);
    } catch {
      throw new Error("Error! Todo not saved");
    }
  };

  const handleUpdateTodo = (todo: ITodo): void => {
    Api.updateTodo(todo)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not updated");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteTodo = (_id: string): void => {
    Api.deleteTodo(_id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not deleted");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box width="100%">
      <AddTodo saveTodo={handleSaveTodo} projectId={project._id} />
      <h3>{project.name}</h3>
      {todos.map((todo: ITodo) => (
        <TodoItem
          key={todo._id}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))}
    </Box>
  );
};

export default TodosList;
