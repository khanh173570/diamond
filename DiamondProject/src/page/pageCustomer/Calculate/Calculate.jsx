import React, { useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import "./Calculate.css";
import { CalculateOutput } from "./CalculateOutput";
import axios from "axios";

function Calculate() {
  const [diamondCalculate, setDiamondCalculate] = useState({
    diamondOrigin: "Natural",
    shape: "Round",
    carat: "",
    clarity: "SI2",
    color: "K",
    cut: "FAIR",
    symmetry: "FAIR",
    polish: "FAIR",
    fluorescence: "VSTG",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  console.log(diamondCalculate);

  const selectedOption = (type, item) => {
    setDiamondCalculate((currentItem) => ({ ...currentItem, [type]: item }));
  };

  const handleOnCalculate = () => {
    setLoading(true);
    setError(null);
    const queryParams = new URLSearchParams(diamondCalculate).toString();
    console.log(queryParams)
    const apiUrl = `https://www.stonealgo.com/diamond-price-calculator/calc?${queryParams}`;
    
    axios.get(apiUrl)
      .then(response => {
        setResult(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="text-center">
        {/* Header */}
        <h1>Diamond Price Calculate</h1>
        <hr
          style={{
            background: "#DDE1DF",
            height: "2px",
            marginTop: "1.5em",
          }}
        />
      </div>
      {/* Main Calculate */}
      <div>
        <div className="">
          {/* Calculator Input */}
          <Row className="justify-content-center ">
            <Col md={6} className="w-25 mb-5">
              <div className="fs-3 fw-bold ">Calculate Input</div>
              {/* diamond origin */}
              <div className="">
                <div className="">
                  <label htmlFor="">DIAMOND ORIGIN</label>
                  <div className="d-flex flex-wrap mb-4 button-group ">
                    {["Natural", "Lab Grown"].map((value) => {
                      return (
                        <Button
                          key={value}
                          onClick={() => selectedOption("diamondOrigin", value)}
                          style={{ width: "45%", marginLeft: "10px" }}
                          className={
                            diamondCalculate.diamondOrigin === value
                              ? "selected"
                              : ""
                          }
                        >
                          {value}
                        </Button>
                      );
                    })}
                  </div>
                  {/* shape */}
                  <label htmlFor="">SHAPE</label>
                  <div className="d-flex flex-wrap mb-3 button-group">
                    {[
                      "Round",
                      "Oval",
                      "Emerald",
                      "Pear",
                      "Trillion",
                      "Heart",
                    ].map((value) => {
                      return (
                        <Button
                          key={value}
                          onClick={() => selectedOption("shape", value)}
                          style={{ width: "30%", margin: "3px 5px" }}
                          className={
                            diamondCalculate.shape === value ? "selected" : ""
                          }
                        >
                          {value}
                        </Button>
                      );
                    })}
                  </div>
                  {/*Carat  */}
                  <div className="mb-3">
                    <label htmlFor="carat" className="w-100">
                      CARAT
                    </label>
                    <input
                      id="carat"
                      type="text"
                      name="carat"
                      className="w-100"
                      onChange={(e) =>
                        setDiamondCalculate((currentItem) => ({
                          ...currentItem,
                          carat: e.target.value,
                        }))
                      }
                    />
                  </div>

                  {/* Clarity */}
                  <label htmlFor="">CLARITY</label>
                  <div className="d-flex flex-wrap ms-2 mb-3 button-group">
                    {["IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1"].map(
                      (clarity) => (
                        <Button
                          key={clarity}
                          className={
                            diamondCalculate.clarity === clarity ? "selected" : ""
                          }
                          style={{ width: "23%", margin: "3px 2px" }}
                          onClick={() => selectedOption("clarity", clarity)}
                        >
                          {clarity}
                        </Button>
                      )
                    )}
                  </div>
                  {/* Color */}
                  <label htmlFor="">COLOR</label>
                  <div className="d-flex flex-wrap ms-2 mb-3 button-group">
                    {["K", "J", "I", "H", "G", "F", "E", "D"].map((color) => (
                      <Button
                        key={color}
                        className={
                          diamondCalculate.color === color ? "selected" : ""
                        }
                        style={{ width: "23%", margin: "3px 2px" }}
                        onClick={() => selectedOption("color", color)}
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                  {/* cut */}
                  <label htmlFor="">CUT</label>
                  <div className="d-flex flex-wrap ms-2 mb-3 button-group">
                    {["FAIR", "GOOD", "V.GOOD", "EX."].map((cut) => {
                      return (
                        <Button
                          key={cut}
                          style={{
                            width: "23%",
                            margin: "3px 2px",
                            textAlign: "center",
                          }}
                          className={
                            diamondCalculate.cut === cut ? "selected" : ""
                          }
                          onClick={() => selectedOption("cut", cut)}
                        >
                          {cut}
                        </Button>
                      );
                    })}
                  </div>

                  {/* symmetry */}
                  <label htmlFor="">SYMMETRY</label>
                  <div className="d-flex flex-wrap ms-2 mb-4 button-group">
                    {["FAIR", "GOOD", "V.GOOD", "EX."].map((symmetry) => {
                      return (
                        <Button
                          key={symmetry}
                          style={{
                            width: "23%",
                            margin: "3px 2px",
                            textAlign: "center",
                          }}
                          className={
                            diamondCalculate.symmetry === symmetry
                              ? "selected"
                              : ""
                          }
                          onClick={() => selectedOption("symmetry", symmetry)}
                        >
                          {symmetry}
                        </Button>
                      );
                    })}
                  </div>
                  {/* polish */}
                  <label htmlFor="">POLISH</label>
                  <div className="d-flex flex-wrap ms-2 mb-3 button-group">
                    {["FAIR", "GOOD", "V.GOOD", "EX."].map((polish) => {
                      return (
                        <Button
                          key={polish}
                          style={{
                            width: "23%",
                            margin: "3px 2px",
                            textAlign: "center",
                          }}
                          className={
                            diamondCalculate.polish === polish ? "selected" : ""
                          }
                          onClick={() => selectedOption("polish", polish)}
                        >
                          {polish}
                        </Button>
                      );
                    })}
                  </div>
                  {/* fluorescence */}
                  <label htmlFor="">FLUORESCENCE</label>
                  <div className="d-flex flex-wrap ms-2 mb-3 button-group">
                    {["VSTG", "STG", "MED", "FNT", "NDN"].map((fluorescence) => {
                      return (
                        <Button
                          key={fluorescence}
                          style={{
                            width: "18%",
                            margin: "3px 2px",
                            textAlign: "center",
                          }}
                          onClick={() =>
                            selectedOption("fluorescence", fluorescence)
                          }
                          className={
                            diamondCalculate.fluorescence === fluorescence
                              ? "selected"
                              : ""
                          }
                        >
                          {fluorescence}
                        </Button>
                      );
                    })}
                  </div>
                  <div className="d-grid button-submit">
                    <Button onClick={handleOnCalculate} disabled={loading}>
                      {loading ? (
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      ) : (
                        "Calculate"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6} className="w-50">
              <div>
                <div className="fs-3 fw-bold">Calculate Output</div>
                <div>
                  <CalculateOutput result={result} error={error} loading={loading} />
                  <div></div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Calculate;
