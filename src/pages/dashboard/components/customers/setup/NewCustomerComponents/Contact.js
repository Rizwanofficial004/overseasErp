import React, { useState } from 'react';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from 'src/hooks/useAuth';
// _mock
import { countries } from 'src/_mock';
// components
import { FormProvider, RHFSelect, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------
export default function Contact(){
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
          
            firstname: '',
            lastname: '',
            reference: '',
            phone: '',
            secondaryphonenumber: '',
            contactActivefor: '',
            faxnumber: '',
            documentlanguage: '',
            email: '',
            notes: '',
            contactaddress: '',
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
            console.log ("=======",data)
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
                <Grid  px={30} py={1}  container spacing={1}  sx={{ border:1,borderColor:'#FB7600',borderRadius:1}} >                        
                 <Grid item xs={12} md={12}>
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
                <Grid container mt={ 3}spacing={3}>
                    <Grid item xs={12} md={12}>
                        <Card sx={{ p: 3,background: 'rgba(145, 158, 171, 0.12)',borderRadius:1  }}>
                        <h4 style={{marginBottom:15, marginTop:10, textAlign:'center', color:'#ff6347', fontSize:25}}> Contact Data</h4>
                            <Box
                            sx={{
                                display: 'grid',
                                columnGap: 2,
                                rowGap: 3,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                            }}
                            >
                                <Grid mt={3} container spacing={1}>
                                    <Grid item xs={12} md={12}>
                                        <Card sx={{ p: 3 }}>  
                                            <RHFTextField name="firstname" label="First Name" size='small'  sx={{ mt: 1,color:'#FF0000',borderColor:'#FF0000', borderRadius:1}} />
                                            <RHFTextField name="lastname" label="Last Name" size='small'  sx={{ mt: 1, borderColor:'#FF0000', borderRadius:1}}/>
                                            <RHFTextField name="reference" label="Reference" size='small' sx={{  mt: 1,borderColor:'#FF0000', borderRadius:1}}/>
                                            <RHFTextField name="phone" label="Phone Number" size='small' sx={{ mt: 1, borderColor:'#FF0000', borderRadius:1}}/>
                                            <RHFTextField name="secondaryphonenumber" label="Secondary Phone Number" size='small' sx={{ mt: 1, borderColor:'#FF0000', borderRadius:1}}/>
                                            <RHFSelect name="contactActivefor" label="Contact active For" size='small' sx={{ mt: 1, borderColor:'#FF0000', borderRadius:1}}>
                                                <option value="" />
                                                {countries.map((option) => (
                                                <option key={option.code} value={option.label}>
                                                    {option.label}
                                                </option>
                                                ))}
                                            </RHFSelect>
                                            <RHFTextField name="faxnumber"  label="Fax Number" size='small' sx={{  mt: 1,borderColor:'#FF0000', borderRadius:1}}/>
                                        </Card>
                                    </Grid>
                                </Grid>
                                <Grid mt={3} container spacing={1}>
                                    <Grid item xs={12} md={12}>
                                        <Card sx={{ p: 3 }}> 
                                            <RHFSelect name="documentlanguage" label="Document Language" size='small' sx={{ mt: 1, borderColor:'#FF0000', borderRadius:1}}>
                                                <option value="" />
                                                {countries.map((option) => (
                                                <option key={option.code} value={option.label}>
                                                    {option.label}
                                                </option>
                                                ))}
                                            </RHFSelect>
                                            <RHFTextField name="email"  label="E-mail" size='small' sx={{  mt: 1,borderColor:'#FF0000', borderRadius:1}}/>
                                            <RHFTextField name="notes" label="Notes" multiline rows={4.2} size='small' sx={{ mt: 1, borderRadius:1}}/>
                                            <RHFTextField name="contactaddress" label="Address" multiline rows={4} size='small' sx={{ mt: 1, borderRadius:1}}/>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
                <Stack spacing={1} alignItems="flex-bottom" sx={{ mt: 1,borderRadius: 1 }}>
                    <Box display={'flex'} sx={{justifyContent: 'center',m:5}} >           
                        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                            Submit
                        </LoadingButton>
                    </Box>
                </Stack>
    </FormProvider> 
        );
    }
