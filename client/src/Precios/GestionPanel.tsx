import { useState } from "react";

import { Panel } from "components/Panel";
import { Section } from "components/Section";
import PreciosList from "./lists/PreciosList";
import Header from "./GestionHeader";

function GestionPanel() {
    const [columns, setColumns] = useState([
        { nombre: "costo", porcentage: 181, base: "total" },
        { nombre: "fabrica", porcentage: 151, base: "costo" },
        { nombre: "vendedor", porcentage: 104, base: "fabrica" },
        { nombre: "venta", porcentage: 85, base: "vendedor" },
        { nombre: "signori", porcentage: 168, base: "costo" },
    ]);
    const [sort, setSort] = useState("articulo");
    const [overlay, setOverlay] = useState(false);

    return (
        <Panel>
            <Header
                columns={columns}
                setColumns={setColumns}
                sort={sort}
                setSort={setSort}
                overlay={overlay}
                setOverlay={setOverlay}
            />
            <Section overlay={overlay} cancel={() => setOverlay(false)}>
                <PreciosList
                    columns={columns}
                    overlay={overlay}
                    setOverlay={setOverlay}
                />
            </Section>
        </Panel>
    );
}

export default GestionPanel;
