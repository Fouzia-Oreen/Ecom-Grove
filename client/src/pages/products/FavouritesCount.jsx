import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  return (
    <div className="absolute right-[2px] bottom-[6px]">
      {favoriteCount > 0 && (
        <sup className=" bg-color_3 size-4 rounded-full flex items-center justify-center text-xs font-bold text-color_6">
          {favoriteCount}
        </sup>
      )}
    </div>
  );
};

export default FavoritesCount;