import { useState } from "react";
import styled, { css } from "styled-components";

import Section from "components/Section";
import Cuentas from "lists/Cuentas";
import Ventas from "lists/Ventas";
import Compras from "lists/Compras";
import Calendar from "Saldos/Calendar";
import Overlay from "components/Overlay";

const Container = styled.div`
    width: 100vw;
    max-width: 95rem;
    height: 100%;
    padding: 1.5rem 2rem;
    display: grid;
    gap: 2rem;
    grid-template-columns: 2fr 1fr;
`;

const Panel = styled.div`
    position: relative;
    height: calc(100vh - 4.75rem);
    border-radius: 4px;
    background: var(--surface-variant);
    outline: var(--border-variant);
    box-shadow: var(--shadow-variant);
    display: grid;
    grid-template-columns: 4fr 5fr;
    grid-template-rows: auto 1fr;
`;

const Header = styled.div`
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

function Saldos() {
    const [tab, setTab] = useState(false);
    const [cuentaId, setCuentaId] = useState(0);
    const [overlay, setOverlay] = useState(false);
    const [overlaySection, setOverlaySection] = useState(false);

    return (
        <Container>
            <Panel>
                <Header>
                    <Tabs>
                        <div>
                            <Tab
                                isActive={!tab}
                                onClick={() => {
                                    setTab(!tab);
                                }}
                            >
                                Proveedores
                            </Tab>
                            <Tab
                                isActive={tab}
                                onClick={() => {
                                    setTab(!tab);
                                }}
                            >
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
                </Header>
                <Overlay overlay={overlay} cancel={() => setOverlay(false)} />
                <Cuentas
                    service={tab ? "clientes" : "proveedores"}
                    overlay={overlay}
                    setOverlay={setOverlay}
                    cuentaId={cuentaId}
                    setCuentaId={setCuentaId}
                />
                <Section
                    switchOn={`${tab}${cuentaId}`}
                    overlay={overlaySection}
                    cancel={() => setOverlaySection(false)}
                >
                    {cuentaId !== 0 && tab ? (
                        <Ventas
                            clienteId={cuentaId}
                            overlay={overlaySection}
                            setOverlay={setOverlaySection}
                        />
                    ) : cuentaId !== 0 && !tab ? (
                        <Compras
                            proveedoreId={cuentaId}
                            overlay={overlaySection}
                            setOverlay={setOverlaySection}
                        />
                    ) : (
                        "Seleccione una cuenta"
                    )}
                </Section>
            </Panel>
            <Calendar />
        </Container>
    );
}

export default Saldos;
