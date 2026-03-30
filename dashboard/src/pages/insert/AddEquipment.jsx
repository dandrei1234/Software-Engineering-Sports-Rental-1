import React, { useState, useEffect, use } from 'react';
import axios from 'axios';
import { CardContent, CardHeader, TextField, Autocomplete, Button } from '@mui/material';

import { StyledCard, FormContainer, ActionBox } from '../../Styles';

const AddEquipment = ({close, displaySuccessMessage, displayErrorMessage}) => {
    const [formData, setFormData] = useState({
        name: '',
        quantity: 0,
        description: '',
        categoryId: null,
        categoryName: null
    });
    const [categoryIds, setCategoryIds] = useState([]);
    const [categoryNames, setCategoryNames] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'quantity' && value < 0) return;
        setFormData({ ...formData, [name]: value });
    };

    async function getCategories() {
        axios
            .get("http://localhost:1337/equipment/get-categories")
            .then((response) => {
                //setCategories(response.data);
                const ids = response.data.map(category => category.categoryID);
                const names = response.data.map(category => category.category_name);

                setCategoryIds(ids);
                setCategoryNames(names);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const createEquipment = async () => {
        try {

            const response = await axios.post('http://localhost:1337/equipment/add', {
                equipment_name: formData.name,
                categoryID: formData.categoryId,
                quantity: formData.quantity,
                description: formData.description
            });
            displaySuccessMessage("Add Equipment Success", "Equipment added successfully");


        } catch (error) {
            displayErrorMessage("Add Equipment Failed", error.response.data.message || "Add Equipment failed");
            //alert(error.response.data.message || "Add Equipment failed");
        }
    };

    return (
        <StyledCard sx={{ minWidth: '500px', margin: '0 auto' }}>
            <CardHeader 
                    title="Add Equipment" 
                    sx={{ textAlign: 'center', borderBottom: '1px solid #eee' }} 
            />
            <CardContent>
                <FormContainer spacing={3}>
                    <TextField
                        label="Name"
                        name="name"
                        fullWidth
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Quantity"
                        name="quantity"
                        type="number"
                        fullWidth
                        inputProps={{ min: 0 }}
                        value={formData.quantity}
                        onChange={handleChange}
                    />

                    <Autocomplete
                        options={categoryNames}
                        value={formData.categoryName}
                        // Disables the clear (x) button to ensure a value is always selected
                        disableClearable 
                        onChange={(_, val) => {
                                setFormData({ ...formData, categoryName: val, categoryId: categoryIds[categoryNames.indexOf(val)]  });
                        }}
                        renderInput={(params) => (
                            <TextField 
                                {...params} 
                                label="Category" 
                                inputProps={{ 
                                    ...params.inputProps, 
                                    readOnly: true // This prevents typing/keyboard input
                                }} 
                            />
                        )}
                    />

                    <TextField
                        label="Description"
                        name="description"
                        multiline
                        rows={3}
                        fullWidth
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <ActionBox>
                        <Button variant="contained" size="large" onClick={() => createEquipment()}>
                            Add Equipment
                        </Button>
                        <Button size="large" onClick={close}>
                            Cancel
                        </Button>
                    </ActionBox>
                </FormContainer>
            </CardContent>
        </StyledCard>
    );
};

export default AddEquipment;