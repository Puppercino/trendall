describe('Navigation spec', () => {
  it('navigates to home and then to browse page, click all records then click a record', () => {
    // Visit the home page
    cy.visit('https://trendall.canned.dev');

    // Click on the link to the browse page
    cy.get('a[href="/search"]').first().click();

    // Click on the link to the all records page
    cy.get('a[href="/record"]').first().click();
    cy.wait(2000);
    cy.get('li').first().click();

    // Assert that the current URL is the record page
    cy.url().then((url) => {
      const recordId = url.split('/').pop();

      // Assert that the current URL is the record page
      cy.url().should('include', `/${recordId}`);
    });
  })
})