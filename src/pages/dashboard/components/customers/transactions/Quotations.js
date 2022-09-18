import React, { useState } from 'react';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
// form
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

// ----------------------------------------------------------------------

export default function Quotations() {
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
            <Grid border='4px solid green' bgcolor={'lightgray'} px={2} py={1} borderRadius={2} container spacing={1.5} >

                <Grid item xs={3} md={3} >
                    <Card height={3} sx={{ p: 2 }} >
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 1.5,
                                // columnGap: 2,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                            }}
                        >

                            <RHFSelect name="customers" label="Customers" placeholder="Customers" size='small'>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFSelect name="branch" label="Branch" placeholder="Branch" size='small'>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFTextField name="reference" label="Reference" size='small' />

                        </Box>
                    </Card>
                </Grid>


                <Grid item xs={3} md={3}>
                    <Card sx={{ p: 2 }}>
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 1.5,
                                columnGap: 2,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                            }}
                        >
                            <RHFTextField name="customerCurrency" label="Customer Currency" size='small' />
                            <RHFTextField name="exchangeRate" label="Exchange Rate" size='small' />
                            <RHFTextField name="currentCredit" label="Current Credit" size='small' />
                            <RHFTextField name="customerDiscount" label="Customer Discount" size='small' />

                        </Box>
                    </Card>
                </Grid>

                <Grid item xs={3} md={3}>
                    <Card sx={{ p: 2 }}>
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 1.5,
                                columnGap: 2,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                            }}
                        >
                            <RHFSelect name="payment" label="Payment" placeholder="Payment" size='small'>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFSelect name="salesPerson" label="sales person" placeholder="sales person" size='small'>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFSelect name="price List" label="Price List" placeholder="Price List" size='small'>
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

                <Grid item xs={3} md={3}>
                    <Card sx={{ p: 2 }}>
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 1.5,
                                columnGap: 2,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                            }}
                        >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                    <DesktopDatePicker
                                        label="Quotation Date"
                                        value={date}
                                        // minDate={dayjs('2017-01-01')}
                                        onChange={(newValue) => {
                                            setDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} size='small' />}
                                    />
                                </Stack>
                            </LocalizationProvider>

                        </Box>
                    </Card>
                </Grid>

            </Grid>

            <SalesQuotaionsItems />

            <Grid mt={3} container spacing={3}>
                <Grid item xs={12} md={12}>
                    <Card sx={{ p: 3 }}>
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 3,
                                columnGap: 2,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
                            }}
                        >
                            <RHFSelect name="deliverFromLocation" label="Deliver from Location" placeholder="Deliver from Location" size='small'>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>

                            <RHFSelect name="deliveryTerms" label="Delivery Terms" placeholder="Delivery Terms" size='small'/>

                            <RHFSelect name="shippingCompany" label="Shipping Company" placeholder="Shipping Company" size='small'>
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
                                        label="Valid until"
                                        value={date}
                                        // minDate={dayjs('2017-01-01')}
                                        onChange={(newValue) => {
                                            setDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} size='small' />}
                                    />
                                </Stack>
                            </LocalizationProvider>


                            <RHFTextField name="shippingTerms" label="Shipping Terms" size='smal' />

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                    <DesktopDatePicker
                                        label="Quotation Date"
                                        value={date}
                                        // minDate={dayjs('2017-01-01')}
                                        onChange={(newValue) => {
                                            setDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} size='small' />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                    <DesktopDatePicker
                                        label="Valid Until"
                                        value={date}
                                        // minDate={dayjs('2017-01-01')}
                                        onChange={(newValue) => {
                                            setDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} size='small' />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                            <RHFTextField name="phoneNumber" label="Phone Number" />
                            <RHFTextField name="address" label="Address" />

                            <RHFTextField name="deliverTo" label="Deliver To" />

                            <RHFTextField name="state" label="State/Region" />


                            <RHFTextField name="city" label="City" />
                            <RHFTextField name="addressTo" label="Address To" />
                            <RHFTextField name="addressTo" label="Address To" />
                        </Box>

                        <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                            <RHFTextField name="about" multiline rows={4} label="About" />

                            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                Save
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>

            </Grid>
        </FormProvider>
    );
}
