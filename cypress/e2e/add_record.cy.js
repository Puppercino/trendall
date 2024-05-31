describe('Add record spec', () => {
  it('navigates to home and then to browse page, then click show all records and add record', () => {
    // Visit the home page
    cy.visit('https://trendall.canned.dev');

    // Click on the link to the browse page
    cy.get('a[href="/search"]').first().click();

    // Click on the link to the all records page then add record page
    cy.get('a[href="/record"]').first().click();
    cy.get('a[href="/add_record"]').first().click();

    // Enter the record details
    cy.get('input[placeholder="Reference number"]').type('101');
    cy.get('input[placeholder="Shape"]').type('Testing');

    // Submit the form
    cy.get('button[type="submit"]').click();
  })
})