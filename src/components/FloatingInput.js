import { FloatingLabel, Form } from "react-bootstrap";

function FloatingInput({ label, errorText, controlId, ...rest }) {
  return (
    <>
      <FloatingLabel controlId={controlId} label={label} className="mb-3">
        <Form.Control {...rest} />
      </FloatingLabel>
      {errorText && <span className="text-danger">{errorText}</span>}
    </>
  );
}

export default FloatingInput;
