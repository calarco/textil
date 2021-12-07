import { MouseEvent, useState } from "react";
import styled, { css } from "styled-components";
import transition from "styled-transition-group";

import Card from "components/Card";
import CobrarForm from "forms/CobrarForm";
import Remove from "components/Remove";

type Props = {
    readonly isActive?: boolean;
};

const Box = styled.div<Props>`
    padding: 0.75rem 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 1.5rem;
    text-align: center;
    transition: 0.2s ease-in;

    label {
        display: grid;
        gap: 0.25rem;
    }

    > pre:nth-child(3) {
        text-align: right;
    }

    > p {
        text-align: left;
    }

    ${(props) =>
        props.isActive &&
        css`
            background: var(--surface);
            box-shadow: var(--shadow);
            transition: 0.3s ease-out;
        `};
`;

const Details = styled.div`
    grid-column-end: span 4;
    padding: 0.75rem 1rem;
    border-top: 1px solid var(--primary);
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 1.5rem;
    text-align: center;
`;

const Buttons = transition.div.attrs({
    unmountOnExit: true,
    timeout: {
        enter: 200,
        exit: 150,
    },
})`
    position: relative;
    width: 100%;
    height: 3rem;
    overflow: clip;
    border-top: 1px solid var(--primary-variant);
    display: flex;

    button {
        width: 100%;
        height: 3rem;
        padding: 0 1.5rem;
        border-radius: 0px;
        background: none;
        border: none;

        &:not(:first-child)::after {
            content: "";
            position: absolute;
            top: calc(50% - 1rem);
            left: 0;
            height: 2rem;
            border-left: 1px solid var(--primary-variant);
        }
    }

    &:enter {
        max-height: 0;
    }

    &:enter-active {
        max-height: 3rem;
        transition: 0.2s ease-out;
    }

    &:exit {
        max-height: 3rem;
    }

    &:exit-active {
        max-height: 0;
        transition: 0.15s ease-in;
    }
`;

type ComponentProps = {
    cobro: Cobro;
    isActive: boolean;
    onClick?: (e: MouseEvent<HTMLDivElement>) => void;
    className?: string;
};

function Cobro({ cobro, isActive, onClick, className }: ComponentProps) {
    const [form, setForm] = useState(false);
    const [remove, setRemove] = useState(false);

    return (
        <Card
            key={cobro.id}
            isActive={isActive}
            isRemove={remove}
            isForm={form}
            className={className}
        >
            <Box isActive={isActive} onClick={onClick}>
                <pre>
                    {cobro.depositoDate.substring(8, 10)}
                    <span>
                        {new Date(cobro.depositoDate)
                            .toLocaleDateString("default", {
                                month: "short",
                            })
                            .substring(0, 3)
                            .toUpperCase()}
                    </span>
                    <small>{cobro.depositoDate.substring(0, 4)}</small>
                </pre>
                <p>{cobro.cliente}</p>
                <pre>
                    $<span>{cobro.monto}</span>
                </pre>
                <pre>
                    {cobro.ingresoDate.substring(8, 10)}
                    <span>
                        {new Date(cobro.ingresoDate)
                            .toLocaleDateString("default", {
                                month: "short",
                            })
                            .substring(0, 3)
                            .toUpperCase()}
                    </span>
                    <small>{cobro.ingresoDate.substring(0, 4)}</small>
                </pre>
            </Box>
            {isActive && (
                <>
                    <Details>
                        <label>
                            Banco
                            <p>{cobro.banco}</p>
                        </label>
                        <label>
                            Titular
                            <p>{cobro.titular}</p>
                        </label>
                        <label>
                            CUIT
                            <p>{cobro.cuit}</p>
                        </label>
                        <label>
                            Numero
                            <p>{cobro.numero}</p>
                        </label>
                        <label>
                            Observaciones
                            <p>{cobro.observaciones || "-"}</p>
                        </label>
                        <label>
                            Estado
                            <p>{cobro.estado}</p>
                        </label>
                    </Details>
                    <Remove
                        id={cobro.id}
                        service="cobros"
                        isActive={isActive && remove}
                        exit={() => setRemove(false)}
                    />
                    <CobrarForm isActive={form} close={() => setForm(false)} />
                </>
            )}
            <Buttons in={isActive}>
                <button type="button" onClick={() => setRemove(true)}>
                    Borrar
                </button>
                <button type="button" onClick={() => setForm(true)}>
                    Editar
                </button>
            </Buttons>
        </Card>
    );
}

export default Cobro;
