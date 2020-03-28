/** @jsx jsx */
import { jsx } from 'theme-ui';
import { alpha } from '@theme-ui/color';

const Form = () => {
  return (
    <aside
      sx={{
        background: t => `
          linear-gradient(160deg, ${t.colors.primary} 0%, ${t.colors.accent} 50%, ${t.colors.teal[1]} 90%)
        `,
        backgroundPositionX: -1,
        backgroundPositionY: -1,
        backgroundSize: 'calc(100% + 2px) calc(100% + 2px)',
        border: `1px solid`,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: alpha('text', 0.25),
        boxSizing: 'initial',
        mt: 5,
        mx: '-5vw',
        px: 2,
        py: 3,
        '@media (min-width: 600px)': {
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderRadius: 3,
          mx: -4,
          px: 3,
        },
      }}
    >
      <form
        action="/api/subscribe"
        method="POST"
        sx={{
          bg: 'background',
          p: [3, 4],
          pb: [3, '24px'],
          border: `1px solid`,
          borderColor: alpha('text', 0.5),
          borderRadius: 2,
          backgroundClip: 'padding-box',
          'label,input': {
            display: 'block',
          },
          label: {
            mt: 2,
          },
          input: {
            border: t => `1px solid ${t.colors.text}`,
            borderRadius: 2,
            fontSize: 2,
            p: 2,
            width: '100%',
          },
        }}
      >
        <h2 sx={{ fontSize: 5, mt: 0 }}>Build better web apps</h2>
        <p>
          I spend a lot of time thinking about how to{' '}
          <strong>
            build web experiences that are fast, secure, maintainable, scalable,
            and fun to build.
          </strong>
        </p>
        <p>
          Join my newsletter and I’ll boop you on the brain what I’ve learned
          about building modern web apps.
        </p>
        <label htmlFor="firstName">First Name</label>
        <input type="text" name="firstName" id="firstName" />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <button
          type="submit"
          sx={{
            background: t => `
              linear-gradient(160deg, ${t.colors.primary} 0%, ${t.colors.accent} 50%, ${t.colors.teal[1]} 90%)
            `,
            border: 'none',
            borderRadius: 2,
            color: 'white',
            fontFamily: 'heading',
            fontSize: 4,
            fontWeight: 800,
            letterSpacing: '-0.05em',
            mt: 3,
            px: 3,
            textShadow: `
              0.03em 0.03em #4F4F4FCC,
              0.03em -0.03em #4F4F4FCC,
              -0.03em 0.03em #4F4F4FCC,
              -0.03em -0.03em #4F4F4FCC
            `,
            textTransform: 'uppercase',
          }}
        >
          Subscribe
        </button>
        <p
          sx={{
            color: 'textLight',
            fontSize: 1,
            mb: 0,
            mt: '24px',
            fontStyle: 'italic',
            textAlign: 'center',
          }}
        >
          <strong sx={{ color: 'text' }}>Privacy notice:</strong> I will never
          sell or share your personal information with anyone (because I’m not a
          jerk). Unsubscribe at any time with one click.
        </p>
      </form>
    </aside>
  );
};

export default Form;
