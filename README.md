# PodderFodder - a podcast fetching application
This project is a web application and platform that can be used to find, index, and retreive podcasts and episodes from RSS feeds.

The concept is simple: one can either take a link to a known RSS feed or use an integrated search to query Apple's Podcasts API, add said feed into the database, then retreive the podcast and its associated episodes. Podcasts can be fetched as one or all, and episodes can be fetched as all, for a specific podcast, or a single episode. Also, the core API is designed to handle updating the database from the podcast's feed URL (stored in the database), deleting a single podcast, or deleteing a single episode.

The tech stack for this project includes MongoDB, Express.js, React.js and Node.js, with some additional functionality provided by socket.io and Booststrap CSS.
