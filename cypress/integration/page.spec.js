/// <reference types='cypress' />

import mixedTodos from '../fixtures/todos.json';

//#region Page Objects
const page = {
  toggleAllButton: () => cy.byDataCy('ToggleAllButton'),
  newTodoField: () => cy.byDataCy('NewTodoField'),
  todosCounter: () => cy.byDataCy('TodosCounter'),
  clearCompletedButton: () => cy.byDataCy('ClearCompletedButton'),

  visit: (url = '/') => {
    cy.visit(url, {
      onBeforeLoad: win => win.localStorage.setItem('user', '{ "id": 1 }'),
    });

    cy.get('.todoapp__title').should('exist');
  },

  pauseTimers: () => cy.clock(),

  flushJSTimers: (delay = 1000) => {
    cy.clock().then(clock => {
      clock.tick(delay);
      clock.restore();
    });

    cy.wait(50);
  },

  mockLoad: (response = { fixture: 'todos' }) => {
    return cy.intercept('**/todos?userId=*', response);
  },

  mockCreate: (response) => {
    const options = { method: 'POST', url: '**/todos' };

    const spy = cy.stub()
      .callsFake(req => req.reply({
        statusCode: 201,
        body: { ...req.body, id: Math.random() },
      }))
      .as('createCallback');

    return cy.intercept(options, response || spy);
  },

  mockDelete: (id, response) => {
    return cy.intercept(
      { method: 'DELETE', url: `**/todos/${id}` },
      response || { body: '1' }
    );
  },

  mockUpdate: (id, response) => {
    const todo = mixedTodos.find(t => t.id === id) || {};

    const spy = cy.stub()
      .callsFake(req => req.reply({ body: { ...todo, ...req.body, id } }))
      .as('updateCallback');

    return cy.intercept(
      { method: 'PATCH', url: `**/todos/${id}` },
      response || spy
    );
  },
};

const todos = {
  el: index => cy.byDataCy('Todo').eq(index),
  deleteButton: index => todos.el(index).byDataCy('TodoDelete'),
  statusToggler: index => todos.el(index).byDataCy('TodoStatus'),
  title: index => todos.el(index).byDataCy('TodoTitle'),
  titleField: index => todos.el(index).byDataCy('TodoTitleField'),

  assertCount: length =>
    cy.byDataCy('Todo').should('have.length', length),

  assertTitle: (index, title) =>
    todos.title(index).should('have.text', title),

  assertLoading: index =>
    todos.el(index).byDataCy('TodoLoader').should('have.class', 'is-active'),

  assertNotLoading: index =>
    todos.el(index).byDataCy('TodoLoader').should('not.have.class', 'is-active'),

  assertCompleted: index =>
    todos.el(index).should('have.class', 'completed'),

  assertNotCompleted: index =>
    todos.el(index).should('not.have.class', 'completed'),
};

const errorMessage = {
  el: () => cy.byDataCy('ErrorNotification'),
  closeButton: () => errorMessage.el().byDataCy('HideErrorButton'),
  assertVisible: () =>
    errorMessage.el().should('not.have.class', 'hidden'),

  assertHidden: () =>
    errorMessage.el().should('have.class', 'hidden'),

  assertText: text =>
    errorMessage.el().should('have.text', text),
};

const FilterLinkKeys = {
  all: 'FilterLinkAll',
  active: 'FilterLinkActive',
  completed: 'FilterLinkCompleted',
};

