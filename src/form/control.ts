import { ReactNode } from 'react';

/**
 * Formik
 */
type ControlProps<V = string> = {
  /**
   * Html id
   */
  id?: string;
  /**
   * Control value
   */
  value: V;
  /**
   * Control label
   */
  label?: ReactNode;
  /**
   * Root classname
   */
  className?: string;
  /***
   * Is form control disabled
   */
  disabled?: boolean;
  /**
   * Field error
   */
  error?: ReactNode;
  /**
   * Is control touched
   */
  touched?: boolean;
  /**
   * Is has error
   */
  isError?: boolean;
  /**
   * Placeholder
   */
  placeholder?: ReactNode;
  /**
   * Is Field required
   */
  required?: boolean;
  /**
   * Change handler
   */
  onChange?: (value: V) => void;
  /**
   * Handle touch
   */
  onTouch?: () => void;
  /**
   * Control tabindex
   */
  tabIndex?: number;
  /**
   * Type for Date Range Picker
   */
  pickerType?: string;
};

export type {ControlProps};
