import { useState, useEffect } from "react";

import Header from "GestionHeader";
import Section from "components/Section";
import Pagos from "./sections/Pagos";
import Cobros from "sections/Cobros";

function Gestion() {
    const [tab, setTab] = useState(false);
    const [estado, setEstado] = useState("A pagar");
    const [overlay, setOverlay] = useState(false);

    useEffect(() => {
        tab ? setEstado("A depositar") : setEstado("A pagar");
    }, [tab]);

    return (
        <>
            <Header
                tab={tab}
                onClick={() => setTab(!tab)}
                estado={estado}
                setEstado={setEstado}
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
                        overlay={overlay}
                        setOverlay={setOverlay}
                    />
                ) : (
                    <Pagos
                        estado={estado}
                        overlay={overlay}
                        setOverlay={setOverlay}
                    />
                )}
            </Section>
        </>
    );
}

export default Gestion;
