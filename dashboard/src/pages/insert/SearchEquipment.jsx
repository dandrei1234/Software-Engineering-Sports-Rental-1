import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Card, CardContent,
  TextField, Button, MenuItem,
  Table, TableBody, TableCell,
  TableRow, TableHead, Stack
} from '@mui/material';



const SearchEquipment = () => {
  const [formData, setFormData] = useState({
    equipment_name: '',
    categoryID: '',
    condition_status: '',
    borrow_status: '',
  });
  const [equipCategoriesIds, setEquipCategoriesIds] = useState([]);
  const [equipCategoriesNames, setEquipCategoriesNames] = useState([]);
  const [selectCategory, setSelectCategory] = useState('');

  const [searchedRows, setSearchedRows] = useState([]);

  const conditionStatus = [ 'New', 'Good', 'Fair', 'Damaged'];
  const borrowStatus = [ 'Pending', 'Approved', 'Returned', 'Overdue'];

  useEffect(() => {
      getCategories();
  }, []);

  async function getCategories() {
      axios
          .get("http://localhost:1337/equipment/get-categories")
          .then((response) => {
              const ids = response.data.map(category => category.categoryID);
              const names = response.data.map(category => category.category_name);

              setEquipCategoriesIds(ids);
              setEquipCategoriesNames(names);
          })
          .catch((error) => {
              console.error(error);
          });
  }
  
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };



  // const handleCategoryChange = (event) => {
  //   setFormData({
  //     ...formData,
  //     categoryID: equipCategoriesIds[equipCategoriesNames.indexOf(event.target.value)]
  //   });
  //   alert(event.target.value);
  // }



  const onSearch = async () => {
    const response = await axios.post(`http://localhost:1337/equipment/search`, {
      equipment_name: formData.equipment_name,
      categoryID: formData.categoryID,
      condition_status: formData.condition_status,
      borrow_status: formData.borrow_status
    });
    setSearchedRows(response.data);
  }

  return (
    <>
    <Box>
      <Card>
        <CardContent>
          <Box
            component="form"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              label="Equipment Name"
              name="equipment_name"
              fullWidth
              value={formData.equipment_name}
              onChange={handleChange}
            />


            <TextField
              select
              label="Category"
              name="categoryID"
              value={formData.categoryID}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="">
                <em>Select status</em>
                </MenuItem>
                  {equipCategoriesNames.map((category) => (
                <MenuItem value={category}>{category}</MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Borrow Status"
              name="borrow_status"
              value={formData.borrow_status}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="">
                <em>Select status</em>
                </MenuItem>
                  {borrowStatus.map((status) => (
                <MenuItem value={status}>{status}</MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Equipment Condition"
              name="condition_status"
              value={formData.condition_status}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="">
                <em>Select status</em>
                </MenuItem>
                  {conditionStatus.map((status) => (
                <MenuItem value={status}>{status}</MenuItem>
              ))}

            </TextField>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" onClick={onSearch}>Search</Button>
              <Button variant="outlined">Cancel</Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>

              {searchedRows.length > 0?
              <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>Equipment Name</TableCell>
                    <TableCell align="center">Category</TableCell>
                    <TableCell align="center">Condition</TableCell>
                    <TableCell align="center">Borrow Status</TableCell>
                    <TableCell align="center">Dates</TableCell>
                    <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {searchedRows.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.equipment_name}</TableCell>
                            <TableCell align="center">{row.category_name}</TableCell>
                            <TableCell align="center">{row.condition_status}</TableCell>
                            <TableCell align="center">{row.borrow_status}</TableCell>
                            <TableCell sx={{fontSize: '12px', minWidth: '150px'}}>
                                {row.due_date? ("Due: ", row.due_date, <br/>) : ""}
                                {row.return_date? "Return: " + row.return_date : ""}
                                {row.request_date? "Request: " + row.request_date : ""}
                            </TableCell>
                            <TableCell
                                align="center">
                                <Stack direction='row' spacing='5px'>
                                  <Button variant="contained" color="primary"
                                      sx={{
                                          backgroundColor: "#5496e0",
                                          color: "white",
                                          '&:hover': {
                                              backgroundColor: "#2777b2"
                                          }
                                      }}>Approve</Button>
                                      
                                  <Button variant="contained" color="primary"
                                      sx={{
                                          backgroundColor: "#e07785",
                                          color: "white",
                                          '&:hover': {
                                              backgroundColor: "#b34553"
                                          }
                                      }}>Reject</Button>
                                </Stack>
                            </TableCell>
                        </TableRow>
                        ))}
                </TableBody>
            </Table>
            : false}
    </>
  );
};

export default SearchEquipment;