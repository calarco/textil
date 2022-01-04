import { useState } from "react";
import styled from "styled-components";

import usePagos from "hooks/usePagos";
import Pago from "cards/Pago";

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

function Pagos({ estado, sort, overlay, setOverlay }: ComponentProps) {
    const [active, setActive] = useState(0);
    const { pagos } = usePagos({ estado: estado, sort: sort });

    return (
        <>
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
