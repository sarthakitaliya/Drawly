export default function TrustStats() {
  return (
    <div className="mt-8 flex items-center gap-6">
      <div className="flex -space-x-2">
        <img
          alt="User avatar"
          className="h-8 w-8 rounded-full ring-2 ring-zinc-900 object-cover"
          src="https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=facearea&facepad=2&w=64&h=64&q=80"
        />
        <img
          alt="User avatar"
          className="h-8 w-8 rounded-full ring-2 ring-zinc-900 object-cover"
          src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=facearea&facepad=2&w=64&h=64&q=80"
        />
        <img
          alt="User avatar"
          className="h-8 w-8 rounded-full ring-2 ring-zinc-900 object-cover"
          src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=facearea&facepad=3&w=64&h=64&q=80"
        />
        <img
          alt="User avatar"
          className="h-8 w-8 rounded-full ring-2 ring-zinc-900 object-cover"
          src="https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=facearea&facepad=2&w=64&h=64&q=80"
        />
      </div>
      <div className="text-sm text-zinc-300/90">
        <span className="font-medium">2,400+</span> teams sketching daily
      </div>
    </div>
  );
}
