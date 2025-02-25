describe('Responsive Webpage Testing', () => {
    // Test different viewports
    const breakpoints = [
        { name: 'Mobile', width: 375, height: 667 },
        { name: 'Desktop', width: 1280, height: 1024 },
        { name: 'Tablet', width: 768, height: 1024 },
        { name: 'Large Desktop', width: 1920, height: 1080 }
    ];

    breakpoints.forEach((viewport) => {
        it(`Should display elements correctly on ${viewport.name} viewport`, () => {
            // Set viewport size
            cy.viewport(viewport.width, viewport.height);

            // Visit the webpage (replace with your URL)
            cy.visit('https://testautomationpractice.blogspot.com/');

            cy.document().then((doc) => {
                const pageHeight = doc.documentElement.scrollHeight;
                const middleOfPage = pageHeight / 2;
                cy.scrollTo(0, middleOfPage);
                cy.wait(2000)
                cy.scrollTo(0, pageHeight);
                cy.wait(2000)
                cy.scrollTo(0, 0)
                cy.wait(2000)
            });

            cy.document().then((doc) => {
                const pageWidth = doc.documentElement.scrollWidth;
                const middleOfPage = pageWidth / 2;
                cy.scrollTo(middleOfPage, 0);
                cy.wait(2000);
                cy.scrollTo(pageWidth, 0);
                cy.wait(2000)
                cy.scrollTo(0, 0);
                cy.wait(2000)
            });

        });
    });


    breakpoints.forEach((viewport) => {
        it(`Should display elements correctly on ${viewport.name} viewport`, () => {
            // Set viewport size
            cy.viewport(viewport.width, viewport.height);

            cy.visit('https://testautomationpractice.blogspot.com/');

            // **Textbox Validation**
            const textboxSelector = '#name';
            cy.get(textboxSelector)
                .should('be.visible')
                .type('Test input') // 
                .should('have.value', 'Test input');

            // **Radio button Validation**
            cy.get('#sunday')
                .check()
                .should('be.checked')
                .then(() => cy.log('Sunday checkbox is checked'));

            cy.get('#tuesday')
                .check()
                .should('be.checked')
                .then(() => cy.log('Tuesday checkbox is checked'));

            cy.get('#thursday')
                .check()
                .should('be.checked')
                .then(() => cy.log('Thursday checkbox is checked'));

            //  **Dropdown Validation**
            const dropdownSelector = '#country'

            cy.get(dropdownSelector)
                .select('Canada')
                .then(() => {
                    cy.log('Canada has been selected from the dropdown');
                });
            cy.wait(3000)

            //  **Date Picker Validation**
            const datePickerSelector = '#datepicker';
            const date = '02/05/2025';
            cy.get(datePickerSelector)
                .type(date)
                .log('Date selected: 02/05/2025');


            //  **Pagination Table Validation**
            cy.get('#productTable tbody tr')
                .should('have.length', 5);

            cy.get('.pagination a')
                .contains('2')
                .click()
            cy.wait(2000)
            cy.get('.pagination a').contains('2').should('have.class', 'active');
            cy.get('#productTable tbody tr')
                .should('have.length', 5)

            //  Verify the IDs or names
            cy.get('#productTable tbody tr').eq(0).find('td').eq(0).should('contain', '6')
            cy.get('#productTable tbody tr').eq(0).find('td').eq(1).should('contain', 'Bluetooth Speaker')

            //  **Checkbox Validation**
            const checkboxMale = '#male';
            const checkboxFemale = '#female';
            cy.get(checkboxMale)
                .should('be.visible')
                .check()
                .should('be.checked');

            cy.get(checkboxFemale)
                .should('not.be.checked');

            //**Double Click Validation**
            const elementSelector = "button[ondblclick='myFunction1()']";
            const elementTxtbox = " #field2";
            cy.get(elementSelector)
                .should('be.visible')
                .dblclick()

            cy.get(elementTxtbox).should('have.value', 'Hello World!');


        });
    });

});

