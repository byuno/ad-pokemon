import { test, expect } from '@playwright/test';

test.beforeEach( async({ page }) => {

    await page.goto('https://pokeapi.co/api/v2/pokemon');

})

test('test 1', async ({ page }) => {
    await page.waitForTimeout(1000);
})

