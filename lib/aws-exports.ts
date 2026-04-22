export const aws_config = {
  Auth: {
    Cognito: {
      region: process.env.NEXT_PUBLIC_AWS_REGION,
      userPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOL_ID,
      userPoolClientId: process.env.NEXT_PUBLIC_AWS_USER_POOL_CLIENT_ID,
    },
  },
};