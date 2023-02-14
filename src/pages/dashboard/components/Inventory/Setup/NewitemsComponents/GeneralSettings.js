import React, { useState } from 'react';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Button,Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from 'src/hooks/useAuth';
import { fData } from 'src/utils/formatNumber';
// _mock
import { countries } from 'src/_mock';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// components
import { FormProvider, RHFSelect, RHFTextField ,RHFUploadAvatar} from 'src/components/hook-form';

// ----------------------------------------------------------------------
export default function GeneralSettings(){
    const { enqueueSnackbar } = useSnackbar();
    const [date, setDate] = useState(new Date());
    const { user } = useAuth();
    const UpdateUserSchema = Yup.object().shape({
        displayName: Yup.string().required('Name is required'),
    });
    const AddButton = () => {
        return (
            <Button
                // component={RouterLink}
                // to={PATH_DASHBOARD.user.newUser}
            >
                Add
            </Button>
            )
        }
        const defaultValues = {
          
            firstname: '',
            lastname: '',
            reference: '',
            phone: '',
            secondaryphonenumber: '',
            contactActivefor: '',
            faxnumber: '',
            documentlanguage: '',
            email: '',
            notes: '',
            contactaddress: '',
        };
        const methods = useForm({
            resolver: yupResolver(UpdateUserSchema),
            defaultValues,
        });
        const {
            setValue,
            handleSubmit,
            formState: { isSubmitting },
        } = methods;

        const onSubmit = async (data) => {
            console.log ("=======",data)
            try {
                await new Promise((resolve) => setTimeout(resolve, 500));
                enqueueSnackbar('Update success!');
            } catch (error) {
                console.error(error);
            }
        };
        const handleDrop = useCallback(
            (acceptedFiles) => {
                const file = acceptedFiles[0];

                if (file) {
                    setValue(
                        'photoURL',
                        Object.assign(file, {
                            preview: URL.createObjectURL(file),
                        })
                    );
                }
            },
            [setValue]
        );
        return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid   py={1}  container spacing={1}  sx={{ border:1,borderColor:'#FB7600',borderRadius:1}} >                        
                         <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{ p: 1, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1}}>
                                <Box
                                    sx={{
                                        display: 'grid',
                                        rowGap: 2,
                                        columnGap: 1,
                                        
                                        gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                                        
                                        }}
                                >
                                    <RHFTextField name="itemcode" label="Item Code" size='small'  sx={{ borderColor:'#FF0000', borderRadius:1}} />
                                   
                                </Box>
                            </Card>
                        </Grid> 
                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{ p: 1, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1}}>
                                <Box
                                    sx={{
                                        display: 'grid',
                                        rowGap: 2,
                                        columnGap: 1,
                                        
                                        gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                                        
                                        }}
                                >
                                     <RHFSelect name="item" label="Select an Items"  size='small'sx={{ borderRadius:1}}>
                                        <option value="" />
                                        {countries.map((option) => (
                                            <option key={option.code} value={option.label}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </RHFSelect>

                                </Box>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{ p:1, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1}}>
                                <Box
                                    sx={{
                                        display: 'grid',
                                        rowGap: 2,
                                        columnGap: 1,
                                        
                                        gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                                        
                                        }}
                                >
                                        <Stack spacing={1} alignItems="flex-center" sx={{  borderRadius: 1 }}>
                                            <LoadingButton type="submit" variant="contained" loading={isSubmitting} >
                                                Search
                                            </LoadingButton>
                                        </Stack>

                                </Box>
                            </Card>
                        </Grid>
                    </Grid>           
       
      <Grid mt={3}container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3,background: 'rgba(145, 158, 171, 0.12)',borderRadius:1  }}>
          <h4 style={{marginBottom:15,marginTop:10, textAlign:'center', color:'black'}}> Items General DETAILS </h4>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <Grid mt={3} container spacing={1}>
                <Grid item xs={12} md={12}>
                  <Card sx={{ p: 3 }}>  
                      <RHFTextField name="itemCode" label="Item Code" size='small'  sx={{ mt: 2,color:'#FF0000',borderColor:'#FF0000', borderRadius:1}} />
                      <RHFTextField name="itemName" label="Product Name" size='small'  sx={{ mt: 2, borderColor:'#FF0000', borderRadius:1}}/>
                      <RHFTextField name="partName" label="Part Name" size='small' sx={{  mt: 2,borderColor:'#FF0000', borderRadius:1}}/>
                      <RHFTextField name="modelNumber" label="Model Number" size='small' sx={{ mt: 2, borderColor:'#FF0000', borderRadius:1}}/>
                      <RHFTextField name="description" label="Description" multiline rows={5.5} size='small' sx={{ mt: 2, borderColor:'#FF0000', borderRadius:1}}/>
                      <RHFSelect name="category" label="Category" size='small' sx={{ mt: 2, borderColor:'#FF0000', borderRadius:1}}>
                        <option value="" />
                        {countries.map((option) => (
                          <option key={option.code} value={option.label}>
                            {option.label}
                          </option>
                        ))}
                      </RHFSelect>
                  </Card>
                </Grid>
              </Grid>
              <Grid mt={3} container spacing={1}>
                <Grid item xs={12} md={12}>
                  <Card sx={{ p: 3 }}> 
                      <RHFSelect name="itemTaxType" label="Item Tax Type" size='small' sx={{ mt: 2, borderColor:'#FF0000', borderRadius:1}}>
                        <option value="" />
                        {countries.map((option) => (
                          <option key={option.code} value={option.label}>
                            {option.label}
                          </option>
                        ))}
                      </RHFSelect>
                      <RHFSelect name="itemType" label="Item  Type" size='small' sx={{ mt: 2, borderColor:'#FF0000', borderRadius:1}}>
                        <option value="" />
                        {countries.map((option) => (
                          <option key={option.code} value={option.label}>
                            {option.label}
                          </option>
                        ))}
                      </RHFSelect>
                      <RHFSelect name="unitMeasure" label="Unit Of Measure" size='small' sx={{ mt: 2, borderColor:'#FF0000', borderRadius:1}}>
                        <option value="" />
                        {countries.map((option) => (
                          <option key={option.code} value={option.label}>
                            {option.label}
                          </option>
                        ))}
                      </RHFSelect>
                      <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Editable Description" />
                              
                        </FormGroup>
                        <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked />} label="exclude From sales" />
                              
                        </FormGroup>
                      <RHFTextField name="make"  label="Make" size='small' sx={{  mt: 2,borderColor:'#FF0000', borderRadius:1}}/>
                      <RHFTextField name="specs"  label="Specs" multiline rows={4.3} size='small' sx={{ mt: 2, borderColor:'#FF0000', borderRadius:1}}/>
                      
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Grid  px={1} py={1}  container spacing={1}   >
        <Grid item xs={12} sm={6} md={6} >
            <Card height={3} sx={{  p: 1,background: 'rgba(145, 158, 171, 0.12)',borderRadius:1  }} >
                <Box
                    sx={{
                        display: 'grid',
                        rowGap: 2,
                        columnGap: 1,
                        gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                    }}
                >
                    <h4 style={{ textAlign:'center', color:'black'}}>GL Account</h4>

                  <Grid mt={3} container spacing={1}>
                    <Grid item xs={12} md={12}>
                      <Card sx={{ p: 3 }}>
                        <RHFSelect name="salesaccount" label="Sales Account"  size='small' sx={{ mt: 2, borderColor:'#FF0000', borderRadius:1}}>
                            <option value="" />
                            {countries.map((option) => (
                                <option key={option.code} value={option.label}>
                                    {option.label}
                                </option>
                            ))}
                        </RHFSelect>
                        <RHFSelect name="inventoryAccount" label="Inventory Account" size='small' sx={{  mt: 2,borderRadius:1}}>
                            <option value="" />
                            {countries.map((option) => (
                                <option key={option.code} value={option.label}>
                                    {option.label}
                                </option>
                            ))}
                        </RHFSelect>
                        <RHFSelect name="salesarea" label="C.O.G.S. Account  " size='small' sx={{ mt: 2, borderRadius:1}}>
                            <option value="" />
                            {countries.map((option) => (
                                <option key={option.code} value={option.label}>
                                    {option.label}
                                </option>
                            ))}
                        </RHFSelect>
                        <RHFSelect name="inventoryadjustmentAccount" label="Inventory Adjustment Account" size='small' sx={{ mt: 2, borderRadius:1}}>
                            <option value="" />
                            {countries.map((option) => (
                                <option key={option.code} value={option.label}>
                                    {option.label}
                                </option>
                            ))}
                        </RHFSelect>
                        
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
            </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ p: 1,background: 'rgba(145, 158, 171, 0.12)',borderRadius:1 }}>
                <Box
                    sx={{
                        display: 'grid',
                        rowGap: 2,
                        columnGap: 1,
                        gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                        
                        }}
                >
                    <h4 style={{ textAlign:'center', color:'black'}}>Others</h4>
                    <Grid mt={3} container spacing={1}>
                      <Grid item xs={12} md={12}>
                        <Card sx={{p:2}}>  
                          <RHFUploadAvatar  name="avatarUrl"
                                            accept="image/*"
                                            maxSize={3145728}
                                            helperText={
                                              <Typography
                                                variant="caption"
                                                sx={{
                                            
                                                  mx: 'auto',
                                                  display: 'block',
                                                  textAlign: 'center',
                                                  color: 'text.secondary',
                                                }}
                                              >
                                                Allowed *.jpeg, *.jpg, *.png, *.gif
                                                <br /> max size of {fData(3145728)}
                                              </Typography>
                                            }
                            />
                        <RHFSelect name="itemstatus" label="Item Status " size='small' sx={{ mt: 2, borderRadius:1}}>
                            <option value="" />
                            {countries.map((option) => (
                                <option key={option.code} value={option.label}>
                                    {option.label}
                                </option>
                            ))}
                        </RHFSelect>
                          
                        </Card>
                      </Grid>
                    </Grid>
                </Box>
            </Card>
        </Grid>             
      </Grid>  
  
      <Stack spacing={1} alignItems="center" sx={{ mt: 1,borderRadius: 1 }}>
          <Box display={'flex'} >
          <Box m={1}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Update  Items 
          </LoadingButton>
          </Box>
          <Box m={1}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Clone This Item 
          </LoadingButton>
          </Box>
          <Box m={1}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Delete This Item
          </LoadingButton>
          </Box>
          <Box m={1}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Cancel
          </LoadingButton>
          </Box>
          </Box>
      </Stack>
      
    </FormProvider>
        );
    }
