import { generateAuthActions } from 'redux-token-auth'
import { authUrl } from './constants'

const config = {
  authUrl,
  userAttributes: {
    firstName: 'first_name',
    lastName: 'last_name',
    imageUrl: 'image',
    confirmSuccessUrl: "confirm_success_url",
    displayName: "display_name",
    adminPermissions: "admin_permissions",
    name: "name",
    image: "image",
    rebateBalance : "rebate_balance",
    rebateGiven : "rebate_given",
    email: "email",
  },
  userRegistrationAttributes: {
    displayName: 'display_name',
    confirmSuccessUrl: `confirm_success_url`
  },
}


const {
  registerUser,
  signInUser,
  signOutUser,
  verifyToken,
  verifyCredentials,
} = generateAuthActions(config)

export {
  registerUser,
  signInUser,
  signOutUser,
  verifyToken,
  verifyCredentials,
};
