import { getDataFromUrl } from './utils/getData.js';

async function main() {
    const endpoint = 'https://poligon.aidevs.pl/dane.txt'; // zamień na rzeczywisty endpoint
    
    const toTest = await getDataFromUrl(endpoint);
    console.log(toTest);
}

main();