import { useState } from "react";
import styled from "styled-components";

import PanelComponent from "components/Panel";
import Section from "components/Section";
import Cuentas from "./lists/CuentasList";
import Ventas from "./lists/VentasList";
import Compras from "./lists/ComprasList";
import Header from "./GestionHeader";

const Panel = styled(PanelComponent)`
    grid-template-columns: 4fr 5fr;
`;

function GestionPanel() {
    const [tab, setTab] = useState(false);
    const [cuentaId, setCuentaId] = useState(0);
    const [overlay, setOverlay] = useState(false);
    const [overlaySection, setOverlaySection] = useState(false);

    return (
        <Panel overlay={overlay} cancel={() => setOverlay(false)}>
            <Header tab={tab} switchTab={() => setTab(!tab)} />
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
    );
}

export default GestionPanel;
