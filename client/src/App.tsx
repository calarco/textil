import { useRef, useState, useEffect } from "react";
import feathersClient from "feathersClient";
import { ThemeProvider } from "styled-components";
import transition from "styled-transition-group";
import { SwitchTransition } from "react-transition-group";

import { themeDark, themeLight } from "themes";
import GlobalStyle from "globalStyle";
import Login from "Login/Login";
import Views from "Views";

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
    grid-template-rows: auto 1fr;
    justify-items: center;

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

function App() {
    const nodeRef = useRef(null);
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
                <Container nodeRef={nodeRef} ref={nodeRef} key={user}>
                    {user ? (
                        <Views
                            setUser={setUser}
                            darkTheme={darkTheme}
                            setDarkTheme={setDarkTheme}
                        />
                    ) : (
                        <Login setUser={setUser} />
                    )}
                </Container>
            </SwitchTransition>
        </>
    );
}

export default App;
