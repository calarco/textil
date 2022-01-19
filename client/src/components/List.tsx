import { ReactNode, useRef } from "react";
import transition from "styled-transition-group";
import { SwitchTransition } from "react-transition-group";

const Container = transition.section.attrs({
    unmountOnExit: true,
    timeout: {
        enter: 300,
        exit: 150,
    },
})`
    padding: 0.75rem;
    display: grid;
    align-content: start;
    gap: 0.75rem;

    &:enter {
        opacity: 0;
    }

    &:enter-active {
        opacity: 1;
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
    children: ReactNode;
    className?: string;
};

function List({ switchOn, children, className }: ComponentProps) {
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
            </Container>
        </SwitchTransition>
    );
}

export default List;
