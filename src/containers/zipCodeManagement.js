import React, { useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import ZipCodes from "zipcodes";
import { tableHeader } from "../constant/zipCodeConstant";
import AddCodeModal from "../components/Modals/AddCodeModal";
import EditCodeModal from "../components/Modals/EditCodeModal";
import { formErrors } from "../constant/errors";
import { CodeManagementContext } from "../context/CodeManagementContext";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ZipCodeManagement = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>
            <CodeTable/>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

const CodeTable = () => {
  const {dispatch, codes : rows } = useContext(CodeManagementContext);
  
  const columns = tableHeader;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showAddModal, setAddShowModal] = useState(false);
  const [showEditModal, setEditShowModal] = useState(false);
  const [editMethod, setEditMethod] = useState("");
  const [codeId, setCodeId] = useState("");
  const [editZipCode, setEditZipCode] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState("");

  const showAlert = (title) => {
    setAlertOpen(true);
    setAlertText(title);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onDelete = (id) => {
    dispatch({ type: "DELETE_CODE", id });
  };
  const onUpdateCode = (id, code, method) => {
    setEditShowModal(true);
    setEditMethod(method);
    setCodeId(id);
    setEditZipCode(code);
  };

  const handleAddCode = (zipCode, shippingMethod) => {
    if (zipCode && zipCode.length === 5) {
      if (shippingMethod) {
        let cityInfo = ZipCodes.lookup(zipCode);
        if (cityInfo) {
          dispatch({ type: "ADD_CODE", zipCode, shippingMethod });
          setAddShowModal(false);
        } else {
          showAlert(formErrors.ZIP_CODE_INVALID_ERROR);
        }
      } else {
        showAlert(formErrors.SHIPPING_INVALID_ERROR);
      }
    } else {
      showAlert(formErrors.ZIP_CODE_LENGTH_INVALID_ERROR);
    }
  };

  const handleUpdate = (id, shippingMethod) => {
    if (shippingMethod) {
      dispatch({ type: "UPDATE_CODE", id, method: shippingMethod });
      setEditShowModal(false);
    }
  };
  return (
    <div>
      <div>
        <h1>Shipping Zip Code List Management</h1>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          style={{ float: "right", marginRight: "2%" }}
          onClick={() => setAddShowModal(true)}
        >
          Add
        </Button>
      </div>
      <Paper className="zip-code-table">
        <TableContainer sx={{ maxHeight: "75vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  let cityInfo = ZipCodes.lookup(row.code);
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>
                        {cityInfo
                          ? cityInfo.city + "," + cityInfo.state
                          : "Invalid City/State"}
                      </TableCell>
                      <TableCell>{row.method}</TableCell>
                      <TableCell>{row.updateDate}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          startIcon={<EditIcon />}
                          onClick={() =>
                            onUpdateCode(row.id, row.code, row.method)
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          startIcon={<DeleteIcon />}
                          color="error"
                          onClick={() => onDelete(row.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {showAddModal && (
          <AddCodeModal
            setOpen={setAddShowModal}
            dispatch={dispatch}
            handleAddCode={handleAddCode}
          />
        )}
        {showEditModal && (
          <EditCodeModal
            setOpen={setEditShowModal}
            method={editMethod}
            dispatch={dispatch}
            zipCode={editZipCode}
            id={codeId}
            handleUpdate={handleUpdate}
          />
        )}
      </Paper>
      {alertOpen && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={alertOpen}
          onClose={() => setAlertOpen(false)}
          autoHideDuration={3000}
        >
          <Alert severity="warning">{alertText}</Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default ZipCodeManagement;
