import { MouseEvent, useState, useEffect, FormEvent } from "react";
import styled, { css } from "styled-components";

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

const Filter = styled.div`
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
        border-right: var(--border-variant);
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
    border-bottom: 2px solid rgba(0, 0, 0, 0);

    ${(props) =>
        props.isActive &&
        css`
            pointer-events: none;
            background: var(--primary-variant);
            border-bottom: 2px solid var(--primary);

            &:focus {
                background: var(--primary-variant);
                border-bottom: 2px solid var(--primary);
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
        border-left: var(--border-variant);
    }

    button {
        color: var(--secondary);
    }
`;

const Columns = styled.div`
    grid-row-start: 2;
    grid-column-end: span 3;
    height: 2.5rem;
    border-top: var(--border-variant);
    display: grid;
    align-items: center;
    grid-template-columns: 10.5rem 1fr 1fr 10.5rem;
    gap: 1.5rem;

    > label {
        position: relative;
        padding: 0.5rem 1rem;

        text-align: center;

        &:not(:first-child)::after {
            content: "";
            position: absolute;
            top: calc(50% - 1rem);
            left: -0.75rem;
            height: 2rem;
            border-left: var(--border-variant);
        }
    }
`;

const Overlay = styled.div<Props>`
    content-visibility: auto;
    will-change: opacity;
    visibility: hidden;
    opacity: 0;
    position: absolute;
    z-index: 1001;
    top: 0;
    right: 0;
    left: 0;
    height: 100%;
    border-radius: 4px;
    background: var(--overlay);
    backdrop-filter: blur(0.5rem);
    transition: 0.25s ease-in;

    ${(props) =>
        props.isActive &&
        css`
            visibility: visible;
            opacity: 1;
            transform: initial;
            transition: 0.3s ease-out;
        `};
`;

type ComponentProps = {
    tab: boolean;
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
    estado: string;
    setEstado: (estado: string) => void;
    overlay: boolean;
    setOverlay: (overlay: boolean) => void;
};

function App({
    tab,
    onClick,
    estado,
    setEstado,
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
        setOverlay(create);
    }, [create, setOverlay]);

    return (
        <Container>
            <Filter>
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
            <Columns>
                <label>{tab ? "Fecha de deposito" : "Fecha de pago"}</label>
                <label>{tab ? "Cliente" : "Proveedor"}</label>
                <label>Monto</label>
                <label>Fecha de emision</label>
            </Columns>
            {tab ? (
                <CobrarForm isActive={create} close={() => setCreate(false)} />
            ) : (
                <PagarForm isActive={create} close={() => setCreate(false)} />
            )}
            <Overlay isActive={overlay} onClick={() => setOverlay(false)} />
        </Container>
    );
}

export default App;
