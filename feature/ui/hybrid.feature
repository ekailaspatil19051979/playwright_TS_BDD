Feature: Hybrid API & UI Integration
  As an admin
  I want to see messages sent via API in the UI
  So that I can verify full system integration.

  @hybrid
  Scenario: Verify API created message appears in Admin Inbox
    Given I create a message via API with subject "High Priority Inquiry"
    And I am on the admin login page
    When I login with valid credentials
    And I navigate to the inbox
    Then I should see the message with subject "High Priority Inquiry"
