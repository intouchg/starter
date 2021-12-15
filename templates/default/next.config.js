const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

module.exports = (phase) =>
	withBundleAnalyzer({
		webpack: (config, { defaultLoaders }) => {
			config.module.rules.push({
				test: /\.mdx?$/,
				use: [
					defaultLoaders.babel,
					{
						loader: '@mdx-js/loader',
						options: {},
					},
				],
			})

			return config
		},
	})
