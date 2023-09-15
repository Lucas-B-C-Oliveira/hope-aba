import { ColorRing } from 'react-loader-spinner'

interface Props {
  colors?: [string, string, string, string, string]
  visible?: boolean
  height?: string
  width?: string
  ariaLabel?: string
  wrapperStyle?: any
  wrapperClass?: string
}

export function SpinnerLoading({
  visible = true,
  height = '24',
  width = '24',
  ariaLabel = 'blocks-loading',
  wrapperStyle = {},
  wrapperClass = 'blocks-wrapper',
  colors = ['#f29849', '#bf6dd5', '#db6f91', '#f5a73c', '#fbbc30'],
}: Props) {
  return (
    <ColorRing
      visible={visible}
      height={height}
      width={width}
      ariaLabel={ariaLabel}
      wrapperStyle={wrapperStyle}
      wrapperClass={wrapperClass}
      colors={colors}
    />
  )
}
