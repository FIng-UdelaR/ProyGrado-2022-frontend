import { useEffect, useContext } from "react";
import Machine from "./Machine";
import MachineContext from "../../context/machines/MachineContext";

const MachineList = () => {
  const { getMachines, machines, error, loading } = useContext(MachineContext);

  useEffect(() => {
    getMachines();
  }, []);

  return (
    <>
      <h2 className="text-center my-5">Machine list</h2>

      {error ? (
        <p className="font-weight-bold alert alert-danger text-center mt-4">
          There was an error
        </p>
      ) : null}

      {loading ? <p className="text-center">Loading....</p> : null}

      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">URL</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {machines.length === 0
            ? "No hay máquinas"
            : machines.map((machine) => (
                <Machine key={machine.id} machine={machine} />
              ))}
        </tbody>
      </table>
    </>
  );
};

export default MachineList;
