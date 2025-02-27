import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap";
import Caffee from "../../assets/caffee.jpg";

export default function CartListItem({ data = {}, quantityChange = () => {} }) {
  return (
    <Card
      style={{
        background: "linear-gradient(115deg, #f8f9fa, #ced4da, #e9ecef)",
      }}
      className="d-flex flex-row mb-2 shadow p-3 rounded-pill"
    >
      <img
        style={{
          width: 150,
        }}
        height="150px"
        width="150px"
        className="rounded-circle"
        alt={data.name || "caffee"}
        src={data.image || Caffee}
      />
      <CardBody>
        <CardTitle tag="h5">{data.name || "NO TITLE"}</CardTitle>
        <CardText className="mb-3">
          Price : {data.price ? `${data.price} INR` : "0 INR"}
        </CardText>
        <div className="d-flex gap-2 align-items-center">
          <Button
            outline
            color="success"
            onClick={(e) => quantityChange(e, "dec", data.id)}
          >
            -
          </Button>
          <h3>{data.quantity || 0}</h3>
          <Button
            color="success"
            onClick={(e) => quantityChange(e, "inc", data.id)}
          >
            +
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

CartListItem.propTypes = {
  data: Object,
  addToCart: Function,
  disabled: Boolean,
  quantityChange: Function,
};
