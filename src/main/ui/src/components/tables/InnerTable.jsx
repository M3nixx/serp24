import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const InnerTable = ({ data }) => {
    if (!data || data.length === 0) return null;

    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    {Object.keys(data[0]).map((key) => (
                        <TableCell key={key}>{key}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row, idx) => (
                    <TableRow key={idx}>
                        {Object.values(row).map((val, i) => (
                            <TableCell key={i}>{val}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default InnerTable;