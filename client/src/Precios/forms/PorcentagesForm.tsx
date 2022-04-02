import { FormEvent, ChangeEvent, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import feathersClient from "feathersClient";

import { usePrecios } from "../hooks/preciosContext";
import { Buttons } from "components/Buttons";

type Props = {
    isActive?: boolean;
};

const Container = styled.form<Props>`
    position: absolute;
    top: 0.5rem;
    left: 1px;
    right: 1px;
    overflow: clip;
    border-radius: 4px;
    box-shadow: var(--shadow-variant);
    display: grid;
    grid-template-columns: 4fr 4fr 4fr 4fr;
    gap: 1px;

    ${(props) =>
        props.isActive &&
        css`
            z-index: 1500;
            outline: 1px solid var(--primary);
            background: var(--primary);
            box-shadow: var(--shadow);
        `};
`;

const Label = styled.label`
    position: relative;
    height: 100%;
    min-height: 5rem;
    padding: 0.5rem 1rem 0.75rem 1rem;
    background: var(--surface);
    display: grid;
    align-content: space-between;
    gap: 0.25rem 1rem;
    text-transform: capitalize;
    transition: 0.15s ease-in;

    p {
        display: flex;
        gap: 0.5rem;
    }
`;

const Porcentage = styled.div`
    display: grid;
    grid-template-columns: 2rem 1fr;
    align-items: center;

    label {
        padding: 0.25rem 0.75rem;
        grid-row-end: 1;
        grid-column-start: 1;
        grid-column-end: 1;
    }

    input[type="number"] {
        grid-row-end: 1;
        grid-column-start: 1;
        grid-column-end: span 2;
        padding-left: 2rem;
        text-align: right;
        font: var(--body-alt);
    }
`;

const ButtonsMod = styled(Buttons)`
    background: var(--surface);
    grid-column-end: span 4;
`;

type ComponentProps = {
    isActive?: boolean;
    setActive: (isActive: boolean) => void;
};

const PorcentagesForm = function ({ isActive, setActive }: ComponentProps) {
    const [inputs, setInputs] = useState<AumentoInputs>({
        fabrica: 0,
        vendedor: 0,
        venta: 0,
        signori: 0,
    });
    const { fabrica, vendedor, venta, signori } = usePrecios();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        inputs.fabrica !== fabrica.porcentage &&
            feathersClient
                .service("aumentos")
                .patch(fabrica.id, { porcentage: inputs.fabrica })
                .then(() => {})
                .catch((error: FeathersErrorJSON) => {
                    console.error(error.message);
                });
        inputs.vendedor !== vendedor.porcentage &&
            feathersClient
                .service("aumentos")
                .patch(vendedor.id, { porcentage: inputs.vendedor })
                .then(() => {})
                .catch((error: FeathersErrorJSON) => {
                    console.error(error.message);
                });
        inputs.venta !== venta.porcentage &&
            feathersClient
                .service("aumentos")
                .patch(venta.id, { porcentage: inputs.venta })
                .then(() => {})
                .catch((error: FeathersErrorJSON) => {
                    console.error(error.message);
                });
        inputs.signori !== signori.porcentage &&
            feathersClient
                .service("aumentos")
                .patch(signori.id, { porcentage: inputs.signori })
                .then(() => {})
                .catch((error: FeathersErrorJSON) => {
                    console.error(error.message);
                });
        setActive(false);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.persist();
        setInputs((inputs) => ({
            ...inputs,
            [event.target.name]: event.target.value,
        }));
    };

    useEffect(() => {
        !isActive &&
            setInputs({
                fabrica: fabrica.porcentage,
                vendedor: vendedor.porcentage,
                venta: venta.porcentage,
                signori: signori.porcentage,
            });
    }, [isActive, fabrica, vendedor, venta, signori, setInputs]);

    useEffect(() => {
        inputs.fabrica === fabrica.porcentage &&
        inputs.vendedor === vendedor.porcentage &&
        inputs.venta === venta.porcentage &&
        inputs.signori === signori.porcentage
            ? setActive(false)
            : setActive(true);
    }, [inputs, fabrica, vendedor, venta, signori, setActive]);

    return (
        <Container isActive={isActive} onSubmit={handleSubmit}>
            <Label>
                <p>
                    Fabrica
                    <label>/ costo</label>
                </p>
                <Porcentage>
                    <label>%</label>
                    <input
                        type="number"
                        placeholder="-"
                        autoComplete="off"
                        name="fabrica"
                        value={inputs.fabrica}
                        onChange={handleInputChange}
                    />
                </Porcentage>
            </Label>
            <Label>
                <p>
                    vendedor
                    <label>/ fabrica</label>
                </p>
                <Porcentage>
                    <label>%</label>
                    <input
                        type="number"
                        placeholder="-"
                        autoComplete="off"
                        name="vendedor"
                        value={inputs.vendedor}
                        onChange={handleInputChange}
                    />
                </Porcentage>
            </Label>
            <Label>
                <p>
                    venta
                    <label>/ vendedor</label>
                </p>
                <Porcentage>
                    <label>%</label>
                    <input
                        type="number"
                        placeholder="-"
                        autoComplete="off"
                        name="venta"
                        value={inputs.venta}
                        onChange={handleInputChange}
                    />
                </Porcentage>
            </Label>
            <Label>
                <p>
                    signori<label>/ costo</label>
                </p>
                <Porcentage>
                    <label>%</label>
                    <input
                        type="number"
                        placeholder="-"
                        autoComplete="off"
                        name="signori"
                        value={inputs.signori}
                        onChange={handleInputChange}
                    />
                </Porcentage>
            </Label>
            <ButtonsMod hide={!isActive}>
                <button type="button" onClick={() => setActive(false)}>
                    Cancelar
                </button>
                <button type="submit">Guardar</button>
            </ButtonsMod>
        </Container>
    );
};

export default PorcentagesForm;
