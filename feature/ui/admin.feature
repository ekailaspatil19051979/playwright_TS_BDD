@admin
Feature: Admin Dashboard
  As an admin user
  I want to manage the hotel
  So that I can see messages and room bookings.

  Scenario: Successful admin login
    Given I am on the admin login page
    When I login with valid credentials
    Then I should see the admin dashboard

  @regression
  Scenario: Admin can see messages in the inbox
    Given I am on the admin login page
    And I login with valid credentials
    When I navigate to the inbox
    Then I should be able to see the contact messages

  @negative
  Scenario Outline: Admin login with invalid credentials should fails
    Given I am on the admin login page
    When I login with username "<user>" and password "<pass>"
    Then I should see an error message on the login page

    Examples:
      | user    | pass      |
      | admin   | wrong     |
      | invalid | password  |
      |         |           |
