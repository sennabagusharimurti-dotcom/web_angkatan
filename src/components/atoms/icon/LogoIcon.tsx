import Image, { type ImageProps } from 'next/image'

type LogoIconProps = Omit<ImageProps, 'src' | 'alt'> & {
  alt?: string
}

const LogoIcon = ({ alt = 'Evastra Logo', ...props }: LogoIconProps) => {
  return <Image src="/assets/images/logo/icon.svg" alt={alt} width={96} height={105} {...props} />
}

export default LogoIcon
