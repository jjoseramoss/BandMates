"use client";
import React, { useState } from 'react';

type VideoType = {
  id: number;
  videoId: string;
  url: string;
  title: string;
  artist: string;
};

type SetlistType = {
  id: number;
  name: string;
  videos: VideoType[];
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

  const [setlists, setSetlists] = useState<SetlistType[]>([]);
  const [newSetlistName, setNewSetlistName] = useState('');
  const [selectedSetlist, setSelectedSetlist] = useState<SetlistType | null>(null);

  const extractVideoId = (url: string) => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : '';
  };

  const handleCreateVideo = () => {
    if (!selectedSetlist) return;
    const videoId = extractVideoId(newVideo.url);
    if (videoId) {
      const updatedSetlists = setlists.map(setlist =>
        setlist.id === selectedSetlist.id
          ? { ...setlist, videos: [...setlist.videos, { ...newVideo, id: setlist.videos.length + 1, videoId }] }
          : setlist
      );
      setSetlists(updatedSetlists);
      setSelectedSetlist({
        ...selectedSetlist,
        videos: [...selectedSetlist.videos, { ...newVideo, id: selectedSetlist.videos.length + 1, videoId }]
      });
      setNewVideo({ id: 0, videoId: '', url: '', title: '', artist: '' });
    } else {
      alert('Invalid YouTube URL');
    }
  };

  const handleCreateSetlist = () => {
    if (newSetlistName.trim() !== '') {
      const newSetlist = { id: setlists.length + 1, name: newSetlistName, videos: [] };
      setSetlists([...setlists, newSetlist]);
      setNewSetlistName('');
      setSelectedSetlist(newSetlist);
    } else {
      alert('Setlist name cannot be empty');
    }
  };

  const handleSelectSetlist = (setlist: SetlistType) => {
    setSelectedSetlist(setlist);
    setVideos(setlist.videos);
  };

  return (
    <div data-theme="forest" className="flex flex-col items-center min-h-screen bg-base-100 p-4">
      <header className="w-full">
        <div className="navbar bg-base-100 justify-between w-full">
          <div className="flex items-center">
            <label htmlFor="my-drawer" className="btn btn-secondary drawer-button">
              <img src="/hamburger.png" alt="Menu Icon" className="w-6 h-6" />
            </label>
          </div>
          <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><a href='/'>Home</a></li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li><a>Link 1</a></li>
                  <li><a>Link 2</a></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        </div>
      </header>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <input
                type="text"
                placeholder="New Setlist Name"
                value={newSetlistName}
                onChange={(e) => setNewSetlistName(e.target.value)}
                className="input input-bordered mb-2"
              />
              <button className="btn btn-secondary mb-4" onClick={handleCreateSetlist}>Create Setlist</button>
            </li>
            {setlists.map((setlist) => (
              <li key={setlist.id}>
                <a onClick={() => handleSelectSetlist(setlist)}>{setlist.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-4 text-center">{selectedSetlist ? selectedSetlist.name : 'Setlist'}</h1>
      {selectedSetlist && (
        <>
          <div className="mb-4 w-full max-w-md flex justify-center space-x-2">
            <input
              type="text"
              placeholder="YouTube Video URL"
              value={newVideo.url}
              onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
              className="input input-bordered mb-2 w-1/3"
            />
            <input
              type="text"
              placeholder="Song Title"
              value={newVideo.title}
              onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
              className="input input-bordered mb-2 w-1/3"
            />
            <input
              type="text"
              placeholder="Artist Name"
              value={newVideo.artist}
              onChange={(e) => setNewVideo({ ...newVideo, artist: e.target.value })}
              className="input input-bordered mb-2 w-1/3"
            />
          </div>
          <button className="btn btn-primary mb-4" onClick={handleCreateVideo}>Add Video</button>
          <div className="grid grid-cols-1 gap-4 w-full max-w-md">
            {selectedSetlist.videos.map((video) => (
              <Video key={video.id} video={video} onDelete={(id) => {
                const updatedSetlists = setlists.map(setlist =>
                  setlist.id === selectedSetlist.id
                    ? { ...setlist, videos: setlist.videos.filter(v => v.id !== id) }
                    : setlist
                );
                setSetlists(updatedSetlists);
                setSelectedSetlist({ ...selectedSetlist, videos: selectedSetlist.videos.filter(v => v.id !== id) });
              }} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Page;