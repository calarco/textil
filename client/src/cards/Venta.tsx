import { MouseEvent, useState, useEffect } from "react";
import styled from "styled-components";

import Card from "components/Card";
import Expand from "components/Expand";
import Details from "components/Details";
import ButtonsComponent from "components/Buttons";
import Currency from "components/Currency";
import Day from "components/Day";
import Remove from "components/Remove";
import VentaForm from "forms/VentaForm";

const Box = styled.ul`
    height: 3rem;
    display: grid;
    grid-template-columns: 10rem 1fr 1fr [end];
    gap: 1.5rem;
    align-items: center;
    text-align: center;

    > li:nth-child(2),
    > li:nth-child(3) {
        text-align: right;
        padding: 0 1.75rem;
    }
`;

const Buttons = styled(ButtonsComponent)`
    grid-row-start: 2;
`;

type ComponentProps = {
    venta: Venta;
    isActive: boolean;
    overlay: boolean;
    setOverlay: (overlay: boolean) => void;
    onClick?: (e: MouseEvent<HTMLUListElement>) => void;
    className?: string;
};

function Venta({
    venta,
    isActive,
    overlay,
    setOverlay,
    onClick,
    className,
}: ComponentProps) {
    const [form, setForm] = useState(false);
    const [remove, setRemove] = useState(false);

    useEffect(() => {
        !overlay && setForm(false);
    }, [overlay, setForm]);

    useEffect(() => {
        form && setOverlay(true);
    }, [form, setOverlay]);

    return (
        <Card
            isActive={isActive}
            isRemove={remove}
            isForm={form}
            className={className}
        >
            <Box onClick={onClick}>
                <li>
                    <Day date={venta.fecha} />
                </li>
                <li>
                    <Currency number={venta.debe} />
                </li>
                <li>
                    <Currency number={venta.haber} />
                </li>
            </Box>
            <Expand isActive={isActive} height={5.75}>
                <Details>
                    <label>
                        Comprobante
                        <pre>{venta.comprobante || "-"}</pre>
                    </label>
                </Details>
                <Buttons>
                    <button type="button" onClick={() => setRemove(true)}>
                        Borrar
                    </button>
                    <button type="button" onClick={() => setForm(true)}>
                        Editar
                    </button>
                </Buttons>
            </Expand>
            {isActive && (
                <>
                    <Remove
                        id={venta.id}
                        service="ventas"
                        isActive={isActive && remove}
                        exit={() => setRemove(false)}
                    />
                    <VentaForm
                        clienteId={venta.id}
                        venta={venta}
                        isActive={form}
                        close={() => setOverlay(false)}
                    />
                </>
            )}
        </Card>
    );
}

export default Venta;
