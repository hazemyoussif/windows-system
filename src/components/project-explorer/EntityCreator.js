import globalContext from "../../context/global-context";
import { useContext } from "react";
import { useState } from "react";
import { event } from "jquery";
const EntityCreator = (props) => {
  const localGlobalContext = useContext(globalContext);
  const [name, setName] = useState("");
  const [show,setShow] = useState(true);
  const [posting,setPosting] = useState(false);
  const handleNameChange = (event) => {
    const { value } = event.target;
    setName(value);
  };
  let formData;
  let endPoint;
  const url = "https://neotutum.nw.r.appspot.com/";
  const creatEntity = async (endPoint, formdata) => {
    setPosting(true);
    try {
      const response = await fetch(url + endPoint, {
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: formdata,
      });
      console.log(response);
      if (response.ok) {
        const { data, msg } = await response.json();
        localGlobalContext.setWindowsOptions((prev) => {
          return { ...prev, action: prev.action + 1 };
        });
        try {
          const response = await fetch(url + "portfolios", {
            Methode: "get",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            const { data, msg } = await response.json();
            setShow(false);
            localGlobalContext.setGlobalPortfolios(data);
            // setMessage({ val: msg, type: "is-success" });
          }
        } catch (error) {
          setPosting(false);
          // setMessage("Error Retrieving Data");
        }
      }
    } catch (error) {
      setPosting(false);
      console.log(error);
      //   setMessage("Error Retrieving Data");
    }
  };

  //   const initialFetch = useCallback(fetchProjectExplorerData, []);

  const xmlFormatter = (data) => {
    let formBody = [];
    for (let property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return formBody;
  };

  const handleEntityCreation = () => {
    switch (props.type) {
      case "Portfolio":
        formData = {
          name,
        };

        creatEntity("portfolios", xmlFormatter(formData));
        break;
      case "Service Chain":
        formData = {
          name,
          portfolioId: props.parentId,
        };
        creatEntity("serviceChains", xmlFormatter(formData));
        break;
      case "Platform":
        formData = {
          name,
          serviceChainId: props.parentId,
        };
        creatEntity("platforms", xmlFormatter(formData));
        break;
        case "BPMN":
        formData = {
          name,
          serviceChainId: props.parentId,
        };
        
        break;
        default:
          break;
    }
  };

  const checkKey = (event) =>{
    if(event.key === 'Enter') {
      creatEntity();
    }else if(event.key === 'Escape'){

    }
  }
  return (
    show && <div style={{ display: "flex", paddingBottom: "15px" }}>
      <label>{props.type}</label>
      <input type="text" onChange={handleNameChange} disabled={posting} onKeyDown={checkKey}/>
      <button onClick={handleEntityCreation} disabled={posting}>+</button>
    </div>
  );
};

export default EntityCreator;
