import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Typography,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { data } from "./List";
import "./country.css";

const Country = () => {
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    district: "",
    subDistrict: "",
    village: "",
  });

  const nestedData = {};

  data.forEach((item) => {
    const {
      Country,
      State,
      District,
      "Sub District": subDistrict,
      Village,
    } = item;

    if (!nestedData[Country]) {
      nestedData[Country] = {};
    }
    if (!nestedData[Country][State]) {
      nestedData[Country][State] = {};
    }
    if (!nestedData[Country][State][District]) {
      nestedData[Country][State][District] = {};
    }
    if (!nestedData[Country][State][District][subDistrict]) {
      nestedData[Country][State][District][subDistrict] = [];
    }
    nestedData[Country][State][District][subDistrict].push(Village);
  });



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    toast(`You have selected:
      Country: ${formData.country}
      State: ${formData.state}
      District: ${formData.district}
      Sub District: ${formData.subDistrict}
      Village: ${formData.village}`);

    setFormData({
      country: "",
      state: "",
      district: "",
      subDistrict: "",
      village: ""
    });
  };



  return (
    <>
      <section className="selection">
        <div className="sub-section">
          <div className="heading">
            <Typography variant="h4">Select Country and Regions</Typography>
          </div>
          <div className="form">
            <form onSubmit={handleSubmit}>
             
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="country-select">Country</InputLabel>
                <Select
                  labelId="country-select"
                  id="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  name="country"
                  sx={{ height: 40, paddingTop: "10px" }}
                  required
                >
                  <MenuItem value="">Select Country</MenuItem>
                  {Object.keys(nestedData).map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

           
              {formData.country && (
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="state-select">State</InputLabel>
                  <Select
                    labelId="state-select"
                    id="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    name="state"
                    sx={{ height: 40, paddingTop: "10px" }}
                    required
                  >
                    <MenuItem value="">Select State</MenuItem>
                    {Object.keys(nestedData[formData.country]).map((state) => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              
              {formData.state && (
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="district-select">District</InputLabel>
                  <Select
                    labelId="district-select"
                    id="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    name="district"
                    sx={{ height: 40, paddingTop: "10px" }}
                    required
                  >
                    <MenuItem value="">Select District</MenuItem>
                    {Object.keys(nestedData[formData.country][formData.state]).map((district) => (
                      <MenuItem key={district} value={district}>
                        {district}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

          
              {formData.district && (
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="subDistrict-select">Sub District</InputLabel>
                  <Select
                    labelId="subDistrict-select"
                    id="subDistrict"
                    value={formData.subDistrict}
                    onChange={handleInputChange}
                    name="subDistrict"
                    sx={{ height: 40, paddingTop: "10px" }}
                    required
                  >
                    <MenuItem value="">Select Sub District</MenuItem>
                    {Object.keys(nestedData[formData.country][formData.state][formData.district]).map((subDistrict) => (
                      <MenuItem key={subDistrict} value={subDistrict}>
                        {subDistrict}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

              )}

              
              {formData.subDistrict && (
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="village-select">Village</InputLabel>
                  <Select
                    labelId="village-select"
                    id="village"
                    value={formData.village}
                    onChange={handleInputChange}
                    name="village"
                    sx={{ height: 40, paddingTop: "10px" }}
                    required
                  >
                    <MenuItem value="">Select Village</MenuItem>
                    {nestedData[formData.country][formData.state][formData.district][formData.subDistrict].map((village) => (
                      <MenuItem key={village} value={village}>
                        {village}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

           
              <Button type="submit" variant="contained" color="primary" class="btn">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </section>

      
      <ToastContainer
        position="top-center"
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fff",
            width: "450px",
            fontSize: "20px",
          },
        }}
      />
    </>
  );
};

export default Country;
