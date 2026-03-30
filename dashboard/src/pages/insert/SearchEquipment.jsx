import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Card, CardContent,
  TextField, Button, MenuItem,
  Table, TableBody, TableCell,
  TableRow
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
    {searchedRows.length > 0? searchedRows.length : 0}
    
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
                <TableBody>
                    {searchedRows.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.equipment_name}</TableCell>
                            <TableCell
                                
                                sx={{
                                    display: "flex",
                                    gap: "12px"
                                }}>

                                <Button variant="contained" color="primary"
                                    sx={{
                                        backgroundColor: "#5496e0",
                                        color: "white",
                                        '&:hover': {
                                            backgroundColor: "#2777b2"
                                        }
                                    }}>Edit</Button>

                                <Button variant="contained"
                                    sx={{
                                        backgroundColor: "#e09090",
                                        color: "white",
                                        '&:hover': {
                                            backgroundColor: "#a75454"
                                        }
                                    }}>Delete</Button>
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