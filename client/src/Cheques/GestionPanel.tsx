import { useState, useEffect } from "react";

import { ChequesProvider } from "./hooks/chequesContext";
import { Panel } from "components/Panel";
import { Section } from "components/Section";
import Header from "./GestionHeader";
import Pagos from "./lists/PagosList";
import Cobros from "./lists/CobrosList";

function GestionPanel() {
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
            <Panel>
                <Header
                    estado={estado}
                    setEstado={setEstado}
                    tab={tab}
                    switchTab={() => setTab(!tab)}
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
            </Panel>
        </ChequesProvider>
    );
}

export default GestionPanel;
