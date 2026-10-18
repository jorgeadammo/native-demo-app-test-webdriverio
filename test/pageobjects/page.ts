import tabBarComponent from './components/tabBar.component.js';

export default class Page {
    // Injeta o componente para que qualquer página filha tenha acesso a ele
    public menu = tabBarComponent;

    /**
     * Espera um tempo padrão para estabilização de animações nativas
     */
    async pause(ms: number = 1000) {
        await browser.pause(ms);
    }

    /**
     * Captura um print customizado que será anexado ao Allure
     */
    async takeScreenshot(name: string) {
        await browser.takeScreenshot();
    }
}
