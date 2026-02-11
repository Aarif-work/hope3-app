
import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, themeQuartz } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

// Register all community features
ModuleRegistry.registerModules([AllCommunityModule]);

const AdminTable = ({
    rowData,
    colDefs,
    onRowClicked,
    pagination = true,
    paginationPageSize = 10,
    rowHeight = 60
}) => {

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1,
        minWidth: 100,
        unSortIcon: true, // Show icon even when unsorted for clarity
    }), []);

    const gridOptions = {
        rowSelection: 'single',
        animateRows: true, // Smooth transitions
        headerHeight: 52, // Taller header
        rowHeight: 65,    // Taller rows for "premium" feel
        pagination: pagination,
        paginationPageSize: paginationPageSize,
        paginationPageSizeSelector: [10, 20, 50],
        domLayout: 'autoHeight',
        suppressCellFocus: true,
        enableCellTextSelection: true
    };

    return (
        <div className="ag-theme-quartz admin-grid-container" style={{ width: '100%', borderRadius: '12px', boxShadow: 'none' }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                onRowClicked={onRowClicked}
                gridOptions={gridOptions}
                suppressRowClickSelection={true}
            />
        </div>
    );
};

export default AdminTable;
