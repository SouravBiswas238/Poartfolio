const CLARITY_PROJECT_ID = import.meta.env.VITE_CLARITY_PROJECT_ID as string | undefined;

export const initClarity = () => {
  if (!CLARITY_PROJECT_ID || document.getElementById('ms-clarity-script')) return;

  const script = document.createElement('script');
  script.id = 'ms-clarity-script';
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
  document.head.appendChild(script);
};
