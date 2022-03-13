import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Machine = ({ machine }) => {
  const { name, uri, id } = machine;

  const navigate = useNavigate();

  const redirectToDetails = () => {
    navigate(`/machine/detail/:${window.btoa(uri)}`);
  };

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
