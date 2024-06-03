describe('Search for a record spec', () => {
  it('navigates to home and then to browse page, then add a search term and search', () => {
    // Visit the home page
    cy.visit('https://trendall.canned.dev');

    // Click on the link to the browse page
    cy.get('a[href="/search"]').first().click();

    // Type in a search term
    cy.get('input[placeholder="General search term..."]').type('Alabastra');
    cy.get('button[type="submit"]').click();

    // Check that the search results are displayed
    cy.get('ul').children().should('have.length.greaterThan', 0);

  })
})