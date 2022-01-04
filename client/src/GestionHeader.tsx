import { MouseEvent, useState, useEffect, FormEvent } from "react";
import styled, { css } from "styled-components";
import transition from "styled-transition-group";
import { SwitchTransition } from "react-transition-group";

import PagarForm from "forms/PagarForm";
import CobrarForm from "forms/CobrarForm";

type Props = {
    readonly isActive?: boolean;
};

const Container = styled.div`
    position: relative;
    height: 6rem;
    display: grid;
    grid-template-columns: 11.25rem 1fr 11.25rem;
    grid-template-rows: 1fr auto;
    justify-content: space-between;
    align-items: center;
    gap: 0 0.5rem;
`;

const Filter = transition.div.attrs({
    unmountOnExit: true,
    timeout: {
        enter: 200,
        exit: 150,
    },
})`
    position: relative;
    padding: 0 0.5rem;
    display: grid;
    align-items: center;

    &::after {
        content: "";
        position: absolute;
        top: calc(50% - 1rem);
        right: 0;
        height: 2rem;
        //border-right: var(--border-variant);
    }

    &:enter {
        opacity: 0;
    }

    &:enter-active {
        opacity: 1;
        transition: 0.2s ease-out;
    }

    &:exit {
        opacity: 1;
    }

    &:exit-active {
        opacity: 0;
        transition: 0.15s ease-in;
    }
`;

const Tabs = styled.div`
    overflow: clip;
    border-radius: 4px;
    background: var(--surface-t);
    box-shadow: var(--shadow);
    display: grid;
    grid-auto-flow: column;
`;

const Tab = styled.button<Props>`
    border-radius: 0;

    ${(props) =>
        props.isActive &&
        css`
            pointer-events: none;
            background: var(--primary-variant);

            &:focus {
                background: var(--primary-variant);
            }
        `};
`;

const New = styled.div`
    position: relative;
    border-radius: 0 4px 0 0;
    overflow: clip;
    padding: 0 0.5rem;
    display: grid;
    align-items: center;

    &::after {
        content: "";
        position: absolute;
        top: calc(50% - 1rem);
        left: 0;
        height: 2rem;
        //border-left: var(--border-variant);
    }

    button {
        color: var(--secondary);
    }
`;

const Columns = transition.div.attrs({
    unmountOnExit: true,
    timeout: {
        enter: 200,
        exit: 150,
    },
})`
    grid-row-start: 2;
    grid-column-end: span 3;
    height: 2.5rem;
    border-top: var(--border-variant);
    display: grid;
    grid-template-columns: 11.25rem 1fr 1fr 11.25rem;
    gap: 1px;

    &:enter {
        opacity: 0;
    }

    &:enter-active {
        opacity: 1;
        transition: 0.2s ease-out;
    }

    &:exit {
        opacity: 1;
    }

    &:exit-active {
        opacity: 0;
        transition: 0.15s ease-in;
    }
`;

const Sort = styled.label<Props>`
    position: relative;
    padding: 0.5rem 1rem;
    text-align: center;
    transition: 0.15s ease-in;

    &:hover {
        cursor: pointer;
        background-color: var(--primary-variant);
    }

    &:not(:first-child)::after {
        content: "";
        position: absolute;
        top: calc(50% - 1rem);
        left: -1px;
        height: 2rem;
        border-left: var(--border-variant);
    }

    ${(props) =>
        props.isActive &&
        css`
            pointer-events: none;
            color: var(--primary);

            &:focus {
                background: var(--primary-variant);
            }
        `};
`;

const Overlay = transition.div.attrs({
    unmountOnExit: true,
    timeout: {
        enter: 300,
        exit: 250,
    },
})`
    content-visibility: auto;
    will-change: opacity;
    position: absolute;
    z-index: 1001;
    top: 0;
    right: 0;
    left: 0;
    height: 100%;
    border-radius: 4px;
    background: var(--overlay);
    backdrop-filter: blur(0.5rem);

    &:enter {
        opacity: 0;
    }

    &:enter-active {
        opacity: 1;
        transition: 0.3s ease-out;
    }

    &:exit {
        opacity: 1;
    }

    &:exit-active {
        opacity: 0;
        transition: 0.25s ease-in;
    }
`;

