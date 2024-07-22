import { useFormikContext } from 'formik';
import React, { useCallback, ComponentType } from 'react';
import { get } from 'object-path';
import { FormikStatus } from './status';

type Props = {
  value?: any;
  error?: any;
  isError?: any;
  onTouch?: any;
  onChange?: any;
  touched?: any;
  disabled?: any;
};

const useFieldProps = (name: string, props: any) => {
  const {
    values,
    errors,
    touched,
    submitCount,
    isSubmitting,
    setFieldValue,
    setFieldTouched,
    ...formik
  } = useFormikContext<any>();

  const status: FormikStatus = formik.status;
  const statusError = get(status, 'errors' + '.' + name);
  const error = get(errors, name) || statusError;
  const isError = submitCount > 0 && error != undefined && error != null;
  const value = get(values, name) ?? ''; // Default to empty string if null or undefined
  const { hooks } = props as any;

  const onChange = useCallback(
      async (value: any) => {
        await setFieldValue(name, value);
        hooks?.change(value);
      },
      [setFieldValue, name, hooks?.change]
  );

  const onTouch = useCallback(
      async (touched = true) => {
        await setFieldTouched(name, touched);
      },
      [name, setFieldTouched]
  );

  return {
    value,
    error,
    status,
    isError,
    onTouch,
    touched,
    onChange,
    isSubmitting
  };
};

function withField<P extends Props>(Component: ComponentType<P>) {
  const Result: React.FC<{ name: string } & Omit<P, keyof Props>> = (props) => {
    const {
      value,
      error,
      status,
      isError,
      onTouch,
      touched,
      onChange,
      isSubmitting
    } = useFieldProps(props.name, props);

    return (
        <Component
            value={value}
            error={error}
            isError={isError}
            onTouch={onTouch}
            onChange={onChange}
            touched={get(touched, props.name as any)}
            disabled={isSubmitting || get(status, 'disabled')}
            {...(props as unknown as P)}
        />
    );
  };

  return Result as ComponentType<
      {
        name: string;
        hooks?: {
          change?: (value: any) => any;
        };
      } & Omit<P, keyof Props>
  >;
}

export { withField, useFieldProps };