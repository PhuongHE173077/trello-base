export const verifyForm = (webName, webUrl) => {
  return `<div style="font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 5px; padding: 20px; max-width: 400px; margin: auto; text-align: center;">
      <h1 style="font-size: 20px; font-weight: normal; margin-bottom: 10px;">
    <span style="font-weight: bold; color: #24292e;">${webName}</span> verify email
  </h1>
  <p style="font-size: 14px; color: #333; margin-bottom: 20px;">
    We crate new account in <span style="font-weight: bold; color: #24292e;">${webName}</span> web. Welcome to us!
  </p>
  <p style="font-size: 14px; color: #333; margin-bottom: 20px;">
    Please click here to confirm that the registration email is yours. :
  </p>
  <a href=${webUrl} style="display: inline-block; background-color: #28a745; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-size: 14px; font-weight: bold;">Reset your password</a>
  <p style="font-size: 12px; color: #666; margin-top: 20px;">
    If you don’t use this link within 3 hours, it will expire. 
  </p>
  <p style="font-size: 14px; color: #333; margin-top: 20px;">
    Thanks,<br>The <span style="font-weight: bold; color: #24292e;">${webName}</span> Team
  </p>
</div>
`
}