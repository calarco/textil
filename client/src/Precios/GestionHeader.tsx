import { useState, useEffect } from "react";
import styled, { css } from "styled-components";

import { Overlay } from "components/Overlay";
import PrecioForm from "./forms/PrecioForm";
import AumentosForm from "./forms/AumentosForm";
import PorcentagesForm from "./forms/PorcentagesForm";

const Container = styled.div`
    position: relative;
    height: 6.25rem;
    padding: 0 0.75rem;
    display: grid;
    grid-template-columns: 9fr 8fr;
    grid-template-rows: 1fr auto;
`;

const Row = styled.div`
    height: 100%;
    display: grid;
    grid-template-columns: 6fr 3fr;
    gap: 1px;
    align-items: center;
`;

const New = styled.div`
    padding: 0 0.75rem 0 0;
    position: relative;
    display: grid;
    align-items: center;

    button {
        color: var(--secondary);
        background: var(--secondary-variant);
        box-shadow: var(--shadow-variant);

        &:hover {
            background: var(--primary-variant);
        }
    }
`;

const Costo = styled.div`
    position: relative;
    padding: 0 1rem;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    transition: 0.15s ease-in;

    select {
        width: 100%;
    }

    &::after {
        content: "";
        position: absolute;
        top: calc(50% - 1rem);
        left: -1px;
        height: 2rem;
        border-left: var(--border-variant);
    }
`;

const Porcentages = styled.div`
    grid-row-end: span 2;
    position: relative;
`;

const Columns = styled.div`
    display: grid;
    grid-template-columns: 1fr 5fr 3fr [end];
    gap: 1px;
`;

type Props = {
    readonly isActive?: boolean;
};

const Sort = styled.div<Props>`
    position: relative;
    padding: 0.75rem 1rem;
    font: var(--label);
    color: var(--on-background-variant);
    text-align: center;
    transition: 0.15s ease-in;

    &:hover {
        cursor: pointer;
        background-color: var(--primary-variant);
    }

    &:not(:first-child)::after {
        content: "";
        position: absolute;
        top: calc(50% - 1rem);
        left: -1px;
        height: 2rem;
        border-left: var(--border-variant);
    }

    ${(props) =>
        props.isActive &&
        css`
            pointer-events: none;
            color: var(--secondary);

            &:focus {
                background: var(--primary-variant);
            }
        `};
`;

type ComponentProps = {
    sort: string;
    setSort: (sort: string) => void;
    overlay: boolean;
    setOverlay: (overlay: boolean) => void;
};

function GestionHeader({ sort, setSort, overlay, setOverlay }: ComponentProps) {
    const [create, setCreate] = useState(false);
    const [editAumentos, setEditAumentos] = useState(false);
    const [editPorcentages, setEditPorcentages] = useState(false);

    useEffect(() => {
        !overlay && setCreate(false);
        !overlay && setEditAumentos(false);
        !overlay && setEditPorcentages(false);
    }, [overlay, setCreate, setEditAumentos, setEditPorcentages]);

    useEffect(() => {
        create && setOverlay(true);
    }, [create, setOverlay]);

    useEffect(() => {
        editAumentos && setOverlay(true);
    }, [editAumentos, setOverlay]);

    useEffect(() => {
        editPorcentages ? setOverlay(true) : setOverlay(false);
    }, [editPorcentages, setOverlay]);

    return (
        <Container>
            <Row>
                <New>
                    <button onClick={() => setCreate(true)}>Nuevo</button>
                </New>
                <Costo>
                    <select>
                        <option>Aumentos</option>
                        <option>%0</option>
                        <option>%181</option>
                        <option>%104</option>
                    </select>
                    <button onClick={() => setEditAumentos(true)}>
                        Editar
                    </button>
                    <AumentosForm
                        isActive={editAumentos}
                        close={() => setOverlay(false)}
                    />
                </Costo>
            </Row>
            <Porcentages>
                <PorcentagesForm
                    isActive={editPorcentages}
                    setActive={setEditPorcentages}
                />
            </Porcentages>
            <Columns>
                <Sort
                    isActive={sort === "articulo"}
                    onClick={() => setSort("articulo")}
                >
                    Articulo
                </Sort>
                <Sort
                    isActive={sort === "libradoreId"}
                    onClick={() => setSort("libradoreId")}
                >
                    Descripcion
                </Sort>
                <Sort
                    isActive={sort === "emisionDate"}
                    onClick={() => setSort("emisionDate")}
                >
                    Costo
                </Sort>
            </Columns>
            <PrecioForm isActive={create} close={() => setOverlay(false)} />
            <Overlay overlay={overlay} cancel={() => setOverlay(false)} />
        </Container>
    );
}

export default GestionHeader;
