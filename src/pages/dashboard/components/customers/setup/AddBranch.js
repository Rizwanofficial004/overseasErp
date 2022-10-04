    import React, { useState } from 'react';
    import * as Yup from 'yup';
    import { useSnackbar } from 'notistack';
    import { useCallback } from 'react';
    // form
    import Avatar from '@mui/material/Avatar';
    import { useForm } from 'react-hook-form';
    import { yupResolver } from '@hookform/resolvers/yup';
    // @mui
    import { Box, Grid, Card, Stack, Typography,Button } from '@mui/material';
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

    // ----------------------------------------------------------------------
    export default function AddBranch(){
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
                    <Grid  px={30} py={1}  container spacing={1}  sx={{ border:1,borderColor:'#FB7600',borderRadius:1}} >                         <Grid item xs={12} md={12}>
                            <Card sx={{ p: 1, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1}}>
                                <Box
                                    sx={{
                                        display: 'grid',
                                        rowGap: 2,
                                        columnGap: 1,
                                        
                                        gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                                        
                                        }}
                                >
                                    <RHFSelect name="alltypes" label="Select Customer" mt={10} size='small'sx={{ background: 'white',borderRadius:1}}>
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
                    </Grid>
            <Grid item xs={12} md={12}>
                <Card sx={{ m:5,p: 5, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1  }}>
                <h4 style={{marginBottom:20, textAlign:'center', color:'black'}}> BRANCH DETAILS </h4>
                    <Box
                        sx={{
                        display: 'grid',
                        columnGap: 2,
                        rowGap: 3,
                        gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                            }}
                    >
                        <RHFTextField name="name" label="Branch Name" size='small'  sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}} />
                        <RHFTextField name="name" label="Branch Short Name" size='small'  sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}/>
                        <RHFTextField name="phone"  label="Mailing Address" multiline rows={4}size='small' sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}/>
                        <RHFTextField name="secondaryphonenumber"  label="Billing Address"multiline rows={4} size='small' sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}/>
                    </Box>
                        <RHFTextField  name="phone"  label="General Notes" size='small' multiline rows={4}sx={{ mt:3,background:'white',borderColor:'#FF0000', borderRadius:1}}/>
                        <h4 style={{marginBottom:20,textAlign:'center',marginTop:20}}>GL ACCOUNTS</h4>
                        <Box
                        sx={{
                        display: 'grid',
                        columnGap: 2,
                        rowGap: 3,
                        gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                            }}
                    >
                        <RHFSelect name="customers" label="Sales Account:"  size='small' sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFSelect name="customers" label="Sales Discount Account"  size='small' sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFSelect name="customers" label="Accounts Receivable Account"  size='small' sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFSelect name="customers" label="WHT"  size='small' sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}>
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
            <Grid  px={1} py={1}  container spacing={1}   >
                <Grid item xs={6} md={6} >
                    <Card height={3} sx={{  p: 1,background: 'rgba(145, 158, 171, 0.12)',borderRadius:1  }} >
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 2,
                                columnGap: 1,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                            }}
                        >
                           <h4 style={{ textAlign:'center', color:'black'}}>SALES</h4>
                            <RHFSelect name="customers" label="Sales Person"  size='small' sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFSelect name="branch" label="Sales Area" size='small' sx={{ background: 'white',borderRadius:1}}>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFSelect name="branch" label="Sales Group" size='small' sx={{ background: 'white',borderRadius:1}}>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFSelect name="branch" label="Default Inventory Location" size='small' sx={{ background: 'white',borderRadius:1}}>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFSelect name="branch" label="Default Shipping Company" size='small' sx={{ background: 'white',borderRadius:1}}>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFSelect name="branch" label="Tax Group" size='small' sx={{ background: 'white',borderRadius:1}}>
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
                    <Card sx={{ p: 1,background: 'rgba(145, 158, 171, 0.12)',borderRadius:1 }}>
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 2,
                                columnGap: 1,
                                
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                                
                                }}
                        >
                           <h4 style={{ textAlign:'center', color:'black'}}>GENRAL CONTACT DATA</h4>
                            <RHFTextField name="customerdiscount" label="Contact Person" size='small' sx={{ background: 'white',borderRadius:1 }}  />
                            <RHFTextField name="exchangeRate" label="Phone Number " size='small' sx={{ background: 'white',borderRadius:1}}/>
                            <RHFTextField name="currentCredit" label="Secondary Phone Number" size='small' sx={{ background: 'white',borderRadius:1}}/>
                            <RHFTextField name="currentCredit" label="Fax Number" size='small' sx={{ background: 'white',borderRadius:1}}/>
                            <RHFTextField name="currentCredit" label="E-mail" size='small' sx={{ background: 'white',borderRadius:1}}/>
                            
                            <RHFSelect name="branch" label="Document Language" size='small' sx={{ background: 'white',borderRadius:1}}>
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
            </Grid>  
            <Stack alignItems="flex-center" sx={{ mt: 3}}>  
                <LoadingButton type="submit" variant="contained" loading={isSubmitting} >
                   Add branch
                </LoadingButton>
            </Stack>
        </FormProvider> 
            );
        }
