import allureReporter from '@wdio/allure-reporter';
import { FormsPage } from '../pageobjects/index.js';

describe('Native Demo App - Preenchimento de Formulário', () => {

  beforeEach(async () => {
    allureReporter.addEpic('Mobile Apps');
    allureReporter.addFeature('Formulários Nativos');

    await FormsPage.menu.openForms();
    await FormsPage.formsScreenHeader.waitForDisplayed({ timeout: 15000 });
  });

  it('Deve digitar no campo de texto e validar o espelhamento em tempo real', async () => {
    allureReporter.addSeverity('critical');
    allureReporter.addDescription('Valida se o texto digitado é replicado corretamente no rótulo inferior.');

    const textoParaDigitar = 'Automação WebdriverIO Mobile';

    await FormsPage.inputField.setValue(textoParaDigitar);

    // O aplicativo possui um campo de texto que espelha o valor digitado
    await expect(FormsPage.inputResult).toHaveText(textoParaDigitar);
  });

  it('Deve interagir com a chave Switch alternando seus estados', async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addDescription('Liga e desliga o componente Switch validando a alteração dos rótulos de estado.');

    // Força o Switch a ligar (ON)
    await FormsPage.setSwitchState(true);
    await expect(FormsPage.switchText).toHaveText('Click to turn the switch OFF');

    // Força o Switch a desligar (OFF)
    await FormsPage.setSwitchState(false);
    await expect(FormsPage.switchText).toHaveText('Click to turn the switch ON');
  });

  it('Deve selecionar uma opção no Dropdown e submeter o formulário', async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addDescription('Seleciona um item da lista suspensa nativa e valida a abertura do modal ativo.');

    // 1. Seleciona a opção desejada no componente Dropdown personalizado do app
    await FormsPage.selectDropdownOption('webdriverio');

    // 2. Clica no botão de submissão (Active Button)
    await FormsPage.activeButton.click();

    // 3. Valida e fecha o alerta nativo do sistema operacional
    await FormsPage.alertTitle.waitForDisplayed({ timeout: 5000 });
    await expect(FormsPage.alertTitle).toHaveText('This button is');
    await expect(FormsPage.alertMessage).toHaveText('This button is active');

    await FormsPage.alertOkButton.click();
  });
});
