const NewTodo: React.FC = () => {
  return (
    <form>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        autoFocus
      />
    </form>
  );
};

export default NewTodo;
