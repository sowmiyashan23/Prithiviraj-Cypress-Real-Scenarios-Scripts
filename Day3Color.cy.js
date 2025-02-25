
describe('Verify Color Changes Before and After Interaction', () => {

    it('Verifies the color of a button before and after clicking', () => {
        // Define the button selector
        cy.visit('https://testautomationpractice.blogspot.com/');
        const buttonSelector = "button[name='start']";


        cy.get(buttonSelector)
            .should('have.css', 'background-color', 'rgb(154, 205, 50)')

        cy.get(buttonSelector).click();


      //  cy.get(buttonSelector)
        
       //     .should('have.css', 'background-color', 'rgb(255, 0, 0)');

        cy.get(buttonSelector)
            .should('have.css', 'color', 'rgb(0, 0, 0)');
    });


    it('Verifies the color of text before and after hover', () => {
        cy.visit('https://courses.ultimateqa.com/collections');

        const textSelector = "a[href='/users/sign_in']";
        cy.get(textSelector)
            .scrollIntoView()
            .should('be.visible');

        // Get the text and verify its initial color
        cy.get(textSelector)
            .should('have.css', 'color', 'rgb(161, 173, 115)')

        cy.get(textSelector)
            .trigger('mouseover')
            .trigger('mouseenter')
        cy.wait(2000)

        cy.get(textSelector)
        .should('have.css', 'color', 'rgb(161, 173, 115)')


          //  .should('have.css', 'color').and('eq', 'rgb(46, 46, 46)')

    });

    it("practice automation website", () => {
        cy.visit("https://practicetestautomation.com/practice-test-login/")
        cy.get("#username").type("student")
        cy.get("#password").type("Password123")
        cy.get("#submit").click()

        cy.document().then((doc) => {

            const initialCursor = doc.defaultView.getComputedStyle(doc.body).cursor;
            expect(initialCursor).to.equal('auto');
        });

        cy.get("li[id='menu-item-43'] a")
            .should('not.have.css', 'text-decoration', 'underline')

        cy.get("li[id='menu-item-43'] a")
            .trigger("mouseover")
            .should('have.css', 'border-bottom-width', '0px')
            .and('have.css', 'border-bottom-style', 'none')
            .and('have.css', 'border-bottom-color', 'rgb(255, 255, 255)')
            .should('have.css', 'cursor', 'pointer')

        cy.get("li[id='menu-item-43'] a")
            .trigger('mouseout')
            .should('not.have.css', 'text-decoration', 'underline')

        cy.get("li[id='menu-item-43'] a").click()
        cy.url().should("eq", "https://practicetestautomation.com/")
        cy.get("li[id='menu-item-43'] a").should("have.css", 'color', "rgb(255, 194, 112)")

    })










});