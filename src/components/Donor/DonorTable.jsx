
import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

// Register all community features
ModuleRegistry.registerModules([AllCommunityModule]);

const DonorTable = ({
    rowData,
    colDefs,
    onRowClicked,
    pagination = true,
    paginationPageSize = 10,
}) => {

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1,
        minWidth: 120,
    }), []);

    const gridOptions = {
        animateRows: true,
        headerHeight: 52,
        rowHeight: 65,
        pagination: pagination,
        paginationPageSize: paginationPageSize,
        domLayout: 'autoHeight',
        suppressCellFocus: true,
    };

    return (
        <div
            className="ag-theme-quartz donor-grid-container"
            style={{
                width: '100%',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid #f1f5f9'
            }}
        >
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                onRowClicked={onRowClicked}
                gridOptions={gridOptions}
            />
        </div>
    );
};

export default DonorTable;
