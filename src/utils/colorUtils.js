// Function to generate a random color based on a string (username)
export const generateColorFromString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 60%)`;
};

// Component to render either an avatar image or a colored circle with initials
export const Avatar = ({ user, className = "" }) => {
  if (!user.avatarURL) {
    const backgroundColor = generateColorFromString(user.id);
    const initials = user.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();

    return (
      <div 
        className={`avatar-placeholder ${className}`}
        style={{ 
          backgroundColor,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '16px'
        }}
      >
        {initials}
      </div>
    );
  }

  return <img src={user.avatarURL} alt={`Avatar of ${user.name}`} className={className} />;
}; 