"use client";
import React, { useState } from 'react';

type VideoType = {
  id: number;
  videoId: string;
  url: string;
  title: string;
  artist: string;
};

function Thumbnail({ video, onClick }: { video: VideoType; onClick: () => void }) {
  const thumbnailUrl = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
  return (
    <img
      src={thumbnailUrl}
      alt={video.title}
      className="w-48 h-32 rounded-lg shadow-lg cursor-pointer"
      onClick={onClick}
    />
  );
}

function Video({ video, onDelete }: { video: VideoType; onDelete: (id: number) => void }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleThumbnailClick = () => {
    setIsPlaying(true);
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg flex">
      <div className="flex-shrink-0">
        {isPlaying ? (
          <iframe
            width="192"
            height="108"
            src={`https://www.youtube.com/embed/${video.videoId}`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <Thumbnail video={video} onClick={handleThumbnailClick} />
        )}
      </div>
      <div className="ml-4 flex-grow">
        <h3 className="text-xl font-bold">{video.title}</h3>
        <p className="text-sm text-gray-600">{video.artist}</p>
        <button className="btn btn-error btn-sm mt-2" onClick={() => onDelete(video.id)}>Delete</button>
      </div>
    </div>
  );
}

function Page() {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [newVideo, setNewVideo] = useState<VideoType>({
    id: 0,
    videoId: '',
    url: '',
    title: '',
    artist: '',
  });

  const extractVideoId = (url: string) => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : '';
  };

  const handleCreate = () => {
    const videoId = extractVideoId(newVideo.url);
    if (videoId) {
      setVideos([...videos, { ...newVideo, id: videos.length + 1, videoId }]);
      setNewVideo({ id: 0, videoId: '', url: '', title: '', artist: '' });
    } else {
      alert('Invalid YouTube URL');
    }
  };

  return (
    <div data-theme="forest" className="flex flex-col items-center min-h-screen bg-base-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Setlist</h1>
      <div className="mb-4 w-full max-w-md flex justify-center space-x-2">
        <input
          type="text"
          placeholder="YouTube Video URL"
          value={newVideo.url}
          onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
          className="input input-bordered mb-2"
        />
        <input
          type="text"
          placeholder="Song Title"
          value={newVideo.title}
          onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
          className="input input-bordered mb-2"
        />
        <input
          type="text"
          placeholder="Artist Name"
          value={newVideo.artist}
          onChange={(e) => setNewVideo({ ...newVideo, artist: e.target.value })}
          className="input input-bordered mb-2"
        />
        <button className="btn btn-secondary" onClick={handleCreate}>Add Video</button>
      </div>
      <div className="grid grid-cols-1 gap-4 mx-auto">
        {videos.map((video) => (
          <Video key={video.id} video={video} onDelete={(id) => setVideos(videos.filter(v => v.id !== id))} />
        ))}
      </div>
    </div>
  );
}

export default Page;