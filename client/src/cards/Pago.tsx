import { MouseEvent, useState, useEffect } from "react";
import styled from "styled-components";

import { useCheques } from "hooks/chequesContext";
import Card from "components/Card";
import Expand from "components/Expand";
import DetailsComponent from "components/Details";
import ButtonsComponent from "components/Buttons";
import Currency from "components/Currency";
import Day from "components/Day";
import Remove from "components/Remove";
import PagoForm from "forms/PagoForm";

const Box = styled.ul`
    height: 3rem;
    display: grid;
    grid-template-columns: 10.5rem 3fr 2fr 10.5rem [end];
    gap: 1.5rem;
    align-items: center;
    text-align: center;

    > li:nth-child(3) {
        text-align: right;
        padding: 0 0.75rem;
    }
`;

const Details = styled(DetailsComponent)`
    grid-template-columns: 1fr 2fr 1fr;
`;

const Buttons = styled(ButtonsComponent)`
    grid-row-start: 2;
`;

type ComponentProps = {
    pago: Pago;
    isActive: boolean;
    overlay: boolean;
    setOverlay: (overlay: boolean) => void;
    onClick?: (e: MouseEvent<HTMLUListElement>) => void;
    className?: string;
};

function Pago({
    pago,
    isActive,
    overlay,
    setOverlay,
    onClick,
    className,
}: ComponentProps) {
    const [form, setForm] = useState(false);
    const [remove, setRemove] = useState(false);
    const { getDestinatario } = useCheques();

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
                    <Day date={pago.pagoDate} />
                </li>
                <li>
                    <p>{getDestinatario(pago.destinatarioId)}</p>
                </li>
                <li>
                    <Currency number={pago.monto} />
                </li>
                <li>
                    <Day date={pago.emisionDate} />
                </li>
            </Box>
            <Expand isActive={isActive} height={6}>
                <Details>
                    <label>
                        Numero
                        <p>{pago.numero}</p>
                    </label>
                    <label>
                        Observaciones
                        <p>{pago.observaciones || "-"}</p>
                    </label>
                    <label>
                        Estado
                        <p>{pago.estado}</p>
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
                        id={pago.id}
                        service="pagos"
                        isActive={isActive && remove}
                        exit={() => setRemove(false)}
                    />
                    <PagoForm
                        pago={pago}
                        isActive={isActive && form ? true : false}
                        close={() => setOverlay(false)}
                    />
                </>
            )}
        </Card>
    );
}

export default Pago;
