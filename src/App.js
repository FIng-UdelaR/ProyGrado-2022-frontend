import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import NewMachine from "./components/machine/NewMachine";
import MachineList from "./components/machine/MachineList";
import MachineDetail from "./components/machine/MachineDetail";
import NewWorkFlow from "./components/workFlow/NewWorkFlow";
import WorkFlowList from "./components/workFlow/WorkFlowList";
import MachineState from "./context/machines/MachineState";
import MapState from "./context/googleMap/MapState";
import AlertState from "./context/alert/AlertState";
import WorkFlowState from "./context/workFlow/WorkFlowState";
import MainPage from "./components/MainPage";
import SimulationPreview from "./components/simulations/SimulationPreview";

function App() {
  return (
    <Router>
      <Header />
      <div className="container mt-5">
        <MachineState>
          <WorkFlowState>
            <MapState>
              <AlertState>
                <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/machine/list" element={<MachineList />} />
                  <Route path="/machine/new" element={<NewMachine />} />
                  <Route
                    path="/machine/newWorkFlow"
                    element={<NewWorkFlow />}
                  />
                  <Route path="/orders" element={<WorkFlowList />} />
                  <Route
                    path="/machine/detail/:uri"
                    element={<MachineDetail />}
                  />
                  <Route path="/simulations" element={<SimulationPreview />} />
                </Routes>
              </AlertState>
            </MapState>
          </WorkFlowState>
        </MachineState>
      </div>
    </Router>
  );
}

export default App;
