import { test, expect, request, APIRequestContext } from '@playwright/test';

// test.beforeEach( async({ page }) => {
//     // await page.route('*/**/', async route => {
//     //     const response = await route.fetch();
//     //     const responseBody = await response.json();
//     //     console.log(responseBody.results);
//     // })
//     await page.goto('https://pokeapi.co/api/v2/pokemon');
// })

test('test 1', async ({ page }) => {
    const pokemonResponse = await page.waitForResponse('https://pokeapi.co/api/v2/pokemon');
    await page.goto('https://pokeapi.co/api/v2/pokemon');
    const pokemonResposeBody = await pokemonResponse.json()
    console.log(pokemonResposeBody)
    //await page.waitForTimeout(1000);
})

test.only('APIRequestContext attempt', async () => {
    const APIRequestContext = await request.newContext();
    const response = await APIRequestContext.get('https://pokeapi.co/api/v2/pokemon');
    const responseBody = await response.json();

    //pick 3 random pokemon
    const randomGenerator = () => {

        const maxNumber = responseBody.results.length-1;
        const minNumber = 0
        let tempArray : any[] = [];
        const randomNumberCount = 3
        for(let i = 0; i < randomNumberCount; i++){
            let randomNum = Math.floor(Math.random() * ( maxNumber - minNumber ) + minNumber);

            tempArray.push(responseBody.results[randomNum]);
        }
        return tempArray;
    }
    //pick 3 random pokemon
    const randomThree = randomGenerator();
 
    const pokeAPIRequestContext = await request.newContext();
   
    let pokeObj = {};
    
    for(let i = 0; i < randomThree.length; i++){
        const pokeResponse = await pokeAPIRequestContext.get(randomThree[i].url);
        const pokeResponseBody = await pokeResponse.json();
        
        let pokeAbilityArray : any[] = [];
        for(let j = 0; j < pokeResponseBody.abilities.length; j++){
            pokeAbilityArray.push(pokeResponseBody.abilities[j].ability.name);
        }

        pokeObj[randomThree[i].name] = pokeAbilityArray;
    }

    console.log(pokeObj)

})
