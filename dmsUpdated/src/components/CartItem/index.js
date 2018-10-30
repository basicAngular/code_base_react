import React from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import { formatPrice } from "../../utils/helpers";
import { FormattedMessage } from "react-intl";
import messages from "./messages";

const CartItem = ({ items, removeItem, totalPrice, updateQuantity, checkout, currency }) => {

  return items.length > 0 ? <div className="ibox">
      <div className="ibox-title">
        <span className="pull-right">
          (<strong>{items.length}</strong>) items
        </span>
        <h5>
          <FormattedMessage {...messages.title} />
          {/* <FormattedMessage {...messages.title.id} /> */}
        </h5>
      </div>
      {items.map((item, key) => <div className="ibox-content" key={key}>
          <Table className="shoping-cart-table" responsive>
            <tbody>
              <tr>
                <td width="90">
                  <img width="100%" src={item.image_url} alt="product_img" />
                </td>
                <td className="desc">
                  <h3 className="text-navy">{item.title}</h3>
                  <p className="small">{item.description}</p>
                  <div className="m-t-sm">
                    <a className="text-muted" onClick={() => removeItem(item)}>
                      <i className="fa fa-trash" />
                      <FormattedMessage {...messages.removeItem} />
                    </a>
                  </div>
                </td>
                <td>
                  {" "}
                  <h4 className="updatedPrice-style">
                    {currency + formatPrice(item.updatedPrice)}
                  </h4>
                </td>
                <td width="65">
                  <input type="number" className="form-control" defaultValue={item.quantity} onChange={updateQuantity.bind(this, item)} min="1" />
                </td>
                <td>
                  <h4>{currency + formatPrice(item.updatedPrice)}</h4>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>)}
      <div className="ibox-content">
        <span className="pull-right total-price1">
          <FormattedMessage {...messages.total} />
          <p className="total-price">
            {currency + formatPrice(totalPrice)}
          </p>
        </span>
        <button className="btn btn-primary" onClick={checkout.bind(this)}>
          <i className="fa fa fa-shopping-cart" />
          <FormattedMessage {...messages.checkout}/>
        </button>
      </div>
    </div> : <div />;
};

export default CartItem;

CartItem.propTypes = {
  items: PropTypes.array,
  checkout: PropTypes.func,
  currency: PropTypes.string,
  removeItem: PropTypes.func,
  totalPrice: PropTypes.number,
  updateQuantity: PropTypes.func
};