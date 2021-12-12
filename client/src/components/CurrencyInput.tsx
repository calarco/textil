import { forwardRef } from "react";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

const CurrencyInput = forwardRef<HTMLInputElement, any>((props, ref) => {
    const currencyMask = createNumberMask({
        prefix: "$",
        suffix: "",
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: ".",
        allowDecimal: true,
        decimalSymbol: ",",
        decimalLimit: 2,
        integerLimit: 10,
        allowNegative: false,
        allowLeadingZeroes: false,
    });

    return <MaskedInput mask={currencyMask} {...props} ref={ref} />;
});

export default CurrencyInput;
