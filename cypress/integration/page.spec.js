/// <reference types="cypress" />
/// <reference types="../support" />

const page = {
  errorMessage: () => cy.byDataCy('ErrorNotification'),
  toggleAllButton: () => cy.byDataCy('ToggleAllButton'),
  newTodoField: () => cy.byDataCy('NewTodoField'),
  todos: () => cy.byDataCy('Todo'),
  footer: () => cy.byDataCy('Footer'),
  todosCounter: () => cy.byDataCy('TodosCounter'),
  clearCompletedButton: () => cy.byDataCy('ClearCompletedButton'),
  filter: () => cy.byDataCy('Filter'),
  filterLinkAll: () => cy.byDataCy('FilterLinkAll'),
  filterLinkActive: () => cy.byDataCy('FilterLinkActive'),
  filterLinkCompleted: () => cy.byDataCy('FilterLinkCompleted'),

  visit: (url = '/') => cy.visit(url, {
    onBeforeLoad: win => win.localStorage.setItem('user', '{ "id": 1 }'),
  }),

  /**
   * @param {*} response - can be a valid response object or stub
   *
   * { body: [] }
   * { statusCode: 400 }
   * spy = cy.stub().callsFake(req => req.reply(response)).as('alias')
   */
  mockLoad: (response = { fixture: 'todos' }) => {
    return cy.intercept('**/todos?userId=*', response);
  },
};

let failed = false;

Cypress.on('fail', (e) => {
  failed = true;
  throw e;
});

