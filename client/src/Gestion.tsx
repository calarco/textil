import { useState, useEffect } from "react";
import transition from "styled-transition-group";
import { SwitchTransition } from "react-transition-group";

import { ChequesProvider } from "hooks/chequesContext";
import Header from "GestionHeader";
import SectionComponent from "components/Section";
import Pagos from "./sections/Pagos";
import Cobros from "sections/Cobros";

const Section = transition(SectionComponent).attrs({
    unmountOnExit: true,
    timeout: {
        enter: 300,
        exit: 150,
    },
})`
    &:enter {
        opacity: 0;
        transform: translateY(-1rem);
    }

    &:enter-active {
        opacity: 1;
        transform: initial;
        transition: 0.3s ease-out;
    }

    &:exit {
        opacity: 1;
    }

    &:exit-active {
        opacity: 0;
        transition: 0.15s ease-in;
    }
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
            <SwitchTransition>
                <Section
                    key={`${estado}${tab}`}
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
            </SwitchTransition>
        </ChequesProvider>
    );
}

export default Gestion;
