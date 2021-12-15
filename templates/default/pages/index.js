import dynamic from 'next/dynamic'
import Hero from '@/content/home/Hero'

// Lazy load Section1
const Section1 = dynamic(() => import('@/content/home/Section1'))

const Home = () => (
	<main>
		<Hero />
		<Section1 />
	</main>
)

export default Home
