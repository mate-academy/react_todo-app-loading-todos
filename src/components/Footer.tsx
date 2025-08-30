interface FooterProps {
    activeTodosCount: number;
    filterByStatus: 'all' | 'active' | 'completed';
    setFilterByStatus: (status: 'all' | 'active' | 'completed') => void;
    clearTodos: () => void;
}

export const Footer: React.FC<FooterProps> = ({
    activeTodosCount,
    filterByStatus,
    setFilterByStatus,
    clearTodos
}) => {
    return (
        <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
                {activeTodosCount} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
                <a
                    href="#/"
                    className={
                        'filter__link' +
                        (filterByStatus === 'all' ? ' selected' : '')
                    }
                    data-cy="FilterLinkAll"
                    onClick={() => setFilterByStatus('all')}
                >
                    All
                </a>

                <a
                    href="#/active"
                    className={
                        'filter__link' +
                        (filterByStatus === 'active' ? ' selected' : '')
                    }
                    data-cy="FilterLinkActive"
                    onClick={() => setFilterByStatus('active')}
                >
                    Active
                </a>

                <a
                    href="#/completed"
                    className={
                        'filter__link' +
                        (filterByStatus === 'completed' ? ' selected' : '')
                    }
                    data-cy="FilterLinkCompleted"
                    onClick={() => setFilterByStatus('completed')}
                >
                    Completed
                </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                onClick={clearTodos}
            >
                Clear completed
            </button>
        </footer>
    )
}
