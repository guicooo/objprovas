import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/login');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
  getActionButton() {
    return element(by.css('app-root button')).getText();
  }
}
