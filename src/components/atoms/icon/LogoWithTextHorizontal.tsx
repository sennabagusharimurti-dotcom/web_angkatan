import Image, { type ImageProps } from 'next/image'

type LogoWithTextHorizontalProps = Omit<ImageProps, 'src' | 'alt'> & {
  alt?: string
}

const LogoWithTextHorizontal = ({ alt = 'Evastra Logo', ...props }: LogoWithTextHorizontalProps) => {
  return <Image src="/assets/images/logo/icon-with-text-horizontal.svg" alt={alt} width={186} height={30} {...props} />
}

export default LogoWithTextHorizontal
