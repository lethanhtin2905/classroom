/* eslint-disable react/jsx-no-undef */
import './GradeForStudent.css';
import * as React from 'react';
import { useEffect, useState } from 'react';
import AuthHeader from '../../../Auth/AuthHeader';
import constant from '../../../Utils';

export default function GradeForStudent(props) {
    const [currentClass, setCurrentClass] = useState(props.currentClass);
    const { gradeStructure, currentUser } = props;
    const gradeDataDefault = [];
    let total_default = 0;

    for (var i = 0; i < gradeStructure.length; i++) {
        gradeDataDefault.push({
            _id: gradeStructure[i]._id,
            name: gradeStructure[i].name,
            grade: 0
        })
        total_default += gradeStructure[i].grade;
    }

    //Upload
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
                    for (var i = 0; i < result.length; i++) {
                        total[i] = 0;
                        for (var j = 0; j < gradeStructure.length; j++) {
                            total[i] += result[i].grade[j].grade * gradeStructure[j].grade / 10;
                        }
                    }
                    setTotalOfStudent(total);
                    // props.setIsLoading(false);
                },
                (error) => {
                    // props.setIsLoading(false)
                }
            )
        // return ()=>{};
    }, [data])

    return (
        <div>
            {gradeStructure.length === 0 ? <div>The class does not have a grade structure</div>
                : <div>
                    {data.length !== 0 ?
                        (<table className="table table-bordered">
                            <thead>
                                <tr>
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
                                    if (row.studentId === currentUser.userID) {
                                        return (
                                            <tr key={index}>
                                                {row.grade.map((column, index) => {
                                                    return (
                                                        <td key={index} className="grade">{column.grade}</td>
                                                    )
                                                })}
                                                <td className="totalGrade">{totalOfStudent[index]}</td>
                                            </tr>
                                        )
                                    } else {
                                        return <tr key={index}></tr>
                                    }
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