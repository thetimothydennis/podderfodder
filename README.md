# PodderFodder - a podcast fetching application
This project is a web application and platform that can be used to find, index, and retrieve podcasts and episodes from RSS feeds.

The concept is simple: one can either take a link to a known RSS feed or use an integrated search to query Apple's Podcasts API, add said feed into the database, then retrieve the podcast and its associated episodes. Podcasts can be fetched as one or all, and episodes can be fetched as all, for a specific podcast, or a single episode. Also, the core API is designed to handle updating the database from the podcast's feed URL (stored in the database), deleting a single podcast, or deleting a single episode.
