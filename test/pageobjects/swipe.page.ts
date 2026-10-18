import { $ } from '@wdio/globals'
import Page from './page.js';

class SwipePage extends Page {
  /**
   * Elementos da tela de Swipe (Mapeados via Accessibility ID do App)
   */
  get frameLayout() {
    return browser.isIOS ? $('//XCUIElementTypeApplication') : $('id=android:id/content');
  }
  get swipeHeader() { return $('~Swipe-screen'); }
  get carousel() {
    return browser.isIOS ? $('~Carousel') : $('android=new UiSelector().resourceId("Carousel")');
  }

  get firstCardText() {
    return browser.isIOS
      ? $('-ios predicate string:label == "FULLY OPEN SOURCE"')
      : $('android=new UiSelector().text("FULLY OPEN SOURCE")');
  }
  get secondCardText() {
    return browser.isIOS
      ? $('-ios predicate string:label == "GREAT COMMUNITY"')
      : $('android=new UiSelector().text("GREAT COMMUNITY")');
  }


  // Um elemento que fica bem escondido no fim da rolagem vertical
  get hiddenLogo() { return $('~WebdriverIO logo'); }

  /**
   * Navega para a aba de Swipe
   */
  // async goToSwipeTab() {
  //   await this.swipeMenu.waitForDisplayed({ timeout: 5000 });
  //   await this.swipeMenu.click();
  //   return this;
  // }

  /**
   * Realiza um swipe vertical para baixo até encontrar o elemento oculto
   */
  async scrollToLogo() {
    if (browser.isIOS) {
      await browser.execute('mobile: scroll', {
        direction: 'down',
        name: 'WebdriverIO logo'
      });
    } else {
      await browser.execute('mobile: scroll', {
        strategy: 'accessibility id',
        selector: 'WebdriverIO logo',
        maxSwipes: 10
      });
    }
    return this;
  }

  async scrollToCarousel() {
    if (browser.isIOS) {
      await browser.execute('mobile: scroll', {
        direction: 'down',
        name: 'Carousel'
      });
    } else {
      await browser.execute('mobile: scroll', {
        strategy: '-android uiautomator',
        selector: 'new UiSelector().resourceId("Carousel")',
        maxSwipes: 10
      });
    }
    return this;
  }

  /**
   * Realiza um swipe horizontal no carrossel de cartões
   * @param direction 'left' para avançar o card ou 'right' para voltar
   */
  async swipeCarousel(direction: 'left' | 'right') {
    const carousel = await this.carousel;
    if (browser.isIOS) {
      await browser.execute('mobile: swipe', {
        element: carousel.elementId,
        direction
      });
    } else {
      await browser.execute('mobile: swipeGesture', {
        elementId: carousel.elementId,
        direction,
        percent: 0.8
      });
    }
    return this;
  }
}

export default new SwipePage();
