import { test, expect } from '@playwright/test';

// test.beforeEach( async({ page }) => {
//     // await page.route('*/**/', async route => {
//     //     const response = await route.fetch();
//     //     const responseBody = await response.json();
//     //     console.log(responseBody.results);
//     // })
//     await page.goto('https://pokeapi.co/api/v2/pokemon');
// })

test('test 1', async ({ page }) => {
    await page.goto('https://pokeapi.co/api/v2/pokemon');
    const pokemonResponse = await page.waitForResponse('https://pokeapi.co/api/v2/pokemon');
    const pokemonResposeBody = await pokemonResponse.json()
    console.log(pokemonResposeBody)
    //await page.waitForTimeout(1000);
})

