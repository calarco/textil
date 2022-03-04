import { MouseEvent, useState, useEffect, FormEvent, useRef } from "react";
import styled, { css } from "styled-components";
import transition from "styled-transition-group";
import { SwitchTransition } from "react-transition-group";

import PagoForm from "./forms/PagoForm";
import CobroForm from "./forms/CobroForm";
import { Overlay } from "components/Overlay";

const Container = styled.div`
    position: relative;
    height: 6.25rem;
    display: grid;
    grid-template-rows: 1fr auto;
    align-items: center;
    gap: 0 0.5rem;
`;

const Columns1 = styled.div`
    padding: 0 0.75rem;
    display: grid;
    grid-template-columns: 2fr 5fr 2fr;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
`;

const Filter = transition.div.attrs({
    unmountOnExit: true,
    timeout: {
        enter: 200,
        exit: 150,
    },
})`
    position: relative;
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

type Props = {
    readonly isActive?: boolean;
};

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
        background: var(--secondary-variant);
        box-shadow: var(--shadow-variant);

        &:hover {
            background: var(--primary-variant);
        }
    }
`;

const Columns = transition.div.attrs({
    unmountOnExit: true,
    timeout: {
        enter: 200,
        exit: 150,
    },
})`
    padding: 0 0.75rem;
    border-top: var(--border-variant);
    display: grid;
    grid-template-columns: 2fr 3fr 2fr 2fr;
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
    padding: 0.75rem 1rem;
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
            color: var(--secondary);

            &:focus {
                background: var(--primary-variant);
            }
        `};
`;

type ComponentProps = {
    tab: boolean;
    switchTab: (e: MouseEvent<HTMLButtonElement>) => void;
    estado: string;
    setEstado: (estado: string) => void;
    sort: string;
    setSort: (sort: string) => void;
    overlay: boolean;
    setOverlay: (overlay: boolean) => void;
};

function GestionHeader({
    tab,
    switchTab,
    estado,
    setEstado,
    sort,
    setSort,
    overlay,
    setOverlay,
}: ComponentProps) {
    const nodeRef = useRef(null);
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
            <Columns1>
                <SwitchTransition>
                    <Filter nodeRef={nodeRef} ref={nodeRef} key={tab}>
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
                                <option value="Falla tecnica">
                                    Falla tecnica
                                </option>
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
                    <Tab isActive={!tab} onClick={switchTab}>
                        Pagos
                    </Tab>
                    <Tab isActive={tab} onClick={switchTab}>
                        Cobros
                    </Tab>
                </Tabs>
                <New>
                    <button onClick={() => setCreate(true)}>Nuevo</button>
                </New>
            </Columns1>
            <SwitchTransition>
                <Columns nodeRef={nodeRef} ref={nodeRef} key={tab}>
                    {tab ? (
                        <>
                            <Sort
                                isActive={sort === "depositoDate"}
                                onClick={() => setSort("depositoDate")}
                            >
                                Fecha de deposito
                            </Sort>
                            <Sort
                                isActive={sort === "libradoreId"}
                                onClick={() => setSort("libradoreId")}
                            >
                                Librador
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
                    ) : (
                        <>
                            <Sort
                                isActive={sort === "pagoDate"}
                                onClick={() => setSort("pagoDate")}
                            >
                                Fecha de pago
                            </Sort>
                            <Sort
                                isActive={sort === "destinatarioId"}
                                onClick={() => setSort("destinatarioId")}
                            >
                                Destinatario
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
                <CobroForm isActive={create} close={() => setOverlay(false)} />
            ) : (
                <PagoForm isActive={create} close={() => setOverlay(false)} />
            )}
            <Overlay overlay={overlay} cancel={() => setOverlay(false)} />
        </Container>
    );
}

export default GestionHeader;
