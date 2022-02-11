import { MouseEvent, useState, useEffect } from "react";
import styled from "styled-components";

import Card from "components/Card";
import Expand from "components/Expand";
import DetailsComponent from "components/Details";
import ButtonsComponent from "components/Buttons";
import Remove from "components/Remove";
import { Currency } from "components/Currency";
import PrecioForm from "../forms/PrecioForm";

const Box = styled.ul`
    height: 3rem;
    display: grid;
    grid-template-columns: 5rem 1fr 10rem 10rem 10rem 10rem 10rem[end];
    gap: 1px;
    align-items: center;
    text-align: center;

    > li:nth-child(3),
    > li:nth-child(4),
    > li:nth-child(5),
    > li:nth-child(6),
    > li:nth-child(7) {
        text-align: right;
        padding: 0 1rem;
    }
`;

const Details = styled(DetailsComponent)`
    grid-template-columns: 1fr 10rem 10rem 10rem 10rem [end];
    grid-auto-flow: row;
`;

const Items = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
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
                <li>
                    <pre>{precio.articulo}</pre>
                </li>
                <li>
                    <p>
                        {precio.descripcion}
                        <small>{precio.kg} kg</small>
                    </p>
                </li>
                <li>
                    <Currency number={946.34} />
                </li>
                <li>
                    <Currency number={1430.34} />
                </li>
                <li>
                    <Currency number={1490.34} />
                </li>
                <li>
                    <Currency number={1266.34} />
                </li>
                <li>
                    <Currency number={1590.34} integer />
                </li>
            </Box>
            <Expand isActive={isActive} height={8.5}>
                <Details>
                    <Items>
                        {precio.costos &&
                            precio.costos.map((costo) => (
                                <label key={0}>
                                    {costo.nombre}
                                    <Currency number={costo.monto} />
                                </label>
                            ))}
                    </Items>
                    <label>
                        Ganancia
                        <Currency number={483} />
                    </label>
                    <label>
                        Ganancia
                        <Currency number={320} />
                    </label>
                    <label>
                        Inversion
                        <Currency number={163} />
                    </label>
                    <label>
                        sin comision
                        <Currency number={1272} />
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
                    <PrecioForm
                        precio={precio}
                        isActive={form}
                        close={() => setOverlay(false)}
                    />
                </>
            )}
        </Card>
    );
}

export default PrecioCard;
