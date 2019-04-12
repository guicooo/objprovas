import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('objetivoprovasangular App', () => {
  let page: AppPage;
  console.log(page);

  beforeEach(() => {
    page = new AppPage();
  });

  it('Verifica o title da Home', () => {
    page.navigateTo();
    browser.pause();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
  // it('Ação do button', () => {
  //   page.navigateTo();
  //   expect(page.getActionButton().getText().toEqual('ENTRAR'));
  // });
});
