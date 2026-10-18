class TabBarComponent {
  get home() { return $('~Home'); }
  get webview() { return $('~Webview'); }
  get login() { return $('~Login'); }
  get forms() { return $('~Forms'); }
  get swipe() { return $('~Swipe'); }
  get drag() { return $('~Drag'); }

  // Seletor de segurança: Título ou container principal da tela de Home do app
  get homeScreen() { return $('~Home-screen'); }

  /**
     * Garante a visibilidade e destrava a renderização da interface nativa
     */
  async assegurarRenderizacao() {
    try {
      // Tenta esperar o menu aparecer normalmente por 8 segundos
      await this.login.waitForDisplayed({ timeout: 8000 });
    } catch (e) {
      console.log('⚠️ Interface travada na nuvem. Injetando toque W3C...');

      // API MODERNA DO WDIO V9: Simula um toque físico real no centro da tela
      await browser.action('pointer', { pointerType: 'touch' })
        .move({ duration: 0, x: 200, y: 400 })
        .down({ button: 0 }) // Pressiona o dedo na tela
        .pause(100)
        .up({ button: 0 })   // Levanta o dedo da tela
        .perform();

      await browser.pause(2000);
    }
  }

  async openLogin() {
    // Executa a rotina contra telas pretas e travamentos do CI
    await this.assegurarRenderizacao();

    // Aguarda a visibilidade final do botão de login e clica
    await this.login.waitForDisplayed({ timeout: 15000 });
    await this.login.click();
  }

  async openForms() {
    // Executa a rotina contra telas pretas e travamentos do CI
    await this.assegurarRenderizacao();

    // Aguarda a visibilidade final do botão de login e clica
    await this.forms.waitForDisplayed({ timeout: 15000 });
    await this.forms.click();
  }

}

export default new TabBarComponent();
