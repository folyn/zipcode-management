import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { shippingMethods } from "../../constant/zipCodeConstant";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import NativeSelect from "@mui/material/NativeSelect";

const AddCodeModal = ({ setOpen, handleAddCode }) => {
  const [zipCode, setZipCode] = useState("");
  const [shippingMethod, setShippingMethod] = useState("");

  return (
    <>
      <Dialog open={true} onClose={() => setOpen(false)}>
        <DialogTitle>Add Shipping Zip Code</DialogTitle>
        <DialogContent dividers>
          <TextField
            type="number"
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
            label="Zip Code"
            size="small"
            fullWidth
            value={zipCode}
            onChange={(event) => setZipCode(event.target.value)}
          />
          <FormControl fullWidth variant="standard">
            <NativeSelect
              inputProps={{
                name: "Shipping Method",
                id: "uncontrolled-native",
              }}
              value={shippingMethod}
              onChange={(event) => setShippingMethod(event.target.value)}
            >
              <option>Select hipping Method</option>
              {shippingMethods.map((method, index) => (
                <option value={method} key={index}>
                  {method}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={() => setOpen(false)}>
            close
          </Button>
          <Button
            variant="outlined"
            color="info"
            onClick={() => handleAddCode(zipCode, shippingMethod)}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddCodeModal;
