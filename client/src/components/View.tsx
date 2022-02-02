import styled from "styled-components";

import { Device } from "globalStyle";

const View = styled.div`
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 0.5rem;

    @media ${Device.desktop} {
        padding: 1px 2rem;
        gap: 2rem;
    }
`;

export default View;
