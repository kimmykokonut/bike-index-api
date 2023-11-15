import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BikeService from './bike-service.js';

function getStolenInfo(zip) {
  BikeService.getStolenInfo(zip)
    .then(function(response) {
      if (response.bikes) {
        printElements(response, zip);
    } else {
      printError(response, zip)
    }
  });
}
// UI Logic

function printElements(response, zip) {
  document.querySelector('#response').innerText = `Stolen bikes near ${zip}: ${response.bikes[0].manufacturer_name}`;
}

function printError(error, zip) {
  document.querySelector('#response').innerText = `There was an error accessing the data for ${zip}: ${error.message}.`;
  console.log(error);
}

function handleZipForm(e) {
  e.preventDefault();
  const zip = document.querySelector('#location').value;
  document.querySelector('#location').innerText = null;
  getStolenInfo(zip);
}

window.addEventListener("load", function () {
  document.querySelector("#stolen-form").addEventListener("submit", handleZipForm);
});