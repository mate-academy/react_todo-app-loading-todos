import { Todo } from '../../types/Todo';

export type TodosContextType = {
  todos: Todo[] | [],
};

export type TodosProviderType = React.PropsWithChildren;
