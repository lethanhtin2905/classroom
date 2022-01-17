/* eslint-disable react/jsx-no-undef */
import './GradeForTeacher.css';
import * as React from 'react';
import { useEffect, useState } from 'react';
import AuthService from "../../../Auth/AuthService"
import AuthHeader from '../../../Auth/AuthHeader';
import constant from '../../../Utils';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export default function GradeForTeacher(props) {
    const [currentClass, setCurrentClass] = useState(props.currentClass);
    const { gradeStructure } = props;
    const gradeDataDefault = [];
    let total_default = 0;
    const listDefault = []

    const dataDefault = [
        { Name: '', StudentId: '' },
    ]
    const headerDefault = [
        { label: 'Name', key: 'Name' },
        { label: 'StudentId', key: 'StudentId' },
    ]
    const headerExport = [
        { label: 'StudentId', key: 'StudentId' },
        { label: 'Name', key: 'Name' },
    ]
    for (var i = 0; i < gradeStructure.length; i++) {
        headerExport.push({
            label: gradeStructure[i].name,
            key: gradeStructure[i].id,
        })
    }
    headerExport.push({
        label: "Total",
        key: "Total",
    })
    const [dataExport, setDataExport] = useState([])

    for (var i = 0; i < gradeStructure.length; i++) {
        gradeDataDefault.push({
            _id: gradeStructure[i]._id,
            name: gradeStructure[i].name,
            grade: 0
        })
        total_default += gradeStructure[i].grade;
    }

    //Upload
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [totalOfStudent, setTotalOfStudent] = useState([]);

    useEffect(() => {
        const requestOptions1 = {
            method: 'GET',
            headers: AuthHeader(),
        };
        fetch(constant.api + constant.allClassPath + `/${currentClass._id}` + '/grade', requestOptions1)
            .then(res => res.json())
            .then(
                (result) => {
                    setData(result);

                    let total = [];
                    for (var i =0; i<result.length;i++) {
                        total[i] = 0;
                        for (var j=0 ; j<gradeStructure.length; j++) {
                            total[i] += result[i].grade[j].grade*gradeStructure[j].grade / 10;
                        }
                    }
                    setTotalOfStudent(total);

                    let dataExport = []
                    
                    setDataExport(dataExport);
                    // props.setIsLoading(false);
                },
                (error) => {
                    // props.setIsLoading(false)
                }
            )
        // return ()=>{};
    }, [data])

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
        fetch(constant.api + constant.allClassPath + `/${currentClass._id}/grade`, {
            method: 'PUT',
            headers: Object.assign({
                'Content-Type': 'application/json'
            }, AuthHeader()),
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

    const changeGrade = (e) => {
        const value = e.target.value;
        const gradeId = e.target.id;
        const studentId = e.target.name;
        if (value) {

            const data = {
                value: value,
                gradeId: gradeId,
                studentId: studentId.toString(),
            }
            fetch(constant.api + constant.allClassPath + `/${currentClass._id}/grade/edit`, {
                method: 'PUT',
                headers: Object.assign({
                    'Content-Type': 'application/json'
                }, AuthHeader()),
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.isSuccess) {
                    } else {
                        alert('Failed to updated new grade board');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }

    return (
        <div>
            
            <div className='download-btn'>
                <CSVLink data={dataDefault} headers={headerDefault}
                    filename={"template_default.csv"}
                    className="btn btn-primary"
                    target="_blank>Download">
                    <span className="download-icon">
                        <FileDownloadIcon></FileDownloadIcon>
                    </span>
                    <span>Default Template</span>
                </CSVLink>
                <CSVLink data={dataExport} headers={headerExport}
                    filename={"grade_board.csv"}
                    className="btn btn-primary export"
                    target="_blank>Download">
                    <span className="download-icon">
                        <FileDownloadIcon></FileDownloadIcon>
                    </span>
                    <span>Export Grade Board</span>
                </CSVLink>
            </div>
            <br />
            <div className="uploadStudent">
                <b>Upload student list: </b>
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
                                    <th className='columns'>Student ID</th>
                                    <th className='columns'>Name</th>
                                    {gradeStructure.map((column, index) => {
                                        return (
                                            <th key={index} className='columns'>
                                                {column.name} <br />
                                                ({column.grade} point)
                                            </th>
                                        )
                                    })}
                                    <th className='columns'>Total <br />
                                        ({total_default} point)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="studentId">{row.studentId}</td>
                                            <td className="name">{row.name}</td>
                                            {row.grade.map((column, index) => {
                                                return (
                                                    <td key={index}><input id={column._id} name={row.studentId} type='number' className="grade" step='1' min='1' defaultValue={column.grade} onChange={changeGrade} /></td>
                                                )
                                            })}
                                            <td className="totalGrade">{totalOfStudent[index]}</td>
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
        </div>
    );
}