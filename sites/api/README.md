# _Learn With Jason_ API

This API lets you:

- Load lists of LWJ episodes
- Load individual episodes
- Load episode posters
- Load shop products
- Load the schedule
- Load featured episodes
- Load a list of show sponsors
- Load a list of episodes by topic

TODO: document Shopify APIs

## Table of Contents

- Reference:
- Types
    - ProductsSchema
        - ```inlinetype
        - import type { ProductsSchema } from './packages/types/schema');
        - ```
- Endpoints:
    - `/api/v2/episodes`
        - Example request
        - Example response
        - Args: EpisodesArgs
        - Response: Episode[] 
    - `/api/v2/episode`
    - `/api/v2/schedule`
    - `/api/v2/featured`
    - ...****
