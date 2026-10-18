import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */

class LoginPage extends Page {
    /**
     * Seletores da tela de login utilizando os 'Accessibility IDs' do app nativo
     */
    get emailInput() { return $('~input-email'); }
    get passwordInput() { return $('~input-password'); }
    get loginButton() { return $('~button-LOGIN'); }

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

    get emailErrorMessage() {
        return browser.isIOS
            ? $('-ios predicate string:label == "Please enter a valid email address"')
            : $('//android.widget.FrameLayout//android.widget.TextView[@text="Please enter a valid email address"]');
    }
    get passwordErrorMessage() {
        return browser.isIOS
            ? $('-ios predicate string:label == "Please enter at least 8 characters"')
            : $('//android.widget.FrameLayout//android.widget.TextView[@text="Please enter at least 8 characters"]');
    }

    /**
     * Método que realiza o fluxo completo de login
     */
    async login(email: string, password: string) {
        await this.emailInput.setValue(email);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
        return this;
    }

    /**
     * Método auxiliar para fechar o alerta nativo
     */
    async closeAlert() {
        await this.alertOkButton.waitForDisplayed({ timeout: 3000 });
        await this.alertOkButton.click();
        return this;
    }
}

export default new LoginPage();