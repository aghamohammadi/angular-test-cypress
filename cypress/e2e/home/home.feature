Feature: Home
  Scenario: visiting the home page
    When I visit home page
    Then Title should "Crud Test Angular Latest", Home link should "/", Customer link should "/customer"
    When click Home link
    Then Home click result : Title should "Crud Test Angular Latest", Home link should "/", Customer link should "/customer"
    When click Customer link
    Then Url should contain "/customer"
