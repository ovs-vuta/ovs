import React, { useState } from "react";
import "./css/file.css";
import { FaRegEdit, FaRegSave } from "react-icons/fa";
import {
  useAddUserMutation,
  useGetRegUserQuery,
  useDeleteRegUserMutation
} from "../../store/slice/addUserSlice";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import Spinner from "../ui/Spinner";

function FileUpload() {
  const [file, setFile] = useState();
  const [csvData, setCsvData] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [newRecord, setNewRecord] = useState({});
  const [delUserId,setDelUserId] = useState(null)
  const [addUser] = useAddUserMutation();
  const { isError, isLoading, data } = useGetRegUserQuery();
  const [deleteRegUser] = useDeleteRegUserMutation();

  // Handle file input
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    const fileType = file?.type.split("/").at(-1);
    if (fileType === "csv") {
      setFile(file);
      parseCSV(file);
    } else {
      toast.error("only accept .csv file");
    }
  };

  // Parse CSV file
  const parseCSV = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const data = csvToArray(text);
      setCsvData(data);
    };
    reader.readAsText(file);
  };

  // Convert CSV text to array of objects
  const csvToArray = (str, delimiter = ",") => {
    const [headerLine, ...rows] = str.trim().split("\n");
    const headers = headerLine
      .split(delimiter)
      .map((header) => header.replace(/"/g, "").trim());

    return rows
      .filter((row) => row.trim())
      .map((row) => {
        const values = row
          .split(delimiter)
          .map((value) => value.replace(/"/g, "").trim());
        return headers.reduce((acc, header, i) => {
          acc[header] = values[i] || "";
          acc.role = "user";
          return acc;
        }, {});
      });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (csvData.length > 0) {
        const { data } = await addUser(csvData);
        if (data.status) {
          toast.success(data.msg);
          setFile(null);
          setCsvData([]);
        }
      }
    } catch (error) {
      toast.error("something went wrong ...");
    }
  };

  // Handle editing a row
  const handleEdit = (index) => {
    setEditIndex(index);
  };

  // Handle saving edited row
  const handleSave = (index) => {
    setEditIndex(-1);
  };

  // Handle input change for editable fields
  const handleInputChange = (e, index, key) => {
    const newData = [...csvData];
    newData[index][key] = e.target.value;
    setCsvData(newData);
  };

  // Handle adding a new record
  const handleAddRecord = () => {
    setCsvData([...csvData, newRecord]);
    setNewRecord({});
  };

  // Handle input change for new record fields
  const handleNewRecordChange = (e, key) => {
    setNewRecord({ ...newRecord, [key]: e.target.value });
  };
  // handle deleted user
  const handleDeleteUser = async(id)=>{
   try {
     const payload = await deleteRegUser(id);
     if (payload.data.status) {
      toast.success(payload.data.msg)
     }
   } catch (error) {
    
   }
  }
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <div>Something went wrong ... </div>;
  }

  return (
    <div className="hero_uplod_user my-3 container">
      <div
        className="hero-form d-flex justify-content-center align-items-center mt-2"
        style={{ height: "300px" }}
      >
        <form className="file-upload-form">
          <label htmlFor="file" className="file-upload-label">
            <div className="file-upload-design">
              <svg viewBox="0 0 640 512" height="1em">
                <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
              </svg>
              <p>Drag and Drop</p>
              <p>or</p>
              <span className="browse-button">Browse file</span>
            </div>
            <input
              id="file"
              type="file"
              name="file"
              onChange={handleFileInput}
            />
          </label>
          <div
            className="mt-2 d-flex justify-content-center"
            style={{ width: "100%" }}
          >
            <button
              type="submit"
              className="browse-button"
              onClick={handleSubmit}
              style={{ minWidth: "50%" }}
            >
              Upload
            </button>
          </div>
        </form>
      </div>

      <div className="user-data-table mt-2 overflow-x-auto">
        {csvData.length > 0 && (
          <table className="table table-bordered">
            <thead>
              <tr>
                {Object.keys(csvData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, index) => (
                <tr key={index}>
                  {Object.keys(row).map((key) => (
                    <td key={key}>
                      {editIndex === index ? (
                        <input
                          type="text"
                          value={row[key]}
                          onChange={(e) => handleInputChange(e, index, key)}
                        />
                      ) : (
                        row[key]
                      )}
                    </td>
                  ))}
                  <td>
                    {editIndex === index ? (
                      <button
                        onClick={() => handleSave(index)}
                        className="btn btn-outline-dark"
                      >
                        <FaRegSave />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(index)}
                        className="btn btn-outline-dark"
                      >
                        <FaRegEdit />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              <tr>
                {Object.keys(csvData[0]).map((key) => (
                  <td key={key}>
                    <input
                      type="text"
                      value={newRecord[key] || ""}
                      onChange={(e) => handleNewRecordChange(e, key)}
                    />
                  </td>
                ))}
                <td>
                  <button onClick={handleAddRecord}>Add</button>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      {/* show register user data */}
      <div className="reg-user-data">
        <hr />
        <h5 className="p-2 fw-bold">Registered Users</h5>
        <hr />
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>employeeId</th>
              <th>name</th>
              <th>email</th>
              <th>role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.users.length > 0 &&
              data.users.map((elem, id) => (
                <tr key={id}>
                  <td>{id + 1}</td>
                  <td>{elem.empId}</td>
                  <td>{elem.name}</td>
                  <td>{elem.email}</td>
                  <td>{elem.role}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDeleteUser(elem.id)}
                    >
                      <AiOutlineDelete size={24} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FileUpload;
