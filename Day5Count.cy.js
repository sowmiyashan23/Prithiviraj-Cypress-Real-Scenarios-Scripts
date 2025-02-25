describe('Dynamic Element Count Validation', () => {

  it('should validate list item count before and after an add action', () => {

    cy.visit('https://www.amazon.in/');

    let initialCount;
    let updatedCount;

    cy.get('#twotabsearchtextbox').type('laptop')
    cy.get('#nav-search-submit-button').click()
    cy.wait(2000)

    cy.get('#nav-cart-count')
      .should('be.visible')
      .invoke('text')
      .then((text1) => {
        initialCount = parseInt(text1.trim());
        cy.log(`Initial cart count is: ${text1}`);
      });

    cy.get('#a-autoid-1-announce').click()
    cy.get('#a-autoid-2-announce').click()
    cy.wait(1000)

    cy.get('#nav-cart-count')
      .should('be.visible')
      .invoke('text')
      .then((text2) => {
        updatedCount = parseInt(text2.trim());
        cy.log(`Updated cart count is: ${text2}`);
      });

    if (updatedCount === initialCount + 2) {
      cy.log('The cart count increased.');
    } else {
      cy.log('The cart count remained the same.');
    }

  });

  it('should validate item count after a remove action ', () => {
    cy.visit('https://www.amazon.in/');

    let initialCount;
    let updatedCount;

    cy.get('#twotabsearchtextbox').type('laptop')
    cy.get('#nav-search-submit-button').click()
    cy.wait(2000)

    cy.get('#a-autoid-1-announce').click()
    cy.get('#a-autoid-2-announce').click()
    cy.wait(1000)

    cy.get('#nav-cart-count')
      .should('be.visible')
      .invoke('text')
      .then((text1) => {
        initialCount = parseInt(text1.trim());
        cy.log(`Initial cart count is: ${text1}`);
      });

    cy.wait(5000)

    cy.get('#nav-cart').click()
    cy.xpath("(//span[@class='a-icon a-icon-small-trash'])[1]")
      .click()
    cy.xpath("(//span[@class='a-icon a-icon-small-trash'])[2]")
      .click()
    cy.wait(1000)

    cy.go('back')
    cy.get('#nav-cart-count')
      .should('be.visible')
      .invoke('text')
      .then((text2) => {
        updatedCount = parseInt(text2.trim());
        cy.log(`Updated cart count is: ${text2}`);
      });

    cy.wait(5000)
  });


  it('should validate the dynamic change of elements in a paginated table', () => {
    cy.visit('http://makeseleniumeasy.com/2020/05/09/storing-web-table-with-pagination-data-into-list-of-map-java/');

    cy.get('#dtBasicExample tbody tr')
      .should('have.length', 10)
    cy.get('#dtBasicExample tbody tr').first().find('td').then((firstRowBefore) => {
      const firstRowContentBefore = firstRowBefore.text();

      cy.get('#dtBasicExample_last')
        .click();

      cy.get('#dtBasicExample tbody tr')
        .should('have.length', 7);
      cy.get('#dtBasicExample tbody tr').first().find('td').then((firstRowAfter) => {
        const firstRowContentAfter = firstRowAfter.text();

        expect(firstRowContentBefore).to.not.equal(firstRowContentAfter);
      });


    });

  });

  it('should add a row when the Add Row button is clicked', () => {

    cy.visit('https://datatables.net/examples/api/add_row.html');

    let initialRowCount;

    cy.get('table#example tbody tr')
      .should('have.length', 1)
      .then((rowsBefore) => {
        initialRowCount = rowsBefore.length;
        cy.log(`Initial row count: ${initialRowCount}`);

        // Loop to add new rows
        for (let i = 0; i < 3; i++) {
          cy.xpath("(//button[normalize-space()='Add new row'])[1]").click();
          cy.log(`Clicked 'Add new row' button - Iteration ${i + 1}`);
        }

        // Validate row count
        cy.get('table#example tbody tr').should('have.length', 4).then(() => {
          cy.log('Row count after adding new rows: 4');
        });

        // Validate column count in the last row
        cy.get('table#example tbody tr').last().within(() => {
          cy.get('td').should('have.length', initialRowCount + 4).then(() => {
            cy.log(`Column count in the last row: ${initialRowCount + 4}`);
          });
        });

        // Optional: Validate the values of the new row
        cy.get('table#example tbody tr').last().within(() => {
          cy.get('td').eq(0).should('have.text', '4.1');
          cy.get('td').eq(1).should('have.text', '4.2');
          cy.get('td').eq(2).should('have.text', '4.3');
          cy.get('td').eq(3).should('have.text', '4.4');
          cy.log('Validated the values of the new row: 4.1, 4.2, 4.3, 4.4');
        });

      });

  });

});








