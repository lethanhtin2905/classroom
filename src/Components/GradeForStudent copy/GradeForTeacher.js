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
    const [gradeOfColum, setGradeOfColum] = useState()
    const listUser = currentClass.userList;
    const { gradeStructure } = props;
    const gradeDataDefault = [];
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
    for (var i = 0; i < gradeStructure.length; i++) {
        gradeDataDefault.push({
            _id: gradeStructure[i]._id,
            name: gradeStructure[i].name,
            grade: 0
        })
    }

    //Upload
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);

    useEffect(()=>{
        const requestOptions1 = {
            method: 'GET',
            headers: authHeader(),
        };
        fetch(constant.api + constant.allClassPath + `/${currentClass._id}` + '/grade', requestOptions1)
            .then(res => res.json())
            .then(
                (result) => {
                    setData(result);
                    // props.setIsLoading(false);
                },
                (error) => {
                    // props.setIsLoading(false)
                }
            )
    },[data])

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

        for (let i = 0; i < listDefault.length; i++) {
            listDefault[i] = {
                name: listDefault[i].Name,
                studentId: listDefault[i].StudentId,
                grade: gradeDataDefault,
            }
        }

        const data = {
            data: listDefault,
        }

        updateDataApi(data)

        setData(listDefault);
        setColumns(columns);
    }

    const updateDataApi = (data) => {
        fetch(constant.api + constant.allClassPath + `/${currentClass._id}` + '/grade', {
            method: 'PUT',
            headers: Object.assign({
                'Content-Type': 'application/json'
            }, authHeader()),
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                if (data.isSuccess) {
                    alert('Successfully update grade board');
                } else {
                    alert('Failed to update grade board');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
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

    const updateGrade = (value, gradeId, studentId) => {
        const data = {
            value: value,
            gradeId: gradeId,
            studentId:studentId.toString(),
        }
        console.log(data)
        fetch(constant.api + constant.allClassPath + `/${currentClass._id}` + '/grade/edit', {
            method: 'PUT',
            headers: Object.assign({
                'Content-Type': 'application/json'
            }, authHeader()),
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                if (data.isSuccess) {
                    alert('Successfully updated new grade board');
                } else {
                    alert('Failed to updated new grade board');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const changeGrade = (e) => {
        const value = e.target.value;
        const gradeId = e.target.id;
        const studentId = e.target.name;
        if (value) {
            updateGrade(value, gradeId, studentId)
        }
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
                    <span>Download Default Template</span>
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
            {gradeStructure.length === 0 ? <div>Please add grade structure</div>
                : <div>
                    {data.length !== 0 ?
                        (<table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className='columns'>Name</th>
                                    {gradeStructure.map((column, index) => {
                                        return (
                                            <th key={index} className='columns'>
                                                {column.name} <br />
                                                ({column.grade} point)
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
                                                    <td key={index}><input id={column._id} name={row.studentId} type='number' className="grade" step='1' min='1' defaultValue={column.grade} onChange = {changeGrade}/></td>
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
                </div>
            }
            <br />
            <br />
        </div>
    );
}