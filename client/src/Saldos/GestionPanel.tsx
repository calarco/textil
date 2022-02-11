import { useState } from "react";
import styled from "styled-components";

import PanelComponent from "components/Panel";
import Section from "components/Section";
import Cuentas from "./lists/CuentasList";
import Ventas from "./lists/VentasList";
import Compras from "./lists/ComprasList";
import Header from "./GestionHeader";

const Panel = styled(PanelComponent)`
    grid-template-columns: 2fr 3fr;
`;

function GestionPanel() {
    const [sort, setSort] = useState("fecha");
    const [tab, setTab] = useState(false);
    const [cuentaId, setCuentaId] = useState(0);
    const [overlay, setOverlay] = useState(false);
    const [overlaySection, setOverlaySection] = useState(false);

    return (
        <Panel overlay={overlay} cancel={() => setOverlay(false)}>
            <Header
                tab={tab}
                switchTab={() => setTab(!tab)}
                sort={sort}
                setSort={setSort}
            />
            <Cuentas
                service={tab ? "clientes" : "proveedores"}
                overlay={overlay}
                setOverlay={setOverlay}
                cuentaId={cuentaId}
                setCuentaId={setCuentaId}
            />
            {cuentaId !== 0 && (
                <Section
                    switchOn={`${tab}${cuentaId}`}
                    overlay={overlaySection}
                    cancel={() => setOverlaySection(false)}
                >
                    {tab ? (
                        <Ventas
                            clienteId={cuentaId}
                            sort={sort}
                            overlay={overlaySection}
                            setOverlay={setOverlaySection}
                        />
                    ) : (
                        <Compras
                            proveedoreId={cuentaId}
                            sort={sort}
                            overlay={overlaySection}
                            setOverlay={setOverlaySection}
                        />
                    )}
                </Section>
            )}
        </Panel>
    );
}

export default GestionPanel;
