import React, { useState, useEffect } from 'react';

function LastPublished() {
  const [buildTime, setBuildTime] = useState(null);

  useEffect(() => {
    // This will be replaced with the actual build time during the build process
    const timestamp = process.env.REACT_APP_BUILD_TIME || new Date().toISOString();
    const date = new Date(timestamp);
    
    // Format the date
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'UTC'
    }).format(date);

    setBuildTime(formattedDate);
  }, []);

  if (!buildTime) return null;

  return (
    <div className="text-text-tertiary text-sm mb-16">
      Still working on this website. Last updated: {buildTime}
    </div>
  );
}

export default LastPublished;