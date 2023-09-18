import { useContext } from 'react';
import { Todo } from '../Todo/Todo';
import { TodoContext } from '../../TodoContext';
import { Filter } from '../../types/Filter';
import { TodoType } from '../../types/TodoType';

export const TodoList = () => {
  const { todos, filterTodo } = useContext(TodoContext);

  const getFilteredList = (currentState: TodoType[]) => {
    switch (filterTodo) {
      case Filter.Active: {
        return currentState.filter(({ completed }) => !completed);
      }

      case Filter.Completed: {
        return currentState.filter(({ completed }) => completed);
      }

      default:
        return currentState;
    }
  };

  const filteredList = getFilteredList(todos);

  return (
    <>
      {filteredList.map(todo => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </>
  );
};
