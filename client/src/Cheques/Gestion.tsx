import { useState, useEffect } from "react";
import styled from "styled-components";

import { ChequesProvider } from "hooks/chequesContext";
import Section from "components/Section";
import Header from "./GestionHeader";
import Pagos from "lists/Pagos";
import Cobros from "lists/Cobros";

const Container = styled.div`
    position: relative;
    height: calc(100vh - 4.75rem);
    border-radius: 4px;
    background: var(--surface-variant);
    outline: var(--border-variant);
    box-shadow: var(--shadow-variant);
    display: grid;
    grid-template-rows: auto 1fr;
`;

function Gestion() {
    const [estado, setEstado] = useState("A pagar");
    const [sort, setSort] = useState("pagoDate");
    const [tab, setTab] = useState(false);
    const [overlay, setOverlay] = useState(false);

    useEffect(() => {
        tab ? setEstado("A depositar") : setEstado("A pagar");
        tab ? setSort("depositoDate") : setSort("pagoDate");
    }, [tab]);

    return (
        <ChequesProvider>
            <Container>
                <Header
                    tab={tab}
                    onClick={() => setTab(!tab)}
                    estado={estado}
                    setEstado={setEstado}
                    sort={sort}
                    setSort={setSort}
                    overlay={overlay}
                    setOverlay={setOverlay}
                />
                <Section
                    switchOn={`${estado}${tab}`}
                    overlay={overlay}
                    cancel={() => {
                        setOverlay(false);
                    }}
                >
                    {tab ? (
                        <Cobros
                            estado={estado}
                            sort={sort}
                            overlay={overlay}
                            setOverlay={setOverlay}
                        />
                    ) : (
                        <Pagos
                            estado={estado}
                            sort={sort}
                            overlay={overlay}
                            setOverlay={setOverlay}
                        />
                    )}
                </Section>
            </Container>
        </ChequesProvider>
    );
}

export default Gestion;
