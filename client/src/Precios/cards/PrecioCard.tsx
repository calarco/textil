import { MouseEvent, useState, useEffect } from "react";
import styled from "styled-components";

import Card from "components/Card";
import Expand from "components/Expand";
import DetailsComponent from "components/Details";
import ButtonsComponent from "components/Buttons";
import Remove from "components/Remove";
import Currency from "components/Currency";

const Box = styled.ul`
    height: 3rem;
    display: grid;
    grid-template-columns: 1fr 1fr [end];
    gap: 1.5rem;
    align-items: center;
    text-align: center;

    > li:nth-child(3) {
        text-align: right;
        padding: 0 1.75rem;
    }
`;

const Details = styled(DetailsComponent)`
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-auto-flow: row;
`;

const Buttons = styled(ButtonsComponent)`
    grid-row-start: 2;
`;

type ComponentProps = {
    precio: Precio;
    isActive: boolean;
    overlay: boolean;
    setOverlay: (overlay: boolean) => void;
    onClick?: (e: MouseEvent<HTMLUListElement>) => void;
    className?: string;
};

function PrecioCard({
    precio,
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
                <li>{precio.descripcion}</li>
                <li>
                    <Currency number={946.34} />
                </li>
            </Box>
            <Expand isActive={isActive} height={8.5}>
                <Details>
                    <label>
                        hilado
                        <Currency number={precio.hilado} />
                    </label>
                    <label>
                        tejido
                        <Currency number={precio.tejido} />
                    </label>
                    <label>
                        confeccion
                        <Currency number={precio.confeccion} />
                    </label>
                    <label>
                        cierre
                        <Currency number={precio.cierre} />
                    </label>
                    <label>
                        fin
                        <Currency number={precio.fin} />
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
                        id={precio.id}
                        service="cobros"
                        isActive={isActive && remove}
                        exit={() => setRemove(false)}
                    />
                </>
            )}
        </Card>
    );
}

export default PrecioCard;