type ComponentProps = {
    tab: boolean;
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
    estado: string;
    setEstado: (estado: string) => void;
    sort: string;
    setSort: (sort: string) => void;
    overlay: boolean;
    setOverlay: (overlay: boolean) => void;
};

function GestionHeader({
    tab,
    onClick,
    estado,
    setEstado,
    sort,
    setSort,
    overlay,
    setOverlay,
}: ComponentProps) {
    const [create, setCreate] = useState(false);

    const handleInputChange = (
        event: FormEvent<HTMLSelectElement> & { target: HTMLSelectElement }
    ) => {
        event.persist();
        setEstado(event.target.value);
    };

    useEffect(() => {
        !overlay && setCreate(false);
    }, [overlay, setCreate]);

    useEffect(() => {
        create && setOverlay(true);
    }, [create, setOverlay]);

    return (
        <Container>
            <SwitchTransition>
                <Filter key={tab}>
                    {tab ? (
                        <select
                            name="estado"
                            value={estado}
                            onChange={handleInputChange}
                        >
                            <option value="A depositar">A depositar</option>
                            <option value="Depositado">Depositado</option>
                            <option value="Anulado">Anulado</option>
                            <option value="Posdatado">Posdatado</option>
                            <option value="Endosado">Endosado</option>
                            <option value="Devuelto">Devuelto</option>
                            <option value="Falla tecnica">Falla tecnica</option>
                            <option value="Rechazado">Rechazado</option>
                        </select>
                    ) : (
                        <select value={estado} onChange={handleInputChange}>
                            <option value="A pagar">A pagar</option>
                            <option value="Pagado">Pagado</option>
                            <option value="Anulado">Anulado</option>
                            <option value="Recuperado">Recuperado</option>
                            <option value="Vencido">Vencido</option>
                        </select>
                    )}
                </Filter>
            </SwitchTransition>
            <Tabs>
                <Tab isActive={!tab} onClick={onClick}>
                    Pagos
                </Tab>
                <Tab isActive={tab} onClick={onClick}>
                    Cobros
                </Tab>
            </Tabs>
            <New>
                <button onClick={() => setCreate(true)}>Nuevo</button>
            </New>
            <SwitchTransition>
                <Columns key={tab}>
                    {tab ? (
                        <>
                            <Sort
                                isActive={sort === "depositoDate"}
                                onClick={() => setSort("depositoDate")}
                            >
                                Fecha de deposito
                            </Sort>
                            <Sort
                                isActive={sort === "clienteId"}
                                onClick={() => setSort("clienteId")}
                            >
                                Cliente
                            </Sort>
                            <Sort
                                isActive={sort === "monto"}
                                onClick={() => setSort("monto")}
                            >
                                Monto
                            </Sort>
                            <Sort
                                isActive={sort === "ingresoDate"}
                                onClick={() => setSort("ingresoDate")}
                            >
                                Fecha de ingreso
                            </Sort>
                        </>
                    ) : (
                        <>
                            <Sort
                                isActive={sort === "pagoDate"}
                                onClick={() => setSort("pagoDate")}
                            >
                                Fecha de pago
                            </Sort>
                            <Sort
                                isActive={sort === "proveedoreId"}
                                onClick={() => setSort("proveedoreId")}
                            >
                                Proveedor
                            </Sort>
                            <Sort
                                isActive={sort === "monto"}
                                onClick={() => setSort("monto")}
                            >
                                Monto
                            </Sort>
                            <Sort
                                isActive={sort === "emisionDate"}
                                onClick={() => setSort("emisionDate")}
                            >
                                Fecha de emision
                            </Sort>
                        </>
                    )}
                </Columns>
            </SwitchTransition>
            {tab ? (
                <CobrarForm isActive={create} close={() => setOverlay(false)} />
            ) : (
                <PagarForm isActive={create} close={() => setOverlay(false)} />
            )}
            <Overlay in={overlay} onClick={() => setOverlay(false)} />
        </Container>
    );
}

export default GestionHeader;
