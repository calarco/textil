import { useState, useEffect } from "react";
import styled from "styled-components";

import useCobros from "../hooks/useCobros";
import List from "components/List";
import Cobro from "../cards/CobroCard";

const Empty = styled.h5`
    padding: 2rem;
    text-align: center;
    color: var(--on-background-variant);
`;

type ComponentProps = {
    estado: string;
    sort: string;
    overlay: boolean;
    setOverlay: (overlay: boolean) => void;
};

function CobrosList({ estado, sort, overlay, setOverlay }: ComponentProps) {
    const [active, setActive] = useState(0);
    const { cobros } = useCobros({ estado: estado, sort: sort });

    useEffect(() => {
        setOverlay(false);
    }, [cobros, setOverlay]);

    return (
        <List switchOn={sort}>
            {cobros.data[0] ? (
                cobros.data[0].id !== 0 &&
                cobros.data.map((cobro) => (
                    <Cobro
                        key={cobro.id}
                        cobro={cobro}
                        isActive={cobro.id === active}
                        overlay={overlay}
                        setOverlay={setOverlay}
                        onClick={() =>
                            cobro.id === active
                                ? setActive(0)
                                : setActive(cobro.id)
                        }
                    />
                ))
            ) : (
                <Empty>No se encontraron cheques</Empty>
            )}
        </List>
    );
}

export default CobrosList;
