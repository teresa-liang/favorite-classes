import './Class.css'
import React, { useState, useEffect } from 'react';

function Class(props) {
    const [classInfo, setClassInfo] = useState({});

    const url = "https://api.peterportal.org/graphql"

    useEffect(() => {
        const fetchData = async () => {
            const query = `
                query {
                    course(id:"${props.name}") {
                        title
                        department_name
                        description
                    }
                }`

            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({query}),
                headers:{
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setClassInfo(data.data.course);
        }
        fetchData();
    })

    let info;
    if (classInfo) {
        info = <div className = "information">
        <p id="title">{classInfo.title}</p>
        <p id="department">{classInfo.department_name}</p>
        <p id="description">{classInfo.description}</p>
    </div>
    } else if (classInfo == null){
        info = <p id="error">Page Not Found</p>
    } 
    else {
        info = <p id="loading">Loading...</p>
    }

    return (
        <div className="class">
            {props.name}
            <div>
                {info}
            </div>
        </div>
    )
}

export default Class;