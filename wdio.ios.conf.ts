import { config as androidConfig } from './wdio.conf.js';

export const config: WebdriverIO.Config = {
    ...androidConfig,
    capabilities: [{
        platformName: 'iOS',
        'appium:deviceName': process.env.IOS_DEVICE_NAME ?? 'iPhone 16',
        'appium:automationName': 'XCUITest',
        'appium:app': process.env.IOS_APP ?? './apps/Payload/wdiodemoapp.app',
        'appium:newCommandTimeout': 240,
        'appium:simulatorStartupTimeout': 300000,
        'appium:wdaLaunchTimeout': 120000,
        'appium:wdaConnectionTimeout': 120000,
        'wdio:enforceWebDriverClassic': true
    }]
};
