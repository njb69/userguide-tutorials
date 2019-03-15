// Ranorex Webtestit Test File

package uitest.tests;

import uitest.TestNgTestBase;
import uitest.pageobjects.*;
import org.testng.Assert;
import org.testng.annotations.Test;

class Test1 extends TestNgTestBase {
    @Test
    public void SearchForItemTestCase() {
        // 1. Arrange
        // Create a new Page Object instance by right-clicking and
        // selecting "Instantiate Page Object" at the bottom
        HeaderPo header = new HeaderPo(driver);
        DetailPagePo detail = new DetailPagePo(driver);

        header.open("https://demoshop.webtestit.com");

        // 2. Act
        // Call an existing action from your initialized Page Object
        header.insertSearchText("Super");

        // 3. Assert
        // Use TestNG assertions to verify results.
        // e.g.:
        // Assert.assertEquals(title, "Test Automation for GUI Testing | Ranorex");
        Assert.assertEquals(detail.getProductName(), "Super Cool Goo");
        Assert.assertEquals(detail.getProductPrice(), "€1,500.00");
    }

    @Test
    public void AddItemToCartTestCase() {
        HeaderPo header = new HeaderPo(driver);
        DetailPagePo detail = new DetailPagePo(driver);

        detail.open("https://demoshop.webtestit.com/product/super-cool-goo/");

        detail.addProductToCart();

        Assert.assertTrue(detail.getConfirmationMessage().contains("“Super Cool Goo” has been added to your cart"));
        Assert.assertEquals(header.getCartCount(), "1 item");
        Assert.assertEquals(header.getCartAmount(), "€1,500.00");
    }
}
