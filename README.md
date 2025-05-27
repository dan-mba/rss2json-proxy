Convert RSS to JSON
=================

This server converts the RSS feed input using the 'rss' query parameter to JSON.
It also works as a proxy by setting CORS for All Access.

This was written as a fastify server application, but due to hosting issues was converted to a serverless function.
The original code is found in the fastify directory.
The current implementation is in the api directory.