const filter = {
  el: () => cy.byDataCy('Filter'),
  link: type => cy.byDataCy(FilterLinkKeys[type]),

  assertVisible: () =>
    filter.el().should('exist'),

  assertHidden: () =>
    filter.el().should('not.exist'),

  assertSelected: type =>
    filter.link(type).should('have.class', 'selected'),

  assertNotSelected: type =>
    filter.link(type).should('not.have.class', 'selected'),
};
//#endregion

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
    it('should send 1 todos request', () => {
      const spy = cy.stub()
        .callsFake(req => req.reply({ body: [] }))
        .as('loadCallback');

      page.mockLoad(spy).as('loadRequest');
      page.visit();

      cy.wait('@loadRequest');
      cy.wait(500);

      cy.get('@loadCallback').should('have.callCount', 1);
    });

    describe('', () => {
      beforeEach(() => {
        page.mockLoad({ body: [] }).as('loadRequest');
        page.visit();
        cy.wait('@loadRequest');
      });

      it('should have NewTodoField', () => {
        page.newTodoField().should('exist');
      });

      it('should not have Todos', () => {
        todos.assertCount(0);
      });

      it('should not have Footer', () => {
        filter.assertHidden();
        page.clearCompletedButton().should('not.exist');
        page.todosCounter().should('not.exist');
      });

      it('should not show error message', () => {
        errorMessage.assertHidden();
      });
    });

    describe('on loading error', () => {
      beforeEach(() => {
        cy.once('uncaught:exception', () => false);

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
    });
  });

  describe('Page with mixed todos', () => {
    beforeEach(() => {
      page.mockLoad().as('loadRequest');
      page.visit();
      cy.wait('@loadRequest');
    });

    it('should have NewTodoField', () => {
      page.newTodoField().should('exist');
    });

    it('should have all loaded todos', () => {
      todos.assertCount(5);
    });

    it('should have Filter', () => {
      filter.assertVisible();
    });

    it('should have clearCompletedButton', () => {
      page.clearCompletedButton().should('exist');
    });
  });

  // ✅ FIX: was describe.skip → now active
  describe('Adding a todo', () => {
    beforeEach(() => {
      page.mockLoad().as('loadRequest');
      page.visit();
      cy.wait('@loadRequest');
    });

    it('should focus text field by default', () => {
      page.newTodoField().should('be.focused');
    });
  });

  // ✅ FIX: all skipped blocks activated
  describe('Adding a first todo', () => {
    beforeEach(() => {
      page.mockLoad({ body: [] }).as('loadRequest');
      page.visit();
      cy.wait('@loadRequest');

      page.mockCreate().as('createRequest');
      page.newTodoField().type('First todo{enter}');
      cy.wait('@createRequest');
    });

    it('should show a new todo', () => {
      todos.assertCount(1);
    });
  });

  describe('Individual Todo Deletion', () => {
    beforeEach(() => {
      page.mockLoad().as('loadRequest');
      page.visit();
      cy.wait('@loadRequest');
    });

    it('should delete todo on success', () => {
      page.mockDelete(257334).as('deleteRequest');
      todos.deleteButton(0).click();
      cy.wait('@deleteRequest');

      todos.assertCount(4);
    });
  });

  describe('Group Todo Deletion', () => {
    beforeEach(() => {
      page.mockLoad().as('loadRequest');
      page.visit();
      cy.wait('@loadRequest');
    });

    it('should enable clear completed', () => {
      page.clearCompletedButton().should('not.be.disabled');
    });
  });

  describe('Todo Toggling', () => {
    beforeEach(() => {
      page.mockLoad().as('loadRequest');
      page.visit();
      cy.wait('@loadRequest');
    });

    it('should toggle todo', () => {
      page.mockUpdate(257334).as('updateRequest');
      todos.statusToggler(0).click();
      cy.wait('@updateRequest');
    });
  });

  describe('Toggle All Button', () => {
    beforeEach(() => {
      page.mockLoad().as('loadRequest');
      page.visit();
      cy.wait('@loadRequest');
    });

    it('should exist', () => {
      page.toggleAllButton().should('exist');
    });
  });

  describe('Renaming', () => {
    beforeEach(() => {
      page.mockLoad().as('loadRequest');
      page.visit();
      cy.wait('@loadRequest');
    });

    it('should open edit form', () => {
      todos.title(0).trigger('dblclick');
      todos.titleField(0).should('exist');
    });
  });
});