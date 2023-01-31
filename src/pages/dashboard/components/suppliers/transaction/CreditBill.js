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
import { whitespace } from 'stylis';
import { red } from '@mui/material/colors';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import CreditBillItems from './CreditBillComponents/CreditBillItems';

// ----------------------------------------------------------------------

export default function CreditBill() {
    const { enqueueSnackbar } = useSnackbar();
    const [orderdate, setorderDate] = useState(new Date());
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
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} sx={{border:1,borderColor:'black'}}>
            <Grid  px={1} py={1}  container spacing={1}  sx={{ border:1,borderColor:'#FB7600',borderRadius:1}} >
                <Grid item xs={3} md={3} >
                    <Card height={3} sx={{  p: 1, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1 }} >
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 2,
                                columnGap: 1,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                            }}
                        >
                            <RHFTextField name="supplier" label="Supplier"  size='small' sx={{ background:'white', borderRadius:1,}}/>
                            <RHFTextField name="reference" label="Reference"  size='small' sx={{ background:'white', borderRadius:1,}}/>
                            <RHFTextField name="SupplierReference" label="Supplier's Ref"  size='small' sx={{ background:'white', borderRadius:1,}}/>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={3} md={3}>
                    <Card sx={{ p: 1, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1}}>
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 2,
                                columnGap: 1,
                                
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                                
                                }}
                        >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                    <DesktopDatePicker
                                    container
                                        label="Date"
                                        value={orderdate}
                                            // minDate={dayjs('2017-01-01')}
                                        onChange={(newValue) => {
                                        setorderDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} size='small' sx={{background: 'white',borderRadius:1}}/>}
                                        />
                                </Stack>
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                    <DesktopDatePicker
                                    container
                                        label="Due Date"
                                        value={orderdate}
                                            // minDate={dayjs('2017-01-01')}
                                        onChange={(newValue) => {
                                        setorderDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} size='small' sx={{background: 'white',borderRadius:1}}/>}
                                        />
                                </Stack>
                            </LocalizationProvider>
                            <RHFTextField name="Terms" label="Terms" size='small' sx={{ background: 'white',borderRadius:1}}/>
                                    
                        </Box>
                    </Card>
                </Grid>   
                <Grid item xs={3} md={3}>
                    <Card sx={{ p: 1, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1}}>
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 2,
                                columnGap: 1,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                                
                                }}
                        >
                            <RHFTextField name="supplierCurrency" label="Supplier's Currency" size='small' sx={{ background: 'white',borderRadius:1}}/>
                            <RHFTextField name="exchangeRate" label="Exchange Rate" size='small' sx={{ background: 'white',borderRadius:1}}/>  
                <Grid item xs={3} md={3}>
                    <Card sx={{  background: 'rgba(145, 158, 171, 0.12)',borderRadius:1}}>
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 2,
                                columnGap: 1,
                                
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                                
                                }}
                        >        
                            <RHFTextField name="taxGroup" label="Tax Group" size='small' sx={{ background: 'white',borderRadius:1}}/>
                            <RHFTextField name="taxGroup" label="Current Credit" size='small' sx={{ background: 'white',borderRadius:1}}/>          
                        </Box>
                    </Card>
                </Grid>
                        </Box>
                    </Card>
                </Grid>           
                <Grid item xs={3} md={3}>
                    <Card sx={{  p: 1, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1}}>
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 2,
                                columnGap: 1,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                            }}
                        >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                    <DesktopDatePicker
                                    container
                                        label="Start Date"
                                        value={orderdate}
                                            // minDate={dayjs('2017-01-01')}
                                        onChange={(newValue) => {
                                        setorderDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} size='small' sx={{background: 'white',borderRadius:1}}/>}
                                        />
                                </Stack>
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                    <DesktopDatePicker
                                    container
                                        label="End Date"
                                        value={orderdate}
                                        // minDate={dayjs('2017-01-01')}
                                        onChange={(newValue) => {
                                            setorderDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} size='small' sx={{background: 'white',borderRadius:1}}/>}
                                    />
                                </Stack>
                            </LocalizationProvider>                           
                            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                             Search
                                </LoadingButton>
                        </Box>
                    </Card>
                </Grid>
                
                
            </Grid>
{/*----------------SALES TABLE CALLING-------------------------------------------*/}
                 {/* <CreditBillItems />  */}
{/*----------------3rd portion Detailing Code-------------------------------------------*/}
          
                <Grid item mt={6} ml={30} xs={6} md={6}>
                    <Card sx={{  p: 1, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1}}>
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 2,
                                columnGap: 1,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                            }}
                        >
                            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                             Enter Invoice
                            </LoadingButton>
                        </Box>
                    </Card>
                </Grid>
        </FormProvider> 
    );
}