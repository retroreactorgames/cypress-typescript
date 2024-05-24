import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import { CommonData, CommonMethods } from '../PageObjects/Common.ts';
import { ForEmployerData } from '../PageObjects/ForEmployer.ts';
import { SignUpData, SignUpMethods } from '../PageObjects/SignUp.ts';

Given("I access the sign up form", () => {
  cy.visit(CommonData.URLs.baseUrl);

  //Since clicking right away wasn't working I needed to wait 
  //for one of the last API calls
  cy.waitAPICall(
    'GET', 
    'https://api.testing.powerus.de/accounts/authenticated', 
    'Auth'
  );

  cy.get(CommonData.Locators.menuButton).click();
  cy.get(CommonData.Locators.menu).should('be.visible');
  CommonMethods.selectMenuOptionByNumber(1);
  
  cy.get(ForEmployerData.Locators.cta).should('be.visible');
  cy.contains(ForEmployerData.Locators.cta, ForEmployerData.Strings.ForEmployerBtnString).click();
});

When("I fill the form all the asked information", () => {
  SignUpMethods.selectCardbyDataValue(SignUpData.Locators.position3_5Btn);
  cy.get(SignUpData.Locators.eletronicBtn).click();
  cy.get(SignUpData.Locators.mechanicBtn).click();

  //making sure the button is active before clicking
  cy.get(SignUpData.Locators.continueBtn).eq(0).should('not.have.attr', 'disabled');
  cy.get(SignUpData.Locators.continueBtn).eq(0).click();

  SignUpMethods.fillForm(
    SignUpData.Strings.name,
    SignUpData.Strings.surname,
    SignUpData.Strings.email,
    SignUpData.Strings.phone,
    SignUpData.Strings.company,
    SignUpData.Strings.tiktok,
  );

  //Waiting for API call after confirming the form
  SignUpMethods.listenToAPIFormResponse();
  cy.get(SignUpData.Locators.confirmFormBtn).click();
});

Then("I verify that the form was completed successfully", () => {
  cy.get(SignUpData.Locators.successImage).should('be.visible');
  cy.get(SignUpData.Locators.successTitle).should('be.visible');
  cy.get(SignUpData.Locators.sucessCTABtn).should('be.visible');
  
  //API testing (simple example of what could be tested here)

  //I noticed that the body when successful comes with a unique ID,
  // But only in some executions the body was correct and my test below
  // Was failing, but then I notice that the response was coming empty, 
  // So my test actually found a bug haha
  SignUpMethods.verifySuccessfulFormBody('formAPI'); //this found a bug, it is suppose to fail
});

