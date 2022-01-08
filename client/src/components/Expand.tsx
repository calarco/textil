import { ReactNode, useRef } from "react";
import transition from "styled-transition-group";

type Props = {
    height?: number;
};

const Container = transition.div.attrs({
    unmountOnExit: true,
    timeout: {
        enter: 200,
        exit: 150,
    },
})<Props>`
    overflow: clip;
    display: grid;
    grid-auto-flow: column;

    &:enter {
        max-height: 0;
    }

    &:enter-active {
        max-height: ${(props: Props) => props.height}rem;
        transition: 0.2s ease-out;
    }

    &:exit {
        max-height: ${(props: Props) => props.height}rem;
    }

    &:exit-active {
        max-height: 0;
        transition: 0.15s ease-in;
    }
`;

type ComponentProps = {
    isActive?: boolean;
    height?: number;
    children: ReactNode;
    className?: string;
};

const Expand = function ({
    isActive,
    height,
    children,
    className,
}: ComponentProps) {
    const nodeRef = useRef(null);

    return (
        <Container
            nodeRef={nodeRef}
            ref={nodeRef}
            in={isActive}
            height={height}
            className={className}
        >
            {children}
        </Container>
    );
};

export default Expand;
