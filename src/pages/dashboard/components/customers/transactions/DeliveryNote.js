import React, { useState } from 'react';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
// form
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Typography, Button } from '@mui/material';
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
import DeliveryNoteItems from './deliveryComponents/DeliveryNoteItems';
import { whitespace } from 'stylis';
import { red } from '@mui/material/colors';
// ----------------------------------------------------------------------
export default function DeliveryNote() {
    const { enqueueSnackbar } = useSnackbar();

    const [date, setDate] = useState(new Date());
    const { user } = useAuth();

    const UpdateUserSchema = Yup.object().shape({
        displayName: Yup.string().required('Name is required'),
        alllocation: Yup.string().required('Location is mandatory'),
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
        alllocation: '',
        Ref: '',
        reference: '',
        PurchaseOrder: '',
        item: '',
        allitems: '',
        allcustomers: '',
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
            <Grid px={1} py={1} container spacing={1} sx={{ border: 1, borderColor: '#FB7600', borderRadius: 1 }} >
                <Grid item xs={3} md={3} >
                    <Card height={3} sx={{ p: 1, background: 'rgba(145, 158, 171, 0.12)', borderRadius: 1 }} >
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 1,
                                columnGap: 1,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                            }}
                        >
                            <RHFTextField name="Ref" label="#" size='small' sx={{ background: 'white', borderRadius: 1, }} />
                            <RHFTextField name="reference" label="Reference" size='small' sx={{ background: 'white', borderRadius: 1, }} />
                            <RHFTextField name="PurchaseOrder" label="Purchase Order (P.O)" size='small' sx={{ background: 'white', borderRadius: 1, }} />
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={3} md={3}>
                    <Card sx={{ p: 1, background: 'rgba(145, 158, 171, 0.12)', borderRadius: 1 }}>
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 1,
                                columnGap: 1,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                            }}
                        >
                            <RHFSelect name="alllocation" label="All Locations" placeholder="All Locations" size='small' sx={{ background: 'white', borderRadius: 1 }}>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFTextField name="item" label="Item" size='small' sx={{ background: 'white', borderRadius: 1 }} />
                            <RHFSelect name="allitems" label="All Items" placeholder="All Items" size='small' sx={{ background: 'white', borderRadius: 1 }}>
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
                    <Card sx={{ p: 1, background: 'rgba(145, 158, 171, 0.12)', borderRadius: 1 }}>
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 1,
                                columnGap: 1,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                            }}
                        >
                            <RHFSelect name="allcustomers" label="All Customers" placeholder="All Customers" size='small' sx={{ background: 'white', borderRadius: 1 }}>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <Stack spacing={1} alignItems="flex-center" sx={{ background: '#FF9238', mt: 1, borderRadius: 1 }}>
                                <LoadingButton type="submit" variant="contained" loading={isSubmitting} >
                                    Search
                                </LoadingButton>
                            </Stack>
                        </Box >
                    </Card>
                </Grid>
            </Grid>
            {/*----------------SALES TABLE CALLING-------------------------------------------*/}
            <DeliveryNoteItems />
            {/*----------------3rd portion Detailing Code-------------------------------------------*/}
        </FormProvider>
    );
}
