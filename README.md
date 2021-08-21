# About Me

A simple application to update your status and info at one place and use endpoints to get images and JSON for it to use everywhere.

## Endpoints

The app has specific endpoints for each part of your profile. To update your profile, head over to https://statusupdate.vercel.app/ and login with your Google or GitHub Account (Going to add more services soon), update your status and information in the profile section.

### Get Status

- As JSON Payload: `https://statusupdate.vercel.app/api/getStatus.json?identifer=<email>`

```json
{
	"identifier": "devesh2027@gmail.com",
	"isStatusPresent": true,
	"status": "Lunch",
	"statusEmoji": "🍕",
	"statusColor": "#f36421"
}
```

- As Image: `https://statusupdate.vercel.app/api/getStatus.svg?identifer=<email>`

Example: ![Example Status](./public/samplestatus.svg)

### Get Profile Picture

- As JSON Payload: `https://statusupdate.vercel.app/api/getPicture.json?identifer=<email>`

```json
{
    "hasPhoto": true,
	"picture": "https://lh3.googleusercontent.com/a-/AOh14GjxW6Y507PAjA7HFZAi151o5jO5mPPt7D_6sb7K3Dw=s96-c",
	"message": "Success"
}
```

- As Image: `https://statusupdate.vercel.app/api/getPicture.png?identifer=<email>`

### Issues

For any issues you face with the service, simply raise an issue on the repository.
