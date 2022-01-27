import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { url } from "../../utils/Common.js"


const GenerateForm = () => {
    const [inputs, setInputes] = useState([])
    const [formName, setFormName] = useState("")
    const [formField, setFormField] = useState([])
    const [isCreated, setIsCreated] = useState(false)

    let navigate = useNavigate();


    const addInputField = (name) => {
        setInputes(preValue => [...preValue, name])
        setFormField(preValue => [...preValue, {
            fieldType: name.toLowerCase(),
            fieldName: ""
        }])
    }

    const handelChange = (e) => {
        let newArray = formField.map((f, index) => {
            if (parseInt(e.target.id) === index) {
                f.fieldName = e.target.value
            }
            return f;
        })
        setFormField(newArray)
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        let formData = {
            formName,
            formField
        }
        try {
            let { data } = await axios.post(`${url}/forms`, formData)
            if (data.success === true) {
                setIsCreated(true)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (isCreated === true) {
            navigate("/");
        }
    }, [isCreated])
    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-4 ">
                    <div className="d-flex flex-column">
                        <button type="button" className="btn btn-primary my-2"
                            onClick={() => addInputField("Text")}
                        >Text</button>
                        <button type="button" className="btn btn-primary my-2"
                            onClick={() => addInputField("Number")}
                        >Number</button>
                        <button type="button" className="btn btn-primary my-2"
                            onClick={() => addInputField("Date")}
                        >Date</button>
                        <button type="button" className="btn btn-primary my-2"
                            onClick={() => addInputField("Text Area")}
                        >Text Area</button>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="col-md-6 offset-md-3">
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <label htmlFor="formName">From Name</label>
                                <input
                                    type="text"
                                    className="form-control my-2"
                                    id="formName"
                                    placeholder="Form name"
                                    onChange={(e) => setFormName(e.target.value)}
                                />
                            </div>
                            {inputs.map((name, index) => (
                                <div className="form-group " key={index}>
                                    <label htmlFor={index}>{name}</label>
                                    <input
                                        type="text"
                                        className="form-control my-2"
                                        id={index}
                                        name={name}
                                        placeholder="Enter input field name"
                                        onChange={handelChange}
                                    />
                                </div>
                            ))}
                            {
                                inputs.length >= 1 &&
                                <button type="submit" className="btn btn-success my-3">Generate</button>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GenerateForm;
