/// <reference types="Cypress" />


 it('Stage 1', () => {
    const destination = 'London'
    window.localStorage.setItem('bookingcom_extension_default', 'false')
    cy.visit('https://www.kiwi.com/en/')
     //agree to cookies
     cy.contains('button', 'Accept').click()
     //search flight to london
     cy.get('[data-test="PlacePickerInput-destination"]').find('[data-test="SearchField-input"]').type(destination)
     cy.get('[data-test="PlacepickerModalOpened-destination"]').should('be.visible').contains(destination).click()
     cy.get('[data-test="LandingSearchButton"]').click()
     //set currency to usd
     cy.get('[data-test="RegionalSettingsButton"]').contains('EUR').click()
     cy.get('[data-state="ok"]').eq(1).select('United States dollar - USD')
     cy.get('[data-test="SubmitRegionalSettingsButton"]').contains('Save & continue').click()
     //hit book on the first result
     cy.get('[data-test="ResultCardWrapper"]').first().find('[data-test="BookingButton"]').click()
     cy.get('[data-test="MagicLogin-GuestTextLink"]').click() 
     //assert that the currency is usd
     cy.get('[data-test="ReservationBill-box"]').should('have.contain', 'USD').should('have.contain', '$')
 })

 it('Stage 2', () => {
    cy.setCookie('__kwc_agreed', 'true') 
    cy.setCookie('preferred_currency', 'usd')
    cy.visit('https://www.kiwi.com/en/')
 })

 it('Stage 3', () => {
    cy.setCookie('__kwc_agreed', 'true')
    cy.setCookie('preferred_currency', 'usd')
    cy.visit('https://www.kiwi.com/en/')
    //multiple ways to assert that currecy is USD
    cy.get('[data-test="RegionalSettingsButton"]').should('have.contain', 'USD')
    cy.get('[data-test="RegionalSettingsButton"]').should('include.text', 'USD')
   
 })

 it('Stage 4', () => {
   const destination = 'London'
    window.localStorage.setItem('bookingcom_extension_default', 'false')
    cy.setCookie('__kwc_agreed', 'true')
    cy.visit('https://www.kiwi.com/en/')
    //make flight search for 3 adults
    cy.get('[data-test="PassengersField-note-1"]').eq(0).click()
    cy.get('[data-test="PassengersRow-adults"]').find('[type="button"]').eq(1).click().click()
    cy.get('[data-test="PassengersFieldFooter-done"]').click()
    cy.get('[data-test="PlacePickerInput-destination"]').find('[data-test="SearchField-input"]').type(destination)
    cy.get('[data-test="PlacepickerModalOpened-destination"]').should('be.visible').contains(destination).click()
    cy.get('[data-test="LandingSearchButton"]').click()
    //assert same passenger count on the booking page
    cy.get('[data-test="PassengersField-note-3"]').should('have.contain', '3')  
    cy.get('[data-test="ResultCardWrapper"]').first().find('[data-test="BookingButton"]').click() 
    cy.get('[data-test="MagicLogin-GuestTextLink"]').click() 
    cy.get('[data-test="ReservationBill-item-passenger"]').find('span').first().should('have.contain', '3')
 })



 it('Stage 5', () => {
   var currency = window.prompt("Enter desired currency in capital letter shortcut: ");
   cy.setCookie('__kwc_agreed', 'true')
   cy.setCookie('preferred_currency', currency)

   cy.visit('https://www.kiwi.com/en/')
   cy.get('[data-test="RegionalSettingsButton"]').should('include.text', currency)
 })