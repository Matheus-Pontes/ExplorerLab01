import './css/index.css';
import IMask from 'imask';

import { 
    maskCVCPattern, 
    maskExpirationDatePattern, 
    maskCardNumberPattern 
} from './utils/masks';

const ccBgColor01 = document.querySelector('.cc-bg svg > g g:nth-child(1) path');
const ccBgColor02 = document.querySelector('.cc-bg svg > g g:nth-child(2) path');
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img");
const addButton = document.querySelector('#btnAdd'); 
const ccCVC = document.querySelector('#security-code');
const ccExpirationDate = document.querySelector('#expiration-date');
const cardNumber = document.querySelector("#card-number");
const inputHolder = document.querySelector('#card-holder');
const modalDialog = document.querySelector('#modal-dialog');
const btnClose = document.querySelector('#btnClose');
const ccHolder = document.querySelector('.cc-holder .value');

const maskCVC = IMask(ccCVC, maskCVCPattern);
const maskExpirationDate = IMask(ccExpirationDate, maskExpirationDatePattern);
const maskCardNumber = IMask(cardNumber, maskCardNumberPattern);

function setCardType(type = "default") {
    const colors = {
        visa: ['#436D99', '#2D57F2'],
        mastercard: ['#DF6D29', '#C69347'],
        rocketseat: ['#8439FF', '#4F0BDF'],
        default: ['black', 'gray'],
    }

    ccBgColor01.setAttribute('fill', colors[type][0]);
    ccBgColor02.setAttribute('fill', colors[type][1]);

    ccLogo.setAttribute('src', `/cc-${type}.svg`)
}

function fieldsValidate() {
    let response = false;
    let validateCVC = false;

    if(ccCVC.value.length == 4 || ccCVC.value.length == 3)
        validateCVC = false;
    else    
        validateCVC = true;

    switch(maskCardNumber.masked.currentMask.cardType) {
        case "visa": 
            response = validateInputs(18, validateCVC);
            break;
        case "mastercard": 
            response = validateInputs(19, validateCVC);
            break;
        case "rocketseat": 
            response = validateInputs(20, validateCVC);
            break;
        case "default":
            response = validateInputs(17, validateCVC);
            break;
    }

    return response;
}

function validateInputs(quantifyCaracters, validateCVC) {
    if (inputHolder.value.length < quantifyCaracters || ccExpirationDate.value.length < 5 || validateCVC)
        return false;       
    return true;
} 

function cleanFields() {
    inputHolder.value = "";
    ccExpirationDate.value = "";
    ccCVC.value = "";
    cardNumber.value = "";
    ccHolder.innerHTML = "XXXXXX XXXXXXX XXXXX";
    setCardType();
    updateCardNumber("");
    updateCVC("");
    updateExparionDate("");
}

addButton.addEventListener('click', function() {
    if(fieldsValidate()) 
        modalDialog.classList.remove('hidden');
});

btnClose.addEventListener('click', function() {
    modalDialog.classList.add('hidden');
    cleanFields();  
});

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
})

inputHolder.addEventListener('keyup', function() {
    ccHolder.innerHTML = inputHolder.value.length === 0 ? "XXXXXX XXXXXXX XXXXX": inputHolder.value;
});

maskCVC.on("accept",  function() {
    updateCVC(maskCVC.value);
});

function updateCVC(code) {
    const ccSecurity = document.querySelector('.cc-security .value');
    ccSecurity.innerHTML = code.length == 0 ? "000" : code;
}

maskCardNumber.on("accept", function() {
    const cardType = maskCardNumber.masked.currentMask.cardType;
    setCardType(cardType);
    updateCardNumber(maskCardNumber.value);
});

function updateCardNumber(number) {
    const ccNumber = document.querySelector('.cc-number');
    ccNumber.innerHTML = number == 0 ? "0000 0000 0000 0000" : number;
}

maskExpirationDate.on('accept', function() {
    updateExparionDate(maskExpirationDate.value);
});

function updateExparionDate(date) {
    const ccExpirationDate = document.querySelector('.cc-extra .value');
    ccExpirationDate.innerHTML = date.length === 0 ? "00/00" : date;
}