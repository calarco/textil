import { MouseEvent, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import transition from "styled-transition-group";

import Card from "components/Card";
import PagarForm from "forms/PagarForm";
import Remove from "components/Remove";

type Props = {
    readonly isActive?: boolean;
};

const Box = styled.div<Props>`
    display: grid;
    grid-template-columns: 10rem 1fr 1fr 10rem;
    gap: 1.5rem;
    text-align: center;
    transition: 0.2s ease-in;

    label {
        display: grid;
        gap: 0.25rem;
    }

    > p,
    pre {
        padding: 0.75rem 1rem;
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
    gap: 1px;

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
            left: -1px;
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
    pago: Pago;
    isActive: boolean;
    overlay: boolean;
    setOverlay: (overlay: boolean) => void;
    onClick?: (e: MouseEvent<HTMLDivElement>) => void;
    className?: string;
};

function Pago({
    pago,
    isActive,
    overlay,
    setOverlay,
    onClick,
    className,
}: ComponentProps) {
    const [form, setForm] = useState(false);
    const [remove, setRemove] = useState(false);

    useEffect(() => {
        !overlay && setForm(false);
    }, [overlay, setForm]);

    useEffect(() => {
        setOverlay(form);
    }, [form, setOverlay]);

    return (
        <Card
            isActive={isActive}
            isRemove={remove}
            isForm={form}
            className={className}
        >
            <Box isActive={isActive} onClick={onClick}>
                <pre>
                    {pago.pagoDate.substring(8, 10)}
                    <span>
                        {new Date(pago.pagoDate)
                            .toLocaleDateString("default", {
                                month: "short",
                            })
                            .substring(0, 3)
                            .toUpperCase()}
                    </span>
                    <small>{pago.pagoDate.substring(0, 4)}</small>
                </pre>
                <p>{pago.proveedor}</p>
                <pre>
                    $<span>{pago.monto}</span>
                </pre>
                <pre>
                    {pago.emisionDate.substring(8, 10)}
                    <span>
                        {new Date(pago.emisionDate)
                            .toLocaleDateString("default", {
                                month: "short",
                            })
                            .substring(0, 3)
                            .toUpperCase()}
                    </span>
                    <small>{pago.emisionDate.substring(0, 4)}</small>
                </pre>
            </Box>
            {isActive && (
                <>
                    <Details>
                        <label>
                            Numero
                            <p>{pago.numero}</p>
                        </label>
                        <label>
                            Observaciones
                            <p>{pago.observaciones || "-"}</p>
                        </label>
                        <label>
                            Estado
                            <p>{pago.estado}</p>
                        </label>
                    </Details>
                    <Remove
                        id={pago.id}
                        service="pagos"
                        isActive={isActive && remove}
                        exit={() => setRemove(false)}
                    />
                    <PagarForm
                        data={pago}
                        isActive={isActive && form ? true : false}
                        close={() => setForm(false)}
                    />
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

export default Pago;
