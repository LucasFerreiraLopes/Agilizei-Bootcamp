Feature: Cadastro

    Como usuário, desejo realizar um cadastro
    Para que possa acessar o sistema


Scenario: Cadastro de usuário no site
    Given que acesso o site 
    When Informar meus dados
    And Salvar
    Then devo ser cadastrado com sucesso



# Given -> Contexto
# When - Ação executada
# Then  - Resultado esperado
# And - continuidade do passo anterior