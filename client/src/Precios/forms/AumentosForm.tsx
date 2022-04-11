import { MouseEvent, FormEvent, ChangeEvent, useState, useRef } from "react";
import styled from "styled-components";
import transition from "styled-transition-group";
import feathersClient from "feathersClient";

import { usePrecios } from "../hooks/preciosContext";
import AumentoCard from "../cards/AumentoCard";
import { Label } from "components/Label";
import { Buttons } from "components/Buttons";

const Container = transition.div.attrs({
    unmountOnExit: true,
    timeout: {
        enter: 200,
        exit: 150,
    },
})`
    content-visibility: auto;
    will-change: opacity;
    position: absolute;
    z-index: 1500;
    top: 1px;
    left: 1px;
    right: 1px;
    overflow: clip;
    border-radius: 4px;
    outline: 1px solid var(--primary);
    background: var(--primary);
    box-shadow: var(--shadow);
    display: grid;
    grid-auto-columns: 1fr;
    gap: 1px;
    align-items: start;

    &:enter {
        opacity: 0;
        transform: translateY(-1rem);
    }

    &:enter-active {
        opacity: 1;
        transform: initial;
        transition: 0.2s ease-out;
    }

    &:exit {
        opacity: 1;
    }

    &:exit-active {
        opacity: 0;
        transform: translateY(-1rem);
        transition: 0.15s ease-in;
    }
`;

const List = styled.div`
    display: grid;
    align-items: center;
    gap: 0.75rem;
`;

const Add = styled.form`
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

const ButtonsMod = styled(Buttons)`
    background: var(--surface);
`;

type ComponentProps = {
    isActive?: boolean;
    close?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const AumentosForm = function ({ isActive, close }: ComponentProps) {
    const [inputs, setInputs] = useState<AumentoInputs>({
        porcentage: 0,
    });
    const { aumentos } = usePrecios();
    const nodeRef = useRef(null);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        feathersClient
            .service("aumentos")
            .create({ porcentage: inputs.porcentage })
            .then(() => {})
            .catch((error: FeathersErrorJSON) => {
                console.error(error.message);
            });
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.persist();
        setInputs((inputs) => ({
            ...inputs,
            [event.target.name]: event.target.value,
        }));
    };

    return (
        <Container nodeRef={nodeRef} ref={nodeRef} in={isActive}>
            <Label title="Aumentos">
                <List>
                    <Add onSubmit={handleSubmit}>
                        <input
                            type="number"
                            placeholder="-"
                            name="porcentage"
                            value={inputs.porcentage}
                            onChange={handleInputChange}
                        />
                        <button type="submit">Agregar</button>
                    </Add>
                    {aumentos[0] &&
                        aumentos.map((aumento) => (
                            <AumentoCard aumento={aumento} key={aumento.id} />
                        ))}
                </List>
            </Label>
            <ButtonsMod>
                <button type="button" onClick={close}>
                    Cancelar
                </button>
            </ButtonsMod>
        </Container>
    );
};

export default AumentosForm;
