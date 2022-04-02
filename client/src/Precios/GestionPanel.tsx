import { useState } from "react";

import { PreciosProvider } from "./hooks/preciosContext";
import { Panel } from "components/Panel";
import { Section } from "components/Section";
import PreciosList from "./lists/PreciosList";
import Header from "./GestionHeader";

function GestionPanel() {
    const [sort, setSort] = useState("articulo");
    const [overlay, setOverlay] = useState(false);

    return (
        <PreciosProvider>
            <Panel>
                <Header
                    sort={sort}
                    setSort={setSort}
                    overlay={overlay}
                    setOverlay={setOverlay}
                />
                <Section overlay={overlay} cancel={() => setOverlay(false)}>
                    <PreciosList overlay={overlay} setOverlay={setOverlay} />
                </Section>
            </Panel>
        </PreciosProvider>
    );
}

export default GestionPanel;
