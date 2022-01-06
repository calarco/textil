import { useRef } from "react";
import transition from "styled-transition-group";
import { SwitchTransition } from "react-transition-group";

const Container = transition.pre.attrs({
    unmountOnExit: true,
    timeout: {
        enter: 300,
        exit: 150,
    },
})`
    text-align: right;
    font: var(--label-alt);
    color: var(--on-background-variant);

    span {
        font: var(--label-alt);
    }
    
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
    number: number;
    integer?: boolean;
};

const Currency = function ({ number, integer }: ComponentProps) {
    const nodeRef = useRef(null);
    const numbers = number.toString().split(".");

    return (
        <SwitchTransition>
            <Container nodeRef={nodeRef} ref={nodeRef} key={number}>
                $
                <span>
                    {numbers[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    {!integer && <small>{numbers[1]}</small>}
                </span>
            </Container>
        </SwitchTransition>
    );
};

export default Currency;
