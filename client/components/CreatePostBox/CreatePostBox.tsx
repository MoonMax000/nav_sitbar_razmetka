const CreatePostBox = () => (
  <div className="container-card p-6">
    <textarea
      className="w-full resize-none rounded-lg border border-onyxGrey bg-transparent p-3 text-white placeholder:text-webGray focus:border-primary focus:outline-none"
      rows={3}
      placeholder="What's on your mind?"
    />
    <div className="mt-3 flex justify-end">
      <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90">
        Post
      </button>
    </div>
  </div>
);

export default CreatePostBox;
