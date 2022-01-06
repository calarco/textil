import styled from "styled-components";

import Calendar from "./Calendar";
import Gestion from "./Gestion";

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
    grid-template-rows: auto 1fr;
`;

function Cheques() {
    return (
        <Container>
            <Panel>
                <Gestion />
            </Panel>
            <Panel>
                <Calendar />
            </Panel>
        </Container>
    );
}

export default Cheques;
