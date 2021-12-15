import { Stack } from '@intouchg/components'

const Section1 = () => {
	return (
		<Stack css={{ padding: '48px', fontSize: '1.5rem' }}>
			<h2>Section 1</h2>
			<p css={{ marginTop: '24px' }}>This section was lazy loaded.</p>
			<p css={{ marginTop: '24px' }}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
				sit amet auctor tellus, ut dapibus massa. Morbi suscipit felis
				non nibh rhoncus porttitor. Morbi non consequat sapien. Sed arcu
				magna, tristique ullamcorper odio vitae, vulputate semper lacus.
				Suspendisse lacinia sapien fringilla bibendum porttitor.
			</p>
		</Stack>
	)
}

export default Section1
