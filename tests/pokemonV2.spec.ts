import { test, expect, request, APIRequestContext , chromium} from '@playwright/test';

test('Pokemon API - Select 3 random pokemon and display their abilities', async ({page, request}) => {

    const response = await request.get('https://pokeapi.co/api/v2/pokemon');
    expect(response.ok()).toBeTruthy();
    
    const responseBody = await response.json();
    //alternative
    //expect(responseBody.count).toBe(1302)
    expect(responseBody.results[0].name).toBe('bulbasaur')
    expect(responseBody.results[0].url).toBe('https://pokeapi.co/api/v2/pokemon/1/')

    const randomGenerator = () => {

        const maxNumber = responseBody.results.length-1;
        console.log(responseBody.results.length)
        const minNumber = 0
        let tempArray : any[] = [];
        const randomNumberCount = 3
        for(let i = 0; i < randomNumberCount; i++){
            let randomNum = Math.floor(Math.random() * ( maxNumber - minNumber ) + minNumber);

            tempArray.push(responseBody.results[randomNum]);
        }
        return tempArray;
    }
    //pick the 3 random pokemon
    const randomThree = randomGenerator();
    expect(randomThree.length).toBe(3)

    let pokeObj = {};
    for(let i = 0; i < randomThree.length; i++){
        const pokeResponse = await request.get(randomThree[i].url);
        const pokeResponseBody = await pokeResponse.json();
        
        //fill array with pokemon abilities
        let pokeAbilityArray : string[] = [];
        for(let j = 0; j < pokeResponseBody.abilities.length; j++){
            pokeAbilityArray.push(pokeResponseBody.abilities[j].ability.name);
        }

        //fill the object with pokemon ability key-value pairs
        console.log(i)
        pokeObj[randomThree[i].name] = pokeAbilityArray;
    }

    //expect(pokeObj.size).toBe(3)
    console.log(pokeObj)
})