describe('Amazon.in Scrollbar Automation', () => {



    it('WebTable Horizontal Scroll', () => {

        cy.visit('https://www.w3schools.com/howto/howto_css_table_responsive.asp');
        cy.log('Scrolling the container into view...')

        // Scroll the container itself into view
        cy.get('div[style="overflow-x:auto;"]')
            .should('be.visible')
            .scrollIntoView({ duration: 3000 })
            .then(() => {
                cy.log('Container is now in view!');
            });
        cy.wait(3000);

        // Scroll to the right inside the container
        cy.get('div[style="overflow-x:auto;"]')
            .scrollTo('right') // Scroll to the right
            .then(() => {
                cy.log('Container scrolled to the right');
            });
        cy.wait(3000);

        // Scroll to the middle inside the container
        cy.get('div[style="overflow-x:auto;"]')
            .scrollTo('center') // Scroll to the center
            .then(() => {
                cy.log('Container scrolled to the center');
            });
        cy.wait(3000);


    });



    it('WebTable Vertical Scroll', () => {

        cy.visit('https://datatables.net/examples/basic_init/scroll_xy.html')

        const tableBody = '.dt-scroll-body';

        // log the first name and last name from the visible rows
        const logVisibleFirstAndLastName = () => {
            cy.get('table#example tbody tr').each(($row) => {

                if ($row.is(':visible')) {
                    const firstName = $row.find('td').eq(0).text();
                    const lastName = $row.find('td').eq(1).text();
                    cy.log('Visible First Name: ' + firstName + ' | Visible Last Name: ' + lastName);
                }
            });
        };


        cy.get(tableBody).then(($tableBody) => {
            const scrollHeight = $tableBody[0].scrollHeight;
            const clientHeight = $tableBody[0].clientHeight;

            // Log scrolling to the bottom
            cy.log('Scrolling to bottom...');
            cy.get(tableBody).scrollTo(0, scrollHeight - clientHeight);
            cy.wait(2000); // Wait for 2 seconds to simulate scrolling

            logVisibleFirstAndLastName();

            // Log scrolling to the top
            cy.log('Scrolling to top...');
            cy.get(tableBody).scrollTo(0, 0);
            cy.wait(2000); // Wait for 2 seconds

            logVisibleFirstAndLastName();

            // Log scrolling to the middle
            const middlePosition = (scrollHeight / 2) - (clientHeight / 2);
            cy.log('Scrolling to middle...');
            cy.get(tableBody).scrollTo(0, middlePosition);

            logVisibleFirstAndLastName();
        });
    });






    it.only('should validate page and table scrollbars', () => {

        cy.visit('https://testautomationpractice.blogspot.com/')

        // 1. Check if the webpage has a vertical scrollbar
        cy.window().then((win) => {
            const hasVerticalScrollbar = win.document.documentElement.scrollHeight > win.innerHeight;
            expect(hasVerticalScrollbar).to.be.true; // Change to .be.false based on your expected result
        });

        // 2. Check if the webpage has a horizontal scrollbar
        cy.window().then((win) => {
            const hasHorizontalScrollbar = win.document.documentElement.scrollWidth > win.innerWidth;
            expect(hasHorizontalScrollbar).to.be.true; // Change to .be.false based on your expected result
        });

        // 3. Check if the table has a vertical scrollbar
        cy.get('#colors')
          // .should('have.css', 'overflow-y', 'auto') // Ensure it's scrollable vertically
            .then(($table) => {
                const scrollHeight = $table[0].scrollHeight;
                const clientHeight = $table[0].clientHeight;
                expect(scrollHeight).to.be.greaterThan(clientHeight); // Scrollbar should exist if scrollHeight > clientHeight
            });



        // 5. Simulate scrolling on the page
        cy.scrollTo('bottom'); // Scroll to bottom of the page
        cy.scrollTo('top'); // Scroll to top of the page

        // 6. Simulate scrolling inside the table
        cy.get('#colors').scrollTo('bottom').then(() => {
            cy.get('#colors option').each(($option) => {
              // Check if the option is visible
              if ($option.is(':visible')) {
                cy.log('Visible option at bottom:', $option.text());
              }
            });
          });
        
          // 8. Log visible data when scrolled to the top of the table
          cy.get('#colors').scrollTo('top').then(() => {
            cy.get('#colors option').each(($option) => {
              // Check if the option is visible
              if ($option.is(':visible')) {
                cy.log('Visible option at top:', $option.text());
              }
            });
          });
        // 7. Verify that the table is scrolled down
        cy.get('#colors').scrollTo('bottom');
        cy.get('#colors option').first().should('not.be.visible');
    

        // 8. Verify that scrolling inside the table hides some options
        cy.get('#colors').scrollTo('top');
        cy.get('#colors option').last().should('not.be.visible');
    });









});
