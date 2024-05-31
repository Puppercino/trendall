describe('Navigation spec', () => {
  it('navigates to home and then to browse page', () => {
    // Visit the home page
    cy.visit('https://trendall.canned.dev');

    // Click on the link to the browse page
    cy.get('a[href="/search"]').first().click();

    // Assert that the current URL is the browse page
    cy.url().should('include', '/search');
  })
})