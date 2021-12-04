import { useState, useEffect } from "react";
import feathersClient from "feathersClient";
import styled, { ThemeProvider } from "styled-components";

import { themeDark, themeLight } from "themes";
import GlobalStyle from "globalStyle";
import Login from "Login/Login";
import Pagos from "./Pagos";
import Bar from "Bar";
import Cobros from "Cobros";

const Container = styled.main`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: grid;
    justify-content: center;
    grid-template-rows: 1fr 1.75rem;
`;

const Panels = styled.div`
    width: 100vw;
    max-width: 95rem;
    height: 100%;
    padding: 1.5rem 2rem;
    display: grid;
    gap: 2rem;
    grid-template-columns: 1fr 1fr;
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
        <Container>
            <ThemeProvider theme={darkTheme ? themeDark : themeLight}>
                <GlobalStyle />
            </ThemeProvider>
            {user ? (
                <>
                    <Panels>
                        <Panel>
                            <Pagos />
                        </Panel>
                        <Panel>
                            <Cobros />
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
    );
}

export default App;
