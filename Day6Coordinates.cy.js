describe('Verify element position with co ordinates', () => {
    it('Click the element with the exact position', () => {

        cy.visit('https://testautomationpractice.blogspot.com/')
        cy.get("button[name='start']").then($element => {

            const rect = $element[0].getBoundingClientRect()

            cy.log('Position from the top of the viewport:', rect.top)
            cy.log('Position from the left of the viewport:', rect.left)
            cy.log('Elements Width:', rect.width)
            cy.log('Elements Height:', rect.height)

            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2

            // Use the center (centerX, centerY) to click
            cy.get('body')
                .click(centerX, centerY)

            cy.wait(4000)

        })
    })


    it('Enter a value to a exact position', () => {

        cy.visit('https://testautomationpractice.blogspot.com/')

        const top = 397.88751220703125
        const left = 50
        const width = 590
        const height = 38

        cy.log('Position from the top of the viewport:', top)
        cy.log('Position from the left of the viewport:', left)
        cy.log('Elements Width:', width)
        cy.log('Elements Height:', height)

        const centerX = left + width / 2
        const centerY = top + height / 2

        // Use the center (centerX, centerY) to click
        cy.get('body')
            .click(centerX, centerY)
            .type("prithivi")

        cy.wait(4000)

    })

    it("scrolling the page using coordinates", () => {
        cy.visit("https://testautomationpractice.blogspot.com/")
        cy.document().then((doc) => {
            const pageHeight = doc.documentElement.scrollHeight;
            const middleOfPage = pageHeight / 2;
            cy.scrollTo(0, middleOfPage);
            cy.wait(4000)
            cy.scrollTo(0, pageHeight);
            cy.wait(4000)
        });
        cy.scrollTo(0, 0)
        cy.window().its('scrollY').should('equal', 0);
    })

    it("Enter a value at the specified x and y location", () => {
        cy.visit("https://testautomationpractice.blogspot.com/")

        const x = 50;
        const y = 625.7999877929688;

        cy.document().then((doc) => {
            const element = doc.elementFromPoint(x, y);

            cy.wrap(element).click();
            cy.wrap(element).type('Hello, Cypress!');

        });
    });







})


