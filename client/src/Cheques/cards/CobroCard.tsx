import { MouseEvent, useState, useEffect } from "react";
import styled from "styled-components";

import { useCheques } from "../hooks/chequesContext";
import { Card } from "components/Card";
import { Expand } from "components/Expand";
import { Details } from "components/Details";
import { Buttons } from "components/Buttons";
import { Currency } from "components/Currency";
import { Day } from "components/Day";
import { Remove } from "components/Remove";
import CobroForm from "../forms/CobroForm";

const Box = styled.ul`
    height: 3rem;
    display: grid;
    grid-template-columns: 2fr 3fr 2fr 2fr [end];
    gap: 1.5rem;
    align-items: center;
    text-align: center;

    > li:nth-child(3) {
        text-align: right;
        padding: 0 1.75rem;
    }
`;

const DetailsMod = styled(Details)`
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: auto auto;
    grid-auto-flow: row;
`;

const ButtonsMod = styled(Buttons)`
    grid-row-start: 2;
`;

type ComponentProps = {
    cobro: Cobro;
    isActive: boolean;
    overlay: boolean;
    setOverlay: (overlay: boolean) => void;
    onClick?: (e: MouseEvent<HTMLUListElement>) => void;
    className?: string;
};

function CobroCard({
    cobro,
    isActive,
    overlay,
    setOverlay,
    onClick,
    className,
}: ComponentProps) {
    const [form, setForm] = useState(false);
    const [remove, setRemove] = useState(false);
    const { getLibrador, getBanco } = useCheques();

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
                    <Day date={cobro.depositoDate} />
                </li>
                <li>
                    <p>{getLibrador(cobro.libradoreId)}</p>
                </li>
                <li>
                    <Currency number={cobro.monto} />
                </li>
                <li>
                    <Day date={cobro.emisionDate} />
                </li>
            </Box>
            <Expand isActive={isActive} height={8.5}>
                <DetailsMod>
                    <label>
                        Banco
                        <p>{getBanco(cobro.bancoId)}</p>
                    </label>
                    <label>
                        Titular
                        <p>{cobro.titular}</p>
                    </label>
                    <label>
                        CUIT
                        <p>{cobro.cuit}</p>
                    </label>
                    <label>
                        Numero
                        <p>{cobro.numero}</p>
                    </label>
                    <label>
                        Observaciones
                        <p>{cobro.observaciones || "-"}</p>
                    </label>
                    <label>
                        Estado
                        <p>{cobro.estado}</p>
                    </label>
                </DetailsMod>
                <ButtonsMod>
                    <button type="button" onClick={() => setRemove(true)}>
                        Borrar
                    </button>
                    <button type="button" onClick={() => setForm(true)}>
                        Editar
                    </button>
                </ButtonsMod>
            </Expand>
            {isActive && (
                <>
                    <Remove
                        id={cobro.id}
                        service="cobros"
                        isActive={isActive && remove}
                        exit={() => setRemove(false)}
                    />
                    <CobroForm
                        cobro={cobro}
                        isActive={form}
                        close={() => setOverlay(false)}
                    />
                </>
            )}
        </Card>
    );
}

export default CobroCard;
