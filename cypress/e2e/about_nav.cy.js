describe('Navigation spec', () => {
  it('navigates to home and then to about page', () => {
    // Visit the home page
    cy.visit('https://trendall.canned.dev');

    // Click on the link to the about page
    cy.get('a[href="/about"]').first().click();

    // Assert that the current URL is the about page
    cy.url().should('include', '/about');
  })
})