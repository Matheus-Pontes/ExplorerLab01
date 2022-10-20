import './css/index.css';
import IMask from 'imask';

const ccBgColor01 = document.querySelector('.cc-bg svg > g g:nth-child(1) path')
const ccBgColor02 = document.querySelector('.cc-bg svg > g g:nth-child(2) path')

const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img");
 
function setCardType(type = "default") {
    const colors = {
        visa: ['#436D99', '#2D57F2'],
        mastercard: ['#DF6D29', '#C69347'],
        default: ['black', 'gray'],
    }

    ccBgColor01.setAttribute('fill', colors[type][0]);
    ccBgColor02.setAttribute('fill', colors[type][1]);

    ccLogo.setAttribute('src', `/cc-${type}.svg`)
}

setCardType();

const ccCVC = document.querySelector('#security-code');
const maskCVCPattern = {
    mask: '0000'
};
const maskCVC = IMask(ccCVC, maskCVCPattern);

const ccExpirationDate = document.querySelector('#expiration-date');
const maskExpirationDatePattern = {
    mask: "MM{/}YY",
    blocks: {
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        YY: {
            mask: IMask.MaskedRange,
            from: String(new Date().getFullYear()).slice(2),
            to: String(new Date().getFullYear() + 10).slice(2)
        }
    }
};
const maskExpirationDate = IMask(ccExpirationDate, maskExpirationDatePattern);

const cardNumber = document.querySelector("#card-number");
const maskCardNumberPattern = {
    mask: [
        {
            mask: "0000 0000 000 0000",
            regex: /^4\d{0,15}/,
            cardType: "visa",

        },
        {
            mask: "0000 0000 000 0000",
            regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
            cardType: "mastercard",
        },
        {
            mask: "0000 0000 000 0000",
            cardType: "default",
        }
    ],
    dispatch: function(appended, dynamicMasked) {
        const number = (dynamicMasked.value + appended).replace(/\D/g, "");

        const foundMask = dynamicMasked.compiledMasks.find(({regex}) => number.match(regex));

        return foundMask;
    }
};
const maskCardNumber = IMask(cardNumber, maskCardNumberPattern);

// Deixar acessível na DOM pelo DEVTOOLS
// globalThis.setCardType = setCardType;
