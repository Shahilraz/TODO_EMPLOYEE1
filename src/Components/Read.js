import React, { useState, useEffect } from "react";  
import axios from "axios";  
import { Link } from "react-router-dom";  

const Read = () => {  
  const [data, setData] = useState([]);  
  const [tabledark, setTableDark] = useState("");  

  const getData = () => {  
    axios  
      .get("http://localhost:5000/user")  
      .then((res) => {  
        console.log(res.data); // Log the API response  
        setData(res.data.user); // Adjust based on response structure  
      })  
      .catch((err) => {  
        console.error("Error fetching data:", err.message);  
        alert("Error fetching data. Please try again.");  
      });  
  };  

  const handleDelete = (id) => {  
    axios  
      .delete(`http://localhost:5000/user/${id}`)  
      .then(() => getData())  
      .catch((err) => {  
        console.error("Error deleting data:", err.message);  
        alert("Error deleting data. Please try again.");  
      });  
  };  

  const setToLocalStorage = (id, name, email) => {  
    localStorage.setItem("id", id);  
    localStorage.setItem("name", name);  
    localStorage.setItem("email", email);  
  };  

  useEffect(() => {  
    getData();  
  }, []);  

  return (  
    <>  
      <div className="form-check form-switch">  
        <input  
          className="form-check-input"  
          type="checkbox"  
          onClick={() => setTableDark(tabledark === "table-dark" ? "" : "table-dark")}  
        />  
      </div>  
      <div className="d-flex justify-content-between m-2">  
        <h2>Read Operation</h2>  
        <Link to="/">  
          <button className="btn btn-secondary">Create</button>  
        </Link>  
      </div>  
      <table className={`table ${tabledark}`}>  
        <thead>  
          <tr>  
            <th scope="col">#</th>  
            <th scope="col">Name</th>  
            <th scope="col">Email</th>  
            <th scope="col"></th>  
            <th scope="col"></th>  
          </tr>  
        </thead>  
        <tbody>  
          {data.map((eachData) => (  
            <tr key={eachData.id}>  
              <th scope="row">{eachData.id}</th>  
              <td>{eachData.name}</td>  
              <td>{eachData.email}</td>  
              <td>  
                <Link to="/update">  
                  <button  
                    className="btn-success"  
                    onClick={() =>  
                      setToLocalStorage(eachData.id, eachData.name, eachData.email)  
                    }  
                  >  
                    Edit  
                  </button>  
                </Link>  
              </td>  
              <td>  
                <button  
                  className="btn-danger"  
                  onClick={() => handleDelete(eachData.id)}  
                >  
                  Delete  
                </button>  
              </td>  
            </tr>  
          ))}  
        </tbody>  
      </table>  
    </>  
  );  
};  

export default Read;