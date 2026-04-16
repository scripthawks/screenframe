import { useState } from 'react'

import { SelectBox } from '@/shared'
import { FlagRussia, FlagUnitedKingdom } from '@/shared/assets/icons'
import { Meta, StoryObj } from '@storybook/nextjs-vite'

import s from './SelectBox.module.scss'

const meta = {
  component: SelectBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/SelectBox',
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
        className={s.testDesktopWidth}
        label={'Select-Box'}
        onChange={setValue}
        options={defaultOptions}
        value={value}
        variant={'desktop'}
      />
    )
  },
}

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState(defaultOptions[0].value)

    return (
      <SelectBox
        className={s.testDesktopWidth}
        disabled
        label={'Select-Box'}
        onChange={setValue}
        options={defaultOptions}
        value={value}
        variant={'desktop'}
      />
    )
  },
}

const flagOptions = [
  { image: <FlagRussia />, label: 'Russian', value: 'ru' },
  { image: <FlagUnitedKingdom />, label: 'English', value: 'en' },
]

export const Languages: Story = {
  render: () => {
    const [value, setValue] = useState(flagOptions[0].value)

    return (
      <SelectBox
        className={s.testLangWidth}
        onChange={setValue}
        options={flagOptions}
        value={value}
        variant={'desktop'}
      />
    )
  },
}

export const LanguagesMobile: Story = {
  render: () => {
    const [value, setValue] = useState(flagOptions[0].value)

    return (
      <SelectBox
        className={s.mobileLang}
        isMobile
        onChange={setValue}
        options={flagOptions}
        value={value}
        variant={'mobileLang'}
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
        isMobile
        onChange={setValue}
        options={paginationOptions}
        value={value}
        variant={'pagination'}
      />
    )
  },
}
