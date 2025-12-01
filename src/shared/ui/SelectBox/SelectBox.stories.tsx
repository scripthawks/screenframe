import type { Meta, StoryObj } from '@storybook/react'
import { SelectBox } from '@/shared/ui'
import styles from './selectBox.module.scss'
import { FlagRussia, FlagUnitedKingdom } from '@/shared/assets/icons'
import { useState } from 'react'

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
  { value: 'Select-box1' },
  { value: 'Select-box2' },
  { value: 'Select-box3' },
  { value: 'Select-box4' },
  { value: 'Select-box5' },
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
        className={styles.testDesktopWidth}
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
        disabled={true}
        onChange={setValue}
        variant={'desktop'}
        label={'Select-Box'}
        className={styles.testDesktopWidth}
      />
    )
  },
}

const flagOptions = [
  { value: 'Russian', icon: <FlagRussia /> },
  { value: 'UK', icon: <FlagUnitedKingdom /> },
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
        className={styles.testLangWidth}
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
        className={styles.mobileLang}
        isMobile={true}
      />
    )
  },
}

const paginationOptions = [{ value: '10' }, { value: '100' }, { value: '1000' }, { value: '10000' }]

export const Pagination: Story = {
  render: () => {
    const [value, setValue] = useState(paginationOptions[0].value)
    return (
      <SelectBox
        options={paginationOptions}
        value={value}
        onChange={setValue}
        variant={'pagination'}
        isMobile={true}
      />
    )
  },
}
