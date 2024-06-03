describe('Add filter spec', () => {
  it('navigates to home and then to browse page, then add a filter', () => {
    // Visit the home page
    cy.visit('https://trendall.canned.dev')

    // Click on the link to the browse page
    cy.get('a[href="/search"]').first().click();

    // Apply some filters
    cy.contains('button', 'Shape').click();
    cy.contains('button', 'Alabastra').click();
    cy.contains('button', 'With Images').click();

    // Check that the search results are displayed
    cy.get('ul').children().should('have.length.greaterThan', 0);
  })
})