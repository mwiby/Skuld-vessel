import React from "react";
import "./Vessel.css";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Vessel = ({ vesselsData }) => {
  const { id } = useParams();
  const vessel = vesselsData[id];

  return (
    <div className="card-container">
      {!vessel ? (
        <p>
          Oops!<br></br>
          404 Not Found
        </p>
      ) : (
        <>
          <Card>
            <Card.Body>
              <Card.Title>{vessel.vesselName}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              {(() => {
                let items = [];
                for (const [key, value] of Object.entries(vessel)) {
                  if (key === "certificates" && value.length > 0) {
                    items.push(
                      <ListGroupItem key={key}>
                        <div className="cert-title">Certificates</div>
                        <ul>
                          {value.map((obj, key) => {
                            return (
                              <li key={key}>
                                <span className="type">
                                  {obj.certificateType}
                                </span>
                                <br></br>
                                {obj.certificate}
                              </li>
                            );
                          })}
                        </ul>
                      </ListGroupItem>
                    );
                    return items;
                  } else if (key === "certificates" && value.length === 0) {
                    items.push(
                      <ListGroupItem key={key}>
                        <div className="cert-title">No earned certificates</div>
                      </ListGroupItem>
                    );
                    return items;
                  }
                  items.push(
                    <ListGroupItem key={key}>
                      <span className="type">{`${key}: `}</span>
                      {value}
                    </ListGroupItem>
                  );
                }
                return items;
              })()}
            </ListGroup>
            <Card.Body>
              <Link to={"/"}>
                <Button variant="secondary">Back</Button>
              </Link>
            </Card.Body>
          </Card>
        </>
      )}
    </div>
  );
};

export default Vessel;
