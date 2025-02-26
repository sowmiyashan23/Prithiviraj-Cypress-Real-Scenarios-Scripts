describe('Dynamic Dropdown Validation', () => {
    it('validate the google search dropdown', () => {

        cy.visit('https://www.google.co.in/');
        cy.wait(1000);
        cy.get('#APjFqb')
            .type('Cypress');


        cy.get('div.wM6W7d>span')
            .should('be.visible');
            cy.wait(1000);
        cy.get('div.wM6W7d>span').should('have.length.greaterThan', 0).then(($options) => {

            cy.wrap($options).each(($option, index) => {

                const optionText = $option.text();
                cy.log(`Option ${index + 1}: ${optionText}`);
            });

            const optionsCount = $options.length;
            cy.log('Number of options in the dropdown: ' + optionsCount);

            expect(optionsCount).to.be.greaterThan(2);

            //cy.wrap($options[2]).click();
        });


    });



    it("validate the dropdown menu", () => {
        cy.visit("https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html")
        cy.wait(1000);
        cy.get('#dropdowm-menu-1')
            .children('option')
            .should('have.length', 4)
            .each(($option, index) => {
                cy.log($option.text());
            });

        cy.get('#dropdowm-menu-1')
            .select(2);
        cy.get('#dropdowm-menu-1')
            .should('have.value', 'python');


            cy.wait(1000);
        cy.get('#dropdowm-menu-2')
            .children('option')
            .should('have.length', 4)
            .each(($option, index) => {

                cy.log($option.text());
            });


        cy.get('#dropdowm-menu-2')
            .select(2);

        cy.get('#dropdowm-menu-2')
            .should('have.value', 'testng');  

            cy.wait(1000);
            cy.get('#dropdowm-menu-3')
            .children('option')  
            .should('have.length', 4)  
            .each(($option, index) => {
              cy.log($option.text());
            });
    
          cy.get('#dropdowm-menu-3')
            .select(2); 
      
          cy.get('#dropdowm-menu-3')
            .should('have.value', 'javascript');  

    })

    it("Validate Country Dropdown", () => {
        cy.visit("https://codenboxautomationlab.com/practice/")
        cy.wait(1000);
        cy.get("#autocomplete").eq(0).click()

        cy.get('#autocomplete')
            .eq(0)
            .type('ca')
            cy.wait(1000);

        cy.get('.ui-autocomplete li').then(($options) => {
            const countries = [];

            $options.each((index, option) => {
                countries.push(option.innerText.trim()); // Store country names in the array
            });

            //  the total number of countries
            const totalCountries = countries.length;
            cy.log('Total number of available countries: ' + totalCountries);

            // Log the available countries
            cy.log('Available countries:');
            countries.forEach(country => {
                cy.log(country); // Log each country name
            });


            // Click on the 10th Option 
            const countryToClick = countries[9];
            cy.get('.ui-autocomplete li').eq(9).click()

            cy.log('Selected country: ' + countryToClick);

            cy.get('#autocomplete')
                .should('have.value', countryToClick)

        })



    });
    it(' validate the dropdown in wikipedia page', () => {
        cy.viewport(1280, 1024);

        cy.visit('https://en.wikipedia.org/wiki/Main_Page');
        cy.wait(3000)

        cy.get('#p-search')
            .click()
        cy.get('#p-search')
            .type("ch")


        cy.get('.cdx-menu__listbox')
            .find('li')
            .then((suggestions) => {

                const suggestionCount = suggestions.length;
                cy.log(`Total Suggestions Count: ${suggestionCount}`);


                suggestions.each((index, suggestion) => {
                    cy.log(`Suggestion ${index + 1}: ${suggestion.innerText}`);
                });
            });



        //Select the 4th suggestion (index 3)
        cy.get('.cdx-menu__listbox')
            .find('li')
            .eq(3)
            .click();


        cy.url().should('include', 'ChatGPT');

        cy.get("h1[id='firstHeading'] span[class='mw-page-title-main']")
            .should("be.visible")


    });


})








