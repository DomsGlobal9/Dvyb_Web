import React, { useEffect, useRef } from 'react';

const VideoSection = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;

        if (video) {
            // Try to play the video
            const playPromise = video.play();

            // Autoplay and mute are needed for autoplay to work
            video.muted = true;
            video.loop = true;

            // Request fullscreen after a slight delay
            setTimeout(() => {
                if (video.requestFullscreen) {
                    video.requestFullscreen().catch(err => {
                        console.error('Fullscreen request failed:', err);
                    });
                }
            }, 500);

            // Handle autoplay errors
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log('Video is playing');
                    })
                    .catch(error => {
                        console.error('Autoplay error:', error);
                    });
            }
        }
    }, []);

    return (
        <div className="">
            <div>
                <section className="relative">
                    <div className="relative max-w-full mx-auto " >
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover rounded-lg shadow-xl"
                            autoPlay
                            muted
                            loop
                        >
                            <source src="https://res.cloudinary.com/doiezptnn/video/upload/v1758891452/WhatsApp_Video_2025-09-26_at_5.21.36_PM_ncpdtg.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default VideoSection;
