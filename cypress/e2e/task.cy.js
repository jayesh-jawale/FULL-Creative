describe("Task for FULL Creative", () => {
  let scope = {};

  before(() => {
    scope.baseUrl = Cypress.env("baseUrl");
    cy.viewport(1920, 1080);

    cy.intercept("POST", "https://trello.com/1/boards").as("postBoards");
    cy.intercept(
      "POST",
      "https://api-gateway.trello.com/gateway/api/gasv3/api/v1/batch"
    ).as("postAPIGatewayTrelloBatch");
    cy.intercept("POST", "https://api.atlassian.com/metal/ingest").as(
      "postIngest"
    );
    cy.intercept(
      "POST",
      "https://id.atlassian.com/gateway/api/gasv3/api/v1/batch"
    ).as("postBatch");

    // Login
    cy.login(scope.baseUrl, Cypress.env("username"), Cypress.env("password"));
  });

  after(() => {
    // Logout
    cy.logout();
  });

  it("Create new board and perform actions", () => {
    // Create new board
    cy.get('[data-testid="create-board-tile"]').click();
    cy.get('[data-testid="create-board-title-input"]').type("Demo Board");
    cy.get('[data-testid="create-board-submit-button"]').click({
      scrollBehavior: "top",
    });
    cy.wait(["@postBoards", "@postAPIGatewayTrelloBatch"]);

    // Create new list A
    cy.get("#board form").click({ force: true });
    cy.get('input[name="name"]').type("A");
    cy.get('input[type="submit"]').click();

    // Create new list B
    cy.get("#board form").click({ force: true });
    cy.get('input[name="name"]').type("B");
    cy.get('input[type="submit"]').click();

    // Add card in list A
    cy.contains("span", "Add a card")
      .trigger("mouseover")
      .click({ animationDistanceThreshold: 20 });
    cy.get(".card-composer textarea").type("{enter}");
    cy.get(".card-composer textarea").type("Drag&Drop");
    cy.get('input[value="Add card"]').click();

    // Drag and Drop
    cy.get(".js-card-details").drag("#board > div:nth-child(2) > div", {
      source: { x: 100, y: 100 }, // applies to the element being dragged
      target: { position: "right" }, // applies to the drop target
      force: true, // applied to both the source and target element
    });
  });
});
