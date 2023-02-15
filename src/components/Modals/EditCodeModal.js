import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { shippingMethods } from "../../constant/zipCodeConstant";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import NativeSelect from "@mui/material/NativeSelect";

const EditCodeModal = ({ setOpen, method, id, zipCode, handleUpdate }) => {
  const [shippingMethod, setShippingMethod] = useState(method);
  return (
    <>
      <Dialog open={true} onClose={() => setOpen(false)}>
        <DialogTitle>Update shipping method</DialogTitle>
        <DialogContent dividers>
          <FormControl fullWidth size="small">
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
              disabled
            />
            <FormControl fullWidth variant="standard">
              <NativeSelect
                inputProps={{
                  name: "Shipping Method",
                  id: "uncontrolled-native",
                }}
                defaultValue={shippingMethod}
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
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={() => setOpen(false)}>
            close
          </Button>
          <Button
            variant="outlined"
            color="info"
            onClick={() => handleUpdate(id, shippingMethod)}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditCodeModal;
