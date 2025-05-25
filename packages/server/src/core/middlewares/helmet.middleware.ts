import helmet from 'helmet';

export const helmetMiddleware = () =>
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"], // only allow resources from the same origin.
        objectSrc: ["'none'"], // disallow embedding of objects (e.g., <object>, <embed>, <applet>).
        scriptSrc: ["'self'"], // only allow scripts from the same origin.
        upgradeInsecureRequests: [], // automatically upgrade HTTP requests to HTTPS.
      },
    },
    crossOriginOpenerPolicy: { policy: 'same-origin' }, // ensures that your document is not shared with cross-origin documents.
    crossOriginResourcePolicy: { policy: 'same-origin' }, // prevents other origins from accessing your resources.
    dnsPrefetchControl: { allow: false }, // disables DNS prefetching to prevent DNS leaks.
    frameguard: { action: 'deny' }, // prevents your site from being framed to protect against clickjacking.
    originAgentCluster: true, // enables origin-based isolation for better security.
    permittedCrossDomainPolicies: { permittedPolicies: 'none' }, // blocks Adobe Flash and Acrobat from loading content from your site.
    referrerPolicy: { policy: 'no-referrer' }, // no referrer information is sent along with requests.
    strictTransportSecurity: {
      includeSubDomains: true, // enforces HSTS for all subdomains.
      maxAge: 63072000, // 2 years in seconds. Instructs browsers to only use HTTPS.
    },
    xContentTypeOptions: true, // prevents browsers from MIME-sniffing a response away from the declared content-type.
  });
