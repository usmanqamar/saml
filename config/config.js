require('dotenv').config();
module.exports = {
    name: 'SSO Login Demo',
    passport: {
      strategy: 'saml',
      saml: {
        callbackPath: '/login/callback',
        entryPoint: process.env.SAML_ENTRY_POINT,
        issuer: 'passport-saml',
        cert: process.env.SAML_CERT.replace(/\\n/gm, '\n')
      }
    }
};
