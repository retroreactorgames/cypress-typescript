Feature: Sign Up
  Scenario: User completes a registration
    Given I access the sign up form
    When I fill the form all the asked information
    Then I verify that the form was completed successfully