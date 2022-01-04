import { useState, useEffect } from "react";
import feathersClient from "feathersClient";
import styled, { ThemeProvider } from "styled-components";
import transition from "styled-transition-group";
import { SwitchTransition } from "react-transition-group";

import { themeDark, themeLight } from "themes";
import GlobalStyle from "globalStyle";
import Login from "Login/Login";
import Bar from "Bar";
import Calendar from "Calendar";
import Gestion from "Gestion";

const Container = transition.main.attrs({
    unmountOnExit: true,
    timeout: {
        enter: 300,
        exit: 200,
    },
})`
    will-change: opacity;
    padding-bottom: calc(env(safe-area-inset-bottom) + 0px);
    width: 100vw;
    height: 100vh;
    overflow: clip;
    display: grid;
    justify-content: center;
    grid-template-rows: 1fr 1.75rem;

    &:enter {
        opacity: 0;
        transform: scale(1.1);
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
        transform: scale(0.9);
        transition: 0.2s ease-in;
    }
`;

const Panels = styled.div`
    width: 100vw;
    max-width: 95rem;
    height: 100%;
    padding: 1.5rem 2rem;
    display: grid;
    gap: 2rem;
    grid-template-columns: 2fr 1fr;
`;

const Panel = styled.div`
    position: relative;
    height: calc(100vh - 4.75rem);
    border-radius: 4px;
    background: var(--surface-variant);
    outline: var(--border-variant);
    box-shadow: var(--shadow-variant);
    display: grid;
    grid-template-rows: auto 1fr;
`;

function App() {
    const [user, setUser] = useState(null);
    const [darkTheme, setDarkTheme] = useState(
        localStorage.getItem("darkTheme") || ""
    );

    useEffect(() => {
        feathersClient
            .reAuthenticate()
            .then(({ user }) => setUser(user))
            .catch((error) => {
                console.error(error);
                setUser(null);
            });
    }, []);

    useEffect(() => {
        localStorage.setItem("darkTheme", darkTheme);
    }, [darkTheme]);

    return (
        <>
            <ThemeProvider theme={darkTheme ? themeDark : themeLight}>
                <GlobalStyle />
            </ThemeProvider>
            <SwitchTransition>
                <Container key={user ? "0" : "1"}>
                    {user ? (
                        <>
                            <Panels>
                                <Panel>
                                    <Gestion />
                                </Panel>
                                <Panel>
                                    <Calendar />
                                </Panel>
                            </Panels>
                            <Bar
                                setUser={setUser}
                                darkTheme={darkTheme}
                                setDarkTheme={setDarkTheme}
                            />
                        </>
                    ) : (
                        <Login setUser={setUser} />
                    )}
                </Container>
            </SwitchTransition>
        </>
    );
}

export default App;
