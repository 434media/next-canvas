# Vanita Leo Christmas Chromebook Giveaway - Airtable Setup

This document explains how to set up the Airtable integration for tracking chromebook registrations.

## Airtable Configuration

### 1. Create a New Airtable Base

1. Go to [airtable.com](https://airtable.com) and create a new base
2. Name it "Vanita Leo Christmas Event" or similar

### 2. Create the Chromebook Registrations Table

Create a new table named **"Chromebook Registrations"** with the following fields:

| Field Name | Field Type | Description |
|------------|------------|-------------|
| First Name | Single line text | Required |
| Last Name | Single line text | Required |
| Email | Email | Required, used for duplicate checking |
| Phone | Phone number | Required |
| ZIP Code | Single line text | Required, 5 digits |
| Reason | Long text | Why they need a laptop |
| Status | Single select | Options: "Registered", "Confirmed", "Picked Up" |
| Registration Date | Date and time | Auto-populated by API |

### 3. Get Your Airtable Credentials

#### Get your Base ID:
1. Go to [airtable.com/api](https://airtable.com/api)
2. Select your base
3. The Base ID is in the URL: `https://airtable.com/[BASE_ID]/api/docs`
4. It starts with `app...`

#### Get your API Key:
1. Go to [airtable.com/account](https://airtable.com/account)
2. Click on "Generate API key"
3. Copy your API key (starts with `key...`)

### 4. Environment Variables

Create a `.env.local` file in the root of your project:

```bash
# Airtable Configuration
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
AIRTABLE_API_KEY=keyXXXXXXXXXXXXXX
CHROMEBOOK_TABLE=Chromebook Registrations
```

**Important:** Add `.env.local` to your `.gitignore` file to keep credentials secret!

## Features

### Inventory Tracking
- **Total Chromebooks:** 50
- The system automatically tracks how many chromebooks have been registered
- Once 50 registrations are reached, the form automatically closes
- Real-time inventory counter shows remaining chromebooks

### Duplicate Prevention
- Email addresses are checked against existing registrations
- Users cannot register twice with the same email

### API Endpoints

#### Check Inventory
```http
GET /api/christmas-rsvp?action=check
```

Response:
```json
{
  "available": 45,
  "registered": 5,
  "total": 50
}
```

#### Register for Chromebook
```http
POST /api/christmas-rsvp
Content-Type: application/json

{
  "firstName": "Maria",
  "lastName": "Garcia",
  "email": "maria@example.com",
  "phone": "(210) 555-0123",
  "zipCode": "78201",
  "reason": "I need a laptop for my online classes..."
}
```

Success Response:
```json
{
  "message": "Registration successful",
  "available": 44
}
```

Error Response:
```json
{
  "error": "This email has already been registered"
}
```

or

```json
{
  "error": "Sorry, all Chromebooks have been claimed",
  "available": 0
}
```

## Viewing Registrations

1. Log into your Airtable account
2. Open the base
3. View the "Chromebook Registrations" table
4. You can:
   - Filter by Status
   - Sort by Registration Date
   - Export to CSV
   - Update Status (Registered → Confirmed → Picked Up)
   - Add notes to records

## Testing

Before going live:

1. Test with a few registrations to ensure data is saved correctly
2. Check that the inventory counter updates properly
3. Test duplicate email prevention
4. Test the "sold out" state when reaching 50 registrations

## Troubleshooting

### "Server configuration error"
- Check that `AIRTABLE_BASE_ID` and `AIRTABLE_API_KEY` are set in `.env.local`
- Restart your development server after adding environment variables

### Form submissions not appearing in Airtable
- Verify the table name matches `CHROMEBOOK_TABLE` in `.env.local`
- Check that all field names match exactly (case-sensitive)
- Check the browser console and server logs for errors

### Inventory count is wrong
- The count is based on the number of records in the table
- If you delete test records, the count will update automatically
- Make sure you're only counting records in the correct table

## Event Day

On December 19th:

1. Update registration Status to "Confirmed" when verified
2. Update Status to "Picked Up" when chromebook is distributed
3. This helps track which chromebooks were actually distributed

## Support

For technical issues, check:
- Browser console for client-side errors
- Server logs for API errors
- Airtable API status at [status.airtable.com](https://status.airtable.com)
