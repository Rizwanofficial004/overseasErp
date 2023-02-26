import React, { useState } from 'react';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
// form


import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import { Box, Grid, Card, Stack, Typography,Button } from '@mui/material';
import { LoadingButton, MobileDateTimePicker } from '@mui/lab';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// hooks
import useAuth from 'src/hooks/useAuth';

import { countries } from 'src/_mock';
// components
import { FormProvider, RHFSwitch, RHFSelect, RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
import CustomerAlloItems from './CustomerAllocationComponents/CustomerAlloItems';

// ----------------------------------------------------------------------

export default function CustomerAllocationDashboard() {
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
                <Grid item xs={12} sm={6}md={4} >
                    <Card height={3} sx={{  p: 1, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1 }} >
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 1,
                                columnGap: 1,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                            }}
                        >
                            <Card sx={{ p: 3 }}>
                                <RHFTextField name="reference" label="Reference" size='small' sx={{ mt:1 }}  />
                                <RHFSelect name="alltypes" label="All Types" placeholder="All Items" size='small'sx={{ mt:1}}>
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
                <Grid item xs={12} sm={6}md={4}>
                    <Card sx={{ p: 1, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1}}>
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 1,
                                columnGap: 1,
                                
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                                
                                }}
                        >
                            <Card sx={{ p: 3 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Stack spacing={3}>
                                        <DesktopDatePicker
                                        container
                                            label="From"
                                            value={date}
                                                // minDate={dayjs('2017-01-01')}
                                            onChange={(newValue) => {
                                                setDate(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} size='small' sx={{mt:1}}/>}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Stack spacing={3}>
                                        <DesktopDatePicker
                                        container
                                            label="TO"
                                            value={date}
                                                // minDate={dayjs('2017-01-01')}
                                            onChange={(newValue) => {
                                                setDate(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} size='small' sx={{mt:1}}/>}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </Card>
                        </Box>
                    </Card>
                </Grid>             
                <Grid item xs={12} sm={6}md={4}>
                    <Card sx={{  p: 1,background: 'rgba(145, 158, 171, 0.12)',borderRadius:1}}>
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 1,
                                columnGap: 1,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                            }}
                        >
                            <Card sx={{ p: 3 }}>
                                <RHFSelect name="allcustomers" label="All Customers" placeholder="All Customers" size='small'sx={{ mt:1}}>
                                    <option value="" />
                                    {countries.map((option) => (
                                        <option key={option.code} value={option.label}>
                                            {option.label}
                                        </option>
                                    ))}
                                </RHFSelect>
                                <Stack spacing={1} alignItems="flex-center" sx={{ background:'#FF9238', mt: 1,borderRadius: 1 }}>
                                    <LoadingButton type="submit" >
                                        Search
                                    </LoadingButton>
                                </Stack>
                            </Card>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
{/*----------------SALES TABLE CALLING-------------------------------------------*/}
            <CustomerAlloItems />
{/*----------------3rd portion Detailing Code-------------------------------------------*/}
           
        </FormProvider> 
    );
}
