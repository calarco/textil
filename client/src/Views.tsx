import { useRef, useState } from "react";
import transition from "styled-transition-group";
import { SwitchTransition } from "react-transition-group";

import Bar from "Bar";
import { Cheques } from "Cheques";
import { Saldos } from "Saldos";
import { Precios } from "Precios";

const Container = transition.main.attrs({
    unmountOnExit: true,
    timeout: {
        enter: 300,
        exit: 200,
    },
})`
    will-change: opacity;
    width: 100%;
    max-width: 95rem;
    height: 100%;

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
        transition: 0.2s ease-in;
    }
`;

type ComponentProps = {
    setUser: (user: any) => void;
    darkTheme: string;
    setDarkTheme: (darkTheme: string) => void;
};

function Views({ setUser, darkTheme, setDarkTheme }: ComponentProps) {
    const nodeRef = useRef(null);
    const [route, setRoute] = useState("cheques");

    return (
        <>
            <Bar
                setUser={setUser}
                darkTheme={darkTheme}
                setDarkTheme={setDarkTheme}
                route={route}
                setRoute={setRoute}
            />
            <SwitchTransition>
                <Container nodeRef={nodeRef} ref={nodeRef} key={route}>
                    {route === "cheques" ? (
                        <Cheques />
                    ) : route === "saldos" ? (
                        <Saldos />
                    ) : (
                        <Precios />
                    )}
                </Container>
            </SwitchTransition>
        </>
    );
}

export default Views;
