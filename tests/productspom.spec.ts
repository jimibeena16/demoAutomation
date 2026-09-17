import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test('Add Backpack to Cart', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  // Login
  await loginPage.open();

  await loginPage.login('standard_user','secret_sauce');

  // Verify Products page
  await expect(productsPage.pageTitle).toHaveText('Products');

  // Add single product
  await productsPage.addBackpackToCart();

  // Open cart
  await productsPage.openCart();

  // Verify cart
  await expect(cartPage.productNames).toHaveText('Sauce Labs Backpack');
});


test('Add multiple products to cart', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
const cartPage = new CartPage(page);

  // Login
  await loginPage.open();

  await loginPage.login('standard_user','secret_sauce');

  // Verify Products page
  await expect(productsPage.pageTitle).toHaveText('Products');

  // Add first product
  await productsPage.addProductToCart('sauce-labs-backpack');

  // Add second product
  await productsPage.addProductToCart('sauce-labs-bike-light');

  // Add third product
  await productsPage.addProductToCart('sauce-labs-bolt-t-shirt');

  // Go to cart
  await productsPage.openCart();

  // Verify products
  await expect(cartPage.productNames).toHaveText([
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt'
    ]);
});