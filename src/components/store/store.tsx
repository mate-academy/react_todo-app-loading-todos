import React, {
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

import { Todo } from '../../types/Todo';
import { ProviderProps } from '../../types/ProviderProps';
import { FilterOption } from '../../enum/FilterOption';

type TodosContextType = {
  todos: Todo[],
  reciveTodos: (newTodos: Todo[]) => void,
  setFilterSelected: (filter: FilterOption) => void,
  filterSelected: FilterOption,
  filteredTodos: Todo[],
  toggleTodoCondition: (todoId: number) => void,
};

const TodosContext = createContext<TodosContextType>({
  todos: [],
  reciveTodos: () => {},
  setFilterSelected: () => {},
  filterSelected: FilterOption.All,
  filteredTodos: [],
  toggleTodoCondition: () => {},
});

export const TodosContextProvider: React.FC<ProviderProps> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [
    filterSelected,
    setFilterSelected,
  ] = useState<FilterOption>(FilterOption.All);

  const reciveTodos = useCallback(
    (newTodos: Todo[]) => {
      setTodos(newTodos);
    },
    [],
  );

  const filteredTodos = todos.filter(todo => {
    switch (filterSelected) {
      case FilterOption.Active:
        return !todo.completed;

      case FilterOption.Completed:
        return todo.completed;

      default:
        return true;
    }
  });

  const toggleTodoCondition = (todoId: number) => {
    // some time ago i can implement status for 'allToggleBtn'
    // and toggle 'todo.completed' based on that status 👀

    const findedTodo = todos.find(todo => todo.id === todoId) || null;

    if (!findedTodo) {
      return;
    }

    const newTodo = {
      ...findedTodo,
      completed: !findedTodo.completed,
    };

    const copyTodos = [...todos];
    const indexFindedTodo = copyTodos.indexOf(findedTodo);

    copyTodos[indexFindedTodo] = newTodo;

    setTodos(copyTodos);
  };

  const TodosProviderValue: TodosContextType = {
    todos,
    reciveTodos,
    filteredTodos,
    filterSelected,
    setFilterSelected,
    toggleTodoCondition,
  };

  return (
    <TodosContext.Provider value={TodosProviderValue}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodosContext = () => useContext(TodosContext);
