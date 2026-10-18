# Automação de testes mobile — Native Demo App

Projeto de testes automatizados end-to-end para o **Native Demo App** em Android e iOS. Os cenários simulam interações reais com a interface e verificam fluxos de login, formulários e gestos.

## Relatório de testes

O relatório Allure mais recente publicado está disponível em:

**[Acessar o relatório de testes](https://jorgeadammo.github.io/native-demo-app-test-webdriverio/)**

O workflow do GitHub Actions executa os testes e publica o relatório no GitHub Pages. Ao executar os testes localmente, o relatório também é gerado na pasta `allure-report`, mas essa execução local não atualiza o site.

## Tecnologias

- [WebdriverIO](https://webdriver.io/) para execução e controle dos testes;
- [Appium](https://appium.io/) com UiAutomator2 (Android) e XCUITest (iOS) para automação nativa;
- [Mocha](https://mochajs.org/) como framework de testes;
- [Expect WebdriverIO](https://webdriver.io/docs/api/expect-webdriverio/) para asserções;
- [Allure](https://allurereport.org/) para relatórios, resultados e capturas de tela;
- TypeScript e Node.js.

## Cenários cobertos

Os testes ficam em `test/specs/` e usam Page Objects em `test/pageobjects/`.

| Arquivo | Cobertura |
| --- | --- |
| `login.spec.ts` | Login com credenciais válidas e validação do alerta de sucesso |
| `forms.spec.ts` | Campo de texto, switch, seleção no dropdown e botão ativo |
| `swipe.spec.ts` | Rolagem vertical e navegação horizontal no carrossel |
| `drag.spec.ts` | Arrastar peças do quebra-cabeça para as áreas correspondentes |

## Pré-requisitos

Para executar os testes localmente, instale e configure:

1. **Node.js 22** (versão utilizada no pipeline de CI) e npm;
2. **Java JDK 17**;
3. **Android Studio**, Android SDK e Platform Tools (`adb`);
4. Um emulador Android iniciado ou um dispositivo Android conectado e autorizado para depuração USB.

O Appium e o driver UiAutomator2 estão nas dependências do projeto. O serviço configurado no WebdriverIO inicia o Appium durante a execução. Confirme que o Android está acessível antes de rodar os testes:

```bash
adb devices
```

O arquivo de configuração aponta para o APK `apps/Android-NativeDemoApp-1.0.8.apk`. Mantenha esse arquivo nesse caminho ou atualize a capacidade `appium:app` em `wdio.conf.ts`.

Para executar no simulador de iPhone, também é necessário um computador **macOS** com Xcode e um simulador iOS disponível. O XCUITest driver é instalado junto com as dependências do projeto. O bundle iOS deve estar disponível em `apps/Payload/wdiodemoapp.app` (extraído do arquivo `apps/ios.simulator.wdio.native.app.v1.0.8.zip`) ou o caminho do `.app` deve ser informado na variável `IOS_APP`.

## Instalação

Clone o repositório, acesse a pasta do projeto e instale as dependências:

```bash
git clone https://github.com/jorgeadammo/native-demo-app-test-webdriverio.git
cd native-demo-app-test-webdriverio
npm ci
```

## Executar os testes

Para executar a suíte configurada:

```bash
npm test
```

No macOS, execute a mesma suíte no simulador iOS com:

```bash
npm run test:ios
```

Por padrão, o perfil iOS inicia o simulador `iPhone 16` e usa `apps/Payload/wdiodemoapp.app`. Para escolher outro simulador ou bundle, defina `IOS_DEVICE_NAME` e/ou `IOS_APP` antes de executar o comando. A configuração iOS fica em `wdio.ios.conf.ts`; a configuração Android e o comando `npm test` permanecem inalterados.

O comando alternativo abaixo também inicia o WebdriverIO:

```bash
npm run wdio
```

Para executar somente um arquivo de teste:

```bash
npm test -- --spec ./test/specs/forms.spec.ts
```

Substitua `forms.spec.ts` por `login.spec.ts`, `swipe.spec.ts` ou `drag.spec.ts` para executar outro fluxo.

## Relatório Allure local

Ao terminar uma execução do WebdriverIO, o hook `onComplete` gera ou atualiza o relatório HTML em `allure-report/`, usando os resultados armazenados em `allure-results/`.

Para abrir o relatório local:

```bash
npm run report:open
```

Para gerar novamente o relatório manualmente:

```bash
npm run report:generate
```

As pastas `allure-results/` e `allure-report/` são saídas geradas e não devem ser editadas manualmente.

## Integração contínua e publicação

Os fluxos de CI são separados em `.github/workflows/android-tests.yaml` (Android) e `.github/workflows/ios-tests.yaml` (iOS). Ambos rodam em `push` e `pull_request` para as branches `main` e `master`. O workflow iOS também pode ser iniciado manualmente pela aba Actions (`workflow_dispatch`); ele usa o simulador `iPhone 16` em `macos-15` e extrai o bundle de `apps/ios.simulator.wdio.native.app.v1.0.8.zip`. Mantenha esse arquivo versionado para que o CI iOS consiga acessá-lo. O workflow Android continua gerando o relatório Allure e publicando no GitHub Pages.

Depois que o workflow concluir a publicação, o relatório fica disponível em:

**https://jorgeadammo.github.io/native-demo-app-test-webdriverio/**
