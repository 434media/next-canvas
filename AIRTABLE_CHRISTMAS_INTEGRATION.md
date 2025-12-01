# Airtable Integration for Christmas RSVP

This guide explains how to set up the Airtable integration for the Christmas Event RSVP form.

## Prerequisites

- An Airtable account
- Access to the Airtable Base used for this project
- The `AIRTABLE_API_KEY` and `MXR_AIRTABLE_BASE_ID` environment variables must be set in your `.env` file (or Vercel project settings).

## Setup Steps

### 1. Create the Table

1.  Log in to Airtable and open your Base (named **"mxratmain"**).
2.  Create a new table named **"rsvp"**.
3.  Configure the following columns (fields):

| Field Name      | Field Type       | Notes                                      |
| :-------------- | :--------------- | :----------------------------------------- |
| **Name**        | Single line text | The guest's full name                      |
| **Email**       | Email            | The guest's email address                  |
| **Join The Feed**| Checkbox         | Whether they want to join the newsletter   |
| **Status**      | Single select    | Options: "RSVP'd", "Waitlist", "Cancelled" |
| **Created**     | Created time     | Automatically tracks when the record was added |

### 2. Configure Environment Variables

Add the following environment variable to your `.env.local` file and your deployment platform (e.g., Vercel):

```env
MXR_AIRTABLE_BASE_ID="your_mxr_base_id_here"
CHRISTMAS_RSVP_TABLE="rsvp"
```

*Note: If you named your table differently, update the value above to match exactly.*

### 3. Verify API Access

Ensure your `AIRTABLE_API_KEY` has permissions to **create records** in this Base. If you are using a Personal Access Token (recommended), make sure the scope `data.records:write` is enabled for this Base.

## Testing

1.  Run the development server: `npm run dev`
2.  Navigate to `/events/christmas`
3.  Click "RSVP Now"
4.  Fill out the form and submit.
5.  Check your Airtable table to see the new record.

## Troubleshooting

-   **"Airtable configuration is missing"**: Check that `AIRTABLE_API_KEY` and `MXR_AIRTABLE_BASE_ID` are set.
-   **"Turnstile verification failed"**: Ensure `TURNSTILE_SECRET_KEY` is set in your environment variables and `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set in your public environment variables.
-   **"An error occurred..."**: Check the server logs for detailed error messages from Airtable. Common issues include mismatched field names (case-sensitive).
