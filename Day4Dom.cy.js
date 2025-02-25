describe("handling dom",()=>
    {
        it("DOM structure",()=>
        {
            cy.visit("https://www.lambdatest.com/selenium-playground/shadow-dom")
            cy.get('shadow-signup-form').shadow()
            .find("[name='username']").type("zade meadows")
            .should("have.value","zade meadows")
    
            cy.get('shadow-signup-form').shadow()
            .find("[name='email']").type("bala@gmail.com")
            .should("have.value","bala@gmail.com")
    
            cy.get('shadow-signup-form').shadow()
            .find("[name='password']").type("bala123")
            .should("have.value","bala123")
    
            cy.get('shadow-signup-form').shadow()
            .find("[name='confirm_password']").type("bala123")
            .should("have.value","bala123")
    
            cy.get('shadow-signup-form').shadow()
            .find("[type='button']").click()
    
            cy.get('#shadow_host').shadow()
            .find("input[type='text']").type("Alex volkav")
            .should("have.value","Alex volkav")
    
            cy.get('#shadow_host').shadow()
            .find("input[type='email']").type("ana@gmai.com")
            .should("have.value","ana@gmail.com")
    
        })
        it.only("nested shadow Dom",()=>
        {
            cy.visit("https://shop.polymer-project.org/")
            cy.get('shop-app').shadow()
            .find("shop-home").should("be.visible")
    
            cy.get('shop-app')  
            .shadow()  
            .find('shop-home')  
            .shadow()  
            .find("shop-image") 
            .first()  
            .should('be.visible')  
            .click();  
            cy.url().should("eq","https://shop.polymer-project.org/list/mens_outerwear")
            cy.go("back")
            cy.get('shop-app')  
            .shadow()  
            .find('shop-home')  
            .shadow()  
            .find("shop-image") 
            .eq(2)  
            .should('be.visible')  
            .click();  
            cy.url().should("eq","https://shop.polymer-project.org/list/mens_tshirts")
            cy.go('back')
    
            cy.get('shop-app').shadow()  
            .find('shop-home') .shadow()  
            .find("shop-image").eq(3) 
            .should('be.visible')  
            .click(); 
            
             })
    })