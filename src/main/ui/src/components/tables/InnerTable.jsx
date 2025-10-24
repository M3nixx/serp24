import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const InnerTable = ({ data }) => {
    if (!data || data.length === 0) {
        return <span>-</span>;
    }

    return (
        <Table size="small" sx={{ minWidth: 200 }}>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((item, index) => {
                    // extract ID through Obj.typ
                    const id = item.id || item.customerId || item.consultantId || item.projectId || index;
                    const name = item.name || '-';

                    return (
                        <TableRow key={id}>
                            <TableCell>{id}</TableCell>
                            <TableCell>{name}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

export default InnerTable;
