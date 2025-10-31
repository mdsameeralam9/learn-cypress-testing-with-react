import React, { useState, useMemo } from "react";

const initD = {
  1: 20,
  2: 10,
  3: 30,
};

const PollWidget = () => {
  const [selectedWidget, setSelectedWidget] = React.useState({ ...initD });
  const [isDisable, setIsDisable] = useState(true);
  const [isCurrentChecked, setIsCurrentChecked] = useState(null);

  //[1,2,3]

  const handleClick = (selId) => {
    setIsCurrentChecked(selId);
    setIsDisable(false);
    const c = { ...selectedWidget };
    c[selId] = c[selId] + 1;
    setSelectedWidget(c);
  };

  const totalWidget = useMemo(() => {
    let totalWidget = Object.values(selectedWidget).reduce((t, c) => t + c, 0);
    return totalWidget;
  }, [selectedWidget]);
  //[20,10,30]

  const labelObj = {
    1: "Roadside 1",
    2: "Roadside 2",
    3: "Roadside 3",
  };

  const reset = () => {
    setSelectedWidget({ ...initD });
    setIsDisable(true);
    setIsCurrentChecked(null);
  };

  return (
    <div className="p-4">
      <h1>PollWidget</h1>
      <div className="wrap" style={{ width: "400px" }}>
        <fieldset style={{ border: "1px solid", padding: "4px" }}>
          <legend>Personalia:</legend>
          {Object.keys(selectedWidget).map((item) => {
            return (
              <PollItem
                key={item}
                label={labelObj[item]}
                id={item}
                handleClick={() => handleClick(item)}
                totalWidget={totalWidget}
                poll={selectedWidget[item]}
                isMultiple={false}
                isDisable={isDisable}
                isCurrentChecked={isCurrentChecked === item}
              />
            );
          })}
        </fieldset>

        <button onClick={reset}>Remove Poll</button>
      </div>
    </div>
  );
};

export default PollWidget;

const PollItem = ({
  label = "Roadsidecoder",
  id = "",
  handleClick = () => {},
  totalWidget = 0,
  poll = 0,
  isMultiple = false,
  isDisable = false,
  isCurrentChecked = false,
}) => {
  const per = ((poll / totalWidget) * 100).toFixed(1);
  return (
    <div className="item w-100">
      <label style={{ userSelect: "none" }} onClick={() => handleClick(id)}>
        <input
          type={isMultiple ? "checkbox" : "radio"}
          name="pollwidget"
          checked={isCurrentChecked}
        />
        {label}
      </label>
      {!isDisable && (
        <span style={{ marginLeft: "9rem" }}>
          {poll} votes {`(${per})`}
        </span>
      )}
      <br />
      <input
        className="w-100"
        type="range"
        min={1}
        value={poll}
        max={totalWidget}
        disabled={isDisable}
      />
    </div>
  );
};

{
  /**
    
    
  import React, { useMemo } from "react";

const PollWidget = () => {
  const [selectedWidget, setSelectedWidget] = React.useState({
    1: 20,
    2: 10,
    3: 30,
  });

  const handleClick = (selId) => {
    const c = {...selectedWidget}
    c[selId] = c[selId] + 1
    setSelectedWidget(c);
  };

  const totalWidget = useMemo(() => {
    let totalWidget = Object.values(selectedWidget).reduce((t, c) => t + c, 0);
    return totalWidget;
  }, [selectedWidget]);

  return (
    <div className="p-4">
      <h1>PollWidget</h1>
      <div className="wrap" style={{ width: "400px" }}>
        <fieldset style={{ border: "1px solid", padding: "4px" }}>
          <legend>Personalia:</legend>
          <PollItem
            label="Roadside coder"
            id="1"
            handleClick={() => handleClick("1")}
            totalWidget={totalWidget}
            poll={selectedWidget["1"]}
            isMultiple={false}
          />
          <PollItem
            label="Rahul Mishra"
            id="2"
            handleClick={() => handleClick("2")}
            totalWidget={totalWidget}
            poll={selectedWidget["2"]}
               isMultiple={false}
          />
          <PollItem
            label="Namaste React"
            id="3"
            handleClick={() => handleClick("3")}
            totalWidget={totalWidget}
            poll={selectedWidget["3"]}
               isMultiple={false}
          />
        </fieldset>
      </div>
    </div>
  );
};

export default PollWidget;

const PollItem = ({
  label = "Roadsidecoder",
  id = "",
  data = {},
  handleClick = () => {},
  totalWidget=0,
  poll =0,
  isMultiple = false
}) => {
   const per = ((poll/totalWidget)*100).toFixed(1)
  return (
    <div className="item w-100">
      
      <label style={{userSelect: "none"}} onClick={() => handleClick(id)}>
        <input type={isMultiple ? "checkbox" :"radio"} name="pollwidget" />
        {label}
      </label>
      <span style={{ marginLeft: "9rem" }}>
        {poll} votes {`(${per})`}
      </span>
      <br />
      <input className="w-100" type="range" min={1} value={poll} max={totalWidget} />
    </div>
  );
};
  
    
    
    
    
    
    
    
*/
}
