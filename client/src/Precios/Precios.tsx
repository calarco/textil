import { useState } from "react";
import View from "components/View";
import Panel from "components/Panel";
import Section from "components/Section";
import List from "components/List";
import PrecioCard from "./cards/PrecioCard";

function Precios() {
    const [active, setActive] = useState(0);
    const [overlay, setOverlay] = useState(false);

    return (
        <View>
            <Panel>
                <Section>
                    <List>
                        <PrecioCard
                            precio={{
                                id: 1,
                                descripcion: "Escote V sin manga",
                                hilado: 587.4,
                                tejido: 120,
                                confeccion: 213.44,
                                cierre: 0,
                                fin: 25.5,
                                createdAt: "",
                                updatedAt: "",
                            }}
                            isActive={active === 1}
                            onClick={() => setActive(1)}
                            overlay={overlay}
                            setOverlay={setOverlay}
                        />
                    </List>
                </Section>
            </Panel>
        </View>
    );
}

export default Precios;
