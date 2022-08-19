import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Row } from "reactstrap";

const Parameters = ({ parameters = {}, onChangeParameters }) => {
    const [properties, setProperties] = useState([]);
    const [key, setKey] = useState("");
    const [value, setValue] = useState("");
    const inputKeyRef = useRef();
    const inputValueRef = useRef();

    useEffect(() => {
        const ent = Object.entries(parameters);
        setProperties(ent);
    }, [parameters]);

    const printProperties = () => {
        const elements = [];
        properties.length > 0 &&
            elements.push(
                <Row key="-1" className="mb-2">
                    <Col xs={4}>
                        <span className="h4">
                            <u>Key</u>
                        </span>
                    </Col>
                    <Col xs={5}>
                        <span className="h4">
                            <u>Value</u>
                        </span>
                    </Col>
                    <Col></Col>
                </Row>,
            );
        properties.map(([key, value], index) =>
            elements.push(
                <Row key={index} className="border-bottom border-left mb-2">
                    <Col xs={4} className="text-truncate">
                        <span
                            style={{ cursor: "pointer" }}
                            title={key}
                            onClick={() => {
                                onClickEventFieldFill(index);
                            }}
                        >
                            {key}
                        </span>
                    </Col>
                    <Col xs={5} className="text-truncate">
                        <span
                            style={{ cursor: "pointer" }}
                            title={value}
                            onClick={() => {
                                onClickEventFieldFill(index);
                            }}
                        >
                            {value}
                        </span>
                    </Col>
                    <Col xs={3} className="mr-2">
                        <i
                            className={"fa fa-trash-o fa-2x fa-clickable-red"}
                            onClick={() => removeProperty(index)}
                            title={index}
                        >
                        </i>
                    </Col>
                </Row>,
            ),
        );
        return elements;
    };

    const addProperty = () => {
        if (!key.length > 0 || !value.length > 0) {
            return;
        }
        properties.push([key, value]);
        onChangeParam();
        setKey("");
        setValue("");
        inputKeyRef.current.focus();
    };

    const removeProperty = (index) => {
        properties.splice(index, 1);
        onChangeParam();
    };

    const onChangeParam = () => {
        onChangeParameters(Object.fromEntries(properties));
    };

    const onClickEventFieldFill = (i) => {
        const obj = properties[i];
        if (typeof obj === "object") {
            setKey(obj[0]);
            setValue(obj[1]);
        }
    };

    return (
        <>
            <Row>
                <Col xs={12} sm={5}>
                    <input
                        placeholder={"key"}
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && inputValueRef.current.focus()}
                        ref={inputKeyRef}
                    />
                </Col>
                <Col xs={12} sm={5}>
                    <input
                        placeholder={"value"}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addProperty()}
                        ref={inputValueRef}
                    />
                </Col>
                <Col xs={12} sm={2} className="d-flex justify-content-end">
                    <Button
                        variant="secondary"
                        color="dark"
                        onClick={addProperty}
                        className="w-100"
                    >
                        Add
                    </Button>
                </Col>
            </Row>
            <Row></Row>
            <Row className="pt-3 pl-3">
                <Col>{printProperties()}</Col>
            </Row>
        </>
    );
};

export default Parameters;
