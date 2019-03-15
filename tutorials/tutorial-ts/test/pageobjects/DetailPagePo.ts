// Ranorex Webtestit Page Object File

import { browser, element, by, ExpectedConditions } from 'protractor';

export class DetailPagePo {
  // Additional data: {"img":"screenshots/5140b065-5229-0f94-e96d-d8a41f6acac8.png"}
  private get productName() { return by.css('.product_title'); }
  // Additional data: {"img":"screenshots/de44e8ba-6ff1-4901-0805-871a27c02493.png"}
  private get productPrice() { return by.css('.entry-summary .woocommerce-Price-amount'); }
  // Additional data: {"img":"screenshots/5f1c462d-9e39-5b82-822b-7ff9e1a829c9.png"}
  private get addToCartButton() { return by.css('.single_add_to_cart_button'); }
  // Additional data: {"img":"screenshots/5a23ef9e-c4e1-6d2b-55a6-5c27cca17d06.png"}
  private get cartConfirmationMessage() { return by.css('[role=\'alert\']'); }

  public async open(url: string): Promise<DetailPagePo> {
    await browser.get(url);

    return this;
  }

  public async getTitle(): Promise<string> {
    return await browser.getTitle();
  }

  public async getProductName(): Promise<string> {
    await browser.wait(ExpectedConditions.visibilityOf(element(this.productName)), browser.allScriptsTimeout, this.productName.toString());
    return await element(this.productName).getText();
  }

  public async getProductPrice(): Promise<string> {
    await browser.wait(ExpectedConditions.visibilityOf(element(this.productPrice)), browser.allScriptsTimeout, this.productPrice.toString());
    return await element(this.productPrice).getText();
  }

  public async addProductToCart(): Promise<DetailPagePo> {
    await browser.wait(ExpectedConditions.visibilityOf(element(this.addToCartButton)), browser.allScriptsTimeout, this.addToCartButton.toString());
    await element(this.addToCartButton).click();

    return this;
  }

  public async getConfirmationMessage(): Promise<string> {
    await browser.wait(ExpectedConditions.visibilityOf(element(this.cartConfirmationMessage)), browser.allScriptsTimeout, this.cartConfirmationMessage.toString());
    return await element(this.cartConfirmationMessage).getText();
  }
}
