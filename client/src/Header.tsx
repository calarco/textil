import { MouseEvent, useState } from "react";
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
    grid-template-columns: 10rem 1fr 10rem;
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
    height: 3rem;
    display: grid;
    grid-auto-flow: column;
`;

const Tab = styled.button<Props>`
    border-radius: 0;
    border-bottom: 2px solid rgba(0, 0, 0, 0);

    ${(props) =>
        props.isActive &&
        css`
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
    padding: 0 0.5rem;
    display: grid;
    align-items: center;

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
};

function App({ tab, onClick }: ComponentProps) {
    const [create, setCreate] = useState(false);

    return (
        <Container>
            <Filter>
                {tab ? (
                    <select>
                        <option value="A pagar">A depositar</option>
                        <option value="Pagado">Depositado</option>
                        <option value="Anulado">Anulado</option>
                        <option value="Recuperado">Posdatado</option>
                        <option value="Vencido">Endosado</option>
                        <option value="Recuperado">Devuelto</option>
                        <option value="Recuperado">Falla tecnica</option>
                        <option value="Vencido">Rechazado</option>
                    </select>
                ) : (
                    <select>
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
