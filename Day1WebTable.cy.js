describe('Search for Chief Marketing Officer (CMO) in Table with Pagination', () => {
  const searchData = 'Chief Marketing Officer (CMO)'; // The role you're looking for
  let found = false; 
  let currentPage = 1; 
  const maxPages = 6; 

  it('should find Chief Marketing Officer (CMO) and log its details', () => {
    cy.visit('http://makeseleniumeasy.com/2020/05/09/storing-web-table-with-pagination-data-into-list-of-map-java/')

   
    while (currentPage <= maxPages && !found) {
      
      cy.get('#dtBasicExample tbody tr', { timeout: 10000 }).should('have.length.greaterThan', 0)

      cy.log(`Checking page ${currentPage}`); 

      cy.get('#dtBasicExample tbody tr').each(($row) => {
        
        const position = $row.find('td').eq(1).text().trim();

  
        if (position === searchData) {
          const name = $row.find('td').eq(0).text().trim();
          const office = $row.find('td').eq(2).text().trim();
          const age = $row.find('td').eq(3).text().trim(); 
          const startDate = $row.find('td').eq(4).text().trim();
          const salary = $row.find('td').eq(5).text().trim(); 

          cy.log(`Found ${searchData} on page ${currentPage}: Name = ${name}, Office = ${office}, Age = ${age}, Start Date = ${startDate}, Salary = ${salary}`);
          found = true; 
          return false;
        }
      });

      if (!found && currentPage < maxPages) {
        
        cy.get('#dtBasicExample_paginate .paginate_button').contains(currentPage + 1, { timeout: 5000 }).click();
        cy.log(`Navigating to page ${currentPage + 1}`); 
        currentPage++;
      }
    }

    
    if (!found) {
      cy.log(`Could not find ${searchData} after checking ${maxPages} pages.`);
    }
  });


  it('Retrieves and validates data from the DataTable', () => {
    cy.visit('http://makeseleniumeasy.com/2020/05/09/storing-web-table-with-pagination-data-into-list-of-map-java/');


    cy.get('#dtBasicExample tbody tr').each(($row, index, $rows) => {
     
      cy.wrap($row).find('td').eq(0).invoke('text').then((name) => {
        
        cy.log('Name:', name);
        expect(name).to.not.be.empty;
      });

      cy.wrap($row).find('td').eq(1).invoke('text').then((position) => {
       
        cy.log('Position:', position);
        expect(position).to.not.be.empty;
      });

      cy.wrap($row).find('td').eq(2).invoke('text').then((office) => {
       
        cy.log('Office:', office);
        expect(office).to.not.be.empty;
      });

      cy.wrap($row).find('td').eq(3).invoke('text').then((age) => {
       
        cy.log('Age:', age);
        expect(age).to.not.be.empty;
      });

      cy.wrap($row).find('td').eq(4).invoke('text').then((startDate) => {
        
        cy.log('Start Date:', startDate);
        expect(startDate).to.not.be.empty;
      });

      cy.wrap($row).find('td').eq(5).invoke('text').then((salary) => {
       
        cy.log('Salary:', salary);
        expect(salary).to.not.be.empty;
      });
    });

  
    cy.get('#dtBasicExample tbody tr').first().find('td').eq(0).should('have.text', 'Airi Satou');
  });





  it('should paginate correctly', () => {
    cy.visit('http://makeseleniumeasy.com/2020/05/09/storing-web-table-with-pagination-data-into-list-of-map-java/');

    
    cy.get('#dtBasicExample tbody tr').should('have.length', 10);

    
    cy.get('#dtBasicExample_next').click();
    cy.get('#dtBasicExample tbody tr').should('have.length', 10);

    cy.get('#dtBasicExample_previous').click();
    cy.get('#dtBasicExample tbody tr').should('have.length', 10);

    cy.get('.paginate_button').contains('2').click();
    cy.get('#dtBasicExample tbody tr').should('have.length', 10);
  });



  it('should locate specific data (Yuri Berry) and log its age and salary', () => {
    
    cy.visit('http://makeseleniumeasy.com/2020/05/09/storing-web-table-with-pagination-data-into-list-of-map-java/');


    let found = false; 
    // Function to check for the data and log it
    const checkData = () => {
      cy.get('#dtBasicExample tbody tr').each(($row) => {
       
        if ($row.find('td').eq(0).text() === 'Yuri Berry') {
          
          const age = $row.find('td').eq(3).text(); 
          const salary = $row.find('td').eq(5).text(); 
          cy.log('Found Yuri Berry!');
          cy.log(`Age: ${age}`);
          cy.log(`Salary: ${salary}`);
          
        }
      });
    };
  
    const goToNextPage = () => {
      cy.get('#dtBasicExample_paginate .next').then(($next) => {
        if (!$next.hasClass('disabled')) {
          
          cy.get('#dtBasicExample_next').click();
          cy.wait(1000);
        }
      });
    };
  
    
    const searchData = () => {
      checkData(); 
  
      if (found) return; 
  
      goToNextPage();
  
      if (!found) {
        cy.get('body').then(() => {
          searchData();
        });
      }
    };
  
    searchData();
  });
  

});
