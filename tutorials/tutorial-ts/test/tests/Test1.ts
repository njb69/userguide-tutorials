// Ranorex Webtestit Test File

import { browser, until } from 'protractor';
import { HeaderPo } from '../pageobjects/HeaderPo';
import { DetailPagePo } from '../pageobjects/DetailPagePo';

describe('Searching for a Product', () => {
  beforeEach(() => {
    // Make sure to set the ignoreSynchronization for every testrun
    // for non Angular applications
    browser.ignoreSynchronization = true;
  });

  it('should find a product', async () => {
    // 1. Arrange
    // Create a new Page Object instance by right-clicking and
    // selecting "Instantiate Page Object" at the bottom
    const header = new HeaderPo();
    const detail = new DetailPagePo();
    await header.open('https://demoshop.webtestit.com');

    // 2. Act
    // Call an existing action from your initialized Page Object
    await header.insertSearchText('Super');

    // 3. Assert
    // Use jasmine to verify results.
    // e.g.:
    // await expect(title).toEqual('Test Automation for GUI Testing | Ranorex');
    await expect(detail.getProductName()).toEqual('Super Cool Goo');
    await expect(detail.getProductPrice()).toEqual('€1,500.00');
  });

  it('should add the product to the cart', async () => {
    const header = new HeaderPo();
    const detail = new DetailPagePo();
    await detail.open('https://demoshop.webtestit.com/product/super-cool-goo/');

    await detail.addProductToCart();

    await expect(detail.getConfirmationMessage()).toContain('“Super Cool Goo” has been added to your cart');
    await expect(header.getCartCount()).toEqual('1 item');
    await expect(header.getCartAmount()).toEqual('€1,500.00');
  });

});
