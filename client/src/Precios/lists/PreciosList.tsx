import { useState, useEffect } from "react";
import styled from "styled-components";

import usePrecios from "../hooks/usePrecios";
import { List } from "components/List";
import PrecioCard from "../cards/PrecioCard";

const Empty = styled.h5`
    padding: 2rem;
    text-align: center;
    color: var(--on-background-variant);
`;

type ComponentProps = {
    columns: Column[];
    overlay: boolean;
    setOverlay: (overlay: boolean) => void;
};

function PreciosList({ columns, overlay, setOverlay }: ComponentProps) {
    const [create, setCreate] = useState(false);
    const [active, setActive] = useState(0);
    const { precios, loading, error } = usePrecios();

    useEffect(() => {
        !overlay && setCreate(false);
    }, [overlay, setCreate]);

    useEffect(() => {
        create && setOverlay(true);
    }, [create, setOverlay]);

    useEffect(() => {
        setOverlay(false);
    }, [precios, setOverlay]);

    return (
        <List switchOn={``} loading={loading}>
            {error ? (
                <Empty>{error}</Empty>
            ) : (
                precios.data.map((precio) => (
                    <PrecioCard
                        key={precio.id}
                        precio={precio}
                        columns={columns}
                        isActive={active === precio.id}
                        onClick={() =>
                            precio.id === active
                                ? setActive(0)
                                : setActive(precio.id)
                        }
                        overlay={overlay}
                        setOverlay={setOverlay}
                    />
                ))
            )}
        </List>
    );
}

export default PreciosList;
