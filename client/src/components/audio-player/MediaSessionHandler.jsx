import { useEffect } from 'react';

export const useMediaSession = (metadata, controls) => {
  const { play, pause, seek, next, prev, duration, currentTime } = controls;

  useEffect(() => {
    if (typeof navigator === "undefined" || !("mediaSession" in navigator)) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: metadata.title,
      artist: metadata.artist ?? '',
      album: metadata.album ?? '',
      artwork: metadata.artwork ?? [],
    });

    navigator.mediaSession.setActionHandler('play', play);
    navigator.mediaSession.setActionHandler('pause', pause);
    navigator.mediaSession.setActionHandler('nexttrack', next);
    navigator.mediaSession.setActionHandler('previoustrack', prev);
    navigator.mediaSession.setActionHandler('seekto', (d) => {
      if (d.seekTime != null) seek(d.seekTime);
    });
    
    // Optional: Update position state for progress bars
    navigator.mediaSession.setPositionState?.({ 
      duration, 
      playbackRate: 1, 
      position: currentTime 
    });

    return () => {
      // Cleanup handlers on unmount if necessary
    };
  }, [metadata, controls]);
};   