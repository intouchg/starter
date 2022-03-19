const DefaultError = ({ statusCode }) => (
	<div
		css={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			height: '100vh',
		}}
	>
		<h1>Error</h1>
		<span>
			{statusCode
				? `An error ${statusCode} occurred on server`
				: 'An error occurred on client'}
		</span>
	</div>
)

DefaultError.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404
	return { statusCode }
}

export default DefaultError
