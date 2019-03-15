// Ranorex Webtestit Page Object File

import { browser, element, by, ExpectedConditions, Key } from 'protractor';

export class HeaderPo {
  // Additional data: {"img":"screenshots/558791e1-6998-260f-249f-6bd6e86a7bf8.png"}
  private get searchInput() { return by.xpath('/html//header[@id=\'masthead\']//form[@role=\'search\']/input[@name=\'s\']'); }
  // Additional data: {"img":"screenshots/d356b92f-eb6a-d31e-e4ca-5019fa0da395.png"}
  private get cartAmount() { return by.css('#site-header-cart .amount'); }
  // Additional data: {"img":"screenshots/a0db4a9c-60cb-282c-ccfa-33a05e7ef823.png"}
  private get cartCount() { return by.css('#site-header-cart .count'); }

  public async open(url: string): Promise<HeaderPo> {
    await browser.get(url);

    return this;
  }

  public async getTitle(): Promise<string> {
    return await browser.getTitle();
  }

  public async insertSearchText(text: string): Promise<HeaderPo> {
    await browser.wait(ExpectedConditions.visibilityOf(element(this.searchInput)), browser.allScriptsTimeout, this.searchInput.toString());
    await element(this.searchInput).sendKeys(text, Key.ENTER);

    return this;
  }

  public async getCartAmount(): Promise<string> {
    await browser.wait(ExpectedConditions.visibilityOf(element(this.cartAmount)), browser.allScriptsTimeout, this.cartAmount.toString());
    return await element(this.cartAmount).getText();
  }

  public async getCartCount(): Promise<string> {
    await browser.wait(ExpectedConditions.visibilityOf(element(this.cartCount)), browser.allScriptsTimeout, this.cartCount.toString());
    return await element(this.cartCount).getText();
  }


}
