useEffect(() => {
  if (inputRef.current) {
    inputRef.current.focus();
  }

  getTodos()
    .then(setTodos)
    .catch(() => setError('somethintg went wrong'))
}, []);

const [todos, setTodos] = useState<Todo[]>([]);
const [error, setError] = useState<string>('');
const [title, setTitle] = useState<string>('');
const inputRef = useRef<HTMLInputElement>(null);

const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setTitle(e.currentTarget.value);
}

//#region fetch_requests
const addTodoToServer = async (e: React.KeyboardEvent<HTMLInputElement>) => {
  const newTodo: Todo = {
    id: +new Date(),
    userId: 1314,
    title: title.trim(),
    completed: false,
  };

  if (e.key === 'Enter' && title.trim()) {
    const { userId, title, completed } = newTodo;

    e.preventDefault();
    postTodo({ userId, title, completed })
    setTodos(currentTodos => [...currentTodos, newTodo]);

    setTitle('');
  }
}

const deletItem = (todoId: number) => {
  deleteTodos(todoId);
  setTodos(currentTodos => currentTodos.filter(todo => todo.id !== todoId));
}

//#endregion

return (
  <div className="todoapp">
    <h1 className="todoapp__title">todos</h1>

    <div className="todoapp__content">
      <header className="todoapp__header">
        {/* this button should have `active` class only if all todos are completed */}
        <button
          type="button"
          className="todoapp__toggle-all active"
          data-cy="ToggleAllButton"
        />

        {/* Add a todo on form submit */}
        <form>
          <input
            data-cy="NewTodoField"
            type="text"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={handleTitleChange}
            onKeyPress={addTodoToServer}
            ref={inputRef}
          />
        </form>
      </header>

      <section className="todoapp__main" data-cy="TodoList">
        {todos.map(todo => (
          <div
            data-cy="Todo"
            key={todo.id}
            className={cn("todo", { "completed": todo.completed })}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              {todo.title}
            </span>

            {/* Remove button appears only on hover */}
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={(e) => {
                e.preventDefault();
                deletItem(todo.id);
              }}
            >
              ×
            </button>

            {/* overlay will cover the todo while it is being deleted or updated */}
            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        ))}
      </section>

      {/* Hide the footer if there are no todos */}
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {todos.length} items left
        </span>

        {/* Active link should have the 'selected' class */}
        <nav className="filter" data-cy="Filter">
          <a
            href="#/"
            className="filter__link selected"
            data-cy="FilterLinkAll"
          >
            All
          </a>

          <a
            href="#/active"
            className="filter__link"
            data-cy="FilterLinkActive"
          >
            Active
          </a>

          <a
            href="#/completed"
            className="filter__link"
            data-cy="FilterLinkCompleted"
          >
            Completed
          </a>
        </nav>

        {/* this button should be disabled if there are no completed todos */}
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
        >
          Clear completed
        </button>
      </footer>
    </div>

    {/* DON'T use conditional rendering to hide the notification */}
    {/* Add the 'hidden' class to hide the message smoothly */}
    {/* <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button data-cy="HideErrorButton" type="button" className="delete" />
      show only one message at a time
      Unable to load todos
      <br />
      Title should not be empty
      <br />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div> */}
  </div>
);