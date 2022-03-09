import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Machine = ({ machine }) => {
  const { name, uri, id } = machine;

  const navigate = useNavigate();
  // Confirmar si desea eliminarlo
  const confirmarEliminarMachine = (id) => {
    // preguntar al usuario
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Una máquina que se elimina no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        // pasarlo al action
        // dispatch( deleteMachineAction(id) );
      }
    });
  };

  const redirectToDetails = () => {
    navigate(`/machine/detail/:${window.btoa(uri)}`);
  };

  // función que redirige de forma programada
  // const redireccionarEdicion = machine => {
  //     dispatch( obtenerMachineEditar(machine) );
  //     history.push(`/machines/editar/${machine.id}`)
  // }

  return (
    <tr>
      <td>{name}</td>
      <td>
        <a className="font-weight-bold" href={uri} target="_blank">
          {uri}{" "}
        </a>
      </td>
      <td className="acciones">
        <button
          type="button"
          className="btn btn-primary mr-2"
          onClick={redirectToDetails}
        >
          Detalles{" "}
        </button>
      </td>
    </tr>
  );
};

export default Machine;
