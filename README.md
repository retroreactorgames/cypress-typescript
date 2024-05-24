Cypress Test Automation

Project Setup:
1. Installing Cypress
    1.1 Download and install Node.js (For Windows users, go to https://nodejs.org/en/download/)
    1.2 Open the Terminal and go to the folder you want to create your repository
    1.3 Create a new folder for the repository with the command mkdir "RepoName"
    1.4 Run the command "npm install cypress"
    1.5 Run the command "npx cypress open" and the cypress app should start

2. Installing Typescript 
    2.1 Install typescript by running the command "npm install --save-dev typescript"
    This code will make cypress understand what type of files it should be considered a test.

3. Configure Cypress to be able to detect '.feature' files so we can write tests with Cucumber.

    Particularly, I am a big fan of writing tests with Gherkin syntax. I believe it is a great tool to create smooth communication between every member of the team and ensure that everyone can not only understand what is being tested but also participate in the quality assurance process.

    For more information about the library: https://github.com/badeball/cypress-cucumber-preprocessor 

    3.1 Install the library running the command 'npm install @badeball/cypress-cucumber-preprocessor'

Explaining the Architecture:
    Once you execute cypress, the first thing you notice is that cypress will now only accept .feature files as tests files.
    You can find the only test file in '/cypress/e2e/sign_up.feature'

    The test is written in the gherkin syntax:

    Feature: Sign Up
    Scenario: User completes a registration
        Given I access the sign up form
        When I fill the form all the asked information
        Then I verify that the form was completed successfully

    These keywords can be found in '/cypress/steps_definitions/sign_up.ts'
    In this file you will find the definition of each of the keywords used.

    To organize all the strings, locators and functions, I've decided to create separate files per page view. There are 3 files in the /cypress/support/PageObjects/'
    
    - Common.ts has the information and functions from the main page and the hamburguer menu 
    - ForEmployer.ts has information about the ForEmployer page
    - SignUp.ts has information about the whole signup process.

    Besides that, it is important to notice that I added a function to the commands.js file, this function waits for an API call before execution a cypress command. I needed to create it to make sure the system was loaded before starting my test.

Conclusion
    Thank you for the opportunity and I hope you like my solution for the automation of the signup feature. I used typescript as requested, and some integration testing as well. There is a video of the test execution in case the setup contains any problems I couldn't foresee.

Observation: 
    The test is supposed to fail on the last step. There I believe I've found a bug. I could've changed it to expect an empty body but I decided to show the test failing. This bug consists in returning a empty body for the https://api.testing.powerus.de/companies/company-contact call after a success (200).
    