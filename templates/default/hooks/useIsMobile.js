import { useMediaQuery } from '@intouchg/hooks'
import { media } from '@intouchg/components'

export const useIsMobile = () => !useMediaQuery(media.lg.match(/\(.*\)/)[0])
