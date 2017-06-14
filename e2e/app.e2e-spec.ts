import { PoliciesPage } from './app.po';

describe('policies App', () => {
  let page: PoliciesPage;

  beforeEach(() => {
    page = new PoliciesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
