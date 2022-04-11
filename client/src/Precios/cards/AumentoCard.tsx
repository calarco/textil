import { FormEvent, ChangeEvent, useState } from "react";
import styled from "styled-components";
import feathersClient from "feathersClient";

import { Remove } from "components/Remove";

const Container = styled.form`
    border-radius: 4px;
    outline: var(--border-variant);
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
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
    aumento: Aumento;
};

function PrecioCard({ aumento }: ComponentProps) {
    const [inputs, setInputs] = useState<AumentoInputs>({
        porcentage: aumento.porcentage,
    });
    const [remove, setRemove] = useState(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        feathersClient
            .service("aumentos")
            .patch(aumento.id, { porcentage: inputs.porcentage })
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
        <Container onSubmit={handleSubmit}>
            <div>
                <input
                    type="number"
                    placeholder="-"
                    name="porcentage"
                    value={inputs.porcentage}
                    onChange={handleInputChange}
                />
            </div>
            {aumento.porcentage == inputs.porcentage ? (
                <button type="button" onClick={() => setRemove(true)}>
                    Borrar
                </button>
            ) : (
                <button type="submit">Guardar</button>
            )}
            <Remove
                id={aumento.id}
                service="aumentos"
                isActive={remove}
                exit={() => setRemove(false)}
            />
        </Container>
    );
}

export default PrecioCard;
