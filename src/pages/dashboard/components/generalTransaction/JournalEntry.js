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
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// hooks
import useAuth from 'src/hooks/useAuth';
// utils
import { fData } from 'src/utils/formatNumber';
// _mock
import { countries } from 'src/_mock';
// components
import { FormProvider, RHFSwitch, RHFSelect, RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
// import SampleOrderItems from './SampleComponents/SampleOrderITems';
import { whitespace } from 'stylis';
import { red } from '@mui/material/colors';
import JournalEntryItems from './JournalEntryComponents/JournalEntryItems';


// ----------------------------------------------------------------------

export default function JournalEntry() {
    const { enqueueSnackbar } = useSnackbar();
    const [sampleOrderdate, setsampleOrderdate] = useState(new Date());
    const [requiredDeliveryDate, setrequiredDeliveryDate] = useState(new Date());
    const [TRDate, setTRDate] = useState(new Date());
    const [purchaseOrderDate, setpurchaseOrderDate] = useState(new Date());
    const { user } = useAuth();

    const UpdateUserSchema = Yup.object().shape({
        customers: Yup.string().required('Name is required'),
        branch: Yup.string().required('Branch Name is required'),
        orderdate: Yup.string().required('Order Date is required'),
        address: Yup.string().required('Address is required'),
        typeOfPacking: Yup.string().required('Type of Packing is required'),

        attn: Yup.string().required('Attention person is required'),
        currency: Yup.string().required('Currency is required'),
    });

    const defaultValues = {
        customers: '',
        branch: '',
        reference: '',
        customerdiscount: '',
        currentCredit: '',
        pricelist: '',
        salesPerson: '',
        payment: '',
        sampleOrderdate: '',
        requiredDeliveryDate: '',
        TRDate: '',
        purchaseOrderDate: '',
        deliverFromLocation: '',
        shippingTerms: '',
        carrierReceiptNo: '',
        delivery: '',
        deliveryTo: '',
        quantity: '',
        address: '',
        customerReference: '',
        typeOfPacking: '',
        purchaseOrder: '',
        comments: '',
        attn: '',
        shippingCompany: '',
        grn: '',
        deliveryTerms: '',
        gridNo: '',
        currency: '',
       
    };
    const methods = useForm({
        //resolver: yupResolver(UpdateUserSchema),
        defaultValues,
    });
    const {
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;
    
    const onSubmit = async (data) => {
        data.sampleOrderdate= sampleOrderdate
        data.requiredDeliveryDate = requiredDeliveryDate
        data.TRDate = TRDate
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
                             <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                    <DesktopDatePicker
                                    container
                                        label="Date"
                                        value={sampleOrderdate}
                                        // minDate={dayjs('2017-01-01')}
                                        onChange={(newValue) => {
                                            setsampleOrderdate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} size='small' sx={{background: 'white',borderRadius:1}}/>}
                                    />
                                </Stack>
                            </LocalizationProvider>
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
                             
                            <RHFTextField name="reference" label="reference " size='small' sx={{ background: 'white',borderRadius:1}}/>
                             
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
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Reverse Transaction" />    
                        </Box>
                    </Card>
                </Grid>
            </Grid>
{/*----------------SALES TABLE CALLING-------------------------------------------*/}
            <JournalEntryItems />
{/*----------------3rd portion Detailing Code-------------------------------------------*/}
                  
            <Grid mt={3} ml={23} container spacing={1}>
                <Grid item xs={8} md={8}>
                    <Card sx={{ p: 1, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1 }}>
                        <RHFTextField name="memo" label="MEMO" multiline rows={4}  sx={{alignItems:'center', mt: 1, background: 'white',borderRadius:1 }}/>
                        <Stack spacing={1} alignItems="flex-end" sx={{ mt: 1,borderRadius: 1 }}>
                        
                                <Box m={1}>
                                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                        Process Payment
                                    </LoadingButton>
                                </Box>
                        </Stack>                         
                    </Card>
                </Grid>
            </Grid>
        </FormProvider> 
    );
}