describe('', () => {
  beforeEach(() => {
    if (failed) Cypress.runner.stop();
  });

  describe('Page with no todos', () => {
    describe('', () => {
      beforeEach(() => {
        page.mockLoad({ body: [] }).as('loadRequest');
        page.visit();
        cy.wait('@loadRequest');
      });

      it('should have a title', () => {
        cy.get('.todoapp__title').should('exist');
      });

      it('should have NewTodoField', () => {
        page.newTodoField().should('exist');
      });

      it('should not have ToggleAllButton', () => {
        page.toggleAllButton().should('not.exist');
      });

      it('should not have Todos', () => {
        page.todos().should('have.length', 0);
      });

      it('should not have Footer', () => {
        page.footer().should('not.exist');
        page.filter().should('not.exist');
        page.clearCompletedButton().should('not.exist');
        page.todosCounter().should('not.exist');
      });

      it('should not show error message', () => {
        page.errorMessage().should('have.class', 'hidden');
      });
    });

    describe('', () => {
      it('should send 1 todos request', () => {
        const spy = cy.stub()
          .callsFake(req => req.reply({ body: [] }))
          .as('loadingCallback')

        page.mockLoad(spy).as('loadRequest');
        page.visit();

        cy.wait('@loadRequest');
        cy.wait(1000);

        cy.get('@loadingCallback').should('have.callCount', 1);
      });
    });

    describe('on loading error', () => {
      beforeEach(() => {
        page.mockLoad({ statusCode: 404, body: 'Not found' }).as('loadRequest');
        page.visit();
        cy.wait('@loadRequest');
        cy.clock();
      });

      it('should show error', () => {
        page.errorMessage().should('not.have.class', 'hidden');
      });

      it('should show correct message', () => {
        page.errorMessage().should('have.text', 'Unable to load todos');
      });

      it('should hide error after 3 seconds', () => {
        cy.tick(2500);
        page.errorMessage().should('not.have.class', 'hidden');

        cy.tick(500);
        page.errorMessage().should('have.class', 'hidden');
      });

      it('should hide error on close button click', () => {
        page.errorMessage().byDataCy('HideErrorButton').click();
        page.errorMessage().should('have.class', 'hidden');
      });
    });
  });

  describe('Page with mixed todos', () => {
    beforeEach(() => {
      page.mockLoad().as('loadRequest');
      page.visit();
      cy.wait('@loadRequest');
    });

    describe('', () => {
      it('should have NewTodoField', () => {
        page.newTodoField().should('exist');
      });

      it('should have ToggleAllButton', () => {
        page.toggleAllButton().should('exist');
      });

      it('should have all loaded todos', () => {
        page.todos().should('have.length', 5);
      });

      it('should have delete buttons for every todo', () => {
        page.todos().eq(0).byDataCy('TodoDelete').should('exist');
      });

      it('should not have todos in editing mode', () => {
        cy.byDataCy('TodoList').eq(0).byDataCy('TodoTitleField').should('not.exist');
      })

      it('should have correct todo titles', () => {
        page.todos().eq(0).byDataCy('TodoTitle').should('have.text', 'HTML');
        page.todos().eq(1).byDataCy('TodoTitle').should('have.text', 'CSS');
        page.todos().eq(2).byDataCy('TodoTitle').should('have.text', 'JS');
        page.todos().eq(3).byDataCy('TodoTitle').should('have.text', 'TypeScript');
        page.todos().eq(4).byDataCy('TodoTitle').should('have.text', 'React');
      });

      it('should higlight all completed todos', () => {
        page.todos().eq(0).should('have.class', 'completed');
        page.todos().eq(1).should('have.class', 'completed');
        page.todos().eq(2).should('have.class', 'completed');
      });

      it('should not higlight not completed todos', () => {
        page.todos().eq(3).should('not.have.class', 'completed');
        page.todos().eq(4).should('not.have.class', 'completed');
      });

      it('should have correct completed statuses', () => {
        page.todos().eq(0).byDataCy('TodoStatus').should('be.checked');
        page.todos().eq(1).byDataCy('TodoStatus').should('be.checked');
        page.todos().eq(2).byDataCy('TodoStatus').should('be.checked');
        page.todos().eq(3).byDataCy('TodoStatus').should('not.be.checked');
        page.todos().eq(4).byDataCy('TodoStatus').should('not.be.checked');
      });

      it('should have Footer', () => {
        page.footer().should('exist');
      });

      it('should have todosCounter with a number of not completed todos', () => {
        page.todosCounter().should('have.text', '2 items left');
      });

      it('should have clearCompletedButton', () => {
        page.clearCompletedButton().should('exist');
      });

      it('should have Filter', () => {
        page.filter().should('exist');
      });

      it('should not show error message', () => {
        page.errorMessage().should('have.class', 'hidden');
      });
    });

    describe('Filter', () => {
      it('should have only filterLinkAll active', () => {
        page.filterLinkAll().should('have.class', 'selected');
        page.filterLinkActive().should('not.have.class', 'selected');
        page.filterLinkCompleted().should('not.have.class', 'selected');
      });

      it('should allow to select the active filter', () => {
        page.filterLinkActive().click();

        page.filterLinkAll().should('not.have.class', 'selected');
        page.filterLinkActive().should('have.class', 'selected');
        page.filterLinkCompleted().should('not.have.class', 'selected');
      });

      it('should show only active todos when active filter is selected', () => {
        page.filterLinkActive().click();

        page.todos().should('have.length', 2);
        page.todos().eq(0).byDataCy('TodoTitle').should('have.text', 'TypeScript');
        page.todos().eq(1).byDataCy('TodoTitle').should('have.text', 'React');
      });

      it('should keep footer when active todos are shown', () => {
        page.filterLinkActive().click();

        page.todosCounter().should('have.text', '2 items left');
        page.clearCompletedButton().should('exist');
      });

      it('should allow to select the completed filter', () => {
        page.filterLinkCompleted().click();

        page.filterLinkAll().should('not.have.class', 'selected');
        page.filterLinkActive().should('not.have.class', 'selected');
        page.filterLinkCompleted().should('have.class', 'selected');
      });

      it('should show only completed todos when completed filter is selected', () => {
        page.filterLinkCompleted().click();

        page.todos().should('have.length', 3);
        page.todos().eq(0).byDataCy('TodoTitle').should('have.text', 'HTML');
        page.todos().eq(1).byDataCy('TodoTitle').should('have.text', 'CSS');
        page.todos().eq(2).byDataCy('TodoTitle').should('have.text', 'JS');
      });

      it('should keep footer when completed todos are shown', () => {
        page.filterLinkCompleted().click();

        page.todosCounter().should('have.text', '2 items left');
        page.clearCompletedButton().should('exist');
      });

      it('should allow to reset filter', () => {
        page.filterLinkActive().click();
        page.filterLinkAll().click();

        page.todos().should('have.length', 5);

        page.filterLinkAll().should('have.class', 'selected');
        page.filterLinkActive().should('not.have.class', 'selected');
        page.filterLinkCompleted().should('not.have.class', 'selected');
      });
    });
  });
});
