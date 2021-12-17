/* eslint-disable react/jsx-no-undef */
import * as React from 'react';
import { useEffect, useState } from 'react';
import AuthService from "../../services/auth.service"
import authHeader from '../../services/auth-header';
import './GradeForTeacher.css';
import constant from '../../Utils';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export default function GradeForTeacher(props) {
    const currentUser = AuthService.getCurrentUser()
    const [currentClass, setCurrentClass] = useState(props.currentClass);
    const listUser = currentClass.userList;
    const { gradeStructure } = props;
    const listDefault = []

    let checkCreateBy = false;
    if (currentClass.createBy._id === currentUser._id) {
        checkCreateBy = true;
    }

    const dataDefault = [
        { Name: '', StudentId: '' },
    ]
    const headerDefault = [
        { label: 'Name', key: 'Name' },
        { label: 'StudentId', key: 'StudentId' },
    ]

    //Upload
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);

    // process CSV data
    const processData = dataString => {
        const dataStringLines = dataString.split(/\r\n|\n/);
        const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

        const list = [];
        for (let i = 1; i < dataStringLines.length; i++) {
            const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
            if (headers && row.length === headers.length) {
                const obj = {};
                for (let j = 0; j < headers.length; j++) {
                    let d = row[j];
                    if (d.length > 0) {
                        if (d[0] == '"')
                            d = d.substring(1, d.length - 1);
                        if (d[d.length - 1] == '"')
                            d = d.substring(d.length - 2, 1);
                    }
                    if (headers[j]) {
                        obj[headers[j]] = d;
                    }
                }

                // remove the blank rows
                if (Object.values(obj).filter(x => x).length > 0) {
                    listDefault.push(obj);
                }
            }
        }

        // prepare columns list from headers
        const columns = headers.map(c => ({
            name: c,
            selector: c,
        }));

        for (let i = 0; i < gradeStructure.length; i++) {
            listDefault[i] = {
                name: listDefault[i].Name,
                studentId: listDefault[i].StudentId,
                grade: gradeStructure,
            }
        }

        const data = {
            data: listDefault,
        }
        fetch(constant.api + constant.allClassPath + `/${currentClass._id}` + '/grade', {
            method: 'POST',
            headers: Object.assign({
                'Content-Type': 'application/json'
            }, authHeader()),
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.isSuccess) {
                    alert('Successfully added new grade board');
                } else {
                    alert('Failed to added new grade board');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        setData(listDefault);
        setColumns(columns);
    }

    // handle file upload
    const handleFileUpload = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (evt) => {
            /* Parse data */
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
            processData(data);
        };
        reader.readAsBinaryString(file);
    }

    const uploadDefaultApi = () => {
        
    }

    return (
        <div>
            <div className='download-btn'>
                <CSVLink data={dataDefault} headers={headerDefault}
                    filename={"my-file.csv"}
                    className="btn btn-primary"
                    target="_blank>Download">
                    <span className="download-icon">
                        <FileDownloadIcon></FileDownloadIcon>
                    </span>
                    <span>Download</span>
                </CSVLink>
            </div>
            <br />
            <div>
                Upload student list:  
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                />
            </div>
            <br />
            {data.length !== 0 ?
                (<table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className='columns'>Name</th>
                            {gradeStructure.map((column, index) => {
                                return (
                                    <th key={index} className='columns'>
                                        {column.name}
                                        {/* <div>
                                            <CSVLink data={dataa} headers={headers}
                                                filename={"my-file.csv"}
                                                className="btn btn-primary"
                                                target="_blank>Download">
                                                Download
                                            </CSVLink>
                                            <input
                                                type="file"
                                                accept=".csv"
                                                onChange={handleFileUpload}
                                            />
                                        </div> */}
                                    </th>
                                )
                            })}
                            <th className='columns'>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => {
                            return (
                                <tr key={index}>
                                    <td className="name">{row.name}</td>
                                    {row.grade.map((column, index) => {
                                        return (
                                            <td key={index}><input type='number' className="grade" step='1' min='1' value={column.grade} /></td>

                                        )
                                    })}
                                    <td className="name"></td>

                                </tr>
                            )
                        })}
                    </tbody>
                </table>)
                : <div></div>
            }
            <br />
            <br />
        </div>
    );
}