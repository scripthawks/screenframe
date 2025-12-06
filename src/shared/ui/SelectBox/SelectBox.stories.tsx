import { useState } from 'react'

import { SelectBox } from '@/shared'
import { FlagRussia, FlagUnitedKingdom } from '@/shared/assets/icons'
import { Meta, StoryObj } from '@storybook/nextjs-vite'

import s from './SelectBox.module.scss'

const meta = {
  title: 'Components/SelectBox',
  component: SelectBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SelectBox>

export default meta

type Story = StoryObj<typeof SelectBox>

const defaultOptions = [
  { label: 'Select-box1', value: 'Select-box1' },
  { label: 'Select-box2', value: 'Select-box2' },
  { label: 'Select-box3', value: 'Select-box3' },
  { label: 'Select-box4', value: 'Select-box4' },
  { label: 'Select-box5', value: 'Select-box5' },
]

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(defaultOptions[0].value)

    return (
      <SelectBox
        options={defaultOptions}
        value={value}
        onChange={setValue}
        variant={'desktop'}
        label={'Select-Box'}
        className={s.testDesktopWidth}
      />
    )
  },
}

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState(defaultOptions[0].value)

    return (
      <SelectBox
        options={defaultOptions}
        value={value}
        disabled
        onChange={setValue}
        variant={'desktop'}
        label={'Select-Box'}
        className={s.testDesktopWidth}
      />
    )
  },
}

const flagOptions = [
  { label: 'Russian', image: <FlagRussia />, value: 'ru' },
  { label: 'English', image: <FlagUnitedKingdom />, value: 'en' },
]

export const Languages: Story = {
  render: () => {
    const [value, setValue] = useState(flagOptions[0].value)

    return (
      <SelectBox
        options={flagOptions}
        value={value}
        onChange={setValue}
        variant={'desktop'}
        className={s.testLangWidth}
      />
    )
  },
}

export const LanguagesMobile: Story = {
  render: () => {
    const [value, setValue] = useState(flagOptions[0].value)

    return (
      <SelectBox
        options={flagOptions}
        value={value}
        onChange={setValue}
        variant={'mobileLang'}
        className={s.mobileLang}
        isMobile
      />
    )
  },
}

const paginationOptions = [
  { label: '10', value: '10' },
  { label: '100', value: '100' },
  { label: '1000', value: '1000' },
  { label: '10000', value: '10000' },
]

export const Pagination: Story = {
  render: () => {
    const [value, setValue] = useState(paginationOptions[0].value)

    return (
      <SelectBox
        options={paginationOptions}
        value={value}
        onChange={setValue}
        variant={'pagination'}
        isMobile
      />
    )
  },
}
