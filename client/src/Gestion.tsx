import { useState, useEffect } from "react";

import { ChequesProvider } from "hooks/chequesContext";
import Header from "GestionHeader";
import Section from "components/Section";
import Pagos from "./sections/Pagos";
import Cobros from "sections/Cobros";

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
            <Section
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
        </ChequesProvider>
    );
}

export default Gestion;
