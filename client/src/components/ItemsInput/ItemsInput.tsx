import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";

import { Label } from "components/Label";
import { CurrencyInput } from "components/CurrencyInput";
import { Currency } from "components/Currency";

const Add = styled.div`
    border-radius: 4px;
    background: var(--primary-variant);
    box-shadow: var(--shadow-variant);
    display: grid;
    align-items: center;

    input[type="text"] {
        outline: none;
    }

    button {
        grid-column-start: 2;
        grid-row-start: 1;
        grid-row-end: span 2;
        height: 100%;
        border-left: var(--border-variant);
        color: var(--secondary);
    }
`;

const Item = styled.div`
    border-radius: 4px;
    outline: var(--border-variant);
    display: grid;
    grid-auto-flow: column;
    align-items: center;

    div {
        padding: 0.5rem 1.5rem;
        display: grid;
        gap: 0.5rem;
        text-align: center;
    }

    button {
        height: 100%;
        border-left: var(--border-variant);
    }
`;

type ComponentProps = {
    items: Items;
    setItems: (items: Items) => void;
    length?: number;
    className?: string;
};

const ItemsInput = function ({
    items,
    setItems,
    length,
    className,
}: ComponentProps) {
    const { register, handleSubmit, setValue, control } = useForm<PrecioInputs>(
        {
            defaultValues: {},
        }
    );

    const onSubmit: SubmitHandler<PrecioInputs> = (inputs) => {
        setItems([
            ...items,
            {
                detalle: inputs.detalle || "",
                monto: Number(
                    inputs.monto?.replace(/\./g, "").replace(/,/g, ".") || 0
                ),
            },
        ]);
        setValue("detalle", "");
        setValue("monto", "");
    };

    const removeItem = (index: number) => {
        const newRepuestos = [...items];
        newRepuestos.splice(index, 1);
        setItems(newRepuestos);
    };

    return (
        <Label length={length} className={className}>
            <Add>
                <input
                    type="text"
                    placeholder="Detalle"
                    {...register("detalle", {
                        required: "Ingrese el detalle",
                    })}
                />
                <CurrencyInput name="monto" control={control} />
                <button type="button" onClick={handleSubmit(onSubmit)}>
                    Agregar
                </button>
            </Add>
            {items[0] &&
                items.map((item, index) => (
                    <Item key={index}>
                        <div>
                            <p>{item.detalle}</p>
                            <Currency number={item.monto} />
                        </div>
                        <button type="button" onClick={() => removeItem(index)}>
                            Borrar
                        </button>
                    </Item>
                ))}
        </Label>
    );
};

export default ItemsInput;
