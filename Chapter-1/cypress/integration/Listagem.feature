Feature: Listagem

    Como usuário desejo ver a listagem
    Para visualizar os dados de cadastro

Scenario: Listagem sem Registro
    Given Que o site não possui registro
    When Acessar a Listagem
    Then Devo visualizar a listagem vazia

Scenario: Listagem com apenas 1 Registro
    Given Que o site possui apenas 1 registro
    When Acessar a listagem
    Then Devo visualizar a listagem com apenas 1 registro
    
