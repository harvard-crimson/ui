import { cn } from '@lib/utils'
import { kebabCase, uniqueId } from 'lodash'
import { useEffect, useRef, useState } from 'react'

interface InputProps {
  /**
   * Type of input (exc. button, checkbox, color, file, number, radio, range, reset, submit)
   */
  type?:
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'month'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
  /**
   * Variant in terms of priority
   */
  variant?: 'primary' | 'secondary' | 'tertiary'
  /**
   * Label for the input
   */
  label?: string
  /**
   * Whether the input should be rounded
   */
  rounded?: boolean
}

type Validation = [errorCondition: boolean, errorMessage: string]

/**
 * Component for text-formatted-value user input
 */
export const Input = ({
  type = 'text',
  variant = 'primary',
  label,
  rounded = false,
  ...props
}: InputProps) => {
  const {
    className,
    placeholder,
    validations,
    required,
    value,
    ...restProps
  }: {
    className?: string
    placeholder?: string
    validations?: Array<Validation>
    required?: boolean
    label?: string
    value: string
  } = props

  const inputRef = useRef<HTMLInputElement>(null)
  const [id] = useState(uniqueId('input-'))
  const name = props.name || label ? kebabCase(label) : id

  // Handle validation
  useEffect(() => {
    if (inputRef.current && validations && validations.length > 0) {
      // Check if any validation is triggered
      const triggered = (
        [
          [required && value === '', 'Please fill required fields.'],
          ...validations,
        ] as Array<Validation>
      ).find((validation) => validation[0])

      // Set custom validity based on `triggered` validation
      inputRef.current.setCustomValidity(triggered ? triggered[1] : '')
    }
  }, [validations, inputRef, value, required])

  return (
    <div className={cn('mt-2', className)}>
      {label && label !== '' && (
        <label className="text-sm" htmlFor={id}>
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        className={cn(
          'bg-white h-10 w-full appearance-none border px-2 text-base transition-colors focus:outline-none',
          rounded ? 'rounded-full' : 'rounded',
          variant === 'primary' &&
            'border-gray-400 placeholder-gray-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:placeholder-gray-400 focus:ring-gray-100 focus:ring-2 focus:ring-offset-2',
          variant === 'secondary' &&
            'border-gray-400 placeholder-gray-500 focus:border-gray-600 disabled:bg-gray-100 disabled:text-gray-400 disabled:placeholder-gray-400',
          variant === 'tertiary' &&
            'border-gray-400 placeholder-gray-500 focus:border-gray-600 disabled:bg-gray-100 disabled:text-gray-400 disabled:placeholder-gray-400',
        )}
        ref={inputRef}
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        name={name}
        {...restProps}
      />
    </div>
  )
}
