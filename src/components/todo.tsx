import { useContext, useEffect, useRef, useState } from "react";
import cn from "classnames";
import { Todo } from "../types/Todo";
import { TodosContext } from "../services/Store";
import * as todoService from "../api/todos";

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    todos,
    setTodos,
    setIsSubmiting,
    setLoadErrorMessage,
    setIsHidden,
    allTodosButton,
    setAllTodosButton,
  } = useContext(TodosContext);

  const [isEditing, setIsEditing] = useState(false);
  const [todoTitle, setTodoTitle] = useState(todo.title);
  const [selectedtodoId, setSelectedtodoId] = useState<number | null>(null);

  const inputField = useRef<HTMLInputElement>(null);

  const initialTitle = todo.title;

  useEffect(() => {
    if (inputField.current) {
      inputField.current.focus();
    }
  });

  const onSelected = (id: number) => {
    const copiedTodos = [...todos];

    copiedTodos.map((todoItem) => {
      const todoElem = todoItem;

      if (todoElem.id === id) {
        todoElem.completed = !todoElem.completed;
      }

      return copiedTodos;
    });

    setTodos(copiedTodos);
  };

  const onDelete = (id: number) => {
    const newTodos = todos.filter((todoItem) => todoItem.id !== id);

    setSelectedtodoId(todo.id);

    return todoService
      .deleteTodo(id)
      .then(() => {
        setTodos(newTodos);
      })
      .catch((error) => {
        setIsHidden(false);
        setLoadErrorMessage("Unable to delete a todo");
        throw error;
      })
      .finally(() => {
        setTimeout(() => {
          setIsHidden(true);
          setLoadErrorMessage("");
        }, 3000);
        setIsSubmiting(false);
        setSelectedtodoId(null); // here
      });
  };

  const handleEnterKey = (event: React.KeyboardEvent) => {
    const updatedTodo = { ...todo };

    if (event.key === "Enter" && todoTitle.length) {
      updatedTodo.title = todoTitle;

      setIsEditing(false);
      todoService.updatePost(updatedTodo).then((newTodo) => {
        const copiedTodos = [...todos];
        const index = copiedTodos.findIndex(
          (todoItem) => todoItem.id === newTodo.id,
        );

        copiedTodos.splice(index, 1, newTodo);

        setTodos(copiedTodos);
      });
    } else if (event.key === "Enter" && todoTitle.length === 0) {
      event.preventDefault();
      onDelete(todo.id);
    }
  };

  const handleEscapeKey = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsEditing(false);
      setTodoTitle(initialTitle);
    }
  };

  const handleBlur = () => {
    if (todoTitle.length === 0) {
      onDelete(todo.id);
    } else {
      setIsEditing(false);
    }
  };

  const activeTodos = todos.every((todoItem) => todoItem.completed);

  return (
    <>
      <div
        data-cy="Todo"
        className={cn("todo", {
          completed: todo.completed,
        })}
      >
        <div className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
            onChange={() => {
              onSelected(todo.id);
              if (allTodosButton || activeTodos) {
                setAllTodosButton(true);
              }
            }}
          />
        </div>

        {isEditing ? (
          <>
            <form>
              <input
                ref={inputField}
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={todoTitle}
                onChange={(event) => setTodoTitle(event.target.value)}
                onKeyDown={handleEnterKey}
                onDoubleClick={() => setIsEditing(!isEditing)}
                onBlur={handleBlur}
                onKeyUp={handleEscapeKey}
              />
            </form>
          </>
        ) : (
          <>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => setIsEditing(!isEditing)}
              onClick={() => onSelected(todo.id)}
            >
              {todoTitle}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => {
                onDelete(todo.id);
                setSelectedtodoId(todo.id);
              }}
            >
              ×
            </button>
          </>
        )}

        <div
          data-cy="TodoLoader"
          className={cn("modal", "overlay", {
            "is-active": selectedtodoId === todo.id,
          })}
        >
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    </>
  );
};
