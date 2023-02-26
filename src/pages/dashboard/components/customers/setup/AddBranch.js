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
// import SalesQuotaionsItems from './quotationsComponents/SalesQuotaionsItems';
import { whitespace } from 'stylis';
import { red } from '@mui/material/colors';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import AddBranchItems from './AddBranchComponents/AddBranchItems';

// ----------------------------------------------------------------------

export default function AddBranch() {
    const { enqueueSnackbar } = useSnackbar();
    // const [quotationDate, setQuotationDate] = useState(new Date());
    // const [quotationDeliveryDate, setQuotationDeliveryDate] = useState(new Date());
    // const [purchaseOrderDate, setPurchaseOrderDate] = useState(new Date());
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
        // customers: '',
        // branch: '',
        // reference: '',
        // customerDiscount: '',
        // exchangeRate: '',
        // currentCredit: '',
        // payment: '',
        // salesPerson: '',
        // quotationDate: '',
        // deliverFromLocation: '',
        // shippingTerms: '',
        // quotationDeliveryDate: '',
        // deliveryTo: '',
        // contactPhoneNumber: '',
        // address: '',
        // customerReference: '',
        // shippingCompany: '',
        // purchaseOrder: '',
        // comments: '',
        // attn: '',
        // purchaseOrderDate: '',
        // deliveryTerms: '',
        // currency: '',
    
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
        // data.quotationDate = quotationDate
        // data.quotationDeliveryDate = quotationDeliveryDate
        // data.purchaseOrderDate = purchaseOrderDate
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
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
            <Grid container spacing={1}  sx={{ border:1,borderColor:'#FB7600',borderRadius:1}} >                         
                <Grid item xs={12} md={12}>
                    <Card sx={{ p: 1, background: 'rgba(145, 158, 171, 0.12)'}}>
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 2,
                                columnGap: 2,
                                
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                                
                                }}
                        >
                            <Card sx={{p:3}}>
                            <RHFSelect name="alltypes" label="Select Customer"  >
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
            </Grid>
            
            <AddBranchItems />
        </FormProvider> 
    );
}