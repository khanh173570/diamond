import React from 'react';
import {Col, Image,Row} from "react-bootstrap";

const ServicePolicy = () => {
  return (
    <div >  
        <Row>  
    <Col md="8" style={{marginBottom:"50px"}}>
      <h1 className='' style={{marginTop:"50px", marginLeft:"600px"}}>Service Policy</h1>
        <div className='' style={{marginLeft:"200px"}} >  
      <section>
        <div style={{ fontWeight: 'bold' }}>1. Diamond Valuation Process</div>
        <p >
          This section may detail the steps involved in the diamond valuation process, including how diamonds are evaluated, graded, and priced.
        </p>
      </section>

      <section >
        <div style={{ fontWeight: 'bold' }}>2. Service Offerings</div>
        <p>
          It describes the range of services provided by the shop, such as diamond appraisal, certification, grading, and valuation for various purposes like insurance or resale.
        </p>
      </section>

      <section>
        <div style={{ fontWeight: 'bold' }}>3. Turnaround Time</div>
        <p>
          This specifies the estimated time it takes for the shop to complete the valuation process and provide the customer with the results.
        </p>
      </section>

      <section>
        <div style={{ fontWeight: 'bold' }}>4. Fees and Charges</div>
        <p>
          It outlines the fees associated with each service offered, including any additional charges for expedited services or special requests.
        </p>
      </section>

      <section>
        <div style={{ fontWeight: 'bold' }}>5. Terms of Payment</div>
        <p>
          This section explains the accepted methods of payment, billing procedures, and any applicable taxes or surcharges.
        </p>
      </section>

      <section>
        <div style={{ fontWeight: 'bold' }}>6. Confidentiality</div>
        <p>
          The policy may include clauses about the confidentiality of the customer information and the privacy measures in place to protect their data.
        </p>
      </section>

      <section>
        <div style={{ fontWeight: 'bold' }}>7. Quality Assurance</div>
        <p>
          It may include information about the shop commitment to accuracy, reliability, and adherence to industry standards in diamond valuation.
        </p>
      </section>

      <section>
        <div style={{ fontWeight: 'bold' }}>8. Disclaimers</div>
        <p>
          This part typically includes disclaimers regarding the limitations of the valuation process, such as the subjective nature of diamond grading and the inherent variability in diamond prices.
        </p>
      </section>

      <section>
        <div style={{ fontWeight: 'bold' }}>9. Customer Responsibilities</div>
        <p>
          It outlines the responsibilities of the customer, such as providing accurate information about the diamond and complying with the shop guidelines and procedures.
        </p>
      </section>

      <section>
        <div style={{ fontWeight: 'bold' }}>10. Refund and Return Policy</div>
        <p>
          This section explains the shop policy regarding refunds, returns, and exchanges for services rendered, including any conditions or limitations.
        </p>
      </section>

      <section>
        <div style={{ fontWeight: 'bold' }}>11. Dispute Resolution</div>
        <p>
          It may include information about how disputes or disagreements will be handled, such as through arbitration or mediation.
        </p>
      </section>

      <section>
        <div style={{ fontWeight: 'bold' }}>12. Changes to the Policy</div>
        <p>
          The policy might state the shop right to modify or update the service policy and how customers will be notified of any changes.
        </p>
        
      </section>
      </div>
    </Col>
    <Col md={4}>
    <h2 className='' style={{marginTop: "200px", marginLeft:"50px"}}>Clear Policy - Loyal Customers</h2>
    <Image
      src="/src/assets/assetsCustomer/servicepolicy.png"
      fluid
      style={{ borderRadius: "4px", marginTop: "10ppx", width: "50%", marginLeft:"130px" }}
    />
    <h2 className='' style={{marginTop: "100px", marginLeft:"50px"}}>Diamond Valuation- Life Valuation</h2> 
    <Image
      src="/src/assets/assetsCustomer/diamond.png"
      fluid
      style={{ borderRadius: "4px", marginTop: "10px", width: "50%", marginLeft:"130px" }}
    /> 
 
  </Col>
  </Row>
  </div>
  );
};

export default ServicePolicy;
