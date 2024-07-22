import * as React from 'react';
import { FormikProps, FormikContext, Form as FormikForm } from 'formik';
import {FC, HTMLAttributes} from "react";

/**
 * Form
 */
const Form: FC<HTMLAttributes<HTMLFormElement> & {
  html?: boolean;

  use: FormikProps<any>;

  formRef?: any;
}> = ({ html = true, use, formRef, children, ...props }) => (
  <FormikContext.Provider value={use}>
    {html ? (
      <FormikForm ref={formRef} {...props}>
        {children}
      </FormikForm>
    ) : (
      children
    )}
  </FormikContext.Provider>
);

export {Form};
