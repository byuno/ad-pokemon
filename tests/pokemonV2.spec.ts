import { test, expect, request, APIRequestContext , chromium} from '@playwright/test';

test('Pokemon API - Select 3 random pokemon and display their abilities', async ({page, request}) => {

    const response = await request.get('https://pokeapi.co/api/v2/pokemon');
    expect(response.ok()).toBeTruthy();
    
    const responseBody = await response.json();
    //would the below better? One line, no hardcoding in object
    //expect(responseBody.count).toBe(1302)
    expect(responseBody.results[0].name).toBe('bulbasaur')
    expect(responseBody.results[0].url).toBe('https://pokeapi.co/api/v2/pokemon/1/')

    //Fill an array with Pokemon, then randomize the order
    function randomize() {
        let randPoke: any[] = [];
        const maxNumber = responseBody.results.length-1;
        for (let i = 0; i < maxNumber; i++) {
            randPoke.push(responseBody.results[i]);
        }

        //Shuffle the array
        for (let i = randPoke.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [randPoke[i], randPoke[j]] = [randPoke[j], randPoke[i]];
        }

        return randPoke;
    }
    
    //Create a randomized set of pokemon
    const randomPokemon = randomize();
    
    let pokeObj = {};
    let pokeCounter = 3;

    //Use the first 3 randomized pokemon
    for(let i = 0; i < pokeCounter; i++){
        const pokeResponse = await request.get(randomPokemon[i].url);
        expect(pokeResponse.ok()).toBeTruthy();

        const pokeResponseBody = await pokeResponse.json();

        //fill array with pokemon abilities
        let pokeAbilityArray : string[] = [];
        for(let j = 0; j < pokeResponseBody.abilities.length; j++){
            pokeAbilityArray.push(pokeResponseBody.abilities[j].ability.name);
        }

        //fill the object with pokemon ability key-value pairs
        pokeObj[randomPokemon[i].name] = pokeAbilityArray;
    }
    
    //print out results
    console.log(pokeObj)

    // Use setContent to set the HTML content of the page
    await page.setContent(`<!DOCTYPE html><html><body><h1>${JSON.stringify(pokeObj)}</h1></body></html>`);
})