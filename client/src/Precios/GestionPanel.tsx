import { useState } from "react";
import styled from "styled-components";

import { Panel } from "components/Panel";
import { Section } from "components/Section";
import PreciosList from "./lists/PreciosList";
import Header from "./GestionHeader";

const PanelMod = styled(Panel)`
    max-width: 80rem;
`;

function GestionPanel() {
    const [sort, setSort] = useState("fecha");
    const [overlay, setOverlay] = useState(false);

    return (
        <PanelMod>
            <Header sort={sort} setSort={setSort} />
            <Section
                switchOn={`eoau`}
                overlay={overlay}
                cancel={() => setOverlay(false)}
            >
                <PreciosList overlay={overlay} setOverlay={setOverlay} />
            </Section>
        </PanelMod>
    );
}

export default GestionPanel;
