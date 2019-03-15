// Ranorex Webtestit Page Object File

package uitest.pageobjects;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.*;

public class HeaderPo {

    // Additional data:
    // {"img":"screenshots/37cadfc2-6ea3-ac17-48b1-89bc1b628fb9.png"}
    private By searchInput = By.xpath("/html//header[@id='masthead']//form[@role='search']/input[@name='s']");
    // Additional data:
    // {"img":"screenshots/54b1bff3-1862-23c9-8c7f-09c2ab074381.png"}
    private By cartAmount = By.cssSelector("#site-header-cart .amount");
    // Additional data:
    // {"img":"screenshots/3ae84e05-03e9-e7fe-1254-9627490849b8.png"}
    private By cartCount = By.cssSelector("#site-header-cart .count");

    protected WebDriver driver;
    protected WebDriverWait wait;

    public HeaderPo(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 10);
    }

    public HeaderPo open(String url) {
        this.driver.get(url);

        return this;
    }

    public String getTitle() {
        return this.driver.getTitle();
    }

    public void insertSearchText(String text) {
        this.wait.until(ExpectedConditions.visibilityOfElementLocated(this.searchInput)).sendKeys(text, Keys.RETURN);
    }

    public String getCartAmount() {
        return this.wait.until(ExpectedConditions.visibilityOfElementLocated(this.cartAmount)).getText();
    }

    public String getCartCount() {
        return this.wait.until(ExpectedConditions.visibilityOfElementLocated(this.cartCount)).getText();
    }

}
