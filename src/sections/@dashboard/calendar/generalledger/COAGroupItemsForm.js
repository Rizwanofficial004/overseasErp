import PropTypes from 'prop-types';
import * as Yup from 'yup';
import merge from 'lodash/merge';

import { useSnackbar } from 'notistack';
// form
import { useForm} from 'react-hook-form';

import { Box,Card,Grid, Button, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { countries } from 'src/_mock';
// redux
import { useDispatch } from 'src/redux/store';
// components

import { FormProvider, RHFTextField,RHFSelect  } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const COLOR_OPTIONS = [
  '#00AB55', // theme.palette.primary.main,
  '#1890FF', // theme.palette.info.main,
  '#54D62C', // theme.palette.success.main,
  '#FFC107', // theme.palette.warning.main,
  '#FF4842', // theme.palette.error.main
  '#04297A', // theme.palette.info.darker
  '#7A0C2E', // theme.palette.error.darker
];

const getInitialValues = (event) => {
    const _event = {
        groupid:'',
        groupName:'',
        subGroupOf:'',
        classes:'',
      textColor: '#1890FF',
  };
  if (event) {
    return merge({}, _event, event);
  }

  return _event;
};

// ----------------------------------------------------------------------

COAGroupItemsForm.propTypes = {
  event: PropTypes.object,
  // range: PropTypes.object,
  onCancel: PropTypes.func,
};

export default function COAGroupItemsForm({ event, onCancel, coaGroupItems, setcoaGroupItems}) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const EventSchema = Yup.object().shape({
    
    
  });

  const methods = useForm({
    // resolver: yupResolver(EventSchema),
    defaultValues: getInitialValues(event),
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    console.log(">>>>>>>>>>:::", data);
    setcoaGroupItems([...coaGroupItems, data])
    onCancel();
      reset();
    // try {
    //   const newEvent = {
    //     title: data.title,
    //     description: data.description,
    //     textColor: data.textColor,
    //     allDay: data.allDay,
    //     start: data.start,
    //     end: data.end,
    //   };
    //   if (event.id) {
    //     dispatch(updateEvent(event.id, newEvent));
    //     enqueueSnackbar('Update success!');
    //   } else {
    //     enqueueSnackbar('Create success!');
    //     dispatch(createEvent(newEvent));
    //   }
    //   onCancel();
    //   reset();
    // } catch (error) {
    //   console.error(error);
    // }
  };


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={12} md={12}>
                <Card sx={{ p: 5, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1  }}>
                    <Box
                        sx={{
                        display: 'grid',
                        columnGap: 2,
                        rowGap: 3,
                        gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                        }}
                    >
                    <Card sx={{p:3}}>
                        <RHFTextField name="groupid" label="ID  "sx={{mt:2}} />
                
                    </Card>
                    <Card sx={{p:3}}>
                        <RHFTextField name="groupName" label="Group Name "  sx={{ mt:2}}/>
                    </Card> 
                    </Box>
                    <Card sx={{p:3,mt:2}}>
                    <RHFSelect name="subGroupOf" label="Sub Group Of" placeholder="Sub Group Of"  sx={{ mt:2}}>
                        <option value="" />
                        {countries.map((option) => (
                            <option key={option.code} value={option.label}>
                                {option.label}
                            </option>
                        ))}
                    </RHFSelect>
                    </Card>
                    <Card sx={{p:3,mt:2}}>
                    <RHFSelect name="classes" label="Class" placeholder="Class"  sx={{ mt:2}}>
                        <option value="" />
                        {countries.map((option) => (
                            <option key={option.code} value={option.label}>
                                {option.label}
                            </option>
                        ))}
                    </RHFSelect>
                    </Card>
                </Card>
            </Grid>
            <DialogActions>
                <Box sx={{ flexGrow: 1 }} />

                <Button variant="outlined" color="inherit" onClick={onCancel}>
                    Cancel
                </Button>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting} loadingIndicator="Loading...">
                    Add New
                </LoadingButton>
            </DialogActions>
  </FormProvider>
  );
}
