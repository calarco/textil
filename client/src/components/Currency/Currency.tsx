import { useRef, useState, useEffect } from "react";
import { css } from "styled-components";
import transition from "styled-transition-group";
import { SwitchTransition } from "react-transition-group";

type Props = {
    readonly loading?: boolean;
};

const Container = transition.pre.attrs({
    unmountOnExit: true,
    timeout: {
        enter: 300,
        exit: 150,
    },
})<Props>`
    will-change: opacity;
    text-align: right;
    font: var(--label-alt);
    color: var(--on-background-variant);

    span {
        font: var(--label-alt);
    }

    ${(props: Props) =>
        props.loading &&
        css`
            opacity: 0;
        `};
    
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
    loading?: boolean;
    integer?: boolean;
};

const Currency = function ({ number, loading, integer }: ComponentProps) {
    const nodeRef = useRef(null);
    const [numbers, setNumbers] = useState([""]);

    useEffect(() => {
        !loading && setNumbers(number.toString().split("."));
    }, [number, loading]);

    return numbers[0] !== "" ? (
        <SwitchTransition>
            <Container
                nodeRef={nodeRef}
                ref={nodeRef}
                key={!loading && numbers[0]}
            >
                $
                <span>
                    {numbers[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    {!integer && (
                        <small>
                            {numbers[1]
                                ? (numbers[1] + "0").substring(0, 2)
                                : "00"}
                        </small>
                    )}
                </span>
            </Container>
        </SwitchTransition>
    ) : (
        <></>
    );
};

export default Currency;
