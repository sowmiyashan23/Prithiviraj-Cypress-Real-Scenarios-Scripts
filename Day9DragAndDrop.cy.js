import '@4tw/cypress-drag-drop';

describe('Dynamic Dropdown Validation', () => {
   
    it("drag and drop", () => {
        cy.visit("https://commitquality.com/practice-drag-and-drop")
        cy.get(".small-box ").drag(".large-box")
        cy.get(".large-box")
            .should("have.text", "Success!")
            .and('have.css', 'background-color', 'rgb(170, 255, 170)')
            .then(() => {
                cy.log('Verified large box text and background color');
            });
        cy.wait(2000)
    })
 

    it("drag and drop ", () => {
        cy.visit("https://vishalok12.github.io/jquery-dragarrange/")
        cy.get(".draggable-element.d-1").drag(".draggable-element.d-3", { force: true })
        cy.get(".draggable-element.d-2").drag(".draggable-element.d-1", { force: true })
        cy.get(".draggable-element.d-1").drag(".draggable-element.d-4", { force: true })
        cy.get(".draggable-element.d-4").drag(".draggable-element.d-3", { force: true })
        cy.wait(2000)
        cy.get('#elements-container')
            .children()
            .eq(0)
            .should('have.text', 'Drag 4')
            .invoke('text')
            .then((text) => {
                cy.log('Element at position 0: ' + text.trim()); // Log the text content
            });

        cy.get('#elements-container')
            .children()
            .eq(1)
            .should('have.text', 'Drag 3')
            .invoke('text')
            .then((text) => {
                cy.log('Element at position 1: ' + text.trim()); // Log the text content
            });

        cy.get('#elements-container')
            .children()
            .eq(2)
            .should('have.text', 'Drag 2')
            .invoke('text')
            .then((text) => {
                cy.log('Element at position 2: ' + text.trim()); // Log the text content
            });

        cy.get('#elements-container')
            .children()
            .eq(3)
            .should('have.text', 'Drag 1')
            .invoke('text')
            .then((text) => {
                cy.log('Element at position 3: ' + text.trim()); // Log the text content
            });
    });



    it("drag and drop ", () => {

        cy.visit("http://www.dhtmlgoodies.com/scripts/drag-drop-custom/demo-drag-drop-3.html");


        cy.get("#box3").should('be.visible');
        cy.get("#box106").should('be.visible');
        cy.get("#box3").drag("#box106", { force: true });
        cy.wait(1000)

        cy.get("#box5").should('be.visible');
        cy.get("#box101").should('be.visible');
        cy.get("#box5").drag("#box101", { force: true });
        cy.wait(1000)

        cy.get("#box7").should('be.visible');
        cy.get("#box105").should('be.visible');
        cy.get("#box7").drag("#box105", { force: true });
        cy.wait(1000)

        cy.get("#box2").should('be.visible');
        cy.get("#box103").should('be.visible');
        cy.get("#box2").drag("#box103", { force: true });
        cy.wait(1000)

        cy.get("#box6").should('be.visible');
        cy.get("#box107").should('be.visible');
        cy.get("#box6").drag("#box107", { force: true });
        cy.wait(1000)
    });


    it("drag and drop ", () => {

        cy.visit("https://kitchen.applitools.com/ingredients/drag-and-drop");


        const dataTransfer = new DataTransfer();

        //  Fried Chicken
        cy.get('#menu-fried-chicken')
            .trigger('dragstart', { dataTransfer });
        cy.get('#plate-items')
            .trigger('drop', { dataTransfer })
            .trigger('dragend');
        cy.wait(2000)

        cy.get('#plate-items li')
            .should('have.length', 1)
            .should('contain', 'Fried Chicken');
        cy.wait(2000)
        //  Hamburger
        cy.get('#menu-hamburger')
            .trigger('dragstart', { dataTransfer });
        cy.get('#plate-items')
            .trigger('drop', { dataTransfer })
            .trigger('dragend');
        cy.wait(2000)

        cy.get('#plate-items li')
            .should('have.length', 2)
            .should('contain', 'Hamburger');
        cy.wait(2000)
        // Ice Cream
        cy.get('#menu-ice-cream')
            .trigger('dragstart', { dataTransfer });
        cy.get('#plate-items')
            .trigger('drop', { dataTransfer })
            .trigger('dragend');
        cy.wait(2000)

        cy.get('#plate-items li')
            .should('have.length', 3)
            .should('contain', 'Ice Cream');
        cy.wait(2000)

        // Reset Order
        cy.xpath("(//button[@id='reset-button'])[1]")
            .click();


        cy.get('#plate-items li')
            .should('contain', 'Drag an item from the menu to start your order!')
            .then(($el) => {
                cy.log(`Order reset successfully: ${$el.text()}`);
            });

        cy.get('#menu-items').scrollIntoView();
        cy.wait(4000)

    });

  

});









