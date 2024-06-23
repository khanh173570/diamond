import React, { useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import "./Calculate.css";
import { CalculateOutput } from "./CalculateOutput";
import { useNavigate } from "react-router-dom";

function Calculate() {
  const [diamondCalculate, setDiamondCalculate] = useState({
    isLabGrown: true ,
    shape: "Round",
    caratWeight: "",
    clarity: "SI2",
    color: "K",
    cut: "Fair",
    symmetry: "Fair",
    polish: "Fair",
    fluorescence: "Fair",
  });

  const navigate = useNavigate();

  const selectedOption = (type, item) => {
    setDiamondCalculate((currentItem) => ({ ...currentItem, [type]: item }));
  };
  const handleOnCalculate = () => {
    const queryParams = new URLSearchParams(diamondCalculate).toString();
    navigate(`/calculate?${queryParams}`);
  };
  return (
    <div>
      <div className="text-center">
        <h1>Diamond Price Calculate</h1>
        <hr style={{ background: "#DDE1DF", height: "2px", marginTop: "1.5em" }} />
      </div>
      <div>
        <Row className="justify-content-center ">
          <Col md={6} className="w-25 mb-5">
            <div className="fs-3 fw-bold">Calculate Input</div>
            <label htmlFor="">DIAMOND ORIGIN</label>
            <div className="d-flex flex-wrap mb-4 button-group ">

              {["Natural", "Lab Grown"].map((value) => (
                <Button
                  key={"Lab Grown" ? true : false}
                  onClick={() => selectedOption("isLabGrown", value)}
                  style={{ width: "45%", marginLeft: "10px" }}
                  className={diamondCalculate.diamondOrigin === value ? "selected" : ""}
                >
                  {value}
                </Button>
              ))}
            </div>
            <label htmlFor="">SHAPE</label>
            <div className="d-flex flex-wrap mb-3 button-group">
              {["Round", "Oval", "Emerald", "Pear", "Cushion", "Heart"].map((value) => (
                <Button
                  key={value}
                  onClick={() => selectedOption("shape", value)}
                  style={{ width: "30%", margin: "3px 5px" }}
                  className={diamondCalculate.shape === value ? "selected" : ""}
                >
                  {value}
                </Button>
              ))}
            </div>
            <div className="mb-3">
              <label htmlFor="carat" className="w-100">CARAT</label>
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
            <label htmlFor="">CLARITY</label>
            <div className="d-flex flex-wrap ms-2 mb-3 button-group">
              {["IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1"].map(
                (clarity) => (
                  <Button
                    key={clarity}
                    className={diamondCalculate.clarity === clarity ? "selected" : ""}
                    style={{ width: "23%", margin: "3px 2px" }}
                    onClick={() => selectedOption("clarity", clarity)}
                  >
                    {clarity}
                  </Button>
                )
              )}
            </div>
            <label htmlFor="">COLOR</label>
            <div className="d-flex flex-wrap ms-2 mb-3 button-group">
              {["K", "J", "I", "H", "G", "F", "E", "D"].map((color) => (
                <Button
                  key={color}
                  className={diamondCalculate.color === color ? "selected" : ""}
                  style={{ width: "23%", margin: "3px 2px" }}
                  onClick={() => selectedOption("color", color)}
                >
                  {color}
                </Button>
              ))}
            </div>
            <label htmlFor="">CUT</label>
            <div className="d-flex flex-wrap ms-2 mb-3 button-group">
              {["Fair", "Good", "Very Good", "Excellent"].map((cut) => (
                <Button
                  key={cut}
                  style={{ width: "23%", margin: "3px 2px", textAlign: "center" }}
                  className={diamondCalculate.cut === cut ? "selected" : ""}
                  onClick={() => selectedOption("cut", cut)}
                >
                  {cut}
                </Button>
              ))}
            </div>
            <label htmlFor="">SYMMETRY</label>
            <div className="d-flex flex-wrap ms-2 mb-4 button-group">
              {["FAIR", "GOOD", "V.GOOD", "EX."].map((symmetry) => (
                <Button
                  key={symmetry}
                  style={{ width: "23%", margin: "3px 2px", textAlign: "center" }}
                  className={diamondCalculate.symmetry === symmetry ? "selected" : ""}
                  onClick={() => selectedOption("symmetry", symmetry)}
                >
                  {symmetry}
                </Button>
              ))}
            </div>
            <label htmlFor="">POLISH</label>
            <div className="d-flex flex-wrap ms-2 mb-3 button-group">
              {["FAIR", "GOOD", "V.GOOD", "EX."].map((polish) => (
                <Button
                  key={polish}
                  style={{ width: "23%", margin: "3px 2px", textAlign: "center" }}
                  className={diamondCalculate.polish === polish ? "selected" : ""}
                  onClick={() => selectedOption("polish", polish)}
                >
                  {polish}
                </Button>
              ))}
            </div>
            <label htmlFor="">FLUORESCENCE</label>
            <div className="d-flex flex-wrap ms-2 mb-3 button-group">
              {["VSTG", "STG", "MED", "FNT", "NDN"].map((fluorescence) => (
                <Button
                  key={fluorescence}
                  style={{ width: "18%", margin: "3px 2px", textAlign: "center" }}
                  onClick={() => selectedOption("fluorescence", fluorescence)}
                  className={diamondCalculate.fluorescence === fluorescence ? "selected" : ""}
                >
                  {fluorescence}
                </Button>
              ))}
            </div>
            <div className="d-grid button-submit">
              <Button onClick={handleOnCalculate}>Calculate</Button>
            </div>
          </Col>
          <Col md={6} className="w-50">
            <div>
              <div className="fs-3 fw-bold">Calculate Output</div>
              <div>
                <CalculateOutput />
                <div></div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Calculate;
