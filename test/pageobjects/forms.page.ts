import Page from './page.js';

class FormsPage extends Page {
  /**
   * Seletores da Tela de Forms (Accessibility IDs)
   */
  get formsScreenHeader() { return $('~Forms-screen'); }
  get inputField() { return $('~text-input'); }
  get inputResult() { return $('~input-text-result'); }
  get switchComponent() { return $('~switch'); }
  get switchText() { return $('~switch-text'); }
  get dropdownComponent() { return $('~Dropdown'); }
  get activeButton() { return $('~button-Active'); }

  get alertTitle() {
    return browser.isIOS
      ? $('//XCUIElementTypeAlert//XCUIElementTypeStaticText[1]')
      : $('android=new UiSelector().resourceId("com.wdiodemoapp:id/alert_title")');
  }
  get alertMessage() {
    return browser.isIOS
      ? $('//XCUIElementTypeAlert//XCUIElementTypeStaticText[2]')
      : $('id=android:id/message');
  }
  get alertOkButton() {
    return browser.isIOS
      ? $('//XCUIElementTypeAlert//XCUIElementTypeButton[1]')
      : $('id=android:id/button1');
  }

  /**
   * Opções do menu suspenso nativo do aplicativo
   */
  get dropdownOptionWebdriverIO() {
    return browser.isIOS
      ? $('-ios predicate string:label == "webdriver.io is awesome"')
      : $('//android.widget.FrameLayout//android.widget.CheckedTextView[@text="webdriver.io is awesome"]');
  }
  get dropdownOptionAppium() {
    return browser.isIOS
      ? $('-ios predicate string:label == "Appium is awesome"')
      : $('//android.widget.FrameLayout//android.widget.CheckedTextView[@text="Appium is awesome"]');
  }

  /**
   * Altera o estado do Switch apenas se ele não estiver no estado desejado
   */
  async setSwitchState(turnOn: boolean) {
    const isCurrentlyOn = (await this.switchText.getText()).trim() === 'Click to turn the switch OFF';
    if (turnOn !== isCurrentlyOn) {
      await this.switchComponent.click();
    }
  }

  /**
   * Seleciona uma opção específica no Dropdown
   */
  async selectDropdownOption(option: 'webdriverio' | 'appium') {
    await this.dropdownComponent.click();
    if (option === 'webdriverio') {
      await this.dropdownOptionWebdriverIO.waitForDisplayed({ timeout: 5000 });
      await this.dropdownOptionWebdriverIO.click();
    } else {
      await this.dropdownOptionAppium.waitForDisplayed({ timeout: 5000 });
      await this.dropdownOptionAppium.click();
    }
  }
}

export default new FormsPage();
