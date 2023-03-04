import React, { useState } from 'react';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
// form
import Avatar from '@mui/material/Avatar';

import { useForm } from 'react-hook-form';

// @mui
import { Box, Grid, Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';


import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// hooks
import useAuth from 'src/hooks/useAuth';


// _mock
import { countries } from 'src/_mock';
// components
import { FormProvider, RHFSwitch, RHFSelect, RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';


// ----------------------------------------------------------------------

export default function BankAccountTransfer() {
    const { enqueueSnackbar } = useSnackbar();
    const [sampleOrderdate, setsampleOrderdate] = useState(new Date());
    const [requiredDeliveryDate, setrequiredDeliveryDate] = useState(new Date());
    const [TRDate, setTRDate] = useState(new Date());
    const [purchaseOrderDate, setpurchaseOrderDate] = useState(new Date());
    const { user } = useAuth();

    const UpdateUserSchema = Yup.object().shape({
        // customers: Yup.string().required('Name is required'),
        // branch: Yup.string().required('Branch Name is required'),
        // orderdate: Yup.string().required('Order Date is required'),
        // address: Yup.string().required('Address is required'),
        // typeOfPacking: Yup.string().required('Type of Packing is required'),

        // attn: Yup.string().required('Attention person is required'),
        // currency: Yup.string().required('Currency is required'),
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
            <Grid  px={1} mt={10 } py={1}  container spacing={1}  sx={{ border:1,borderColor:'#FB7600',borderRadius:1}} >
                <Grid item xs={6} md={6} >
                    <Card height={3} sx={{  p: 1, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1 }} >
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 1,
                                columnGap: 1,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                            }}
                        >
                            <Card sx={{p:3}}>
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
                                        renderInput={(params) => <TextField {...params} size='small' sx={{mt:2}}/>}
                                    />
                                </Stack>
                            </LocalizationProvider>
                            <RHFTextField name="reference" label="Reference" size='small' sx={{ mt:2}}/>
                            <RHFSelect name="fromaccount" label="From Account" placeholder="Branch" size='small' sx={{ mt:2}}>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFSelect name="toaccount" label="To Account" placeholder="Branch" size='small' sx={{ mt:2}}>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFTextField name="bankbalance" label="Bank Balance" size='small' sx={{ mt:2}}/>
                            </Card>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={6} md={6}>
                    <Card sx={{ p: 1, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1}}>
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 1,
                                columnGap: 1,
                                
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                                
                                }}
                        >
                             <Card sx={{p:3}}>
                            <RHFTextField name="amount" label="Amount " size='small' sx={{ mt:2}}/>
                            <RHFTextField name="bankcharges" label="Bank Charges " size='small' sx={{ mt:2}}/>
                            <RHFTextField name="memo" label="MEMo " size='small' multiline rows={5.7 } sx={{ mt:2}}/>                         
                          
                            </Card>
                        </Box>
                    </Card>
                </Grid>                     
            </Grid>
            <Grid mt={10} sx={{textAlign:'center'}}>
                <Card height={3} sx={{  p: 1, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1 }} >
                    <Box
                        sx={{
                            display: 'grid',
                            rowGap: 1,
                            columnGap: 1,
                            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                        }}
                    >
                        <Card sx={{p:3}}>
                            <Box m={1} >
                                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                    Enter Transfer
                                </LoadingButton>
                            </Box>
                        </Card>
                    </Box>
                </Card>
            </Grid> 
        </FormProvider> 
    );
}
