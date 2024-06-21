import React from "react";
import "./Calculate.css";
import { Row, Col, Spinner } from "react-bootstrap";

export const CalculateOutput = ({ result, error, loading }) => {
  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <div className="text-danger">Error fetching data</div>;
  }

  if (!result) {
    return <div>No data available</div>;
  }

  return (
    // Main output
    <div>
      {/* Price */}
      <div className="border border-dark rounded pt-4 mb-3">
        {/* Price info */}
        <div>
          <div className="d-flex justify-content-center mb-1">
            <div className="fw-bold fs-4 text-muted">DIAMOND PRICE RANGE</div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="quality-diamond">
              {`${result.diamondOrigin} - ${result.shape} - ${result.carat} - ${result.clarity} - ${result.color} - ${result.cut}`}
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div
              className="fw-bold fs-1 p-2 border border-dark"
              style={{ borderRadius: "15px" }}
            >
              {`$${result.priceRange.min}-$${result.priceRange.max}`}
            </div>
          </div>
        </div>
        {/* Price range */}
        <Row>
          <Col md={6} className="">
            <div className="text-center p-4">
              <div>Last 30 days change</div>
              <div className="fw-bold">{`${result.last30DaysChange}%`}</div>
            </div>
          </Col>
          <Col md={6}>
            <div className="text-center p-4">
              <div>Estimate Range</div>
              <div className="fw-bold">{`$${result.estimateRange.min}-$${result.estimateRange.max}`}</div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Brand */}
      <div className="border border-dark rounded">
        <div className="fs-5 ms-3">Recommend Store</div>
        {result.stores.map((store, index) => (
          <div className="border border-dark rounded m-3" key={index}>
            {/* include list of diamond */}
            <Row>
              <Col md={2}>
                <img src={store.imageUrl} alt="" width="80px" height="100%" />
              </Col>
              <Col md={9} className="m-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="text-center">
                    <div className="fw-bold">{store.cut}</div>
                    <div>Cut</div>
                  </div>
                  <div className="text-center">
                    <div className="fw-bold">{store.carat}</div>
                    <div>Carat</div>
                  </div>
                  <div className="text-center">
                    <div className="fw-bold">{store.clarity}</div>
                    <div>Clarity</div>
                  </div>
                  <div className="text-center">
                    <div className="fw-bold">{store.color}</div>
                    <div>Color</div>
                  </div>
                  <div>
                    <img src={store.logoUrl} alt="" width="100px" height="50px" />
                  </div>
                  <div className="fw-bold">{`$${store.price}`}</div>
                </div>
              </Col>
            </Row>
          </div>
        ))}
      </div>
    </div>
  );
};
