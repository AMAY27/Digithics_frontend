import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Close as CloseIcon,
  Delete as DeleteIcon,
  Info as InfoIcon,
  Link as LinkIcon,
} from "@mui/icons-material";
import { Formik, FieldArray, Field, Form } from "formik";
import * as Yup from "yup";
import { addWebsiteForCertification } from "../../api";
import {
  WebsiteDetails,
  WebsiteOnboardingFormDetails,
  WebsiteOnboardingFormProps,
} from "../../types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { sanitizeStringArray } from "../../utils/DataHelper";
import TermsAndConditions from "./TermsAndConditions";

const initialValues: WebsiteOnboardingFormDetails = {
  websiteName: "",
  baseUrl: "",
  description: "",
  additionalUrls: [""],
  acceptedTerms: false,
};

const validationSchema = Yup.object().shape({
  websiteName: Yup.string().required("This field is required"),
  baseUrl: Yup.string()
    .required("This field is required")
    .url(
      "Enter the website URL in the correct format (e.g. http://www.example.com)"
    ),
  description: Yup.string(),
  additionalUrls: Yup.array().of(
    Yup.string().url(
      "Enter the website URL in the correct format (e.g. http://www.example.com)"
    )
  ),
});

const WebsiteOnboardingForm = ({
  open,
  onClose,
  fullScreen = false,
  onSuccess,
}: WebsiteOnboardingFormProps) => {
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const [openTC, setOpenTC] = useState<boolean>(false);

  const handleClose = (
    event: React.SyntheticEvent<Element, Event>,
    reason: string
  ) => {
    if (reason && reason === "backdropClick" && isFormLoading) return;
    onClose();
  };

  const handleSubmit = async (
    values: WebsiteOnboardingFormDetails
  ): Promise<void> => {
    if (values.acceptedTerms) {
      try {
        setIsFormLoading(true);
        setOpenTC(false);

        const sanitizedAdditionalUrls = values.additionalUrls
          ? sanitizeStringArray(values.additionalUrls)
          : [];
        values.additionalUrls = sanitizedAdditionalUrls;

        const data: WebsiteDetails = {
          websiteName: values.websiteName,
          baseUrl: values.baseUrl,
          additionalUrls: values.additionalUrls,
          description: values.description,
        };
        await addWebsiteForCertification(data);

        toast.success(
          "Website sent for certification. It may take some time for expert verification"
        );

        setIsFormLoading(false);
        onSuccess();
        onClose();
      } catch (error) {
        if (error instanceof Error) {
          toast.error(`Error: ${error.message}`);
        } else {
          toast.error("An unknown error occurred.");
        }
      }
    } else {
      setOpenTC(true);
    }
  };

  useEffect(() => {
    return () => {
      setIsFormLoading(false);
    };
  }, []);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      maxWidth="lg"
      fullWidth
      aria-labelledby="website-onboarding"
      onClose={handleClose}
    >
      <DialogTitle>
        <Typography variant="h5" component="span">
          Add new Website
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 14,
            top: 12,
            color: (theme) => theme.palette.grey[500],
          }}
          disabled={isFormLoading}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleSubmit, setFieldValue }) => (
            <Form noValidate>
              <Grid container spacing={2} sx={{ mt: 0 }}>
                <Grid item xs={12} md={6}>
                  <Field
                    as={TextField}
                    label="Website Name"
                    name="websiteName"
                    fullWidth
                    required
                    error={touched.websiteName && Boolean(errors.websiteName)}
                    helperText={
                      touched.websiteName &&
                      Boolean(errors.websiteName) &&
                      errors.websiteName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    as={TextField}
                    label="Website URL"
                    name="baseUrl"
                    fullWidth
                    required
                    error={touched.baseUrl && Boolean(errors.baseUrl)}
                    helperText={
                      touched.baseUrl && Boolean(errors.baseUrl)
                        ? errors.baseUrl
                        : "e.g. http://www.example.com"
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="Additional Details"
                    name="description"
                    fullWidth
                    rows={4}
                    multiline
                    helperText="Add specific instructions regarding your website here. (e.g. Login credentials)"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FieldArray name="additionalUrls">
                    {({ push, remove }) => (
                      <>
                        <Stack
                          direction="row"
                          spacing={2}
                          justifyContent="space-between"
                          alignItems="center"
                          sx={{ mb: 2 }}
                        >
                          <Stack direction="row" alignItems="center">
                            <Typography variant="body1" component="span">
                              Additional Links (optional)
                            </Typography>
                            <Tooltip
                              title="Add a few specific links of the website which you want to be checked with priority"
                              arrow
                            >
                              <IconButton>
                                <InfoIcon />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                          <Button
                            type="button"
                            variant="contained"
                            color="secondary"
                            style={{ color: "#fff" }}
                            onClick={() => push("")}
                          >
                            Add Link
                          </Button>
                        </Stack>

                        <Stack direction="column" spacing={1}>
                          {values.additionalUrls &&
                            values.additionalUrls.map((url, index) => (
                              <Stack
                                direction="row"
                                spacing={2}
                                key={index}
                                alignItems="flex-start"
                                justifyContent="center"
                              >
                                <Field
                                  as={TextField}
                                  id={`additionalUrls.${index}`}
                                  name={`additionalUrls.${index}`}
                                  fullWidth
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <LinkIcon />
                                      </InputAdornment>
                                    ),
                                  }}
                                  helperText={
                                    errors.additionalUrls?.[index]
                                      ? errors.additionalUrls[index]
                                      : "e.g. http://www.example.com"
                                  }
                                  error={Boolean(
                                    errors.additionalUrls?.[index]
                                  )}
                                />
                                {values.additionalUrls &&
                                  values.additionalUrls.length > 1 && (
                                    <IconButton
                                      type="button"
                                      onClick={() => remove(index)}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  )}
                              </Stack>
                            ))}
                        </Stack>
                      </>
                    )}
                  </FieldArray>
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="end">
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isFormLoading}
                  >
                    Add Website
                  </Button>
                </Grid>
              </Grid>
              <TermsAndConditions
                open={openTC}
                onAccept={() => {
                  setFieldValue("acceptedTerms", true);
                  handleSubmit();
                }}
                onReject={() => setOpenTC(false)}
              />
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default WebsiteOnboardingForm;
