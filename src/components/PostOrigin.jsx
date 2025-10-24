import PropTypes from "prop-types";

const PostOrigin = ({ origin }) => {
  return (
    <div className="flex items-center">
      {origin.country !== "unknown" ? (
        <>
          <p className="text-sm text-gray-500">From {origin.country}</p>
          <img
            className="h-4 rounded-sm ml-2"
            src={`https://flagcdn.com/h20/${origin.countryCode}.png`}
            alt={`Flag of ${origin.country}`}
          />
        </>
      ) : (
        <p className="text-sm text-gray-500">From: Unknown</p>
      )}
    </div>
  );
};

PostOrigin.propTypes = {
  origin: PropTypes.shape({
    country: PropTypes.string.isRequired,
    countryCode: PropTypes.string,
  }).isRequired,
};

export default PostOrigin;
