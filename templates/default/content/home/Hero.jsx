import { Stack } from '@intouchg/components'
import { useIsMobile } from '@/hooks/useIsMobile'

const Hero = () => {
	const isMobile = useIsMobile()

	return (
		<Stack
			css={{
				width: '100%',
				height: '50vh',
				alignItems: 'center',
				justifyContent: 'center',
				fontSize: '2rem',
			}}
		>
			<span css={{ padding: '64px' }}>
				You are browsing on{' '}
				<span css={{ fontWeight: '900' }}>
					{isMobile ? 'mobile' : 'desktop'}
				</span>
			</span>
		</Stack>
	)
}

export default Hero
