import View from "components/View";
import Calendar from "./CalendarPanel";
import GestionPanel from "./GestionPanel";

function Saldos() {
    return (
        <View>
            <GestionPanel />
            <Calendar />
        </View>
    );
}

export default Saldos;
