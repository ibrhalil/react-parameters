import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import Parameters from "./components/Parameters";

import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";

const App = () => {
    const [attribute, setAttribute] = useState({});

    useEffect(() => {
        setAttribute({
            key12: "value",
            key333: "test",
        });
    }, []);

    const onChangeParameters = (properties) => {
        setAttribute(properties);
    };

    return (
        <>
            <Container>
                <Row>
                    <Col style={{ textAlign: "center" }} className="p-3">
                        <h1>Key/Value Parameters App</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Parameters
                            parameters={attribute}
                            onChangeParameters={onChangeParameters}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col style={{ textAlign: "right" }} className="pt-3 pr-2">
                        <Button color="info" onClick={() => console.log(attribute)}>Send to List</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default App;
