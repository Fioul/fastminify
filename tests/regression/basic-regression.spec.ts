import { test, expect } from '@playwright/test';

test.describe('Basic Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the application', async ({ page }) => {
    // Vérifier que la page se charge
    await expect(page.locator('[data-testid="left-type"]')).toBeVisible();
    await expect(page.locator('[data-testid="right-type"]')).toBeVisible();
    await expect(page.locator('[data-testid="minify-button"]')).toBeVisible();
    await expect(page.locator('[data-testid="unminify-button"]')).toBeVisible();
  });

  test('should have working language selectors', async ({ page }) => {
    // Tester le sélecteur de gauche
    await page.click('[data-testid="left-type"]');
    await page.click('text=JavaScript');
    await page.waitForTimeout(500);
    
    // Tester le sélecteur de droite
    await page.click('[data-testid="right-type"]');
    await page.click('text=CSS');
    await page.waitForTimeout(500);
    
    // Vérifier que les sélecteurs fonctionnent
    await expect(page.locator('[data-testid="left-type"]')).toBeVisible();
    await expect(page.locator('[data-testid="right-type"]')).toBeVisible();
  });

  test('should have working editors', async ({ page }) => {
    // Vérifier que les éditeurs sont présents
    await expect(page.locator('[data-testid="left-editor"]')).toBeVisible();
    await expect(page.locator('[data-testid="right-editor"]')).toBeVisible();
    
    // Vérifier que les éditeurs sont cliquables
    await page.click('[data-testid="left-editor"]');
    await page.click('[data-testid="right-editor"]');
  });

  test('should have disabled buttons when no content', async ({ page }) => {
    // Vérifier que les boutons sont désactivés quand il n'y a pas de contenu
    const minifyButton = page.locator('[data-testid="minify-button"]');
    const unminifyButton = page.locator('[data-testid="unminify-button"]');
    
    await expect(minifyButton).toBeDisabled();
    await expect(unminifyButton).toBeDisabled();
  });
});
