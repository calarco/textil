import { useState } from "react";
import styled from "styled-components";

import usePagos from "hooks/usePagos";
import Pago from "cards/Pago";

const Columns = styled.div`
    display: grid;
    grid-template-columns: 10rem 1fr 1fr 10rem;
    gap: 1.5rem;

    label {
        position: relative;
        padding: 0.25rem 1rem;
        text-align: center;

        &:not(:first-child)::after {
            content: "";
            position: absolute;
            top: calc(50% - 1rem);
            left: -0.75rem;
            height: 2rem;
            border-left: 1px solid var(--primary-variant);
        }
    }
`;

const Empty = styled.h5`
    padding: 2rem;
    text-align: center;
    color: var(--on-background-variant);
`;

type ComponentProps = {
    estado: string;
    overlay: boolean;
    setOverlay: (overlay: boolean) => void;
};

function Pagos({ estado, overlay, setOverlay }: ComponentProps) {
    const [active, setActive] = useState(0);
    const { pagos } = usePagos(estado);

    return (
        <>
            <Columns>
                <label>Fecha de pago</label>
                <label>Proveedor</label>
                <label>Monto</label>
                <label>Fecha de emision</label>
            </Columns>
            {pagos.data[0] ? (
                pagos.data[0].id !== 0 &&
                pagos.data.map((pago) => (
                    <Pago
                        key={pago.id}
                        pago={pago}
                        isActive={pago.id === active}
                        overlay={overlay}
                        setOverlay={setOverlay}
                        onClick={() =>
                            pago.id === active
                                ? setActive(0)
                                : setActive(pago.id)
                        }
                    />
                ))
            ) : (
                <Empty>No se encontraron cheques</Empty>
            )}
        </>
    );
}

export default Pagos;
