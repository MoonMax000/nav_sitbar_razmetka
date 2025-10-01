const SuggestionCard = () => (
  <div className="container-card p-6">
    <h3 className="text-lg font-semibold text-white">Suggestions</h3>
    <div className="mt-4 space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary/20"></div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">User {i}</p>
            <p className="text-xs text-webGray">@user{i}</p>
          </div>
          <button className="rounded-lg bg-primary px-3 py-1 text-xs font-semibold text-white">
            Follow
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default SuggestionCard;
