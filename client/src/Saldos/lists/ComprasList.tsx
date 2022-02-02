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
    sort: string;
    overlay: boolean;
    setOverlay: (overlay: boolean) => void;
};

function ComprasList({
    proveedoreId,
    sort,
    overlay,
    setOverlay,
}: ComponentProps) {
    const [active, setActive] = useState(0);
    const [create, setCreate] = useState(false);
    const { compras, loading, error } = useCompras({
        proveedoreId: proveedoreId,
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
    }, [compras, setOverlay]);

    return (
        <List switchOn={`${sort}${error}`} loading={loading}>
            <Create isActive={create} onClick={() => setCreate(true)}>
                <CompraForm
                    proveedoreId={proveedoreId}
                    isActive={create}
                    close={() => setOverlay(false)}
                />
            </Create>
            {error ? (
                <Empty>{error}</Empty>
            ) : (
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
            )}
        </List>
    );
}

export default ComprasList;
