import { MouseEvent } from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
    grid-column-end: span 2;
    position: relative;
    height: 3rem;
    display: grid;
    grid-template-columns: 4fr 5fr;
`;

const Tabs = styled.div`
    padding: 0.5rem 0.75rem 0 0.75rem;
    display: grid;
    align-items: center;

    > div {
        overflow: clip;
        border-radius: 4px;
        background: var(--surface-t);
        box-shadow: var(--shadow);
        display: grid;
        grid-auto-flow: column;
    }
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

const Columns = styled.div`
    border-left: var(--border-variant);
    display: grid;
    grid-template-columns: 10rem 1fr 1fr [end];
    align-items: center;
    gap: 1px;
    text-align: center;
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
            color: var(--primary);

            &:focus {
                background: var(--primary-variant);
            }
        `};
`;

type ComponentProps = {
    tab: boolean;
    switchTab: (e: MouseEvent<HTMLButtonElement>) => void;
};

function GestionHeader({ tab, switchTab }: ComponentProps) {
    return (
        <Container>
            <Tabs>
                <div>
                    <Tab isActive={!tab} onClick={switchTab}>
                        Proveedores
                    </Tab>
                    <Tab isActive={tab} onClick={switchTab}>
                        Clientes
                    </Tab>
                </div>
            </Tabs>
            <Columns>
                <Sort isActive={true} onClick={() => {}}>
                    Fecha
                </Sort>
                <Sort isActive={false} onClick={() => {}}>
                    Debe
                </Sort>
                <Sort isActive={false} onClick={() => {}}>
                    Haber
                </Sort>
            </Columns>
        </Container>
    );
}

export default GestionHeader;
