import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getDataPending } from "../actions/data";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const OldTasks = () => {

  const { user: currentUser } = useSelector((state) => state.auth);
  const pendingTasks = useSelector((state) => state.data.pending_tasks);
  const dispatch = useDispatch();
  console.log(pendingTasks)
  useEffect(() => {
    dispatch(getDataPending(currentUser.id));
  }, [currentUser, dispatch]);

  return (
    <Container>
      <Row style={{display: "flex", flexWrap: "left"}}>

          {pendingTasks &&
            pendingTasks.map((task) => {
              return (
                <Col key={task._id}>
                <Card
                  className={"m-2"}
                  style={{ width: "25rem" }}
                >
                  <Card.Body>
                    <Card.Title>
                      Nome: {task.name}
                      {/* 
                        //Blinker
                        <svg className="blinking m-2">
                           <circle cx="10" cy="10" r="10" fill="red" />
                        </svg> */}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Operatore: {task.assignee.name}
                    </Card.Subtitle>
                  </Card.Body>
                  {task.image_url !== undefined ? (<Card.Img  src={task.image_url}  alt="Card image"></Card.Img>) : null}

                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      Macchinario: {task.assigned_to_machine.name}
                    </ListGroup.Item>
                  </ListGroup>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Luogo: {task.location.name}</ListGroup.Item>
                  </ListGroup>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      Tempo stimato: {task.estimated_time}
                    </ListGroup.Item>
                  </ListGroup>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      Scadenza: {task.expiry_date}
                    </ListGroup.Item>
                  </ListGroup>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      Descrizione: {task.description}
                    </ListGroup.Item>
                  </ListGroup>
                  <Button
                    variant="dark"
                    type="submit"
                    disabled
                  >
                    In attesa di approvazione
                  </Button>
                </Card>
                </Col>
              );
            })}
    
      </Row>
    </Container>
  );
};
export default OldTasks;
