import React, { useState } from 'react';

export function Sorting(props: any) {

    const [Option, setOption] = useState("Abecedně");

    return (
        <div className="form-group d-block col-md-6 col-lg-4">
            <select className="form-control" onChange={(e) => props.setOption(e.target.value)}>
                <option>Abecedně</option>
                <option>Od nejnovějších</option>
                <option>Od nejlevnějších</option>
                <option>Od nejdražších</option>
            </select>
        </div>
        );
}