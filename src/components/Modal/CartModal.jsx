import { Modal, ModalHeader, ModalBody } from "reactstrap";
import CartListItem from "../ListItems/CartListItem"; // Adjust the path as necessary

export default function CartModal({
  items = [],
  isOpen = false,
  toggle = () => {},
  quantityChange = () => {},
  totalCartPrice = 0,
}) {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <h3 className="">CART</h3>
      </ModalHeader>
      <ModalBody>
        {items.length > 0 ? (
          items.map((item, index) => (
            <CartListItem
              key={`cart-item-${item.name}-${index}`}
              data={item}
              quantityChange={quantityChange}
            />
          ))
        ) : (
          <h3>NO ITEMS IN THE CART</h3>
        )}
        <div className="mt-4">
          <h3 className="text-end">
            Cart Total: <span>{totalCartPrice || 0}</span>
          </h3>
        </div>
      </ModalBody>
    </Modal>
  );
}

CartModal.propTypes = {
  items: Array,
  isOpen: Boolean,
  toggle: Function,
  quantityChange: Function,
  totalCartPrice: Number,
};
