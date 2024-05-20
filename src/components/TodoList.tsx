import { useCallback, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';
import { Status } from '../types/Status';

type Props = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  status: Status;
};

export const TodoList: React.FC<Props> = ({ todos, setTodos, status }) => {
  const [editValue, setEditValue] = useState('');

  const toggle = (id: number) => {
    const todosCopy = [...todos];
    const chosenTodoIndex = todosCopy.findIndex(todo => todo.id === id);
    const chosenTodo = todosCopy[chosenTodoIndex];

    if (chosenTodo) {
      if (!chosenTodo.completed) {
        chosenTodo.completed = true;
      } else {
        chosenTodo.completed = false;
      }
    }

    todosCopy.splice(chosenTodoIndex, 1, chosenTodo);

    setTodos(todosCopy);
  };

  const deleteTodo = useCallback(
    (id: number) => {
      const updatedTodos = todos.filter(todo => todo.id !== id);

      setTodos(updatedTodos);
    },
    [todos, setTodos],
  );

  const saveTodo = (id: number) => {
    const todosCopy = [...todos];
    const chosenTodo = todosCopy.find(todo => todo.id === id) as Todo;

    if (!editValue) {
      deleteTodo(id);
    } else {
      chosenTodo.title = editValue;
      setTodos(todosCopy);
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos
        .filter(todo => {
          if (status === Status.all) {
            return true;
          }

          if (status === Status.active) {
            return !todo.completed;
          }

          if (status === Status.completed) {
            return todo.completed;
          }

          return true;
        })
        .map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onToggle={toggle}
            editValue={editValue}
            setEditValue={setEditValue}
            onSave={saveTodo}
          />
        ))}
    </section>
  );
};
