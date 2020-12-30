import { h, Fragment } from 'preact';

export function OptInForm({ heading = 'Build better web apps', children }) {
  return (
    <aside class="opt-in">
      <form action="/api/subscribe" method="POST">
        {!children ? (
          <Fragment>
            <h2>{heading}</h2>
            <p>
              I spend a lot of time thinking about how to{' '}
              <strong>
                build web experiences that are fast, secure, maintainable,
                scalable, and fun to build.
              </strong>
            </p>
            <p>
              Join my newsletter and I’ll boop you on the brain what I’ve
              learned about building modern web apps.
            </p>
          </Fragment>
        ) : (
          children
        )}

        <label for="firstName">First Name</label>
        <input type="text" name="firstName" id="firstName" />

        <label for="email">Email</label>
        <input type="email" name="email" id="email" />

        <button>Subscribe</button>
      </form>
    </aside>
  );
}
