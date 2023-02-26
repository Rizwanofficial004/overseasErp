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

// ----------------------------------------------------------------------

export default function StandardCosts() {
    const { enqueueSnackbar } = useSnackbar();
  
    const {user} = useAuth();
    const UpdateUserSchema = Yup.object().shape({
    
    });
    const defaultValues = {
        customers: '',
        branch: '',
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
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} sx={{border:1,borderColor:'black'}}>
            <Grid   py={1}  container spacing={1}  sx={{ border:1,borderColor:'#FB7600',borderRadius:1}} >                        
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
                                     <Card sx={{p:2}}> 
                                    <RHFTextField name="itemcode" label="Item Code" size='small'  sx={{ borderColor:'#FF0000', borderRadius:1}} />
                                   </Card>
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
                                     <Card sx={{p:2}}> 
                                     <RHFSelect name="item" label="Select an Items"  size='small'sx={{ borderRadius:1}}>
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
                                     <Card sx={{p:2}}> 
                                        <Stack spacing={1} alignItems="flex-center" sx={{  mt: 1, borderRadius: 1 }}>
                                            <LoadingButton type="submit" variant="contained" loading={isSubmitting} >
                                                Search
                                            </LoadingButton>
                                        </Stack>
                                    </Card>
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>           
       
            <Grid mt={3} container spacing={1}>
                <Grid item xs={12} sm={6} md={12}>
                    <Card sx={{ p: 1, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1 }}>

                        <h4 style={{marginBottom:15, marginTop:30, textAlign:'center', color:'#ff6347', fontSize:30}}> Standard Costs Details  </h4>
                     
                                <Card  sx={{mt:3, p: 3 }}>  
                                    <RHFTextField  name="standardmaterialcostperunit" label="Standard Material Cost Per Unit" size="small" sx={{ mt: 1}}/>                     
                                </Card>
                            <Stack spacing={1} alignItems="flex-bottom" sx={{ mt: 5,borderRadius: 1 }}>
                                <Box display={'flex'} sx={{justifyContent: 'center',m:5}} >           
                                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                        Update 
                                    </LoadingButton>
                                </Box>
                            </Stack> 
                           
                    </Card>
                </Grid>
            </Grid>
        </FormProvider> 
    );
}