import allureReporter from '@wdio/allure-reporter';
import DragPage from '../pageobjects/drag.page.js';

describe('Native Demo App - Drag and Drop', () => {

  beforeEach(async () => {
    allureReporter.addEpic('Mobile Apps');
    allureReporter.addFeature('Interações de Toque Avançadas');

    await DragPage.menu.openDrag();
    await DragPage.dragScreenHeader.waitForDisplayed({ timeout: 5000 });
    await DragPage.retryButton.waitForDisplayed({ timeout: 5000 });
    await DragPage.retryButton.click();
    await DragPage.peça(1).waitForDisplayed({ timeout: 5000 });
  });

  it('Deve conseguir arrastar uma peça do quebra-cabeça até a sua área correta', async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addDescription('Valida se o comando dragAndDrop move com precisão a peça c1-r1.');

    // Verifica se a tela carregou
    await expect(DragPage.dragScreenHeader).toBeDisplayed();

    // Arrasta a peça da Coluna 1, Linha 1 para o seu respectivo local
    await DragPage.arrastarPeçaParaDestino(1);

    // Ao ser solta no lugar correto, a peça original de "drag" desaparece da bandeja
    await expect(DragPage.peça(1)).not.toBeDisplayed();
  });

  it('Deve completar a primeira linha inteira do quebra-cabeça', async () => {
    allureReporter.addSeverity('critical');
    allureReporter.addDescription('Completa de forma encadeada a linha superior do puzzle.');

    // Executa o arrastar de três peças consecutivas da linha 1
    await DragPage.arrastarPeçaParaDestino(1);
    await DragPage.arrastarPeçaParaDestino(2);
    await DragPage.arrastarPeçaParaDestino(3);

    // Valida que nenhuma delas está mais disponível para arrastar
    await expect(DragPage.peça(1)).not.toBeDisplayed();
    await expect(DragPage.peça(2)).not.toBeDisplayed();
    await expect(DragPage.peça(3)).not.toBeDisplayed();
  });
});
