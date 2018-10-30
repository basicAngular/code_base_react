import React from "react";
import PropTypes from "prop-types";
import { Row, Col, ButtonGroup, Button } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import messages from "./messages";

const ProductDetail = ({ product, addItem, currency }) => {
  return (
    <div className="ibox product-detail">
      <div className="ibox-content">
        <Row>
          <Col md={5}>
            <div className="product-images">
              <div>
                  <img width="100%" src={product.image_url} alt="product_img" />
              </div>
            </div>
          </Col>
          <Col md={7}>
            <h2 className="font-bold m-b-xs">{product.title}</h2>
            <div className="m-t-md">
              <h2 className="product-main-price">
                {currency}{product.price}
                <small className="text-muted">
                  <FormattedMessage 
                    {...messages.taxTitle}
                  />
                </small>
              </h2>
            </div>
            <hr />
            <h4>
              <FormattedMessage 
                {...messages.productDescription}
              />
            </h4>
            <div className="small text-muted">{product.description}</div>
            <hr />
            <div>
              <ButtonGroup>
                <Button
                  onClick={() => addItem(product)}
                  bsStyle="primary"
                  bsSize="small"
                >
                  <i className="fa fa-cart-plus" />
                  <FormattedMessage 
                    {...messages.addToCart}
                  />
                </Button>
              </ButtonGroup>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default ProductDetail;

ProductDetail.propTypes = {
  product: PropTypes.object,
  addItem: PropTypes.func,
  currency: PropTypes.string
};