import { useState, useEffect } from "react";
import styled from "styled-components";

import useVentas from "../hooks/useVentas";
import { List } from "components/List";
import { Create } from "components/Create";
import Venta from "../cards/VentaCard";
import VentaForm from "../forms/VentaForm";

const Empty = styled.h5`
    padding: 2rem;
    text-align: center;
    color: var(--on-background-variant);
`;

type ComponentProps = {
    clienteId: number;
    sort: string;
    overlay: boolean;
    setOverlay: (overlay: boolean) => void;
};

function VentasList({ clienteId, sort, overlay, setOverlay }: ComponentProps) {
    const [active, setActive] = useState(0);
    const [create, setCreate] = useState(false);
    const { ventas, loading, error } = useVentas({
        clienteId: clienteId,
        sort: sort,
    });

    useEffect(() => {
        !overlay && setCreate(false);
    }, [overlay, setCreate]);

    useEffect(() => {
        create && setOverlay(true);
    }, [create, setOverlay]);

    useEffect(() => {
        setOverlay(false);
    }, [ventas, setOverlay]);

    return (
        <List switchOn={sort} loading={loading}>
            <Create isActive={create} onClick={() => setCreate(true)}>
                <VentaForm
                    clienteId={clienteId}
                    isActive={create}
                    close={() => setOverlay(false)}
                />
            </Create>
            {error ? (
                <Empty>{error}</Empty>
            ) : (
                ventas.data.map((venta) => (
                    <Venta
                        key={venta.id}
                        venta={venta}
                        isActive={active === venta.id}
                        overlay={overlay}
                        setOverlay={setOverlay}
                        onClick={() =>
                            venta.id === active
                                ? setActive(0)
                                : setActive(venta.id)
                        }
                    />
                ))
            )}
        </List>
    );
}

export default VentasList;
