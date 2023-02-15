import { v4 as uuidv4 } from "uuid";
export const shippingMethods = [
  "Standard Ground Shipping",
  "Expedited Shipping",
  "Overnight Shipping",
  "Freight Shipping",
  "International Shipping",
];

export const zipCodes = [
  {
    id: uuidv4(),
    code: 92801,
    method: shippingMethods[0],
    updateDate: "03/10/2014",
  },
  {
    id: uuidv4(),
    code: 92220,
    method: shippingMethods[1],
    updateDate: "01/12/2014",
  },
  {
    id: uuidv4(),
    code: 33143,
    method: shippingMethods[1],
    updateDate: "10/14/2014",
  },
  {
    id: uuidv4(),
    code: 36109,
    method: shippingMethods[2],
    updateDate: "03/10/2014",
  },
  {
    id: uuidv4(),
    code: 33132,
    method: shippingMethods[3],
    updateDate: "12/09/2014",
  },
  {
    id: uuidv4(),
    code: 93955,
    method: shippingMethods[4],
    updateDate: "12/07/2014",
  },
  {
    id: uuidv4(),
    code: 93955,
    method: shippingMethods[2],
    updateDate: "04/24/2014",
  },
  {
    id: uuidv4(),
    code: 92115,
    method: shippingMethods[0],
    updateDate: "10/02/2014",
  },
  {
    id: uuidv4(),
    code: 76708,
    method: shippingMethods[4],
    updateDate: "05/25/2014",
  },
  {
    id: uuidv4(),
    code: 76706,
    method: shippingMethods[3],
    updateDate: "11/08/2014",
  },
  {
    id: uuidv4(),
    code: 76712,
    method: shippingMethods[1],
    updateDate: "03/12/2014",
  },
];

export const tableHeader = [
  { id: "id", label: "id", flex: 1 },
  { id: "code", label: "Zip Code", flex: 2 },
  {
    id: "city_info",
    label: "City/State",
  },
  {
    id: "shipping_method",
    label: "Shipping Method",
    flex: 3,
  },
  {
    id: "updated_date",
    label: "Updated Date",
    flex: 3,
  },
  {
    id: "edit_update",
    label: "",
    flex: 2,
  },
];
