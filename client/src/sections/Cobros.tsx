import { useState } from "react";
import styled from "styled-components";

import useCobros from "hooks/useCobros";
import Section from "components/Section";
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

function Cobros() {
    const [active, setActive] = useState(0);
    const { cobros } = useCobros();

    return (
        <Section overlay={false} cancel={() => {}}>
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
        </Section>
    );
}

export default Cobros;
