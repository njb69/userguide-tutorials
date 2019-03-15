// Ranorex Webtestit Page Object File

package uitest.pageobjects;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.*;

public class DetailPagePo {

    // Additional data:
    // {"img":"screenshots/affdea54-ae77-feaf-764d-6e592354e962.png"}
    private By productName = By.cssSelector(".product_title");
    // Additional data:
    // {"img":"screenshots/2f35ac78-865e-947f-15c7-16fb0313e369.png"}
    private By productPrice = By.cssSelector(".entry-summary .woocommerce-Price-amount");
    // Additional data:
    // {"img":"screenshots/5a5345ce-553b-993e-82d9-e22d3dca2307.png"}
    private By addToCartButton = By.cssSelector(".single_add_to_cart_button");
    // Additional data:
    // {"img":"screenshots/7cce2b54-65cf-493b-9c60-b1cdb2ba9998.png"}
    private By cartConfirmationMessage = By.cssSelector("[role='alert']");

    protected WebDriver driver;
    protected WebDriverWait wait;

    private void waitForVisibility(WebElement element) throws Error {
        new WebDriverWait(driver, 5).until(ExpectedConditions.visibilityOf(element));
    }

    public DetailPagePo(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 10);
    }

    public DetailPagePo open(String url) {
        this.driver.get(url);

        return this;
    }

    public String getTitle() {
        return this.driver.getTitle();
    }

    public String getProductName() {
        return this.wait.until(ExpectedConditions.visibilityOfElementLocated(this.productName)).getText();
    }

    public String getProductPrice() {
        return this.wait.until(ExpectedConditions.visibilityOfElementLocated(this.productPrice)).getText();
    }

    public void addProductToCart() {
        this.wait.until(ExpectedConditions.visibilityOfElementLocated(this.addToCartButton)).click();
    }

    public String getConfirmationMessage() {
        return this.wait.until(ExpectedConditions.visibilityOfElementLocated(this.cartConfirmationMessage)).getText();
    }

}
