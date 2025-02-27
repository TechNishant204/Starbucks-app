import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap";
import Caffee from "../../assets/caffee.jpg";

export default function ListItem({
  data = {},
  addToCart = () => {},
  disabled = false,
}) {
  return (
    <Card
      style={{
        background: "linear-gradient(115deg, #f8f9fa, #ced4da, #e9ecef)",
      }}
      className="d-flex flex-row mb-2 shadow p-3 rounded"
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
        <CardTitle tag="h5" className="text-success-emphasis">
          {data.name || "NO TITLE"}
        </CardTitle>
        <CardText className="mb-3">
          Price: {data.price ? `${data.price} INR` : "0 INR"}
        </CardText>
        <Button
          style={{ background: "#1e3932" }}
          onClick={(e) => addToCart(e, data)}
          disabled={disabled}
        >
          ADD TO CART
        </Button>
      </CardBody>
    </Card>
  );
}

ListItem.propTypes = {
  data: Object,
  addToCart: Function,
  disabled: Boolean,
};
