import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import MouseFollower from 'mouse-follower'
import WK1 from '../../../images/primera.mp4'
import WK2 from '../../../vids/munkeyTrailer.mp4'
import beats from '../../../images/beats-ad.mp4'
import primeraSC from '../../../images/primera-sc.png'
import munkeyTrailer from '../../../images/MunkeyPic.png'
import './Work.scss'

MouseFollower.registerGSAP(gsap)
gsap.registerPlugin(ScrollTrigger)


export default function Work() {
	const workRef = useRef(null);
	const munkey = useRef(null);
	const primera = useRef(null);
	const beats = useRef(null);
	const heading = useRef(null);

	function handleMouseEnter(event) {
		//play video
		const video = event.target.children[1];
		if (video ? video.classList.contains('video') : false) video.play();

		//animation
		const text = event.target.children[2]?.children[0];
		if (text) {
			gsap.killTweensOf(text);
			gsap.fromTo(
				text,
				{ rotation: 10, opacity: 0, y: () => text.clientHeight * 0.5 },
				{ rotation: 0, y: 0, opacity: 1, duration: 0.7, ease: 'power4.easeOut' }
			);
		}
	}

	function handleMouseLeave(event) {
		//pause video
		const video = event.target.children[1];
		if (video ? video.classList.contains('video') : false) video.pause();

		//animation
		const text = event.target.children[2]?.children[0];
		if (text) {
			gsap.killTweensOf(text);
			gsap.fromTo(
				text,
				{ rotation: 0, opacity: 1, y: 0 },
				{
					rotation: -10,
					y: -text.clientHeight,
					opacity: 0,
					duration: 0.5,
					ease: 'power4.easeOut',
				}
			);
		}
	}

	useEffect(() => {
		if (workRef.current) {
			// cursor anims
			const cursor = new MouseFollower({
				stateDetection: {
					'-pointer': 'a, button',
				},
			});
			// primera
			gsap.fromTo(
				primera.current,
				{ y: -20 },
				{ y: 120, scrollTrigger: { trigger: primera.current, scrub: true } }
			)
			//munkey
			gsap.fromTo(
				munkey.current,
				{ y: -100 },
				{ y: 110, scrollTrigger: { trigger: munkey.current, scrub: true } }
			);

			//beats
			gsap.fromTo(
				beats.current,
				{ y: 0 },
				{ y: -120, scrollTrigger: { trigger: beats.current, scrub: true } }
			);

			//heading scroll trigger opening
			gsap.fromTo(
				heading.current,
				{
					rotation: 6,
					opacity: 0,
					y: () => heading.current.clientHeight * 0.5,
				},
				{
					rotation: 0,
					y: 0,
					opacity: 1,
					duration: 0.7,
					ease: 'power4.easeOut',
					scrollTrigger: { trigger: heading.current, start: 'center bottom' },
				}
			);
		}
	}, [workRef.current]);

	return (
		<section className='column content-width' ref={workRef} id='work-section'>
			<div className='anim'>
				<h1 ref={heading}>creations</h1>
			</div>
			<div className='row'>
				<div
					id='block-0'
					ref={primera}
					data-cursor-text='Primera!'
					className='block'
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}>
					<img src={primeraSC} height='3113' alt='Project 1' loading='lazy' />
					<video
						playsInline=''
						loop='loop'
						muted='muted'
						disablePictureInPicture=''
						className='video' 
						src={WK1} type='video/mp4' />
					<div className='text-wrapper'>
						<p>
							<span>
								<strong>Under Development</strong>
							</span>
							<span> Currently Unavailable</span>
						</p>
					</div>
				</div>
				<div className='column' id='work-right-section'>
					<div className='row'>
						<svg
							viewBox='0 0 12 12'
							fill='#1D2C27'
							xmlns='http://www.w3.org/2000/svg'
							className='icon'
							data-v-669b4a84=''>
							<path d='M7.41908 4.56679L6.13722 0L4.85418 4.92566L0 6L4.85418 7.25435L6.13722 12L7.3276 7.25435L12 6L7.41908 4.56679Z'></path>
						</svg>
						<span>Featured Projects</span>
					</div>
					<p className='quote'>
						<br />
						my works (currently ongoing...)
					</p>
					<div
						id='block-1'
						data-cursor-text='Try it!'
						className='block'
						ref={munkey}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}>
						<img
							src={munkeyTrailer}
							alt={'picture of dude being cash money'}
							className='munkeyTrailer'
						/>
						<video
							playsInline=''
							loop='loop'
							muted='muted'
							disablePictureInPicture=''
							className='video' 
							src={WK2} type='video/mp4' />
						<div className='text-wrapper'>
							<p>
								<span>
									<strong>Munkey AI </strong>
								</span>
								<span>ChatGPT Remake</span>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className='row'>
				<div
					id='block-2'
					className='block'
					ref={beats}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}>
					<img
						src='https://images.unsplash.com/photo-1627697823116-42877786ac26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
						className='beats-pic'
						alt={'dude is being extremely cash money'}
					/>
					<video
						playsInline
						loop
						muted
						disablePictureInPicture
						className='video'
						src={beats}
						type='video/mp4' />
					<div className='text-wrapper'>
						<p>
							<span>
								<strong>Coming Soon </strong>
							</span>
							<span>eCommerce store</span>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
