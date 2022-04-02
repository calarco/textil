import styled from "styled-components";
import { Control, Controller } from "react-hook-form";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

const Container = styled.div`
    display: grid;
    grid-template-columns: 2rem 1fr;
    align-items: center;

    label {
        padding: 0.25rem 0.75rem;
        grid-row-end: 1;
        grid-column-start: 1;
        grid-column-end: 1;
    }

    input[type="text"] {
        grid-row-end: 1;
        grid-column-start: 1;
        grid-column-end: span 2;
        padding-left: 2rem;
        font: var(--body-alt);
    }
`;

type ComponentProps = {
    name: "monto" | "debe" | "haber" | "costo";
    control: Control<Inputs>;
    required?: boolean;
    disabled?: boolean;
};

const CurrencyInput = ({
    name,
    control,
    required,
    disabled,
}: ComponentProps) => {
    const currencyMask = createNumberMask({
        prefix: "",
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
        <Container>
            <label>$</label>
            <Controller
                name={name}
                control={control}
                rules={required ? { required: `Ingrese ${name}` } : undefined}
                render={({ field }) => (
                    <MaskedInput
                        mask={currencyMask}
                        type="text"
                        inputMode="numeric"
                        placeholder="0"
                        autoComplete="off"
                        disabled={disabled}
                        {...field}
                    />
                )}
            />
        </Container>
    );
};

export default CurrencyInput;
