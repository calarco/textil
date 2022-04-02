import { MouseEvent, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";

import { Form } from "components/Form";
import { Label } from "components/Label";

const List = styled.div`
    display: grid;
    align-items: center;
    gap: 0.75rem;
`;

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
    isActive?: boolean;
    close?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const AumentosForm = function ({ isActive, close }: ComponentProps) {
    const { register, handleSubmit, setValue } = useForm<AumentoInputs>({
        defaultValues: {},
    });
    const [aumentos, setAumentos] = useState<Aumento[]>([
        { porcentage: 181 },
        { porcentage: 104 },
    ]);

    const onSubmit: SubmitHandler<AumentoInputs> = (inputs) => {
        setAumentos([
            ...aumentos,
            {
                porcentage: inputs.porcentage || 0,
            },
        ]);
        setValue("porcentage", 0);
    };

    const removeItem = (index: number) => {
        const newRepuestos = [...aumentos];
        newRepuestos.splice(index, 1);
        setAumentos(newRepuestos);
    };

    return (
        <Form
            isActive={isActive}
            close={close}
            onSubmit={handleSubmit(onSubmit)}
            length={8}
        >
            <Label title="Aumentos" length={8}>
                <List>
                    <Add>
                        <input
                            type="number"
                            placeholder="-"
                            {...register("porcentage", {
                                required: "Ingrese el porcentage",
                            })}
                        />
                        <button type="button" onClick={handleSubmit(onSubmit)}>
                            Agregar
                        </button>
                    </Add>
                    {aumentos[0] &&
                        aumentos.map(
                            (aumento, index) =>
                                !aumento.nombre && (
                                    <Item key={index}>
                                        <div>
                                            <input
                                                type="number"
                                                placeholder="-"
                                                value={aumento.porcentage}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeItem(index)}
                                        >
                                            Borrar
                                        </button>
                                    </Item>
                                )
                        )}
                </List>
            </Label>
        </Form>
    );
};

export default AumentosForm;
