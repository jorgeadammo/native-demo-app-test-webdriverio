import { $ } from '@wdio/globals'
import Page from './page.js';

class DragPage extends Page {
  /**
   * Elemento estrutural para garantir que estamos na tela correta
   */
  get dragScreenHeader() { return $('~Drag-drop-screen'); }
  get successMessage() { return $('~drag-lottie-animation'); } // Elemento de sucesso (animação)
  get retryButton() { return $('~renew'); }

  /**
   * Seletor dinâmico para as peças de origem (Drag) baseadas na posição.
   * Exemplo de ID no app: "drag-c1-r1" (coluna 1, linha 1)
   */
  peça(coluna: number) {
    // return $(`~drag-c${coluna}-r${linha}`);
    return $(`~drag-c${coluna}`);
  }

  /**
   * Seletor dinâmico para as zonas de destino (Drop) correspondentes.
   * Exemplo de ID no app: "drop-c1-r1"
   */
  zonaDestino(coluna: number) {
    // return $(`~drop-c${coluna}-r${linha}`);
    return $(`~drop-c${coluna}`);
  }

  /**
   * Ação de navegação para a aba Drag
   */
  async goToDragTab() {
    await this.menu.openSwipe(); // Garantimos que a Tab Bar está visível
    // Se o botão 'Drag' estiver escondido por causa da resolução, usamos o componente
    const dragMenuButton = await $('~Drag');
    await dragMenuButton.waitForDisplayed({ timeout: 5000 });
    await dragMenuButton.click();
  }

  /**
   * Executa a ação de arrastar e soltar uma peça específica na sua respectiva zona
   */
  async arrastarPeçaParaDestino(coluna: number) {
    const elementoOrigem = await this.peça(coluna);
    const elementoDestino = await this.zonaDestino(coluna);

    // O comando nativo do WDIO calcula o centro geométrico de ambos os elementos automaticamente
    await elementoOrigem.dragAndDrop(elementoDestino);
    return this;
  }
}

export default new DragPage();
