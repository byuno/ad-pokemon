import { test, expect, request, APIRequestContext , chromium} from '@playwright/test';

test('APIRequestContext attempt', async () => {
    const APIRequestContext = await request.newContext();
    const response = await APIRequestContext.get('https://pokeapi.co/api/v2/pokemon');
    const responseBody = await response.json();

    //function to pick 3 random pokemon
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
    //pick the 3 random pokemon
    const randomThree = randomGenerator();
 
    const pokeAPIRequestContext = await request.newContext();
    let pokeObj = {};
    
    //Set the keys and fill the corresponding array with ability to have the key-value pair for the object
    for(let i = 0; i < randomThree.length; i++){
        const pokeResponse = await pokeAPIRequestContext.get(randomThree[i].url);
        const pokeResponseBody = await pokeResponse.json();
        
        //fill array with pokemon abilities
        let pokeAbilityArray : any[] = [];
        for(let j = 0; j < pokeResponseBody.abilities.length; j++){
            pokeAbilityArray.push(pokeResponseBody.abilities[j].ability.name);
        }

        //fill the object with pokemon ability key-value pairs
        pokeObj[randomThree[i].name] = pokeAbilityArray;
    }

    //output
    console.log(pokeObj)

    //*** Bonus material ***
    // Launch the browser
    const browser = await chromium.launch();

    // Create a new page
    const page = await browser.newPage();

    // Use setContent to set the HTML content of the page
    await page.setContent(`<!DOCTYPE html><html><body><h1>${JSON.stringify(pokeObj)}</h1></body></html>`);

})
