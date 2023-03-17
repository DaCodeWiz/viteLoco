/** @format */

import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import Lenis from '@studio-freight/lenis';
import Loading from './LoadingScreen/Loading';
import MouseFollower from 'mouse-follower';
import '../styles/index.scss';

MouseFollower.registerGSAP(gsap);
const HomeLazy = React.lazy(() => import('./Home/Home'));

export default function App() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const cursor = new MouseFollower();
		const lenis = new Lenis({
			lerp: 0.08,
		});

		lenis.on('lenis-scroll');

		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		// Simulate a delay of 4.7 seconds before setting the isLoading state to false
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 4300);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className='center column'>
			{isLoading && <Loading />}
			<React.Suspense fallback={<Loading />}>
				<HomeLazy onLoad={() => setIsLoading(false)} />
			</React.Suspense>
		</div>
	);
}
