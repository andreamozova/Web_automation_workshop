/// <reference types="Cypress" />

beforeEach(() => {

    cy.visit('https://www.kiwi.com/en/')
 })

 it('Stage 1', () => {
     //agree to cookie
     cy.get('#cookie_consent').find('[role="dialog"]').find('[type="button"]').contains('Accept').click()
     cy.get('[type="checkbox"]').uncheck({force: true})
     //search flight to london
     cy.get('[data-test="PlacePickerInput-destination"]').find('[data-test="SearchField-input"]').type('London')
     //chcela som urobit .type('London{enter}') ale vtedy mi to davalo moznost anywhere co uprimne som nedosla an to preco sa deje 
     //takze som spravila toto
     cy.get('[data-test="PlacepickerModalOpened-destination"]').find('[data-test="PlacePickerRow-wrapper"]').eq(0).click()
     cy.get('[data-test="LandingSearchButton"]').click()
     //set currency to usd
     cy.get('[data-test="RegionalSettingsButton"]').contains('EUR').click()
     cy.get('[data-state="ok"]').eq(1).select('United States dollar - USD')
     cy.get('[data-test="SubmitRegionalSettingsButton"]').contains('Save & continue').click()
     //hit book on the first result
     cy.get('[data-test="ResultList-results"]').find('[data-test="BookingButton"]').eq(0).click()
     //assert that the currency is usd
     cy.get('[data-test="ReservationBill-box"]').should('have.contain', 'USD').should('have.contain', '$')
 })

 it('Stage 2', () => {
    //set cookies to agreed and currency to USD using cookies only -> nasla som si k tomu veci na internete ale este som s tym nepracovala
    //a citim sa momentalne prilis choro na to to studovat. Ak to nespravime na kurze urcite si to pozriem ked sa budem citit lepsie
    cy.log('nieco')
 })

 it('Stage 3', () => {
    cy.get('#cookie_consent').find('[role="dialog"]').find('[type="button"]').contains('Accept').click()
    cy.get('[data-test="RegionalSettingsButton"]').contains('EUR').click()
    cy.get('[data-state="ok"]').eq(2).select('United States dollar - USD')
    cy.get('[data-test="SubmitRegionalSettingsButton"]').contains('Save & continue').click()
    //multiple ways to assert that currecy is USD
    cy.get('[data-test="RegionalSettingsButton"]').should('have.contain', 'USD')
    cy.get('[data-test="RegionalSettingsButton"]').should('include.text', 'USD')
    //pouzit expect
 })

 it.only('Stage 4', () => {
    cy.get('#cookie_consent').find('[role="dialog"]').find('[type="button"]').contains('Accept').click()
    cy.get('[type="checkbox"]').uncheck({force: true})
    //make flight search for 3 adults
    cy.get('[data-test="PassengersField-note-1"]').eq(0).click()
    cy.get('[data-test="PassengersRow-adults"]').find('[type="button"]').eq(1).click().click()
    cy.get('[data-test="PassengersFieldFooter-done"]').click()
    cy.get('[data-test="PlacePickerInput-destination"]').find('[data-test="SearchField-input"]').type('London')
    cy.get('[data-test="PlacepickerModalOpened-destination"]').find('[data-test="PlacePickerRow-wrapper"]').eq(0).click()
    cy.get('[data-test="LandingSearchButton"]').click()
    //assert same passenger count on the booking page
    cy.get('[data-test="PassengersField-note-3"]').should('have.contain', '3')   
 })

 it('Stage 5', () => {
    cy.get('#cookie_consent').find('[role="dialog"]').find('[type="button"]').contains('Accept').click()
    //expand the test so it accepts input parameter for currency -> neviem co sa tym mysli
 })