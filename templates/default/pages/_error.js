import { Stack } from '@intouchg/components'

const DefaultError = ({ statusCode }) => (
	<Stack
		css={{
			height: '100vh',
			alignItems: 'center',
			justifyContent: 'center',
		}}
	>
		<h1>Error</h1>
		<span>
			{statusCode
				? `An error ${statusCode} occurred on server`
				: 'An error occurred on client'}
		</span>
	</Stack>
)

DefaultError.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404
	return { statusCode }
}

export default DefaultError
