import { useState, useEffect } from "react";

import usePrecios from "../hooks/usePrecios";
import { List } from "components/List";
import PrecioCard from "../cards/PrecioCard";

type ComponentProps = {
    columns: Column[];
    overlay: boolean;
    setOverlay: (overlay: boolean) => void;
};

function PreciosList({ columns, overlay, setOverlay }: ComponentProps) {
    const [create, setCreate] = useState(false);
    const [active, setActive] = useState(0);
    const { precios } = usePrecios();

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
        <List switchOn={``}>
            {precios.data.map((precio) => (
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
            ))}
        </List>
    );
}

export default PreciosList;