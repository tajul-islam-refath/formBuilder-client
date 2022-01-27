import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { url } from "../../utils/Common.js"

const Home = () => {
    let [forms, setForms] = useState([])
    let [loading, setLoading] = useState(true)


    useEffect(() => {
        const getResult = async () => {
            let { data } = await axios.get(`${url}/forms`)
            setForms(data.result)
            setLoading(false)
        }
        getResult();
    }, [])


    return (
        <div className='container mt-lg-2'>
            <div className="row d-flex justify-content-center align-items-center mt-5">
                <div className="col-md-8">
                    <div className="card card-body">
                        <h4>Form List</h4>
                        <table className="table table-hover text-center">
                            <thead>
                                <tr>
                                    <th scope="colSpan">SL</th>
                                    <th scope="colSpan" >Name</th>
                                    <th scope="colSpan"></th>
                                    <th scope="colSpan">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {forms.map((form, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td colSpan="2">
                                            <Link to={`forms/${form._id}`}>{form.formName}</Link>
                                        </td>
                                        <td>
                                            <Link to={`results/${form._id}`} className="btn btn-success">Reports</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
