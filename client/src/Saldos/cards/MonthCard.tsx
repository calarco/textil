import styled, { css } from "styled-components";

import useSaldo from "../hooks/useSaldo";
import { Card } from "components/Card";
import { Expand } from "components/Expand";
import { Details } from "components/Details";
import { Currency } from "components/Currency";

type Props = {
    readonly isCurrent?: boolean;
};

const Box = styled.div<Props>`
    width: 100%;
    min-height: 3rem;
    padding: 0.75rem 1.75rem;
    display: grid;
    grid-template-columns: 5.5rem 1fr;
    align-items: center;
    text-transform: capitalize;
    transition: 0.2s ease-in;

    ${(props) =>
        props.isCurrent &&
        css`
            h4 {
                color: var(--secondary);
            }
        `};
`;

type ComponentProps = {
    year: number;
    month: number;
    isActive?: boolean;
    setActive: (active: number) => void;
};

function MonthCard({ year, month, isActive, setActive }: ComponentProps) {
    const { saldo: compras, loading: loadingCompras } = useSaldo({
        service: "compras",
        gte: `${year}-${(month + 1).toString().padStart(2, "0")}-01`,
        lte: `${year}-${(month + 1).toString().padStart(2, "0")}-${new Date(
            year,
            month + 1,
            0
        ).getDate()}`,
    });
    const { saldo: ventas, loading: loadingVentas } = useSaldo({
        service: "ventas",
        gte: `${year}-${(month + 1).toString().padStart(2, "0")}-01`,
        lte: `${year}-${(month + 1).toString().padStart(2, "0")}-${new Date(
            year,
            month + 1,
            0
        ).getDate()}`,
    });

    return (
        <Card isActive={isActive}>
            <Box
                isCurrent={month === new Date().getMonth()}
                onClick={() => {
                    isActive ? setActive(12) : setActive(month);
                }}
            >
                <h4>
                    {new Date(year, month, 1).toLocaleDateString("default", {
                        month: "long",
                    })}
                </h4>
                <Currency
                    number={ventas - compras}
                    loading={loadingCompras || loadingVentas}
                    integer
                />
            </Box>
            <Expand isActive={isActive} height={3}>
                <Details fixed>
                    <label>
                        Compras
                        <Currency
                            number={compras}
                            loading={loadingCompras}
                            integer
                        />
                    </label>
                    <label>
                        Ventas
                        <Currency
                            number={ventas}
                            loading={loadingVentas}
                            integer
                        />
                    </label>
                </Details>
            </Expand>
        </Card>
    );
}

export default MonthCard;
