import { MouseEvent, ReactNode, useRef } from "react";
import transition from "styled-transition-group";
import { SwitchTransition } from "react-transition-group";

import { Overlay } from "components/Overlay";

const Container = transition.section.attrs({
    unmountOnExit: true,
    timeout: {
        enter: 300,
        exit: 150,
    },
})`
    content-visibility: auto;
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 25rem;
    max-height: 100%;
    border-radius: 4px;
    background: var(--surface);
    box-shadow: var(--shadow);
    overflow-y: overlay;

    &:enter {
        opacity: 0;
        transform: translateY(-1rem);
    }

    &:enter-active {
        opacity: 1;
        transform: initial;
        transition: 0.3s ease-out;
    }

    &:exit {
        opacity: 1;
    }

    &:exit-active {
        opacity: 0;
        transition: 0.15s ease-in;
    }
`;

type ComponentProps = {
    switchOn?: string;
    overlay?: boolean;
    cancel?: (e: MouseEvent<HTMLDivElement>) => void;
    children: ReactNode;
    className?: string;
};

function Section({
    switchOn,
    overlay,
    cancel,
    children,
    className,
}: ComponentProps) {
    const nodeRef = useRef(null);

    return (
        <SwitchTransition>
            <Container
                nodeRef={nodeRef}
                ref={nodeRef}
                key={switchOn || 0}
                className={className}
            >
                {children}
                <Overlay overlay={overlay} cancel={cancel} long />
            </Container>
        </SwitchTransition>
    );
}

export default Section;
