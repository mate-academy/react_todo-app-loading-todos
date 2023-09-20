/// <reference types='cypress' />
/// <reference types='../support' />

const page = {
  toggleAllButton: () => cy.byDataCy('ToggleAllButton'),
  newTodoField: () => cy.byDataCy('NewTodoField'),
  footer: () => cy.byDataCy('Footer'),
  todosCounter: () => cy.byDataCy('TodosCounter'),
  clearCompletedButton: () => cy.byDataCy('ClearCompletedButton'),
  filter: () => cy.byDataCy('Filter'),
  filterLinkAll: () => cy.byDataCy('FilterLinkAll'),
  filterLinkActive: () => cy.byDataCy('FilterLinkActive'),
  filterLinkCompleted: () => cy.byDataCy('FilterLinkCompleted'),

  visit: (url = '/') => {
    cy.visit(url, {
      onBeforeLoad: win => win.localStorage.setItem('user', '{ "id": 1 }'),
    });

    // to wait until React App is loaded
    cy.get('.todoapp__title').should('exist');
    cy.tick(1000);
  },

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

const todos = {
  el: index => cy.byDataCy('Todo').eq(index),
  deleteButton: index => todos.el(index).byDataCy('TodoDelete'),
  assertCount: length => cy.byDataCy('Todo').should('have.length', length),
  assertTitle: (index, title) => todos.el(index, title),
  assertLoading: index => todos.el(index).byDataCy('TodoLoader').should('have.class', 'is-active'),
  assertNotLoading: index => todos.el(index).byDataCy('TodoLoader').should('not.have.class', 'is-active'),
  assertCompleted: index => todos.el(index),
  assertNotCompleted: index => todos.el(index).should('not.have.class', 'completed'),
};

const errorMessage = {
  el: () => cy.byDataCy('ErrorNotification'),
  closeButton: () => errorMessage.el().byDataCy('HideErrorButton'),
  assertVisible: () => errorMessage.el().should('not.have.class', 'hidden'),
  assertHidden: () => errorMessage.el().should('have.class', 'hidden'),
  assertText: text => errorMessage.el().should('have.text', text),
};

let failed = false;

Cypress.on('fail', (e) => {
  failed = true;
  throw e;
});

describe('', () => {
  beforeEach(() => {
    // if (failed) Cypress.runner.stop();

    cy.clock();
  });

  describe('Page with no todos', () => {
    describe('', () => {
      beforeEach(() => {
        page.mockLoad({ body: [] }).as('loadRequest');
        page.visit();
        cy.wait('@loadRequest');
      });

      it('should have NewTodoField', () => {
        page.newTodoField().should('exist');
      });

      it('should not have ToggleAllButton', () => {
        page.toggleAllButton().should('not.exist');
      });

      it('should not have Todos', () => {
        todos.assertCount(0);
      });

      it('should not have Footer', () => {
        page.footer().should('not.exist');
        page.filter().should('not.exist');
        page.clearCompletedButton().should('not.exist');
        page.todosCounter().should('not.exist');
      });

      it('should not show error message', () => {
        errorMessage.assertHidden();
      });
    });

    describe('', () => {
      it('should send 1 todos request', () => {
        const spy = cy.stub()
          .callsFake(req => req.reply({ body: [] }))
          .as('loadCallback')

        page.mockLoad(spy).as('loadRequest');
        page.visit();

        cy.wait('@loadRequest');
        cy.wait(1000);

        cy.get('@loadCallback').should('have.callCount', 1);
      });
    });

    describe('on loading error', () => {
      beforeEach(() => {
        page.mockLoad({ statusCode: 404, body: 'Not found' }).as('loadRequest');
        page.visit();
        cy.wait('@loadRequest');
      });

      it('should show error', () => {
        errorMessage.assertVisible();
      });

      it('should show correct message', () => {
        errorMessage.assertText('Unable to load todos');
      });

      it('should hide error after 3 seconds', () => {
        cy.tick(2500);
        errorMessage.assertVisible();

        cy.tick(500);
        errorMessage.assertHidden();
      });

      it('should hide error on close button click', () => {
        errorMessage.closeButton().click();
        errorMessage.assertHidden();
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
        todos.assertCount(5);
      });

      it('should have delete buttons for every todo', () => {
        todos.deleteButton(0).should('exist');
      });

      it('should not have todos in editing mode', () => {
        cy.byDataCy('TodoList').eq(0).byDataCy('TodoTitleField').should('not.exist');
      });

      it('should not have loaders', () => {
        todos.assertNotLoading(0);
        todos.assertNotLoading(1);
        todos.assertNotLoading(2);
        todos.assertNotLoading(3);
        todos.assertNotLoading(4);
      })

      it('should have correct todo titles', () => {
        todos.assertTitle(0, 'HTML');
        todos.assertTitle(1, 'CSS');
        todos.assertTitle(2, 'JS');
        todos.assertTitle(3, 'TypeScript');
        todos.assertTitle(4, 'React');
      });

      it('should higlight all completed todos', () => {
        todos.assertCompleted(0);
        todos.assertCompleted(1);
        todos.assertCompleted(2);
      });

      it('should not higlight not completed todos', () => {
        todos.assertNotCompleted(3);
        todos.assertNotCompleted(4);
      });

      it('should have correct completed statuses', () => {
        todos.el(0).byDataCy('TodoStatus').should('be.checked');
        todos.el(1).byDataCy('TodoStatus').should('be.checked');
        todos.el(2).byDataCy('TodoStatus').should('be.checked');
        todos.el(3).byDataCy('TodoStatus').should('not.be.checked');
        todos.el(4).byDataCy('TodoStatus').should('not.be.checked');
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
        errorMessage.assertHidden();
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
        cy.tick(1000);

        page.filterLinkAll().should('not.have.class', 'selected');
        page.filterLinkActive().should('have.class', 'selected');
        page.filterLinkCompleted().should('not.have.class', 'selected');
      });

      it('should show only active todos when active filter is selected', () => {
        page.filterLinkActive().click();
        cy.tick(1000);

        todos.assertCount(2);
        todos.assertTitle(0, 'TypeScript');
        todos.assertTitle(1, 'React');
      });

      it('should keep footer when active todos are shown', () => {
        page.filterLinkActive().click();
        cy.tick(1000);

        page.todosCounter().should('have.text', '2 items left');
        page.clearCompletedButton().should('exist');
      });

      it('should allow to select the completed filter', () => {
        page.filterLinkCompleted().click();
        cy.tick(1000);

        page.filterLinkAll().should('not.have.class', 'selected');
        page.filterLinkActive().should('not.have.class', 'selected');
        page.filterLinkCompleted().should('have.class', 'selected');
      });

      it('should show only completed todos when completed filter is selected', () => {
        page.filterLinkCompleted().click();
        cy.tick(1000);

        todos.assertCount(3);
        todos.assertTitle(0, 'HTML');
        todos.assertTitle(1, 'CSS');
        todos.assertTitle(2, 'JS');
      });

      it('should keep footer when completed todos are shown', () => {
        page.filterLinkCompleted().click();
        cy.tick(1000);

        page.todosCounter().should('have.text', '2 items left');
        page.clearCompletedButton().should('exist');
      });

      it('should allow to reset filter', () => {
        page.filterLinkActive().click();
        cy.tick(1000);

        page.filterLinkAll().click();
        cy.tick(1000);

        todos.assertCount(5);

        page.filterLinkAll().should('have.class', 'selected');
        page.filterLinkActive().should('not.have.class', 'selected');
        page.filterLinkCompleted().should('not.have.class', 'selected');
      });
    });
  });
});
