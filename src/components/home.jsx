import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getData } from "../actions/data";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import "../style/activetask.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      setInterval(() => {
        dispatch(getData(currentUser.id));
        // console.log(currentUser);
      }, 5000);

      // dispatch(getDataPending(currentUser.id));
      setIsLoading(false);
    }
  }, [currentUser, dispatch]);

  const activeTasks = useSelector((state) => state.data.tasks);
  // console.log(activeTasks);

  const closeTask = (e, id) => {
    e.preventDefault();

    setIsLoading(true);
    fetch("https://api.joshuacattaruzza.com/api/task/done/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        active: false,
        pending: true,
        done: false,
      }),
    }).then(() => {
      dispatch(getData(currentUser.id));
      setIsLoading(false);
    });
  };
  const startTask = (e, id) => {
    e.preventDefault();
    setIsLoading(true);
    fetch(
      `https://api.joshuacattaruzza.com/api/task/mobile/updateStatus/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          active: true,
          pending: false,
          done: false,
        }),
      }
    ).then(() => {
      dispatch(getData(currentUser.id));
      setIsLoading(false);
    });
  };

  const [image, setImage] = useState("");
  const handleCapture = (e) => {
    e.preventDefault();
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", image.data);
    formData.append("task_id", id);

    const response = await fetch(
      "https://api.joshuacattaruzza.com/api/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    console.log(response);
    // if (response) setStatus(response.statusText)
  };
  console.log(activeTasks);
  return (
    <>
      {isLoading ? (
        <Spinner animation="grow" />
      ) : activeTasks && activeTasks.length !== 0 ? (
        <>
          <Container style={{ width: "100%", marginTop: "80px" }}>
            <Card>
              <Card.Header>
                Benvenuto <b>{currentUser.username}</b>, al momento ci sono le
                seguenti manutenzioni in corso
              </Card.Header>
            </Card>
            <Row style={{ display: "flex", flexWrap: "left" }}>
              {activeTasks.map((task) => {
                return (
                  <Col key={task._id}>
                    {!task.status.active ? (
                      <Card className={"m-2"} style={{ width: "23rem" }}>
                        <Card.Body>
                          <Card.Title>Nome: {task.name}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            Operatore: {task.assignee.name}
                          </Card.Subtitle>
                        </Card.Body>
                        {task.image_url !== undefined ? (
                          <Card.Img
                            src={task.image_url}
                            alt="Card image"
                          ></Card.Img>
                        ) : null}

                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            Macchinario: {task.assigned_to_machine.name}
                          </ListGroup.Item>
                        </ListGroup>
                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            Luogo: {task.location.name}
                          </ListGroup.Item>
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
                          onTouchEnd={(e) => {
                            // handleShow();
                            startTask(e, task._id);
                          }}
                        >
                          Start
                        </Button>
                      </Card>
                    ) : task.status.active ? (
                      <Card className={"m-2"} style={{ width: "23rem" }}>
                        <Card.Body>
                          <Card.Title>
                            Nome: {task.name}
                            <svg className="blinking m-2">
                              <circle cx="10" cy="10" r="10" fill="green" />
                            </svg>
                            {task.image_url === "" ? (
                              <>
                                <input
                                  accept="image/*"
                                  id="imageBtn"
                                  type={"file"}
                                  capture="enviroment"
                                  onChange={(e) => handleCapture(e)}
                                />
                                <Button
                                  variant="dark"
                                  type="submit"
                                  onTouchEnd={(e) => {
                                    // handleShow();
                                    handleSubmit(e, task._id);
                                  }}
                                >
                                  Upload image
                                </Button>
                              </>
                            ) : null}
                          </Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            Operatore: {task.assignee.name}
                          </Card.Subtitle>
                        </Card.Body>
                        {task.image_url !== "" ? (
                          <Card.Img
                            src={task.image_url}
                            alt="Card image"
                          ></Card.Img>
                        ) : null}

                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            Macchinario: {task.assigned_to_machine.name}
                          </ListGroup.Item>
                        </ListGroup>
                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            Luogo: {task.location.name}
                          </ListGroup.Item>
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
                          onTouchEnd={(e) => {
                            // handleShow();
                            closeTask(e, task._id);
                          }}
                        >
                          End
                        </Button>
                      </Card>
                    ) : null}
                  </Col>
                );
              })}
            </Row>
          </Container>
        </>
      ) : (
        <>
          <Card className="m-2">
            <Card.Header>
              Benvenuto <b>{currentUser.username}</b>, al momento non ci sono
              manutenzioni in corso
            </Card.Header>
          </Card>
        </>
      )}
    </>
  );
};
export default Home;
