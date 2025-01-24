import { Todo } from '../types/Todo';

interface Props {
  query: string;
  setQuery: (event: string) => void;
  addPost: (newTodo: Omit<Todo, 'id'>) => Promise<void>;
}

export const TodosForm: React.FC<Props> = ({ query, setQuery, addPost }) => {
  //const [isLoading, setIsLoading] = useState(false);

  return (
    <form
      onSubmit={event => {
        // setIsLoading(true);

        const newTodo = {
          title: query.trim(),
          userId: 1,
          completed: false,
        };

        event.preventDefault();
        addPost(newTodo);
        setQuery('');
      }}
    >
      <input
        value={query}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        onChange={event => setQuery(event.currentTarget.value)}
      />
    </form>
  );
};
