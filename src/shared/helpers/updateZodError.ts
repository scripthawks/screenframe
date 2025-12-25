import { FieldValues, Path, UseFormTrigger } from 'react-hook-form'

export const triggerZodFieldError = <TFieldValues extends FieldValues>(
  touchedFieldNames: Path<TFieldValues>[],
  trigger: UseFormTrigger<TFieldValues>
) => {
  if (touchedFieldNames.length > 0) {
    touchedFieldNames.forEach(fieldName => {
      void trigger(fieldName)
    })
  }
}
