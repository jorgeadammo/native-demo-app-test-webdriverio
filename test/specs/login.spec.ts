import allureReporter from '@wdio/allure-reporter';
import LoginPage from '../pageobjects/login.page.js';

describe('Native Demo App - Fluxo de Login', () => {

  beforeEach(async () => {
    // Garante que estamos na tela de login antes de cada teste
    await LoginPage.menu.openLogin();
  });

  it('Deve exibir um alerta de sucesso ao logar com credenciais válidas', async () => {
    // Executa a ação encapsulada no Page Object
    await LoginPage.login('jorgeadammo@gmail.com', '123SenhaForte');

    // Validações usando seletores nativos mapeados para cada plataforma
    await LoginPage.alertTitle.waitForDisplayed({ timeout: 5000 });

    await expect(LoginPage.alertTitle).toHaveText('Success');
    await expect(LoginPage.alertMessage).toHaveText('You are logged in!');

    // Limpa o estado fechando o modal
    await LoginPage.closeAlert();
  });

  it('Deve exibir mensagem de erro ao tentar logar com formato de e-mail inválido', async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addDescription('Valida se o app bloqueia a submissão e aponta erro de formato no e-mail.');

    // Envia o e-mail fora do padrão (sem @ ou .com)
    await LoginPage.login('emailInvalido', 'SenhaSegura123');

    // Valida se a mensagem de erro específica do e-mail ficou visível
    await LoginPage.emailErrorMessage.waitForDisplayed({ timeout: 5000 });
    await expect(LoginPage.emailErrorMessage).toBeDisplayed();
  });

  it('Deve exibir mensagem de erro ao tentar logar com senha curta', async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addDescription('Valida se o app rejeita senhas com menos de 8 caracteres.');

    // Envia uma senha curta (menor que 8 caracteres)
    await LoginPage.login('teste@email.com', '123');

    // Valida se a mensagem de erro da senha ficou visível
    await LoginPage.passwordErrorMessage.waitForDisplayed({ timeout: 5000 });
    await expect(LoginPage.passwordErrorMessage).toBeDisplayed();
  });

});
