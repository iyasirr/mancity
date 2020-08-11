import React from "react";

const TextField = ({ data, id, onChange }) => {
  const generateField = () => {
    let field = null;
    switch (data.element) {
      case "input":
        field = (
          <div>
            {data.showLabel ? (
              <div className="label_inputs">{data.config.label}</div>
            ) : null}
            <input
              {...data.config}
              value={data.value}
              onChange={(event) => onChange({ event, id })}
            />
            {showError()}
          </div>
        );
        break;
      case "select":
        field = (
          <div>
            {data.showLabel ? (
              <div className="label_inputs">{data.config.label}</div>
            ) : null}
            <select
              {...data.config}
              value={data.value}
              onChange={(event) => onChange({ event, id })}
            >
              <option value="">Select One</option>
              {data.config.options.map((item) => (
                <option key={item.key} value={item.value}>
                  {item.value}
                </option>
              ))}
            </select>
            {showError()}
          </div>
        );
        break;
      default:
        field = null;
    }
    return field;
  };

  const showError = () => (
    <div className="error_label">
      {data.validation && !data.valid ? data.validationMessage : null}
    </div>
  );

  return <div>{generateField()}</div>;
};

export default TextField;
