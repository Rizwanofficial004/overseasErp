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
import SalesQuotaionsItems from './quotationsComponents/SalesQuotaionsItems';
import { whitespace } from 'stylis';
import { red } from '@mui/material/colors';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

export default function Quotations() {
    const { enqueueSnackbar } = useSnackbar();
    const [quotationDate, setQuotationDate] = useState(new Date());
    const [quotationDeliveryDate, setQuotationDeliveryDate] = useState(new Date());
    const [purchaseOrderDate, setPurchaseOrderDate] = useState(new Date());
    const {user} = useAuth();
    const UpdateUserSchema = Yup.object().shape({
        // purchaseOrder: Yup.string().required('purchase order is required'),
        // customers: Yup.string().required('purchase order is required'),
        // branch: Yup.string().required('purchase order is required'),
        // exchangeRate: Yup.string().required('purchase order is required'),
        // quotationDate: Yup.string().required('purchase order is required'),
        // deliverFromLocation: Yup.string().required('purchase order is required'),
        // quotationDeliveryDate: Yup.string().required('purchase order is required'),
        // deliveryTo: Yup.string().required('purchase order is required'),
    });
    const defaultValues = {
        customers: '',
        branch: '',
        reference: '',
        customerDiscount: '',
        exchangeRate: '',
        currentCredit: '',
        payment: '',
        salesPerson: '',
        quotationDate: '',
        deliverFromLocation: '',
        shippingTerms: '',
        quotationDeliveryDate: '',
        deliveryTo: '',
        contactPhoneNumber: '',
        address: '',
        customerReference: '',
        shippingCompany: '',
        purchaseOrder: '',
        comments: '',
        attn: '',
        purchaseOrderDate: '',
        deliveryTerms: '',
        currency: '',
    
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
        data.quotationDate = quotationDate
        data.quotationDeliveryDate = quotationDeliveryDate
        data.purchaseOrderDate = purchaseOrderDate
        console.log("=======:::", data);
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
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} sx={{border:1,borderColor:'black'}}>
            <Grid  px={1} py={1}  container spacing={1}  sx={{ border:1,borderColor:'#FB7600',borderRadius:1}} >
                <Grid item xs={12} sm={6} md={4} >
                    <Card height={3} sx={{  p: 1, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1 }} >
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 2,
                                columnGap: 1,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                            }}
                        >
                            <RHFSelect name="customers" label="Customers"  size='small' sx={{ color:'#FF5733',borderColor:'#FF0000', borderRadius:1}}>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFSelect name="branch" label="Branch" size='small' sx={{borderRadius:1}}>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFTextField name="reference" label="Reference"  size='small' sx={{ borderRadius:1,}}/>
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
                            <RHFTextField name="customerDiscount" label="Customer Discount %" size='small' sx={{ borderRadius:1 }}  />
                            {/* {
                                errors.customerDiscount && touched.customerDiscount && <text>{errors.customerDiscount}</text>
                            } */}
                            <RHFTextField name="exchangeRate" label="Exchange Rate" size='small' sx={{ borderRadius:1}}/>
                            <RHFTextField name="currentCredit" label="Current Credit" size='small' sx={{borderRadius:1}}/>
                        </Box>
                    </Card>
                </Grid>             
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{  p: 1, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1}}>
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 2,
                                columnGap: 1,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                            }}
                        >
                            <RHFSelect name="payment" label="Payment" placeholder="Payment" size='small'sx={{ borderRadius:1}}>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFSelect name="salesPerson" label="Sales Person" placeholder="Sales Person" size='small' sx={{ borderRadius:1}}>
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
                                        label="Quotation Date"
                                        value={quotationDate}
                                        // minDate={dayjs('2017-01-01')}
                                        onChange={(newValue) => {
                                            setQuotationDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} size='small' sx={{borderRadius:1}}/>}
                                    />
                                </Stack>
                            </LocalizationProvider>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
            {/*----------------SALES TABLE CALLING-------------------------------------------*/}
            <SalesQuotaionsItems  />
            {/*----------------3rd portion Detailing Code-------------------------------------------*/}
            <Grid mt={3} container spacing={1}>
                <Grid item xs={12} md={12}>
                    <Card sx={{ p: 1, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1 }}>
                        <h2 style={{  textAlign:'center',color:'black',borderRadius:10}}>Quotation Delivery Details </h2>
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
                                            <RHFTextField name="shippingTerms" label="Shipping Terms" size="small" sx={{ mt: 1 }}/>
                                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                                <Stack spacing={3} sx={{ mt: 1 }}>
                                                    <DesktopDatePicker
                                                        label="Quotation Delivery Date"
                                                        value={quotationDeliveryDate}
                                                        // minDate={dayjs('2017-01-01')}
                                                        onChange={(newValue) => {
                                                            setQuotationDeliveryDate(newValue);
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
                                        <RHFTextField  name="deliveryTo" label="Delivery To" size="small" sx={{ mt: 1}}/>
                                        <RHFTextField name="contactPhoneNumber" label="Contact Phone Number"size='small' sx={{ mt: 1}} />
                                    </Card>
                                </Grid>
                            </Grid>
                            <Grid mt={3} container spacing={1}>
                                <Grid item xs={12} md={12}>
                                    <Card sx={{ p: 3 }}>
                                        <RHFTextField name="address" label="Address" size='small' sx={{ mt: 1}}/>
                                        <RHFTextField name="customerReference" placeholderTextColor={'green'} label="Customer Reference" size='small' sx={{ mt: 1}} />
                                        <RHFSelect name="shippingCompany" label="Shipping Company" placeholder="Deliver from Location" size='small' sx={{ mt: 1,borderRadius: 1}}>
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
                            <RHFTextField name="purchaseOrder" label="Purchase Order" size='small' sx={{ mt: 1,borderRadius: 1}}/>
                            <RHFTextField name="comments" label="Comments" size='small' sx={{ mt: 1,borderRadius: 1}}/>
                            <RHFTextField name="attn" label="ATTN" size='small' sx={{ mt: 1 ,borderRadius: 1}}/>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3} sx={{ mt: 1}}>
                                    <DesktopDatePicker
                                        label="Purchase Order Date"
                                        value={purchaseOrderDate}
                                        // minDate={dayjs('2017-01-01')}
                                        onChange={(newValue) => {
                                            setPurchaseOrderDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} size='small' sx={{ borderRadius: 1}}/>}
                                    />
                                </Stack>
                            </LocalizationProvider>
                            <RHFTextField name="deliveryTerms" label="Delivery Terms"size='small' sx={{ mt: 1,borderRadius: 1}} />
                            <RHFSelect name="currency" label="Currency"  size='small' sx={{ mt: 1, borderRadius: 1}}>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                        </Box>
                        <Stack spacing={1} alignItems="flex-bottom" sx={{ mt: 1,borderRadius: 1 }}>
                        <Box display={'flex'} sx={{justifyContent: 'center',m:5}} >           
                        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                            Submit
                        </LoadingButton>
                        </Box>
                        </Stack>       
                    </Card>
                </Grid>
            </Grid>
        </FormProvider> 
    );
}