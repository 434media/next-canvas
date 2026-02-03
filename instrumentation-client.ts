import { initBotId } from 'botid/client/core';

// Define the paths that need bot protection.
// These are the form and newsletter API endpoints that previously used Cloudflare Turnstile.
initBotId({
  protect: [
    {
      // Newsletter subscription endpoint
      path: '/api/newsletter',
      method: 'POST',
    },
    {
      // Christmas RSVP / Computer giveaway registration
      path: '/api/christmas-rsvp',
      method: 'POST',
    },
    {
      // Contact form endpoint
      path: '/api/contact',
      method: 'POST',
    },
    {
      // Event registration (More Human Than Human AI Conference)
      path: '/api/event-registration',
      method: 'POST',
    },
  ],
});
