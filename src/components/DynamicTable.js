import React from 'react'

function DynamicTable({ data }) {
    return (
        <div style={{overflowX: 'scroll'}}>
            <table className="table table-bordered table-responsive">
                <thead>
                    <tr>
                        {
                            Object.keys(data[0]).map(head => (
                                <th key={`head_${head}`}>{head}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                {
                    data.map((row, index) => (
                        <tr key={`row_${index}`}>
                        {Object.keys(data[0]).map((head, index) => (
                            <td key={`cell_${index}`}>{
                                typeof row[head] === 'object' ? JSON.stringify(row[head]) : row[head]
                            }</td>
                        ))}
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
        
    )
}

export default DynamicTable
