import React from "react";
import "./ListVessel.css";
import { Accordion, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ListVessel = ({ vesselsData, callResetInput, sortType, callSetSort }) => {
  const sorted = vesselsData.sort((a, b) => {
    const isReversed = sortType === "asc" ? 1 : -1;
    return isReversed * a.vesselName.localeCompare(b.vesselName);
  });
  return (
    <div className="list-vessel">
      <Button variant="light" onClick={callSetSort}>
        <img src="/images/sortIcon.png" alt="Icon for button sort" />
      </Button>
      {sorted.map((vessel, index) => {
        return (
          <Accordion key={index}>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey={vessel}>
                {vessel.vesselName}
                <i>+</i>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={vessel}>
                <Card.Body>
                  <ul>
                    <li>
                      <b>Name:</b> {vessel.vesselName}
                    </li>
                    <li>
                      <b>Member:</b> {vessel.member}
                    </li>
                    <li>
                      <b>Flag:</b> {vessel.flagDescription}
                    </li>
                    <li>
                      <b>GT:</b> {vessel.grossTonnage}
                    </li>
                    <li>
                      <b>IMO:</b> {vessel.imo}
                    </li>
                    <li>
                      <b>Year Built:</b> {vessel.builtYear}
                    </li>
                  </ul>
                  <Link to={`/vessel/${index}`}>
                    <Button variant="secondary" onClick={callResetInput}>
                      More info
                    </Button>
                  </Link>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        );
      })}
    </div>
  );
};

export default ListVessel;
