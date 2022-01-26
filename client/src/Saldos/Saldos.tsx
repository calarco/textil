import styled from "styled-components";

import Calendar from "./CalendarPanel";
import GestionPanel from "./GestionPanel";

const Container = styled.div`
    width: 100vw;
    max-width: 95rem;
    height: 100%;
    padding: 1.5rem 2rem;
    display: grid;
    gap: 2rem;
    grid-template-columns: 2fr 1fr;
`;

function Saldos() {
    return (
        <Container>
            <GestionPanel />
            <Calendar />
        </Container>
    );
}

export default Saldos;
