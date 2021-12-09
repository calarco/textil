import { MouseEvent, useState, useEffect, FormEvent } from "react";
import styled, { css } from "styled-components";

import PagarForm from "forms/PagarForm";
import CobrarForm from "forms/CobrarForm";

type Props = {
    readonly isActive?: boolean;
};

const Container = styled.div`
    position: relative;
    height: 3rem;
    display: grid;
    grid-template-columns: 11.25rem 1fr 11.25rem;
    justify-content: space-between;
    gap: 0.5rem;
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
        border-right: 1px solid var(--primary-variant);
    }
`;

const Tabs = styled.div`
    align-self: end;
    overflow: clip;
    border-radius: 4px 4px 0 0;
    background: var(--surface-t);
    box-shadow: var(--shadow);
    border-bottom: 1px solid var(--primary-variant);
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
    display: grid;

    &::after {
        content: "";
        position: absolute;
        top: calc(50% - 1rem);
        left: 0;
        height: 2rem;
        border-left: 1px solid var(--primary-variant);
    }

    button {
        color: var(--secondary);
    }
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
            {tab ? (
                <CobrarForm isActive={create} close={() => setCreate(false)} />
            ) : (
                <PagarForm isActive={create} close={() => setCreate(false)} />
            )}
        </Container>
    );
}

export default App;
