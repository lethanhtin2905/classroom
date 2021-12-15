import * as React from 'react';
import { useEffect, useState } from 'react';
import AuthService from "../../services/auth.service"
import authHeader from '../../services/auth-header';
import "./GradeForTeacher.css";
import constant from '../../Utils';
import { CSVLink, CSVDownload } from 'react-csv';
import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';
import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
} from '@mui/material';
import Invited from '../Invited/Invited';


export default function GradeForTeacher(props) {
    const currentUser = AuthService.getCurrentUser()
    const [currentClass, setCurrentClass] = useState(props.currentClass);
    const listUser = currentClass.userList;
    const [users, setUsers] = useState(props.users);
    let teachers = [];
    let students = []

    let checkCreateBy = false;
    if (currentClass.createBy._id === currentUser._id) {
        checkCreateBy = true;
    }

    const dataa = [
        { Name: 'Tín lê', StudentId: '18120595' },
        { Name: 'Tín lê', StudentId: '18120595' },
        { Name: 'Tín lê', StudentId: '18120595' }
    ]
    const headers = [
        { label: 'Họ tên', key: 'Name' },
        { label: 'MSSV', key: 'StudentId' },
    ]

    // Upload
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);

    // process CSV data
    const processData = dataString => {
        const dataStringLines = dataString.split(/\r\n|\n/);
        const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

        const list = [];
        for (let i = 1; i < dataStringLines.length; i++) {
            const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
            if (headers && row.length == headers.length) {
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
                    list.push(obj);
                }
            }
        }

        // prepare columns list from headers
        const columns = headers.map(c => ({
            name: c,
            selector: c,
        }));

        setData(list);
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

    return (
        <div>
            <CSVLink data={dataa} headers={headers}
                filename={"my-file.csv"}
                className="btn btn-primary"
                target="_blank>Download">
                Download
            </CSVLink>

            <div>
                <h3>Read CSV file in React - <a href="https://www.cluemediator.com" target="_blank" rel="noopener noreferrer">Clue Mediator</a></h3>
                <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileUpload}
                />
                <DataTable
                    pagination
                    highlightOnHover
                    columns={columns}
                    data={data}
                />
            </div>
        </div>
    );
}