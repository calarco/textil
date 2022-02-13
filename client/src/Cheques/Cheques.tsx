import styled from "styled-components";

import { View } from "components/View";
import CalendarPanel from "./CalendarPanel";
import GestionPanel from "./GestionPanel";

const ViewMod = styled(View)`
    grid-template-columns: 2fr 1fr;
`;

function Cheques() {
    return (
        <ViewMod>
            <GestionPanel />
            <CalendarPanel />
        </ViewMod>
    );
}

export default Cheques;
