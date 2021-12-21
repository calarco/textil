import { Control, Controller } from "react-hook-form";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

type ComponentProps = {
    control: Control<Inputs>;
    defaultValue?: string;
};

const CurrencyInput = ({ control, defaultValue }: ComponentProps) => {
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

    return (
        <Controller
            name={"monto"}
            control={control}
            rules={{ required: "Ingrese el monto" }}
            render={({ field }) => (
                <MaskedInput
                    mask={currencyMask}
                    type="text"
                    inputMode="numeric"
                    defaultValue={defaultValue}
                    placeholder="-"
                    autoComplete="off"
                    {...field}
                />
            )}
        />
    );
};

export default CurrencyInput;
