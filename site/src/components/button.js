/** @jsx jsx */
import { jsx } from 'theme-ui';

const Button = ({ text = 'Subscribe', href = false, ...props }) => {
  const Component = ({ children, ...rest }) =>
    !href ? (
      <button {...rest}>{children}</button>
    ) : (
      <a href={href} {...rest}>
        {children}
      </a>
    );

  return (
    <Component
      {...props}
      sx={{
        background: (t) => `
          linear-gradient(160deg, ${t.colors.primary} 0%, ${t.colors.accent} 50%, ${t.colors.teal[1]} 90%)
        `,
        border: 'none',
        borderRadius: 2,
        display: 'inline-block',
        fontFamily: 'heading',
        fontSize: 4,
        fontWeight: 800,
        letterSpacing: '-0.05em',
        lineHeight: 1.4,
        mt: 3,
        pb: 1,
        px: 3,
        textDecoration: 'none',
        textShadow: `
          0.03em 0.03em #4F4F4FCC,
          0.03em -0.03em #4F4F4FCC,
          -0.03em 0.03em #4F4F4FCC,
          -0.03em -0.03em #4F4F4FCC
        `,
        textTransform: 'uppercase',
        '&&': {
          color: 'white',
        },
      }}
    >
      {text}
    </Component>
  );
};

export default Button;
