console.log("hello")
import '@picocss/pico';
import { weatherApi } from './components/layout';

const appContainer = document.createElement('div'); // create a new element



document.body.appendChild(appContainer); // append the new element to the document body
weatherApi()



