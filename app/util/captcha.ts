import { environment } from "~/environment.server";

export const validateCaptcha = async (token: string): Promise<boolean> => {
  if (environment().NODE_ENV === 'development') {
    console.log('Captcha validation skipped in development mode');
    return true;
  }
  fetch('https://hcaptcha.com/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      secret: environment().HCAPTCHA_SECRET_KEY,
      sitekey: environment().HCAPTCHA_SITE_KEY,
      response: token,
    }),
  })
  .then((res) => res.json())
  .then((json) => {
    if (json.success) {
      return true;
    }
  });
  return false;
}

export const siteKey = environment().HCAPTCHA_SITE_KEY;
