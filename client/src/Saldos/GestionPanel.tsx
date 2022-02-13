import { useState } from "react";
import styled from "styled-components";

import { Panel } from "components/Panel";
import { Section } from "components/Section";
import Cuentas from "./lists/CuentasList";
import Ventas from "./lists/VentasList";
import Compras from "./lists/ComprasList";
import Header from "./GestionHeader";

const PanelMod = styled(Panel)`
    grid-template-columns: 2fr 3fr;
`;

function GestionPanel() {
    const [sort, setSort] = useState("fecha");
    const [tab, setTab] = useState(false);
    const [cuentaId, setCuentaId] = useState(0);
    const [overlay, setOverlay] = useState(false);
    const [overlaySection, setOverlaySection] = useState(false);

    return (
        <PanelMod overlay={overlay} cancel={() => setOverlay(false)}>
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
        </PanelMod>
    );
}

export default GestionPanel;
