import { MouseEvent, ReactNode } from "react";
import styled from "styled-components";

import { Overlay } from "components/Overlay";

const Container = styled.div`
    width: 100%;
    position: relative;
    height: calc(100vh - 4rem);
    border-radius: 4px;
    background: var(--surface-variant);
    outline: var(--border-variant);
    box-shadow: var(--shadow-variant);
    display: grid;
    grid-template-rows: auto 1fr;
`;

type ComponentProps = {
    overlay?: boolean;
    cancel?: (e: MouseEvent<HTMLDivElement>) => void;
    children: ReactNode;
    className?: string;
};

function Panel({ overlay, cancel, children, className }: ComponentProps) {
    return (
        <Container className={className}>
            {children}
            <Overlay overlay={overlay} cancel={cancel} />
        </Container>
    );
}

export default Panel;
