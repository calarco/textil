import { MouseEvent, useState, useEffect } from "react";
import styled from "styled-components";
import transition from "styled-transition-group";

import { useCheques } from "hooks/chequesContext";
import Card from "components/Card";
import CobrarForm from "forms/CobrarForm";
import Remove from "components/Remove";
import Currency from "components/Currency";
import Day from "components/Day";

const Box = styled.ul`
    display: grid;
    grid-template-columns: 10.5rem 1fr 1fr 10.5rem;
    gap: 1.5rem;
    text-align: center;

    > li {
        padding: 0.75rem 1.75rem;
    }

    > li:nth-child(3) {
        text-align: right;
    }
`;

const Details = transition.div.attrs({
    unmountOnExit: true,
    timeout: {
        enter: 200,
        exit: 150,
    },
})`
    grid-column-end: span 4;
    overflow: clip;
    border-top: var(--border-variant);

    > div:first-child {
        padding: 0.75rem 1rem;
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        gap: 1.5rem 2rem;

        > label {
            position: relative;
            display: grid;
            grid-template-columns: auto auto;
            gap: 1rem;
            justify-content: center;

            &:not(:first-child)::after {
                content: "";
                position: absolute;
                top: calc(50% - 1rem);
                left: -1rem;
                height: 2rem;
                border-left: 1px solid var(--primary-variant);
            }
        }
    }

    &:enter {
        max-height: 0;
    }

    &:enter-active {
        max-height: 8.5rem;
        transition: 0.2s ease-out;
    }

    &:exit {
        max-height: 8.5rem;
    }

    &:exit-active {
        max-height: 0;
        transition: 0.15s ease-in;
    }
`;

const Buttons = styled.div`
    grid-column-end: span 3;
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
`;

type ComponentProps = {
    cobro: Cobro;
    isActive: boolean;
    overlay: boolean;
    setOverlay: (overlay: boolean) => void;
    onClick?: (e: MouseEvent<HTMLUListElement>) => void;
    className?: string;
};

function Cobro({
    cobro,
    isActive,
    overlay,
    setOverlay,
    onClick,
    className,
}: ComponentProps) {
    const [form, setForm] = useState(false);
    const [remove, setRemove] = useState(false);
    const { getCliente, getBanco } = useCheques();

    useEffect(() => {
        !overlay && setForm(false);
    }, [overlay, setForm]);

    useEffect(() => {
        setOverlay(form);
    }, [form, setOverlay]);

    return (
        <Card
            key={cobro.id}
            isActive={isActive}
            isRemove={remove}
            isForm={form}
            className={className}
        >
            <Box onClick={onClick}>
                <li>
                    <Day date={cobro.depositoDate} />
                </li>
                <li>
                    <p>{getCliente(cobro.clienteId)}</p>
                </li>
                <li>
                    <Currency number={cobro.monto} />
                </li>
                <li>
                    <Day date={cobro.ingresoDate} />
                </li>
            </Box>
            <Details in={isActive}>
                <div>
                    <label>
                        Banco
                        <p>{getBanco(cobro.bancoId)}</p>
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
                </div>
                <Buttons>
                    <button type="button" onClick={() => setRemove(true)}>
                        Borrar
                    </button>
                    <button type="button" onClick={() => setForm(true)}>
                        Editar
                    </button>
                </Buttons>
            </Details>
            {isActive && (
                <>
                    <Remove
                        id={cobro.id}
                        service="cobros"
                        isActive={isActive && remove}
                        exit={() => setRemove(false)}
                    />
                    <CobrarForm
                        data={cobro}
                        isActive={form}
                        close={() => setForm(false)}
                    />
                </>
            )}
        </Card>
    );
}

export default Cobro;
