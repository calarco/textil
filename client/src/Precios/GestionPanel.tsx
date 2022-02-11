import { useState } from "react";
import styled from "styled-components";

import PanelComponent from "components/Panel";
import Section from "components/Section";
import PreciosList from "./lists/PreciosList";
import Header from "./GestionHeader";

const Panel = styled(PanelComponent)`
    max-width: 80rem;
`;

function GestionPanel() {
    const [sort, setSort] = useState("fecha");
    const [overlay, setOverlay] = useState(false);

    return (
        <Panel>
            <Header sort={sort} setSort={setSort} />
            <Section
                switchOn={`eoau`}
                overlay={overlay}
                cancel={() => setOverlay(false)}
            >
                <PreciosList overlay={overlay} setOverlay={setOverlay} />
            </Section>
        </Panel>
    );
}

export default GestionPanel;
