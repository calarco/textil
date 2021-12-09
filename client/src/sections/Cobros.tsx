import { useState } from "react";
import styled from "styled-components";

import useCobros from "hooks/useCobros";
import Cobro from "cards/Cobro";

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

function Cobros({ estado, overlay, setOverlay }: ComponentProps) {
    const [active, setActive] = useState(0);
    const { cobros } = useCobros(estado);

    return (
        <>
            <Columns>
                <label>Fecha de deposito</label>
                <label>Cliente</label>
                <label>Monto</label>
                <label>Fecha de ingreso</label>
            </Columns>
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
        </>
    );
}

export default Cobros;
