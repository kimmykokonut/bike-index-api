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

function convertEpoch(epoch) {
  const epochMilliseconds = epoch * 1000;
  const date = new Date(epochMilliseconds);

  let year = date.getFullYear();
  let month = (date.getMonth() +1).toString();
  let day = date.getDate().toString();

  return `${month}-${day}-${year}`;
}

// UI Logic

function printElements(response, zip) {
  const bikes = response.bikes;
  const responseDiv = document.querySelector('#response'); 
  const responseDivHeader = document.querySelector('#response-header'); 
  responseDivHeader.innerText = '';
  responseDivHeader.append(`Stolen bikes near ${zip}: `);
  if(bikes && bikes.length > 0) {
    responseDiv.innerHTML = '';
    document.querySelector('#response').innerText = '';
    const list = document.createElement('ul');
    bikes.forEach((bike) => {
      const epochTime = bike.date_stolen;
      const standardTime = convertEpoch(epochTime);
      const listItem = document.createElement ('li');
      listItem.innerText = `Brand: ${bike.manufacturer_name}, Color: ${bike.frame_colors}, Date missing: ${standardTime}`;
      list.appendChild(listItem);
    });
    responseDiv.appendChild(list);

  }
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