import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm as useReactHookForm,
} from 'react-hook-form';
import { ZodSchema, ZodType } from 'zod';

type UseFormProps<T> = {
  schema: ZodSchema<T>;
  defaultValues: DefaultValues<T>;
  apiRoute: string;
  action?: (data: any) => void;
  config?: RequestInit;
};

export const useForm = <T extends FieldValues>({
  schema,
  defaultValues,
  apiRoute,
  action,
  config = {},
}: UseFormProps<T>) => {
  const form = useReactHookForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = form;
  const [isLoading, setLoading] = useState(false);
  const onChangeHandler = useCallback(
    (name: Path<T>) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(name, event.target.value as any, { shouldValidate: true });
    },
    [setValue]
  );

  const onCheckboxChangeHandler = useCallback(
    (name: Path<T>) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(name, event.target.checked as any, { shouldValidate: true });
    },
    [setValue]
  );

  const onRadioChangeHandler = useCallback(
    (name: Path<T>) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(name, event.target.value as any, { shouldValidate: true });
    },
    [setValue]
  );

  const onSubmitHandler = (onSubmit: SubmitHandler<T>) =>
    handleSubmit(async (data) => {
      setLoading(true);
      try {
        const response = await fetch(apiRoute, {
          method: config.method,
          headers: config.headers,
          body: JSON.stringify(data),
          next: { revalidate: 0 },
        });
        if (action) action(response);
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
      onSubmit(data);
    });

  return {
    register,
    onChangeHandler,
    onCheckboxChangeHandler,
    onRadioChangeHandler,
    onSubmitHandler,
    form,
    errors,
    isLoading,
  };
};
