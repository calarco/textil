import { useState, useEffect } from "react";
import styled from "styled-components";

import useCompras from "../hooks/useCompras";
import List from "components/List";
import Create from "components/Create";
import Compra from "Saldos/cards/CompraCard";
import CompraForm from "../forms/CompraForm";

const Empty = styled.h5`
    padding: 2rem;
    text-align: center;
    color: var(--on-background-variant);
`;

type ComponentProps = {
    proveedoreId: number;
    overlay: boolean;
    setOverlay: (overlay: boolean) => void;
};

function ComprasList({ proveedoreId, overlay, setOverlay }: ComponentProps) {
    const [active, setActive] = useState(0);
    const [create, setCreate] = useState(false);
    const { compras } = useCompras(proveedoreId);

    useEffect(() => {
        !overlay && setCreate(false);
    }, [overlay, setCreate]);

    useEffect(() => {
        create && setOverlay(true);
    }, [create, setOverlay]);

    useEffect(() => {
        setOverlay(false);
    }, [compras, setOverlay]);

    return (
        <List>
            <Create isActive={create} onClick={() => setCreate(true)}>
                <CompraForm
                    proveedoreId={proveedoreId}
                    isActive={create}
                    close={() => setOverlay(false)}
                />
            </Create>
            {compras.data[0] ? (
                compras.data[0].id !== 0 &&
                compras.data.map((compra) => (
                    <Compra
                        key={compra.id}
                        compra={compra}
                        isActive={active === compra.id}
                        overlay={overlay}
                        setOverlay={setOverlay}
                        onClick={() =>
                            compra.id === active
                                ? setActive(0)
                                : setActive(compra.id)
                        }
                    />
                ))
            ) : (
                <Empty>No se encontraron compras</Empty>
            )}
        </List>
    );
}

export default ComprasList;
