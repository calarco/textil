import { Control, Controller } from "react-hook-form";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

type ComponentProps = {
    name: "monto" | "debe" | "haber";
    control: Control<Inputs>;
    required?: boolean;
};

const CurrencyInput = ({ name, control, required }: ComponentProps) => {
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
            name={name}
            control={control}
            rules={required ? { required: `Ingrese ${name}` } : undefined}
            render={({ field }) => (
                <MaskedInput
                    mask={currencyMask}
                    type="text"
                    inputMode="numeric"
                    placeholder="-"
                    autoComplete="off"
                    {...field}
                />
            )}
        />
    );
};

export default CurrencyInput;
