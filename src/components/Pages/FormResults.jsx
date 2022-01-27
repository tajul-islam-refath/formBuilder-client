import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import axios from 'axios';
import { url } from '../../utils/Common';

const Formresults = () => {
    const [results, setResults] = useState([])
    const [formTh, setFormTh] = useState([])
    const [loading, setLoading] = useState(true)
    let { formId } = useParams()

    useEffect(() => {
        let getRes = async () => {
            let { data } = await axios.get(`${url}/form/${formId}`)
            setResults(data.result)
            setLoading(false)
        }
        getRes()
    }, [])

    useEffect(() => {
        if (!loading) {
            setFormTh([])
            for (let key in results[0].values) {
                setFormTh(prevValue => [...prevValue, key])
            }
        }
    }, [loading])



    // console.log(formTh)
    // console.log(results)
    return (
        <div className='container'>
            <div className="row my-5">
                <div className="col-md-8 offset-md-3">
                    {results.length > 0 &&
                        <div div className="card card-body">
                            <h4>{results[0].formName}</h4>
                            <table className="table table-hover text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">SL</th>
                                        {formTh.map(name => (
                                            <th scope="col">{name.toUpperCase()}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.length > 0 &&
                                        results.map((res, index) => (
                                            <tr>
                                                <td scope="row">{index + 1}</td>
                                                {
                                                    Object.keys(res.values).map(key => (
                                                        <td>
                                                            {res.values[key]}
                                                        </td>
                                                    ))
                                                }
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Formresults;
