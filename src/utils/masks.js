// import IMask from 'imask';

export const maskCVCPattern = {
    mask: '0000'
};

export const maskExpirationDatePattern = {
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

export const maskCardNumberPattern = {
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
            regex: /^1\d{0,2}\d{0,12}/,
            cardType: "rocketseat",
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