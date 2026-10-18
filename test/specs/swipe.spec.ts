import allureReporter from '@wdio/allure-reporter';
import SwipePage from '../pageobjects/swipe.page.js';

describe('Native Demo App - Tela de Swipe', () => {

  beforeEach(async () => {
    allureReporter.addEpic('Mobile Apps');
    allureReporter.addFeature('Gestos e Movimentos');

    await SwipePage.menu.openSwipe();
  });

  it('Deve realizar scroll vertical para baixo até encontrar o logo oculto', async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addDescription('Valida se o scroll vertical funciona perfeitamente até o fim da viewport.');

    // Garante que iniciou na tela correta antes de rolar
    await expect(SwipePage.frameLayout).toBeDisplayed();
    await expect(SwipePage.swipeHeader).toBeDisplayed();

    // Executa o scroll automatizado até o elemento alvo
    await SwipePage.scrollToLogo();

    // Valida se o logo finalmente ficou visível na tela
    await expect(SwipePage.hiddenLogo).toBeDisplayed();
  });

  it('Deve fazer swipe horizontal para avançar os cartões do carrossel', async () => {
    allureReporter.addSeverity('normal');
    allureReporter.addDescription('Simula o arrastar de dedos horizontal para navegar entre os itens do carrossel.');

    await SwipePage.scrollToCarousel();
    await expect(SwipePage.frameLayout).toBeDisplayed();
    await expect(SwipePage.swipeHeader).toBeDisplayed();
    await expect(SwipePage.carousel).toBeDisplayed();

    // Mapeia o texto do primeiro card visível (ajuste o seletor conforme o card atual)
    const firstCardText = SwipePage.firstCardText;
    await expect(firstCardText).toHaveText('FULLY OPEN SOURCE');
    // await expect(SwipePage.firstCardText).toBeDisplayed();

    // Executa o deslize para a esquerda para puxar o próximo card
    await SwipePage.swipeCarousel('left');

    // Aguarda a animação nativa do carrossel concluir
    await browser.pause(1000);

    // Valida que o texto mudou, confirmando que o carrossel se moveu
    const secondCardText = SwipePage.secondCardText;
    await expect(secondCardText).not.toHaveText('FULLY OPEN SOURCE');
    // await expect(SwipePage.secondCardText).toBeDisplayed();
  });
});
