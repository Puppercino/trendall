describe('Edit record spec', () => {
  it('navigates to home and then to browse page, then a record and edit record', () => {
    // Visit the home page
    cy.visit('https://trendall.canned.dev');

    // Click on the link to the browse page
    cy.get('a[href="/search"]').first().click();

    // Find a record to edit
    cy.get('input[placeholder="General search term..."]').type('Testing');
    cy.get('button[type="submit"]').click();

    cy.wait(2000);
    cy.get('li').first().click();

    // Click on the link to the edit record page
    cy.url().then((url) => {
      const recordId = url.split('/').pop();

      // Click on the link to the edit record page
      cy.get(`a[href="/edit_record/${recordId}"]`).first().click();

      // Edit the record details
      cy.get('input[value="101"]').clear().type('102');
      cy.get('input[value="Testing"]').clear().type('Testing 2');

      // Submit the form
      cy.get('button').click();

      // Assert that the current URL is the record page
      cy.url().should('include', `/record/${recordId}`);
    });
  })
})