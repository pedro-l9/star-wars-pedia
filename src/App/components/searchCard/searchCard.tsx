import React from 'react'
import { Controller, SubmitHandler, UseFormRegister, useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'

import './searchCard.css'

const YesNoInput = React.forwardRef<
  HTMLSelectElement,
  { label: string } & ReturnType<UseFormRegister<Inputs>>
>(({ onChange, onBlur, name, label }, ref) => (
  <label className="input-row-container">
    <h3>{label}</h3>
    <select name={name} ref={ref} onChange={onChange} onBlur={onBlur} className="input">
      <option value="false">No</option>
      <option value="true">Yes</option>
    </select>
  </label>
))

YesNoInput.displayName = 'YesNoInput'

export function SearchCard({ setSearch }: { setSearch: (search: Inputs) => void }) {
  const { register, handleSubmit, control, watch } = useForm<Inputs>({
    mode: 'onChange',
    progressive: true,
    defaultValues: {
      maritalStatus: 'single',
      dependents: '',
      debt: '',
      ownsHouse: '',
      ownsCar: '',
      chronicDisease: '',
      carAccident: '',
    },
  })

  const [ownsHouse, ownsCar] = watch(['ownsHouse', 'ownsCar'], {
    ownsHouse: 'false',
    ownsCar: 'false',
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => setSearch(data)

  return (
    <form id="search-card" className="card" onSubmit={handleSubmit(onSubmit)}>
      <h2>Search insurance products</h2>
      <div className="flex">
        <input
          {...register('age', {
            pattern: /[0-9]{1,3}/,
            required: true,
            max: 120,
            min: 18,
            maxLength: 3,
          })}
          type="text"
          id="age-input"
          placeholder={'Age'}
          className="input number-input"
        />
        <Controller
          render={({ field: { onChange, ref, ...field } }) => (
            <NumericFormat
              thousandSeparator=","
              decimalSeparator="."
              prefix="$ "
              decimalScale={2}
              placeholder={'Net yearly income'}
              className="input number-input"
              onValueChange={(v) => onChange(v.value)}
              getInputRef={ref}
              {...field}
              required
            />
          )}
          name={'income'}
          control={control}
        />
        <div className="radio-container">
          <label>
            <input
              {...register('maritalStatus', { required: true })}
              type="radio"
              value="married"
            />
            Married
          </label>
          <label>
            <input
              {...register('maritalStatus', { required: true })}
              type="radio"
              value="single"
              defaultChecked
            />
            Single
          </label>
        </div>
      </div>

      <div className="questions">
        <YesNoInput
          {...register('dependents', { required: true })}
          label="Do you have any dependents?"
        />
        <YesNoInput
          {...register('debt', { required: true })}
          label="Have you incurred in debt before?"
        />
        <YesNoInput {...register('ownsHouse', { required: true })} label="Do you own a house?" />
        {ownsHouse === 'true' && (
          <YesNoInput
            {...register('houseStatus', { required: true })}
            label="Is the house mortgaged?"
          />
        )}
        <YesNoInput {...register('ownsCar', { required: true })} label="Do you own a car?" />
        {ownsCar === 'true' && (
          <label className="input-row-container">
            <h3>Car production year:</h3>
            <input
              {...register('carYear', {
                pattern: /[0-9]{4}/,
                required: true,
                maxLength: 4,
                minLength: 4,
                max: new Date().getFullYear(),
              })}
              id="year-input"
              type="text"
              className="input number-input"
            />
          </label>
        )}
        <YesNoInput
          {...register('chronicDisease', { required: true })}
          label="Do you have any chronic disease?"
        />
        <YesNoInput
          {...register('carAccident', { required: true })}
          label="Have you been in a car accident before?"
        />
      </div>
      <input type="submit" className="button search-btn" />
    </form>
  )
}

export type Inputs = {
  age: number
  income: number
  maritalStatus: 'single' | 'married'
  dependents: string
  debt: string
  ownsHouse: string
  houseStatus?: string
  ownsCar: string
  carYear?: number
  chronicDisease: string
  carAccident: string
}
