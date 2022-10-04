import React, { useState } from 'react';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
// form
import Avatar from '@mui/material/Avatar';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Typography } from '@mui/material';
import { LoadingButton, MobileDateTimePicker } from '@mui/lab';

import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// hooks
import useAuth from 'src/hooks/useAuth';
// utils
import { fData } from 'src/utils/formatNumber';
// _mock
import { countries } from 'src/_mock';
// components
import { FormProvider, RHFSwitch, RHFSelect, RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
import CashInvoiceItems from './cashComponents/CashInvoiceItems';
import { whitespace } from 'stylis';
import { red } from '@mui/material/colors';

// ----------------------------------------------------------------------

export default function CashInvoice() {
    const { enqueueSnackbar } = useSnackbar();
    const [date, setDate] = useState(new Date());
    const { user } = useAuth();

    const UpdateUserSchema = Yup.object().shape({
        displayName: Yup.string().required('Name is required'),
    });

    const defaultValues = {
        displayName: user?.displayName || '',
        email: user?.email || '',
        photoURL: user?.photoURL || '',
        phoneNumber: user?.phoneNumber || '',
        country: user?.country || '',
        address: user?.address || '',
        state: user?.state || '',
        city: user?.city || '',
        zipCode: user?.zipCode || '',
        about: user?.about || '',
        isPublic: user?.isPublic || '',
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

    const onSubmit = async () => {
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
            <Grid  px={1} py={1}  container spacing={1}  sx={{ border:1,borderColor:'#FB7600',borderRadius:1}} >
                <Grid item xs={3} md={3} >
                    <Card height={3} sx={{  p: 1, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1 }} >
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 1,
                                columnGap: 1,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                            }}
                        >
                            <RHFSelect name="customers" label="Customers" placeholder="Customers" size='small' sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFSelect name="branch" label="Branch" placeholder="Branch" size='small' sx={{ background: 'white',borderRadius:1}}>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFTextField name="reference" label="Reference" size='small' sx={{ background:'white', borderRadius:1,}}/>

                        </Box>
                    </Card>
                </Grid>


                <Grid item xs={3} md={3}>
                    <Card sx={{ p: 1, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1}}>
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 1,
                                columnGap: 1,
                                
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                                
                                }}
                        >
                            <RHFTextField name="currentcredit" label="Current Credit" size='small' sx={{ background: 'white',borderRadius:1 }}  />
                            <RHFTextField name="customerdiscount" label="Customer Discount %" size='small' sx={{ background: 'white',borderRadius:1}}/>
                            
                            <RHFSelect name="pricelist" label="Price List" placeholder="Price List" size='small' sx={{ background: 'white',borderRadius:1}}>
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

                <Grid item xs={6} md={6}>
                    <Card sx={{  p: 1,background: 'rgba(145, 158, 171, 0.12)',borderRadius:1}}>
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 1,
                                columnGap: 1,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                            }}
                        >
                            <RHFSelect name="payment" label="Payment" placeholder="Payment" size='small'sx={{ background: 'white',borderRadius:1}}>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFSelect name="salesPerson" label="sales person" placeholder="sales person" size='small' sx={{ background: 'white',borderRadius:1}}>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                    <DesktopDatePicker
                                    container
                                        label="Order Date"
                                        value={date}
                                        // minDate={dayjs('2017-01-01')}
                                        onChange={(newValue) => {
                                            setDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} size='small' sx={{background: 'white',borderRadius:1}}/>}
                                    />
                                </Stack>
                            </LocalizationProvider>

                         {/*   <RHFSelect name="price List" label="Price List" placeholder="Price List" size='small' sx={{ background: 'white'}}>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>*/}

                        </Box>
                    </Card>
                </Grid>

              

            </Grid>
{/*----------------SALES TABLE CALLING-------------------------------------------*/}
            <CashInvoiceItems />
{/*----------------3rd portion Detailing Code-------------------------------------------*/}
            <Grid mt={3} container spacing={1}>
                <Grid item xs={12} md={12}>
                    
                    <Card sx={{ p: 3, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1 }}>
                    <h4
                        style={{ textAlign:'center'}}>Cash Delivery Details  </h4>
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 2,
                                columnGap: 2,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
                            }}
                        >
    <Grid mt={3} container spacing={1}>
        <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
                <Grid>
                            <RHFSelect name="deliverFromLocation" label="Deliver from Location" placeholder="Deliver from Location" size='small' sx={{ mt: 1}}>
                                <option value=""/>
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFTextField name="ShippingTerms" label="Shipping Terms" size="small" sx={{ mt: 1 }}/>
                            <RHFTextField name="carrierReceiptNo" label="Carrier Receipt No" size="small" sx={{ mt: 1 }}/>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <Stack spacing={3} sx={{ mt: 1 }}>
                                    <DesktopDatePicker
                                        label=" Required Delivery Date"
                                        value={date}
                                        // minDate={dayjs('2017-01-01')}
                                        onChange={(newValue) => {
                                            setDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} size="small" />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                            </Grid>
            </Card>
        </Grid>
    </Grid>
    <Grid mt={3} container spacing={1}>
        <Grid item xs={12} md={12}>
            <Card  sx={{ p: 3 }}>
                            <RHFTextField name="delivery" label="Delivery"   htmlFor="input-with-icon-adornment" size="small" sx={{ mt: 1}} />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Stack spacing={3} sx={{ mt: 1}}>
                                    <DesktopDatePicker
                                        label="T.R Date"
                                        value={date}
                                        // minDate={dayjs('2017-01-01')}
                                        onChange={(newValue) => {
                                            setDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} size='small' />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                            <RHFTextField  name="deliveryTo" label="Delivery To" size="small" sx={{ mt: 1}}/>
                            <RHFTextField name="contactPhoneNumber" label="Contact Phone Number"size='small' sx={{ mt: 1}} />
            </Card>
        </Grid>
    </Grid>
 <Grid mt={3} container spacing={1}>
    <Grid item xs={12} md={12}>
        <Card sx={{ p: 3 }}>
                            <RHFTextField name="quantity" label="Quantity" size='small' sx={{ mt: 1}}/>
                            <RHFTextField name="address" label="Address" size='small' sx={{ mt: 1}}/>
                            <RHFTextField name="customerReference" label="Customer Reference"size='small' sx={{ mt: 1}} />
                            <RHFTextField name="typeOfPacking" label="Type Of Packing" size='small' sx={{ mt: 1}}/>
            </Card>
        </Grid>
    </Grid>
                            <RHFTextField name="purchaseOrder" label="Purchase Order" size='small' sx={{ mt: 1, background:'white',borderRadius: 1}}/>
                            <RHFTextField name="comments" label="Comments" size='small' sx={{ mt: 1, background:'white',borderRadius: 1}}/>
                            <RHFTextField name="attn" label="ATTN" size='small' sx={{ mt: 1 , background:'white',borderRadius: 1}}/>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3} sx={{ mt: 1}}>
                                    <DesktopDatePicker
                                        label="Purchase Order Date"
                                        value={date}
                                        // minDate={dayjs('2017-01-01')}
                                        onChange={(newValue) => {
                                            setDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} size='small' sx={{ background:'white',borderRadius: 1}}/>}
                                    />
                                </Stack>
                            </LocalizationProvider>
                            <RHFSelect name="shippingCompany" label="Shipping Company" placeholder="Deliver from Location" size='small' sx={{ mt: 1, background:'white',borderRadius: 1}}>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFTextField name="grn" label="GRN" size='small' sx={{ mt: 1, background:'white',borderRadius: 1}}/>
                            <RHFTextField name="deliveryTerms" label="Delivery Terms"size='small' sx={{ mt: 1, background:'white',borderRadius: 1}} />
                            <RHFTextField name="gridNo" label="Grid No" size='small' sx={{ mt: 1, background:'white',borderRadius: 1}}/>
                            
                            <RHFSelect name="currency" label="Currency" placeholder="Currency" size='small' sx={{ mt: 1, background:'white',borderRadius: 1}}>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                        </Box>

                        <Stack spacing={1} alignItems="flex-end" sx={{ mt: 1,borderRadius: 1 }}>
                         <Box display={'flex'} >
                          <Box m={1}>
                           <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                             Save
                           </LoadingButton>
                          </Box>
                          <Box m={1}>
                          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                             Cancel
                          </LoadingButton>
                          </Box>
                         </Box>
                        </Stack>
                        
                                          </Card>
                </Grid>

            </Grid>
        </FormProvider> 
    );
}
