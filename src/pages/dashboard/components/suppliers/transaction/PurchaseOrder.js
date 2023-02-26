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
import PurchaseOrderItems from './PurchaseOrderComponents/PurchaseOrderItems';

// ----------------------------------------------------------------------

export default function PurchaseOrder() {
    const { enqueueSnackbar } = useSnackbar();
    const [orderdate, setorderDate] = useState(new Date());
    const { user } = useAuth();

    const UpdateUserSchema = Yup.object().shape({
        displayName: Yup.string().required('Name is required'),
    });

    const defaultValues = {
     
        memo:'',
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
                <Grid item xs={12} sm={6} md={3} >
                    <Card height={3} sx={{  p: 1, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1 }} >
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 2,
                                columnGap: 1,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                            }}
                        >
                            <Card sx={{p:3}}>
                            <RHFSelect name="Supplier" label="Supplier"  size='small' sx={{mt:1}}>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFSelect name="Suppliercurrency" label="Supplier Currency" size='small' sx={{ mt:1}}>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFTextField name="Exchangerate" label="Exchange Rata"  size='small' sx={{ mt:1}}/>
                        </Card>  
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ p: 1, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1}}>
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 2,
                                columnGap: 1,
                                
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                                
                                }}
                        >
                            <Card sx={{p:3}}>
                            <RHFTextField name="Currentcredit" label="Current Credit    "  size='small' sx={{ mt:1}}/>
                            <RHFTextField name="reference" label="Reference" size='small' sx={{ mt:1}}/>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                    <DesktopDatePicker
                                    container
                                        label="Order Date"
                                        value={orderdate}
                                        // minDate={dayjs('2017-01-01')}
                                        onChange={(newValue) => {
                                            setorderDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} size='small' sx={{mt:1}}/>}
                                    />
                                </Stack>
                            </LocalizationProvider>                                                      
                        </Card>
                        </Box>
                    </Card>
                </Grid>             

                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{  p: 1, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1}}>
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 2,
                                columnGap: 1,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                            }}
                        >
                            <Card sx={{p:3}}>
                            <RHFTextField name="SuppliersReference " label="Supplier's Reference" size='small' sx={{ mt:1}}/>
                            <RHFSelect name="receiveinto" label="Receive Into" placeholder="Payment" size='small'sx={{ mt:1}}>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFSelect name="salesPerson" label="Sales Person" placeholder="Sales Person" size='small' sx={{ mt:1}}>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                        </Card>
                        </Box>
                    </Card>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ p:1, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1}}>
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 1,
                                columnGap: 2,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                            }}
                        >
                        <Card sx={{p:3}}>
                        <RHFTextField name="Deliverto " label="Deliver To"  size ='small' multiline rows={5} sx={{ mt:1}}/>
                        </Card>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
{/*----------------SALES TABLE CALLING-------------------------------------------*/}
                    <PurchaseOrderItems />
{/*----------------3rd portion Detailing Code-------------------------------------------*/}
            <Grid mt={3} ml={23} container spacing={1}>
                <Grid item xs={8} md={8}>
                    <Card sx={{ p: 2, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1 }}>   
                    <Card sx={{p:3}}>
                        <RHFTextField name="memo" label="MEMO" multiline rows={4}  sx={{ mt: 1}}/>
                    </Card>
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
