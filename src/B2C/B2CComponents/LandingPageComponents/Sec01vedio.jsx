import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';

const VideoSection = () => {

    return (
        <div className="p-8">
            {/* Video Sections */}
            <div className="">
                <section className="relative">
                    <div className="relative max-w-4xl mx-auto">
                        <video
                            className="w-full h-full object-cover rounded-lg shadow-xl"
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