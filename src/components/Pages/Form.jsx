import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom"
import axios from 'axios';
import { url } from '../../utils/Common';

const Form = () => {
    const [result, setResult] = useState({})
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState({})
    const [create, setIsCreate] = useState(false)

    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        let getRes = async () => {
            let { data } = await axios.get(`${url}/forms/${id}`)
            setResult(data.result)
            setLoading(false)
        }
        getRes()
    }, [])

    useEffect(() => {
        let input = {}
        if (!loading) {
            result.formField.forEach(f => {
                input[f.fieldName.toLowerCase()] = ""
            })
            setValue(input)
        }
    }, [result, loading])

    const onChange = (e) => {

        setValue(preValue => ({
            ...preValue,
            [e.target.name.trim()]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        let obj = {
            formId: result._id,
            formName: result.formName,
            values: value
        }
        try {
            let { data } = await axios.post(`${url}/form`, obj)
            if (data.success === true) {
                setIsCreate(true)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (create === true) {
            navigate(`/results/${id}`)
        }
    }, [create])

    return (
        <div className='container'>
            <div className="row my-5">
                <div className="col md-6 offset-md-3">
                    {!loading &&
                        <div className="card card-body">
                            <h4>{result.formName}</h4>
                            <form onSubmit={onSubmit}>
                                {result.formField.map((f, index) => (
                                    f.fieldType.trim() !== "text area" ?
                                        <div className="form-group my-2" key={index}>
                                            <label htmlFor={f.fieldName}>{f.fieldName}</label>
                                            <input
                                                type={f.fieldType}
                                                className="form-control"
                                                id={f.fieldName}
                                                name={f.fieldName.toLowerCase()}
                                                onChange={onChange}
                                            />
                                        </div> :
                                        <div className="form-group my-2" key={index}>
                                            <label htmlFor={f.fieldName}>{f.fieldName}</label>
                                            <textarea
                                                type={f.fieldType}
                                                className="form-control"
                                                id={f.fieldName}
                                                name={f.fieldName.toLowerCase()}
                                                onChange={onChange}
                                                rows="3"></textarea>
                                        </div>
                                ))}
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Form;
